import type { Recipe } from "@/data/recipes";
import { recipes as fallbackRecipes } from "@/data/recipes";
import { aboutSections as fallbackAboutSections, type AboutSection } from "@/data/content";
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

const ABOUT_DATA_SOURCE_ID = "1939952a-75a9-80f1-a73c-000b93bddf28";
const ABOUT_PAGE_ID = "1919952a-75a9-801d-a1ed-fb05d7da59bc";
const ABOUT_SLIDE_ORDER: Record<string, string[]> = {
  [normalizeKey("How I Started Cooking")]: [
    normalizeKey("Lasagna"),
    normalizeKey("Rice noodles in Hunan"),
    normalizeKey("Middle school fried rice prep"),
    normalizeKey("Thanksgiving dinner"),
    normalizeKey("Johns Creek High School culinary club"),
  ],
  [normalizeKey("CHEFS at Tech")]: [
    normalizeKey("Pasta workshop"),
    normalizeKey("AYCE at Sushi Village"),
    normalizeKey("Trader Joe's run"),
    normalizeKey("100 person hot pot"),
  ],
  [normalizeKey("What's Next")]: [
    normalizeKey("Ponder pop up"),
    normalizeKey("Cooking content"),
  ],
};

function getProperty(page: NotionPage, names: string[]) {
  for (const name of names) {
    if (name in page.properties) {
      return page.properties[name];
    }
  }

  return null;
}

function normalizeKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function normalizeAboutCaption(value: string) {
  return normalizeKey(value).replace(/traderjoes/g, "traderjoes");
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
    const isBulletLine = /^[•*-]\s*/.test(line);
    const cleaned = line.replace(/^[•*-]\s*/, "").replace(/:$/, "").trim();
    const normalized = cleaned.toLowerCase();
    const looksLikeHeading =
      !isBulletLine &&
      normalized !== "ingredients" &&
      !looksLikeIngredient(cleaned);

    if (looksLikeHeading) {
      if (currentGroup.items.length > 0) {
        groups.push(currentGroup);
      }

      currentGroup = {
        name: cleaned,
        items: [],
      };
      continue;
    }

    if (normalized === "ingredients" && !isBulletLine) {
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
  const thumbnailUrl = getFileUrl(getProperty(page, ["Thumbnail", "Image", "Cover"])) || "";
  const videoUrl = getUrl(getProperty(page, ["Video Link", "Video", "URL"]));
  const timeMinutes = getPlainText(getProperty(page, ["Time (minutes)", "Time", "Cook Time"]));
  const ingredientsText = getPlainText(getProperty(page, ["Ingredients", "ingredients"]));
  const directionsText = getPlainText(getProperty(page, ["Directions", "Instructions", "directions"]));
  const description = getPlainText(getProperty(page, ["Description", "description", "Intro"]));
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

function shortformEntryToRecipe(entry: ShortformEntry): Recipe {
  const description = entry.description.trim();
  const notes = entry.notes.trim();
  const intro = description || notes.split(/\n+/).find(Boolean) || "";

  return {
    slug: entry.slug,
    title: entry.title,
    description: intro,
    intro,
    category: "recipes",
    cookTime: "",
    servings: "",
    difficulty: "",
    accent: "from-[#ead8c5] via-[#f6eee3] to-[#880000]/70",
    images: entry.images,
    videoLabel: entry.url ? "recipe video" : undefined,
    ingredientGroups: entry.ingredientGroups,
    instructions: entry.instructions,
    notes: entry.url ? [entry.url] : [],
  };
}

export async function getAboutSections() {
  const config = getNotionConfig();

  if (!config.apiKey) {
    return fallbackAboutSections;
  }

  try {
    const bodySections = await getPagePlainTextSections(ABOUT_PAGE_ID);
    const pages = await queryDataSourcePages(ABOUT_DATA_SOURCE_ID);
    const slidesByTab = new Map<string, AboutSection["slides"]>();

    for (const page of pages) {
      const tab = getPlainText(getProperty(page, ["Tab"]));
      const caption = getPlainText(getProperty(page, ["Caption"]));
      const year = getPlainText(getProperty(page, ["Year"]));
      const src = getFileUrl(getProperty(page, ["Files & media"]));

      if (!tab || !src) {
        continue;
      }

      const key = normalizeKey(tab);
      const slides = slidesByTab.get(key) ?? [];

      slides.push({
        title: caption || year || "photo",
        caption: caption || "",
        src,
      });

      slidesByTab.set(key, slides);
    }

    return fallbackAboutSections.map((section) => {
      const key = normalizeKey(section.title);
      const slides = slidesByTab.get(key);
      const body = bodySections[key] || section.body;

      if (!slides || slides.length === 0) {
        return {
          ...section,
          body,
        };
      }

      const preferredOrder = ABOUT_SLIDE_ORDER[key] ?? [];
      const orderedSlides = [...slides].sort((a, b) => {
        const aIndex = preferredOrder.indexOf(normalizeAboutCaption(a.caption || a.title));
        const bIndex = preferredOrder.indexOf(normalizeAboutCaption(b.caption || b.title));

        if (aIndex === -1 && bIndex === -1) return 0;
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      });

      return {
        ...section,
        body,
        slides: orderedSlides,
      };
    });
  } catch (error) {
    console.error("Falling back to local about content because Notion fetch failed", error);
    return fallbackAboutSections;
  }
}

function toSortableTimestamp(value: string | undefined) {
  if (!value) {
    return 0;
  }

  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function sortRecipePages(pages: NotionPage[]) {
  return [...pages].sort((a, b) => {
    const aDate =
      getDate(getProperty(a, ["Posted date", "Posted Date", "Dates", "Date"])) ||
      a.created_time ||
      a.last_edited_time;
    const bDate =
      getDate(getProperty(b, ["Posted date", "Posted Date", "Dates", "Date"])) ||
      b.created_time ||
      b.last_edited_time;

    return toSortableTimestamp(bDate) - toSortableTimestamp(aDate);
  });
}

function normalizeOrderKey(value: string) {
  return slugify(value || "");
}

const ORDER_TITLE_ALIASES: Record<string, string> = {
  "scallion oil noodles": "scallion noodles",
  "homemade sushi grade salmon": "sashimi",
  "sushi grade salmon": "sashimi",
  "crispy air fried wings": "air fried wings",
  "chinese steamed egg": "steamed egg",
  "chinese steamed eggs": "steamed egg",
  "2 ingredient matcha mousse": "2 ingredient matcha mousse",
  "salt and pepper wings": "salt pepper wings",
  "soy chilli oil eggs": "soy chili oil eggs",
  "soy cured egg yolk": "soy egg yolks",
  "japanese beef rice bowl": "gyudon",
  "beef mushroom rice": "rice cooker beef mushroom rice",
  "garlic parmesan wings": "garlic parm wings",
  "garlic parmesean wings": "garlic parm wings",
  "korean chicken tenders": "korean chicken tenders",
  "tomato egg stir fry": "tomato eggs",
  "hainanese chicken truck": "rice cooker hainanese chicken rice",
  "vietnamese pork belly chin su": "vietnamese pork belly",
  "vietnamese pork belly (chin su)": "vietnamese pork belly",
  "ramen eggs": "ramen egg",
  "scallops": "how to make scallops",
  "japanese curry osso buco": "japanese curry osso bucco",
  "thai curry soup dumpling": "thai curry soup dumplings",
  "rice cooker hainanese chicken": "rice cooker hainanese chicken rice",
  "rice cooker hainanese chicken rice": "rice cooker hainanese chicken rice",
};

function toOrderKey(value: string) {
  const normalized = normalizeOrderKey(value);
  return ORDER_TITLE_ALIASES[normalized] ?? normalized;
}

const MANUAL_RECIPE_ORDER = [
  "salmon laab",
  "honey garlic chicken",
  "vietnamese pork belly",
  "ramen egg",
  "pani puri",
  "cumin lamb",
  "dumpling lasagne",
  "spring rolls",
  "scallops",
  "fried egg salad",
  "red braised pork belly",
  "crispy pork belly",
  "hainanese chicken rice",
  "japanese curry osso bucco",
  "salt and pepper wings",
  "soy garlic wings",
  "salmon sisig",
  "cheesy bread bites",
  "thai steak sandwich",
  "beef mushroom rice",
  "crispy rice omelet",
  "bibimbap",
  "miso butter lamb",
  "garlic parm potatoes",
  "japanese curry eggs",
  "thai calamari",
  "scrambled eggs",
  "garlic parmesan wings",
  "korean chicken tenders",
  "lemongrass chicken",
  "gochujang salmon bites",
  "gochujang butter eggs",
  "salmon egg claypot rice",
  "mango sticky rice",
  "coconut milk fish",
  "tofu katsu curry",
  "hainanese chicken truck",
  "tofu satay skewers",
  "tanghulu",
  "taiwanese fried enoki mushrooms",
  "butter chicken",
  "tomato egg stir fry",
  "indian curry eggs",
  "chili oil potato balls",
  "kung pao tofu",
  "shrimp spring rolls",
  "beef pepper rice",
  "thai curry eggs",
  "golden smashed potatoes",
  "miso butter eggs",
  "rice paper pancakes",
  "egg drop soup",
  "matcha chia pudding",
  "japanese beef rice bowl",
  "soy cured egg yolk",
  "french onion soup",
  "chickpea shakshuka",
  "scallion oil noodles",
  "shrimp rice rolls",
  "chinese steamed eggs",
  "crispy air fried wings",
  "soy chili oil eggs",
  "sushi grade salmon",
  "2 ingredient matcha mousse",
  "10 second omelette",
  "mayak eggs",
].map(normalizeOrderKey);

function dedupeRecipes(recipes: Recipe[]) {
  const seen = new Set<string>();

  return recipes.filter((recipe) => {
    const candidates = [recipe.slug, recipe.title]
      .map(toOrderKey)
      .filter(Boolean);
    const key = candidates[0] || recipe.slug || recipe.title;

    if (!key || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function filterRecipesToManualOrder(recipes: Recipe[]) {
  const allowed = new Set(MANUAL_RECIPE_ORDER);
  return recipes.filter((recipe) => allowed.has(toOrderKey(recipe.title)));
}

function sortRecipesByManualOrder(recipes: Recipe[]) {
  const manualOrderIndex = new Map(
    MANUAL_RECIPE_ORDER.map((title, index): [string, number] => [title, index]),
  );

  return [...recipes].sort((a, b) => {
    const aIndex = manualOrderIndex.get(toOrderKey(a.title));
    const bIndex = manualOrderIndex.get(toOrderKey(b.title));

    if (aIndex !== undefined && bIndex !== undefined) {
      return aIndex - bIndex;
    }

    if (aIndex !== undefined) {
      return -1;
    }

    if (bIndex !== undefined) {
      return 1;
    }

    return 0;
  });
}

function sortShortformPages(pages: NotionPage[]) {
  return [...pages].sort((a, b) => {
    const aDate =
      getDate(getProperty(a, ["Dates", "Date"])) || a.created_time || a.last_edited_time;
    const bDate =
      getDate(getProperty(b, ["Dates", "Date"])) || b.created_time || b.last_edited_time;

    return toSortableTimestamp(bDate) - toSortableTimestamp(aDate);
  });
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

export async function getRecipes() {
  try {
    const { recipesDataSourceId } = getNotionConfig();
    const recipePages = recipesDataSourceId
      ? await queryDataSourcePages(recipesDataSourceId, "Recipes")
      : [];
    const websiteRecipes = sortRecipePages(recipePages)
      .filter(isPublished)
      .map(mapRecipePage)
      .filter((recipe) => recipe.title);
    const orderedRecipes = sortRecipesByManualOrder(websiteRecipes);
    const uniqueRecipes = dedupeRecipes(orderedRecipes);
    const filteredRecipes = filterRecipesToManualOrder(uniqueRecipes);
    return filteredRecipes.length > 0 ? filteredRecipes : fallbackRecipes;
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
    const mapped = await Promise.all(sortShortformPages(pages).filter(isPublished).map(mapShortformPage));
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
