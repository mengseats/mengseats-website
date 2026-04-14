import type { Recipe } from "@/data/recipes";
import { recipes as fallbackRecipes } from "@/data/recipes";
import {
  getCheckbox,
  getDate,
  getFileUrl,
  getNotionConfig,
  getPagePlainTextSections,
  getPlainText,
  getUrl,
  queryDataSourcePages,
  slugify,
  type NotionPage,
} from "@/lib/notion";

export interface ShortformEntry {
  id: string;
  title: string;
  slug: string;
  status: string;
  type: string;
  url: string;
  description: string;
  hook: boolean;
  sponsorship: boolean;
  date: string;
  notes: string;
  script: string;
  images: string[];
  ingredientGroups: Recipe["ingredientGroups"];
  instructions: string[];
  extras: string[];
}

const fallbackShortformEntries: ShortformEntry[] = [
  {
    id: "fallback-shortform-1",
    title: "pani puri",
    slug: "pani-puri",
    status: "Posted",
    type: "",
    url: "",
    description: "Fallback shortform entry while Notion is not connected yet.",
    hook: false,
    sponsorship: false,
    date: "",
    notes: "Connect your Notion integration and share the Shortform data source to replace this fallback content.",
    script: "",
    images: [],
    ingredientGroups: [{ name: "ingredients", items: [] }],
    instructions: [],
    extras: [],
  },
];

function getProperty(page: NotionPage, names: string[]) {
  for (const name of names) {
    if (name in page.properties) {
      return page.properties[name];
    }
  }

  return null;
}

function isPublished(page: NotionPage) {
  const explicitPublished = getProperty(page, ["Published", "published", "Live"]);
  const status = getPlainText(getProperty(page, ["Status", "status"])).toLowerCase();

  if (explicitPublished !== null) {
    return getCheckbox(explicitPublished);
  }

  if (!status) {
    return true;
  }

  return ["published", "posted", "live"].includes(status);
}

function parseGroupedList(text: string) {
  const groups: Recipe["ingredientGroups"] = [];
  let currentGroup = {
    name: "ingredients",
    items: [] as string[],
  };

  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  for (const line of lines) {
    const cleaned = line.replace(/^[•*-]\s*/, "");
    const looksLikeHeading =
      !/^[0-9]/.test(cleaned) &&
      !cleaned.startsWith("1 ") &&
      !cleaned.includes(" - ") &&
      !cleaned.includes(",") &&
      !cleaned.toLowerCase().includes("cup") &&
      !cleaned.toLowerCase().includes("tbsp") &&
      !cleaned.toLowerCase().includes("tsp");

    if (looksLikeHeading && currentGroup.items.length > 0) {
      groups.push(currentGroup);
      currentGroup = {
        name: cleaned.replace(/:$/, ""),
        items: [],
      };
      continue;
    }

    currentGroup.items.push(cleaned);
  }

  if (currentGroup.items.length > 0) {
    groups.push(currentGroup);
  }

  return groups.length > 0 ? groups : [{ name: "ingredients", items: lines }];
}

function parseInstructionList(text: string) {
  return text
    .split(/\n+/)
    .map((line) => line.trim().replace(/^\d+[.)]\s*/, ""))
    .filter(Boolean);
}

function splitParagraphs(text: string) {
  return text
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);
}

function looksLikeIngredient(line: string) {
  const value = line.trim().replace(/^[•*-]\s*/, "");
  if (!value) return false;

  return (
    /^(\d+\/\d+|\d+(\.\d+)?)/.test(value) ||
    /\b(cup|cups|tbsp|tsp|teaspoon|teaspoons|tablespoon|tablespoons|lb|lbs|pound|pounds|oz|ounce|ounces|gram|grams|kg|ml|liter|liters|clove|cloves|slice|slices|piece|pieces|sprig|sprigs|pinch|handful)\b/i.test(
      value,
    )
  );
}

function normalizeListLine(line: string) {
  return line.trim().replace(/^[•*-]\s*/, "");
}

function extractShortformIngredients(
  description: string,
  notes: string,
  script: string,
) {
  const candidates = [notes, description, script].filter(Boolean);

  for (const candidate of candidates) {
    const lines = candidate
      .split("\n")
      .map(normalizeListLine)
      .filter(Boolean);

    const ingredientLines = lines.filter(looksLikeIngredient);

    if (ingredientLines.length >= 2) {
      return parseGroupedList(ingredientLines.join("\n"));
    }
  }

  return [{ name: "ingredients", items: [] }];
}

function extractShortformInstructions(notes: string, script: string, description: string) {
  const numberedSource = [notes, script, description].find((value) =>
    /\b1[.)]\s/.test(value),
  );

  if (numberedSource) {
    return parseInstructionList(numberedSource);
  }

  const narrativeSource = script || notes || description;

  if (!narrativeSource) {
    return [];
  }

  const paragraphs = splitParagraphs(narrativeSource);

  if (paragraphs.length > 0) {
    return paragraphs;
  }

  return narrativeSource
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function buildShortformExtras(entry: {
  description: string;
  notes: string;
  script: string;
  hook: boolean;
  sponsorship: boolean;
  url: string;
}) {
  const extras: string[] = [];

  if (entry.hook) {
    extras.push("hook");
  }

  if (entry.sponsorship) {
    extras.push("sponsorship");
  }

  if (entry.url) {
    extras.push(entry.url);
  }

  return [...new Set(extras)].filter(Boolean);
}

