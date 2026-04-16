export interface GalleryItem {
  id: string;
  src: string;
  label: string;
  category: string;
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

export const galleryCategories = [
  "cooks",
  "eats",
  "travels",
  "tunes",
  "other",
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

const galleryFileMap: Record<GalleryCategory, string[]> = {
  cooks: [
    "citrus-dashi-crudo.JPG",
    "lamb.JPG",
    "sea-bass.JPG",
    "chix.JPG",
    "matcha-tiramisu.JPG",
    "verci-crudo.jpg",
    "malai-kari-shrimp-and-grits.JPG",
    "grilled-cheese.jpg",
    "octopus.JPG",
    "porchetta.jpg",
    "grilled-salmon.JPG",
  ],
  eats: [
    "beef-noodle-soup.JPG",
    "marrow.JPG",
    "brains.png",
    "cotogna-crudo.jpg",
    "dim-sum.JPG",
    "greek-plate.JPG",
    "hangzhou-meal.JPG",
    "mapo-tofu.JPG",
    "pizza.jpg",
    "sushi.JPG",
    "tacos.jpg",
  ],
  travels: [
    "taj-mahal.JPG",
    "casablanca.JPG",
    "shanghai.JPG",
    "jaipur.jpg",
    "chongqing.JPG",
    "coachella-valley.jpg",
    "fes.JPG",
    "ganges.jpg",
    "khajuraho.jpg",
    "new-york.JPG",
    "osaka.png",
    "san-francisco.jpg",
    "shibuya.png",
    "taipei.JPG",
  ],
  tunes: [
    "fka-twigs-3.16.26.JPG",
    "bladee-10.15.25.jpg",
    "kaytranada-11.12.25.JPG",
    "quannnic-9.7.25.jpg",
    "2hollis-8.16.25.jpg",
    "yuree-8.12.25.PNG",
    "jid-8.7.25.jpg",
    "saba-6.15.25.JPG",
    "japanese-club-5.26.25.JPG",
    "denzel-curry-4.10.25.JPG",
    "machine-girl-11.9.24.JPG",
    "panchiko-11.21.24.JPG",
    "duster-9.27.24.JPG",
    "jane-remover-9.6.24.JPG",
    "magdalena-bay-8.24.24.JPG",
    "anderson-.paak-8.13.24.JPG",
    "slowdive-5.17.24.JPG",
    "icytwat-4.10.24.jpg",
  ],
  other: [
    "spiraling.JPG",
    "gtc.JPEG",
    "atl2.JPG",
    "backrooms.jpg",
    "construction.jpg",
    "pisces.JPG",
    "receipts.jpg",
    "stranger-things.JPG",
  ],
};

const galleryLabelOverrides: Record<string, string> = {
  "other/atl2.JPG": "atl",
};

function humanizeGalleryLabel(fileName: string) {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .trim();
}

function buildGalleryItems(category: GalleryCategory, files: string[]): GalleryItem[] {
  return files.map((fileName, index) => ({
    id: `${category}-${index + 1}`,
    src: `/images/gallery/${category}/${fileName}`,
    label: galleryLabelOverrides[`${category}/${fileName}`] ?? humanizeGalleryLabel(fileName),
    category,
  }));
}

export const galleryItems: GalleryItem[] = galleryCategories.flatMap((category) =>
  buildGalleryItems(category, galleryFileMap[category]),
);

export const blogPosts: BlogPost[] = [
  {
    slug: "welcome-to-mengseats",
    title: "Welcome to Mengseats",
    excerpt:
      "A placeholder intro post about the person behind the recipes and stories.",
    date: "April 2026",
    category: "Start Here",
  },
  {
    slug: "what-im-cooking-this-month",
    title: "What I'm Cooking This Month",
    excerpt:
      "Monthly updates, seasonal cravings, and the recipes currently in testing.",
    date: "April 2026",
    category: "Cooking Notes",
  },
  {
    slug: "how-i-plan-a-recipe-shoot",
    title: "How I Plan A Recipe Shoot",
    excerpt:
      "Behind the scenes on gear, prep routines, and the creative process.",
    date: "April 2026",
    category: "Creative Process",
  },
  {
    slug: "best-eats-in-the-city",
    title: "Best Eats in the City",
    excerpt:
      "A roundup of restaurant finds and local food discoveries worth sharing.",
    date: "March 2026",
    category: "Food Finds",
  },
  {
    slug: "kitchen-gear-guide",
    title: "Kitchen Gear Guide",
    excerpt:
      "The tools and equipment that make the biggest difference in my cooking.",
    date: "March 2026",
    category: "Gear",
  },
];

export const aboutSections: AboutSection[] = [
  {
    title: "How I Started Cooking",
    subtitle: "The beginning",
    body: "Placeholder text for your origin story — family meals, first experiments in the kitchen, and the moments that made cooking feel personal. Replace this with your real story when you're ready.",
    slides: [
      {
        title: "First kitchen memory",
        caption: "Placeholder for an old photo or family meal snapshot.",
      },
      {
        title: "Learning the basics",
        caption: "A photo from early cooking days — messy but meaningful.",
      },
      {
        title: "Comfort food roots",
        caption: "The dish that started it all.",
      },
    ],
  },
  {
    title: "CHEFS at Tech",
    subtitle: "The community",
    body: "Placeholder for your experience with CHEFS at Tech — events, collaborations, the people, and how it shaped your food perspective. Swap in real content later.",
    slides: [
      {
        title: "Team cook night",
        caption: "Placeholder for a group cooking event photo.",
      },
      {
        title: "Event setup",
        caption: "Setting up for a food event on campus.",
      },
      {
        title: "The crew",
        caption: "A group shot from a favorite gathering.",
      },
    ],
  },
  {
    title: "What's Next",
    subtitle: "Looking forward",
    body: "Placeholder for future plans — upcoming recipes, travel, collaborations, and where mengseats is headed. Fill in your real goals and aspirations.",
    slides: [
      {
        title: "Upcoming projects",
        caption: "Placeholder for what you're working on next.",
      },
      {
        title: "Dream kitchen",
        caption: "A vision board photo or inspiration shot.",
      },
      {
        title: "On the horizon",
        caption: "Where the journey goes from here.",
      },
    ],
  },
];
