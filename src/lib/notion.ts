const NOTION_API_BASE = "https://api.notion.com/v1";
const NOTION_VERSION = "2025-09-03";

export interface NotionPage {
  id: string;
  url?: string;
  created_time?: string;
  last_edited_time?: string;
  properties: Record<string, unknown>;
}

interface QueryDataSourceResponse {
  results: NotionPage[];
  next_cursor: string | null;
  has_more: boolean;
}

interface SearchResult {
  object: string;
  id: string;
  title?: Array<{ plain_text?: string }>;
  parent?: {
    type?: string;
    database_id?: string;
  };
}

interface SearchResponse {
  results: SearchResult[];
}

interface BlockObject {
  id: string;
  type: string;
  has_children?: boolean;
  [key: string]: unknown;
}

interface ListBlockChildrenResponse {
  results: BlockObject[];
  next_cursor: string | null;
  has_more: boolean;
}

export interface NotionConfig {
  apiKey?: string;
  recipesDataSourceId?: string;
  shortformDataSourceId?: string;
}

export function getNotionConfig(): NotionConfig {
  return {
    apiKey: process.env.NOTION_API_KEY,
    recipesDataSourceId:
      process.env.NOTION_RECIPES_DATA_SOURCE_ID ?? process.env.NOTION_RECIPES_DATABASE_ID,
    shortformDataSourceId:
      process.env.NOTION_SHORTFORM_DATA_SOURCE_ID ?? process.env.NOTION_SHORTFORM_DATABASE_ID,
  };
}

export function hasNotionAccess(config = getNotionConfig()) {
  return Boolean(config.apiKey);
}

async function notionRequest<T>(path: string, init: RequestInit = {}) {
  const { apiKey } = getNotionConfig();

  if (!apiKey) {
    throw new Error("Missing NOTION_API_KEY");
  }

  const response = await fetch(`${NOTION_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Notion request failed (${response.status}): ${message}`);
  }

  return (await response.json()) as T;
}

async function searchDataSources(query?: string) {
  const response = await notionRequest<SearchResponse>("/search", {
    method: "POST",
    body: JSON.stringify({
      query,
      page_size: 100,
      filter: {
        property: "object",
        value: "data_source",
      },
    }),
  });

  return response.results.filter((result) => result.object === "data_source");
}

async function resolveDataSourceId(inputId: string, titleHint?: string) {
  const sources = await searchDataSources(titleHint);

  const normalizedInput = inputId.replace(/-/g, "");

  const directMatch = sources.find((source) => source.id.replace(/-/g, "") === normalizedInput);
  if (directMatch) {
    return directMatch.id;
  }

  const databaseMatch = sources.find(
    (source) => source.parent?.database_id?.replace(/-/g, "") === normalizedInput,
  );
  if (databaseMatch) {
    return databaseMatch.id;
  }

  if (titleHint) {
    const titleMatch = sources.find((source) =>
      source.title?.some(
        (item) => item.plain_text?.trim().toLowerCase() === titleHint.trim().toLowerCase(),
      ),
    );

    if (titleMatch) {
      return titleMatch.id;
    }
  }

  return inputId;
}

export async function queryDataSourcePages(dataSourceId: string, titleHint?: string) {
  const resolvedDataSourceId = await resolveDataSourceId(dataSourceId, titleHint);
  const pages: NotionPage[] = [];
  let nextCursor: string | null = null;

  do {
    const response: QueryDataSourceResponse = await notionRequest<QueryDataSourceResponse>(
      `/data_sources/${resolvedDataSourceId}/query`,
      {
        method: "POST",
        body: JSON.stringify({
          page_size: 100,
          start_cursor: nextCursor ?? undefined,
        }),
      },
    );

    pages.push(...response.results);
    nextCursor = response.has_more ? response.next_cursor : null;
  } while (nextCursor);

  return pages;
}

export async function retrievePage(pageId: string) {
  return notionRequest<NotionPage>(`/pages/${pageId}`);
}

export async function listBlockChildren(blockId: string) {
  const blocks: BlockObject[] = [];
  let nextCursor: string | null = null;

  do {
    const response: ListBlockChildrenResponse = await notionRequest<ListBlockChildrenResponse>(
      `/blocks/${blockId}/children?page_size=100${
        nextCursor ? `&start_cursor=${encodeURIComponent(nextCursor)}` : ""
      }`,
    );

    blocks.push(...response.results);
    nextCursor = response.has_more ? response.next_cursor : null;
  } while (nextCursor);

  return blocks;
}

