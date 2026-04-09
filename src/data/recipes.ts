export interface IngredientGroup {
  name: string;
  items: string[];
}

export interface Recipe {
  slug: string;
  title: string;
  description: string;
  intro: string;
  category: string;
  cookTime: string;
  servings: string;
  difficulty: string;
  accent: string;
  images: string[];
  videoLabel?: string;
  ingredientGroups: IngredientGroup[];
  instructions: string[];
  notes: string[];
}

export const recipes: Recipe[] = [
  {
    slug: "crispy-pork-belly",
    title: "Crispy Pork Belly",
    description: "Golden crackling, juicy layers, and a dinner-party finish.",
    intro:
      "This placeholder recipe page is set up for a hero image, a short story, and a clean ingredient-to-directions flow.",
    category: "Comfort Food",
    cookTime: "1 hr 15 min",
    servings: "4 servings",
    difficulty: "Medium",
    accent: "from-orange-300 via-amber-100 to-stone-900/80",
    images: ["Hero photo", "Crispy slice detail", "Table scene"],
    videoLabel: "Recipe reel placeholder",
    ingredientGroups: [
      {
        name: "Pork",
        items: [
          "2 lb pork belly, skin on",
          "1 tbsp kosher salt",
          "1 tsp white pepper",
          "1 tsp five spice powder",
        ],
      },
      {
        name: "Dipping Sauce",
        items: [
          "3 tbsp soy sauce",
          "1 tbsp rice vinegar",
          "1 tsp sesame oil",
          "1 tbsp honey",
          "2 garlic cloves, minced",
        ],
      },
    ],
    instructions: [
      "Score the skin lightly, keeping the cuts shallow so the fat stays intact.",
      "Season the meat side, rest overnight, and leave the skin uncovered so it dries out.",
      "Roast hot at first to blister the skin, then lower the heat until the center is tender.",
      "Slice and plate with steamed rice, greens, or lettuce wraps.",
    ],
    notes: [
      "Swap this placeholder intro with your real recipe story.",
      "Add process images later by replacing the placeholder media labels.",
    ],
  },
  {
    slug: "garlic-butter-noodles",
    title: "Garlic Butter Noodles",
    description: "Fast, glossy noodles built for a viral weeknight post.",
    intro:
      "Use this entry as a model for simple recipes where the reel, ingredient list, and quick notes matter most.",
    category: "Quick Meals",
    cookTime: "20 min",
    servings: "2 to 3 servings",
    difficulty: "Easy",
    accent: "from-yellow-200 via-orange-100 to-stone-900/70",
    images: ["Bowl shot", "Lifted noodles", "Ingredient flat lay"],
    videoLabel: "Short-form cooking clip",
    ingredientGroups: [
      {
        name: "Main",
        items: [
          "12 oz noodles of choice",
          "4 tbsp unsalted butter",
          "6 garlic cloves, minced",
          "2 tbsp soy sauce",
          "1 tbsp oyster sauce",
          "Chives or parsley, chopped",
        ],
      },
    ],
    instructions: [
      "Cook the noodles and save a splash of pasta water.",
      "Melt butter, bloom the garlic, and stir in the sauces.",
      "Toss the noodles until glossy and loosen with pasta water if needed.",
      "Finish with herbs, black pepper, and chili crisp if you want heat.",
    ],
    notes: [
      "Perfect slot for a quick tips section or substitution note.",
      "You can also feature a short embedded video here later.",
    ],
  },
  {
    slug: "beef-bulgogi",
    title: "Beef Bulgogi",
    description: "Savory-sweet marinated beef with weeknight energy.",
    intro:
      "This detail page layout can support recipe text, a video frame, and extra notes without feeling crowded.",
    category: "Korean Favorites",
    cookTime: "35 min",
    servings: "4 servings",
    difficulty: "Easy",
    accent: "from-rose-200 via-orange-100 to-stone-900/80",
    images: ["Skillet close-up", "Lettuce wrap", "Marinade prep"],
    videoLabel: "Skillet sizzle clip",
    ingredientGroups: [
      {
        name: "Marinade",
        items: [
          "1.5 lb ribeye, thinly sliced",
          "1/4 cup soy sauce",
          "2 tbsp brown sugar",
          "1 tbsp sesame oil",
          "3 garlic cloves, minced",
          "1/2 grated onion",
        ],
      },
    ],
    instructions: [
      "Mix the marinade until the sugar dissolves.",
      "Coat the beef and marinate until glossy and fragrant.",
      "Cook in a ripping hot skillet until the edges caramelize.",
      "Serve with rice, lettuce, kimchi, and ssamjang.",
    ],
    notes: [
      "A notes card like this works well for spice-level tweaks or serving ideas.",
    ],
  },
  {
    slug: "dan-dan-noodles",
    title: "Dan Dan Noodles",
    description: "Bold, spicy noodles with a punchy sauce and crisp toppings.",
    intro:
      "This recipe slot is designed for more detailed ingredient groups, which helps when your recipes have separate sauce and topping components.",
    category: "Noodle Night",
    cookTime: "30 min",
    servings: "4 servings",
    difficulty: "Medium",
    accent: "from-red-200 via-orange-100 to-stone-900/80",
    images: ["Finished bowl", "Sauce detail", "Toppings board"],
    videoLabel: "Assembly reel placeholder",
    ingredientGroups: [
      {
        name: "Sauce",
        items: [
          "2 tbsp chili oil",
          "1 tbsp sesame paste",
          "2 tbsp soy sauce",
          "1 tbsp black vinegar",
          "1 tsp Sichuan peppercorn powder",
        ],
      },
      {
        name: "Toppings",
        items: [
          "8 oz ground pork",
          "12 oz noodles",
          "Chopped peanuts",
          "Sliced green onion",
        ],
      },
    ],
    instructions: [
      "Whisk the sauce in the bottom of each serving bowl.",
      "Cook the pork until crisp and deeply browned.",
      "Boil the noodles, then toss with the sauce.",
      "Pile on the toppings and finish with extra chili oil.",
    ],
    notes: [
      "This structure also works for desserts with separate crust and filling sections.",
    ],
  },
  {
    slug: "matcha-cheesecake",
    title: "Matcha Cheesecake",
    description: "Creamy, cool, and made for clean bakery-style photography.",
    intro:
      "Dessert posts can use this same recipe template without any layout changes, so the site stays consistent as you add more content.",
    category: "Desserts",
    cookTime: "4 hr chill",
    servings: "8 slices",
    difficulty: "Medium",
    accent: "from-lime-100 via-stone-100 to-stone-900/75",
    images: ["Cake slice", "Top-down cake", "Tea pairing"],
    videoLabel: "No-bake process reel",
    ingredientGroups: [
      {
        name: "Crust",
        items: [
          "1.5 cups graham cracker crumbs",
          "5 tbsp melted butter",
          "2 tbsp sugar",
        ],
      },
      {
        name: "Filling",
        items: [
          "16 oz cream cheese",
          "1/2 cup sugar",
          "2 tbsp matcha powder",
          "1 cup heavy cream",
          "1 tsp vanilla",
        ],
      },
    ],
    instructions: [
      "Press the crust into the pan and chill until firm.",
      "Blend the filling until smooth and evenly green.",
      "Pour, level, and chill until fully set.",
      "Finish with sifted matcha and clean slices.",
    ],
    notes: [
      "Great place for serving, storage, or make-ahead notes.",
    ],
  },
];

export const recentRecipes = recipes.slice(0, 4);

export function getRecipeBySlug(slug: string) {
  return recipes.find((recipe) => recipe.slug === slug);
}