function mapRecipePage(page: NotionPage): Recipe {
  const title =
    getPlainText(getProperty(page, ["Name", "Recipe", "Title"])) || "untitled recipe";
  const slug =
    getPlainText(getProperty(page, ["Slug", "slug"])) || slugify(title) || page.id;
  const thumbnailUrl = getFileUrl(getProperty(page, ["Thumbnail", "Image"])) || "";
  const videoUrl = getUrl(getProperty(page, ["Video Link", "Video", "URL"]));
  const timeMinutes = getPlainText(getProperty(page, ["Time (minutes)", "Time", "Cook Time"]));
  const ingredientsText = getPlainText(getProperty(page, ["Ingredients", "ingredients"]));
  const directionsText = getPlainText(getProperty(page, ["Directions", "Instructions", "directions"]));
  const description =
    getPlainText(getProperty(page, ["Description", "description", "Intro"])) ||
    "Recipe pulled from Notion.";
  const category = getPlainText(getProperty(page, ["Category", "category"])) || "recipes";
  const servings = getPlainText(getProperty(page, ["Servings", "Yield"])) || "";
  const difficulty = getPlainText(getProperty(page, ["Difficulty", "Level"])) || "";

  return {
    slug,
    title,
    description,
    intro: description,
    category,
    cookTime: timeMinutes ? `${timeMinutes} min` : "",
    servings,
    difficulty,
    accent: "from-[#ead8c5] via-[#f6eee3] to-[#880000]/70",
    images: thumbnailUrl ? [thumbnailUrl] : [],
    videoLabel: videoUrl ? "recipe video" : undefined,
    ingredientGroups: ingredientsText
      ? parseGroupedList(ingredientsText)
      : [{ name: "ingredients", items: [] }],
    instructions: directionsText ? parseInstructionList(directionsText) : [],
    notes: videoUrl ? [videoUrl] : [],
  };
}

async function mapShortformPage(page: NotionPage): Promise<ShortformEntry> {
  const title =
    getPlainText(getProperty(page, ["Project name", "Name", "Title"])) || "untitled";
  const sections: Record<string, string> = await getPagePlainTextSections(page.id).catch(
    () => ({} as Record<string, string>),
  );
  const description = getPlainText(getProperty(page, ["Description", "description"]));
  const notes = sections.notes || sections.content || "";
  const script = sections.script || "";
  const ingredientsText =
    sections.ingredients ||
    sections.ingredient ||
    getPlainText(getProperty(page, ["Ingredients", "ingredients"]));
  const directionsText =
    sections.directions ||
    sections.direction ||
    sections.instructions ||
    sections.instruction ||
    sections.method ||
    getPlainText(getProperty(page, ["Directions", "Instructions", "directions"]));
  const imageUrl = getFileUrl(getProperty(page, ["Thumbnail", "Image", "Cover"])) || "";
  const hook = getCheckbox(getProperty(page, ["Hook", "hook"]));
  const sponsorship = getCheckbox(getProperty(page, ["Sponsorship", "sponsorship"]));
  const url = getUrl(getProperty(page, ["URL", "Url", "Video Link"]));

  return {
    id: page.id,
    title,
    slug: getPlainText(getProperty(page, ["Slug", "slug"])) || slugify(title) || page.id,
    status: getPlainText(getProperty(page, ["Status", "status"])),
    type: getPlainText(getProperty(page, ["Type", "type"])),
    url,
    description,
    hook,
    sponsorship,
    date: getDate(getProperty(page, ["Dates", "Date"])),
    notes,
    script,
    images: imageUrl ? [imageUrl] : [],
    ingredientGroups: ingredientsText
      ? parseGroupedList(ingredientsText)
      : extractShortformIngredients(description, notes, script),
    instructions: directionsText
      ? parseInstructionList(directionsText)
      : extractShortformInstructions(notes, script, description),
    extras: buildShortformExtras({
      description,
      notes,
      script,
      hook,
      sponsorship,
      url,
    }),
  };
}

function sortRecipes(items: Recipe[]) {
  return [...items].sort((a, b) => a.title.localeCompare(b.title));
}

export async function getRecipes() {
  const { recipesDataSourceId } = getNotionConfig();

  if (!recipesDataSourceId) {
    return fallbackRecipes;
  }

  try {
    const pages = await queryDataSourcePages(recipesDataSourceId, "Recipes");
    const mapped = pages
      .filter(isPublished)
      .map(mapRecipePage)
      .filter((recipe) => recipe.title);
    return mapped.length > 0 ? sortRecipes(mapped) : fallbackRecipes;
  } catch (error) {
    console.warn("Falling back to local recipes data because Notion fetch failed.", error);
    return fallbackRecipes;
  }
}

export async function getRecentRecipes(limit = 4) {
  const recipes = await getRecipes();
  return recipes.slice(0, limit);
}

export async function getRecipeBySlug(slug: string) {
  const recipes = await getRecipes();
  return recipes.find((recipe) => recipe.slug === slug) ?? null;
}

export async function getShortformEntries() {
  const { shortformDataSourceId } = getNotionConfig();

  if (!shortformDataSourceId) {
    return fallbackShortformEntries;
  }

  try {
    const pages = await queryDataSourcePages(shortformDataSourceId, "Shortform");
    const mapped = await Promise.all(pages.filter(isPublished).map(mapShortformPage));
    return mapped.length > 0 ? mapped : fallbackShortformEntries;
  } catch (error) {
    console.warn("Falling back to local shortform data because Notion fetch failed.", error);
    return fallbackShortformEntries;
  }
}

export async function getShortformEntryBySlug(slug: string) {
  const entries = await getShortformEntries();
  return entries.find((entry) => entry.slug === slug) ?? null;
}