function extractRichTextArray(value: unknown): Array<{ plain_text?: string }> {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is { plain_text?: string } => typeof item === "object" && item !== null);
}

export function getPlainText(value: unknown): string {
  if (!value || typeof value !== "object") {
    return "";
  }

  if ("plain_text" in value && typeof value.plain_text === "string") {
    return value.plain_text;
  }

  if ("title" in value) {
    return extractRichTextArray(value.title)
      .map((item) => item.plain_text ?? "")
      .join("")
      .trim();
  }

  if ("rich_text" in value) {
    return extractRichTextArray(value.rich_text)
      .map((item) => item.plain_text ?? "")
      .join("")
      .trim();
  }

  if ("select" in value && value.select && typeof value.select === "object") {
    return "name" in value.select && typeof value.select.name === "string"
      ? value.select.name
      : "";
  }

  if ("status" in value && value.status && typeof value.status === "object") {
    return "name" in value.status && typeof value.status.name === "string"
      ? value.status.name
      : "";
  }

  if ("url" in value && typeof value.url === "string") {
    return value.url;
  }

  if ("number" in value && typeof value.number === "number") {
    return String(value.number);
  }

  if ("checkbox" in value && typeof value.checkbox === "boolean") {
    return value.checkbox ? "true" : "false";
  }

  return "";
}

export function getNumber(value: unknown) {
  if (!value || typeof value !== "object" || !("number" in value)) {
    return null;
  }

  return typeof value.number === "number" ? value.number : null;
}

export function getCheckbox(value: unknown) {
  if (!value || typeof value !== "object" || !("checkbox" in value)) {
    return false;
  }

  return Boolean(value.checkbox);
}

export function getUrl(value: unknown) {
  if (!value || typeof value !== "object") {
    return "";
  }

  if ("url" in value && typeof value.url === "string") {
    return value.url;
  }

  return "";
}

export function getFileUrl(value: unknown) {
  if (!value || typeof value !== "object" || !("files" in value) || !Array.isArray(value.files)) {
    return "";
  }

  const firstFile = value.files[0];

  if (!firstFile || typeof firstFile !== "object") {
    return "";
  }

  if ("file" in firstFile && firstFile.file && typeof firstFile.file === "object") {
    return "url" in firstFile.file && typeof firstFile.file.url === "string"
      ? firstFile.file.url
      : "";
  }

  if ("external" in firstFile && firstFile.external && typeof firstFile.external === "object") {
    return "url" in firstFile.external && typeof firstFile.external.url === "string"
      ? firstFile.external.url
      : "";
  }

  return "";
}

export function getDate(value: unknown) {
  if (!value || typeof value !== "object" || !("date" in value) || !value.date || typeof value.date !== "object") {
    return "";
  }

  return "start" in value.date && typeof value.date.start === "string" ? value.date.start : "";
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function blockToPlainText(block: BlockObject) {
  const blockValue = block[block.type];

  if (!blockValue || typeof blockValue !== "object") {
    return "";
  }

  if ("rich_text" in blockValue) {
    return getPlainText({ rich_text: blockValue.rich_text });
  }

  return "";
}

const SECTION_LABELS = new Set([
  "notes",
  "script",
  "ingredients",
  "ingredient",
  "directions",
  "direction",
  "instructions",
  "instruction",
  "method",
  "recipe",
  "caption",
]);

function getSectionKey(block: BlockObject, text: string) {
  const normalized = slugify(text);

  if (!normalized) {
    return "";
  }

  if (block.type.startsWith("heading_")) {
    return normalized;
  }

  if (block.type === "paragraph" && SECTION_LABELS.has(normalized)) {
    return normalized;
  }

  return "";
}

export async function getPagePlainTextSections(pageId: string) {
  const blocks = await listBlockChildren(pageId);
  const sections: Record<string, string[]> = {};
  let currentSection = "content";

  for (const block of blocks) {
    const text = blockToPlainText(block).trim();

    if (!text) {
      continue;
    }

    const sectionKey = getSectionKey(block, text);

    if (sectionKey) {
      currentSection = sectionKey;
      sections[currentSection] = sections[currentSection] ?? [];
      continue;
    }

    sections[currentSection] = sections[currentSection] ?? [];
    sections[currentSection].push(text);
  }

  return Object.fromEntries(
    Object.entries(sections).map(([key, values]) => [key, values.join("\n\n")]),
  );
}
