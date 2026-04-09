export interface GallerySection {
  slug: string;
  title: string;
  description: string;
  items: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

export interface AboutSection {
  title: string;
  subtitle: string;
  body: string;
  slides: {
    title: string;
    caption: string;
  }[];
}

export const gallerySections: GallerySection[] = [
  {
    slug: "recipe-shoots",
    title: "Recipe Shoots",
    description: "Styled dish photography and hero images for finished recipes.",
    items: ["Hero plate", "Overhead setup", "Ingredient prep", "Close-up texture"],
  },
  {
    slug: "behind-the-scenes",
    title: "Behind The Scenes",
    description: "Kitchen process moments, filming setups, and in-progress stories.",
    items: ["Tripod corner", "Sauce pour", "Notebook planning", "Editing desk"],
  },
  {
    slug: "city-bites",
    title: "City Bites",
    description: "Restaurant finds, travel meals, and local food discoveries.",
    items: ["Cafe window seat", "Street food tray", "Dinner spread", "Dessert stop"],
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "welcome-to-mengseats",
    title: "Welcome To Mengseats",
    excerpt:
      "A placeholder intro post for the voice behind the recipes, videos, and food memories on the site.",
    date: "April 2026",
    category: "Start Here",
  },
  {
    slug: "what-im-cooking-this-month",
    title: "What I’m Cooking This Month",
    excerpt:
      "A flexible template for monthly updates, seasonal cravings, and the recipes currently in testing.",
    date: "April 2026",
    category: "Cooking Notes",
  },
  {
    slug: "how-i-plan-a-recipe-shoot",
    title: "How I Plan A Recipe Shoot",
    excerpt:
      "A behind-the-scenes style blog card for sharing gear, prep routines, and your creative process.",
    date: "April 2026",
    category: "Creative Process",
  },
];

export const aboutSections: AboutSection[] = [
  {
    title: "How It Started",
    subtitle: "Food memories, family flavors, and the first dishes worth writing down.",
    body:
      "This section is ready for your real story. For now, it introduces the heart of mengseats and leaves room for photos with captions from your earliest cooking moments.",
    slides: [
      {
        title: "First notebook",
        caption: "Placeholder for an old recipe note, family meal, or kitchen snapshot.",
      },
      {
        title: "Early cooking days",
        caption: "Use this slot for a memory-driven image with a short caption.",
      },
      {
        title: "Favorite comfort food",
        caption: "Great place for a photo that explains where your food style comes from.",
      },
    ],
  },
  {
    title: "What Mengseats Is Now",
    subtitle: "Recipes, reels, restaurant moments, and a style that feels personal.",
    body:
      "This middle section can explain what people will find across the site: recipes, galleries, blog posts, and a growing archive of food content.",
    slides: [
      {
        title: "Recipe content",
        caption: "Show a polished dish photo or a still from a favorite video.",
      },
      {
        title: "Creative setup",
        caption: "Placeholder for your camera, editing setup, or kitchen workflow.",
      },
      {
        title: "Community moments",
        caption: "Use a caption here to mention readers, followers, or shared meals.",
      },
    ],
  },
  {
    title: "Chefs I Look Up To",
    subtitle: "A final section for influence, inspiration, and what shapes your taste.",
    body:
      "Your sketch mentioned a chefs section, so this block leaves room for inspiration photos, restaurant visits, cookbooks, or people whose work has shaped your voice.",
    slides: [
      {
        title: "Restaurant inspiration",
        caption: "Placeholder for a dish, dining room, or travel photo that influenced you.",
      },
      {
        title: "Cookbook shelf",
        caption: "A good slot for cookbook stacks, bookmarked pages, or kitchen references.",
      },
      {
        title: "Creative north star",
        caption: "Use this final slide for a quote image, mentor, or culinary touchstone.",
      },
    ],
  },
];
