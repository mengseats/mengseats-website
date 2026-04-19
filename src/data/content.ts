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
    src?: string;
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
    title: "How I started cooking",
    subtitle: "The beginning",
    body: "I started cooking when I was eight years old, not out of curiosity but out of necessity. With my parents working late, I had to figure out how to feed myself, because endless bowls of Cocoa Krispies weren't gonna cut it forever. What began as a need to cook quickly became an obsession with food.\n\nMy family's trips to China connected me to my culture through food in a way nothing else could. I remember hectic night markets and the dishes my grandma made that tasted like nothing I could find back home, and those flavors stuck with me. Closer to home, eating out with my family was its own education, since my parents would take us to hole in the wall spots and order things I'd never heard of. Between all of it, food became the thread that tied together every part of my life. Great food made me want to become a great cook.\n\nBy middle school, I was selling fried rice out of a crockpot in homeroom (I slipped some to my teacher so he wouldn't rat on me) and auctioning off frisbee sized chocolate chip cookies to my classmates. In high school, I was cooking for friends regularly and started my school's culinary club because I wanted to share my passion of cooking with others.",
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
    body: "When I arrived at Georgia Tech, I noticed an alarming number of students who had no idea how to cook. That's when I decided to start CHEFS (Culinary Health and Education For Students) at Tech, with the goal to make food and cooking more accessible for my fellow college students.\n\nI had no idea where to begin, but I slowly built a team, figured out funding and marketing, and we got to work. We held cooking workshops in my fraternity's backyard, teaching students everything from basic knife skills to making the perfect ribeye. We also organized grocery and restaurant trips since we recognized that many students didn't have cars. Beyond that, we hosted Thanksgiving potlucks, 100 person hot pot nights, and much more.\n\nWhat started as a personal mission evolved into one of the largest student organizations on campus. I spent a lot of my time in college on CHEFS instead of studying (sorry Mom and Dad), but it was a mission I believed in too deeply to not give 100%.",
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
    title: "What's next",
    subtitle: "Looking forward",
    body: "Two years ago, I posted my first cooking video because I wanted to teach not just my fellow students how to cook, but the entire world. When I graduated college last December, I knew the corporate world wasn't for me. I wanted to pursue my passion, so I kept posting content. One day, MasterChef reached out to me, and I ended up making it on the show.\n\nRight now, I have many goals. One is to continue to make cooking to content for the entire world. I also want to start hosting my own pop ups to share my creative expression of food with others. However, my main goal is to build a community that's passionate about food and cooking. I see it as an extension of the mission I started with CHEFS, just on a larger scale. That means not only an online community, but also in person cooking classes and food events, because I've seen firsthand what happens when you share food with others, and that's something I want everyone to experience.",
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
