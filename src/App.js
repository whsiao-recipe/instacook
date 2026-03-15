import React, { useMemo, useState, useEffect } from "react";
import "./App.css";

// --- DATA CONSTANTS ---
const PANTRY_CATALOG = {
  "Meat & Proteins": [
    "Bacon", "Beef Flank", "Chicken", "Chicken Thighs", "Chicken Wings",
    "Ground Beef", "Ground Chicken", "Ground Pork", "Lamb Chops",
    "Rib Eye Steak", "Salmon", "Shrimp", "Tilapia"
  ],
  "Produce": [
    "Banana Peppers", "Basil", "Bell Pepper", "Broccoli", "Garlic",
    "Ginger", "Lemon", "Lime", "Mushrooms", "Onion", "Potato",
    "Red Onion", "Shallot", "Spinach", "Sweet Potato", "Tomato"
  ],
  "Dairy & Eggs": [
    "American Cheese", "Butter", "Cheese", "Cream", "Cream Cheese",
    "Egg", "Greek Yogurt", "Heavy Cream", "Milk", "Mozzarella", "Parmesan", "Sour Cream"
  ],
  "Pantry Staples": [
    "Avocado Oil", "Baking Powder", "Beef Broth", "Bread", "Canned Tomatoes",
    "Chicken Broth", "Coconut Milk", "Corn Starch", "Flour", "Honey",
    "Jasmine Rice", "Noodles", "Oil", "Olive Oil", "Panko Breadcrumbs",
    "Pasta", "Pineapple Chunks", "Rice", "Tortillas"
  ],
  "Spices & Seasonings": [
    "Adobo", "Bay Leaf", "Chicken Powder", "Chili Flakes", "Cinnamon",
    "Cloves", "Coriander", "Cumin", "Curry Powder", "Fennel Seeds",
    "Garlic Powder", "Italian Seasoning", "Mushroom Powder", "Onion Powder",
    "Oregano", "Paprika", "Pepper", "Peppercorn", "Rosemary", "Salt",
    "Smoked Paprika", "Star Anise", "Sugar", "Thyme", "Turmeric", "White Pepper"
  ],
  "Sauces & Condiments": [
    "Dark Soy Sauce", "Dark Vinegar", "Dijon Mustard", "Fish Sauce",
    "Hoisin Sauce", "Hot Sauce", "Ketchup", "Mustard", "Oyster Sauce",
    "Pickles", "Rice Wine", "Sesame Oil", "Soy Sauce", "Tomato Paste",
    "Vinegar", "Worcestershire Sauce", "Water"
  ]
};

const CUISINES = ["All", "American", "Asian", "Italian", "Mexican", "Indian", "Middle Eastern", "French", "Healthy", "Breakfast", "Dessert", "Greek", "Japanese", "Thai", "Vietnamese"];

const RECIPE_LIBRARY = [
  {
    name: "Marry Me Chicken",
    emoji: "🍗",
    time: "30 min",
    cuisine: "American",
    baseServings: 4,
    ingredients: [
      { name: "Chicken", amount: 1, unit: "lb" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Olive Oil", amount: 1, unit: "tbsp" },
      { name: "Oregano", amount: 1, unit: "tsp" },
      { name: "Paprika", amount: 2, unit: "tsp" },
      { name: "Heavy Cream", amount: 1, unit: "cup" },
      { name: "Chicken Broth", amount: 1, unit: "cup" },
      { name: "Basil", amount: 1, unit: "bunch" }
    ],
    steps: [
      "Season chicken breasts on both sides with salt, paprika, and oregano.",
      "Heat olive oil in a large skillet over medium-high heat. Sear chicken 4–5 min per side until golden. Remove and set aside.",
      "In the same pan, sauté minced garlic for 1 minute until fragrant.",
      "Add chicken broth and heavy cream. Stir to combine and bring to a simmer.",
      "Return chicken to the pan. Cook 10 min until sauce thickens and chicken is cooked through.",
      "Top with fresh basil and serve immediately."
    ]
  },
  {
    name: "Grilled Cheese",
    emoji: "🧀",
    time: "10 min",
    cuisine: "American",
    baseServings: 2,
    ingredients: [
      { name: "Bread", amount: 2, unit: "slices" },
      { name: "Butter", amount: 1, unit: "tbsp" },
      { name: "Cheese", amount: 2, unit: "slices" }
    ],
    steps: [
      "Butter one side of each bread slice.",
      "Place one slice butter-side down in a cold skillet. Add cheese slices.",
      "Top with second slice, butter-side up.",
      "Cook over medium-low heat 3–4 min until golden on bottom.",
      "Flip and cook another 2–3 min until golden and cheese is fully melted.",
      "Slice diagonally and serve hot."
    ]
  },
  {
    name: "Burger",
    emoji: "🍔",
    time: "20 min",
    cuisine: "American",
    baseServings: 2,
    ingredients: [
      { name: "Ground Beef", amount: 1, unit: "lb" },
      { name: "Cheese", amount: 2, unit: "slices" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Bread", amount: 2, unit: "buns" }
    ],
    steps: [
      "Divide ground beef into 2 equal patties. Season with salt and pepper.",
      "Heat a skillet or grill over high heat.",
      "Cook patties 3–4 min per side for medium. Add cheese in the last minute.",
      "Slice onion into rings. Sauté or serve raw per preference.",
      "Toast buns lightly in the same pan.",
      "Assemble: bun bottom, patty with cheese, onions, and top bun."
    ]
  },
  {
    name: "Taco",
    emoji: "🌮",
    time: "25 min",
    cuisine: "Mexican",
    baseServings: 4,
    ingredients: [
      { name: "Ground Beef", amount: 1, unit: "lb" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Paprika", amount: 1, unit: "tsp" },
      { name: "Cumin", amount: 1, unit: "tsp" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Dice onion finely and mince garlic.",
      "Brown ground beef in a skillet over medium-high heat, breaking it up.",
      "Add onion and garlic. Cook 3 min until softened.",
      "Add paprika, cumin, and salt. Stir to coat the beef evenly.",
      "Simmer 5 min on low heat until flavors meld.",
      "Serve in warmed tortillas with desired toppings."
    ]
  },
  {
    name: "Chicken Wings",
    emoji: "🍖",
    time: "45 min",
    cuisine: "American",
    baseServings: 4,
    ingredients: [
      { name: "Chicken Wings", amount: 2, unit: "lb" },
      { name: "Garlic Powder", amount: 1, unit: "tsp" },
      { name: "Paprika", amount: 1, unit: "tsp" },
      { name: "Salt", amount: 1, unit: "tsp" },
      { name: "Pepper", amount: 1, unit: "tsp" },
      { name: "Oil", amount: 1, unit: "tbsp" }
    ],
    steps: [
      "Pat wings dry with paper towels — this is key for crispy skin.",
      "Toss wings with oil, garlic powder, paprika, salt, and pepper.",
      "Arrange on a wire rack over a baking sheet.",
      "Bake at 425°F (220°C) for 40–45 min, flipping halfway through.",
      "Broil for the last 2–3 min for extra crispiness.",
      "Serve immediately with your preferred dipping sauce."
    ]
  },
  {
    name: "Chicken and Broccoli",
    emoji: "🥦",
    time: "25 min",
    cuisine: "Asian",
    baseServings: 4,
    ingredients: [
      { name: "Chicken", amount: 1, unit: "lb" },
      { name: "Broccoli", amount: 1, unit: "head" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Soy Sauce", amount: 2, unit: "tbsp" },
      { name: "Oyster Sauce", amount: 1, unit: "tbsp" },
      { name: "Corn Starch", amount: 1, unit: "tbsp" },
      { name: "Oil", amount: 1, unit: "tbsp" }
    ],
    steps: [
      "Slice chicken into thin strips. Toss with cornstarch and a pinch of salt.",
      "Cut broccoli into small florets. Blanch in boiling water for 2 min, then drain.",
      "Heat oil in a wok or large pan over high heat.",
      "Stir-fry chicken until cooked through, about 5–6 min. Remove and set aside.",
      "Add garlic to the pan and cook 30 seconds. Add broccoli.",
      "Return chicken. Add soy sauce and oyster sauce. Toss everything together and serve."
    ]
  },
  {
    name: "Thai Basil Chicken",
    emoji: "🌿",
    time: "20 min",
    cuisine: "Asian",
    baseServings: 4,
    ingredients: [
      { name: "Ground Chicken", amount: 1, unit: "lb" },
      { name: "Basil", amount: 1, unit: "bunch" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Soy Sauce", amount: 2, unit: "tbsp" },
      { name: "Oyster Sauce", amount: 1, unit: "tbsp" },
      { name: "Sugar", amount: 1, unit: "tsp" },
      { name: "Oil", amount: 1, unit: "tbsp" }
    ],
    steps: [
      "Mince garlic finely. Pick basil leaves off stems.",
      "Heat oil in a wok over high heat until smoking.",
      "Add garlic and stir-fry 20 seconds.",
      "Add ground chicken. Cook, breaking up, until no longer pink.",
      "Add soy sauce, oyster sauce, and sugar. Toss to combine.",
      "Remove from heat. Fold in basil leaves and serve over rice."
    ]
  },
  {
    name: "Pho",
    emoji: "🍜",
    time: "3 hr 20 min",
    cuisine: "Asian",
    baseServings: 6,
    ingredients: [
      { name: "Beef Flank", amount: 3, unit: "lbs" },
      { name: "Onion", amount: 2, unit: "count" },
      { name: "Ginger", amount: 2, unit: "tbsp" },
      { name: "Star Anise", amount: 10, unit: "pods" },
      { name: "Cinnamon", amount: 4, unit: "sticks" },
      { name: "Cloves", amount: 3, unit: "count" },
      { name: "Fish Sauce", amount: 3, unit: "tbsp" },
      { name: "Sugar", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "tbsp" },
      { name: "Noodles", amount: 2, unit: "packs" },
      { name: "Lime", amount: 2, unit: "count" },
      { name: "Basil", amount: 1, unit: "bunch" }
    ],
    steps: [
      "CHAR THE AROMATICS: Heat a dry skillet over high heat until smoking. Place halved onions and sliced ginger cut-side down. Cook until deeply charred, 3–4 min per side. Set aside — this smoky char is what makes pho taste authentic.",
      "TOAST THE SPICES: In the same dry skillet over medium heat, toast star anise, cinnamon sticks, and cloves for 3 min, stirring, until fragrant. Do not burn. Set aside.",
      "PARBOIL THE BEEF: Rinse beef flank, place in a large pot and cover with cold water. Bring to a hard boil for 5 min — you'll see grey scum rise. Drain, then rinse each piece of beef under cold running water. Rinse the pot clean too.",
      "BUILD THE BROTH: Return cleaned beef to the pot. Add 15 cups (3.5 litres) fresh water, charred onion, ginger, toasted spices, sugar, and salt. Bring to a boil, then reduce to a gentle simmer. Cover and cook for 3 hours.",
      "REMOVE BEEF & FINISH BROTH: After 3 hours, remove the beef — it should be fall-apart tender. Set aside to cool, then slice thinly for topping. Continue simmering the broth uncovered for 40 more min to concentrate flavour.",
      "STRAIN & SEASON: Strain broth through a fine mesh sieve into a clean pot — discard bones and spices. You should have about 10 cups of clear, deep amber broth. Stir in fish sauce. Taste and adjust salt, sugar, and fish sauce until the broth is beefy, fragrant, and barely sweet.",
      "ASSEMBLE: Cook rice noodles per package directions just before serving. Divide noodles into deep bowls, top with sliced beef. Ladle over piping hot broth — the heat will cook any raw beef to perfect medium-rare. Serve immediately with lime wedges, Thai basil, and chilli on the side."
    ]
  },
  {
    name: "Rib Eye Steak",
    emoji: "🥩",
    time: "20 min",
    cuisine: "American",
    baseServings: 2,
    ingredients: [
      { name: "Rib Eye Steak", amount: 2, unit: "steaks" },
      { name: "Butter", amount: 2, unit: "tbsp" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Rosemary", amount: 2, unit: "sprigs" },
      { name: "Salt", amount: 1, unit: "tsp" },
      { name: "Pepper", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Remove steaks from fridge 30 min before cooking. Pat dry and season generously with salt and pepper.",
      "Heat a cast iron skillet over high heat until very hot and beginning to smoke.",
      "Place steaks in pan. Search 3–4 min without moving for a deep crust.",
      "Flip steaks. Add butter, garlic, and rosemary to the pan.",
      "Tilt the pan and baste steaks continuously with melted butter for 2–3 min.",
      "Rest steaks 5 min before slicing to lock in juices."
    ]
  },
  {
    name: "Birria",
    emoji: "🌯",
    time: "2 hr",
    cuisine: "Mexican",
    baseServings: 6,
    ingredients: [
      { name: "Beef Flank", amount: 2, unit: "lb" },
      { name: "Garlic", amount: 4, unit: "cloves" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Bay Leaf", amount: 2, unit: "leaves" },
      { name: "Cumin", amount: 1, unit: "tsp" },
      { name: "Oregano", amount: 1, unit: "tsp" },
      { name: "Cinnamon", amount: 1, unit: "stick" },
      { name: "Cloves", amount: 3, unit: "count" },
      { name: "Beef Broth", amount: 3, unit: "cups" }
    ],
    steps: [
      "Toast dry spices (cumin, oregano) in a dry pan until fragrant. Combine with cinnamon and cloves.",
      "Season beef generously with salt. Brown all sides in a hot pot.",
      "Add broth, garlic, onion, bay leaves, and toasted spices.",
      "Bring to a boil, then reduce heat. Cover and simmer 90 min until beef is fall-apart tender.",
      "Remove beef and shred with two forks. Reserve the braising liquid (consomé).",
      "Serve shredded beef in tacos or dip tortillas in consomé and fry until crispy."
    ]
  },
  {
    name: "Creamy Chicken Pasta",
    emoji: "🍝",
    time: "30 min",
    cuisine: "Italian",
    baseServings: 4,
    ingredients: [
      { name: "Chicken", amount: 1, unit: "lb" },
      { name: "Heavy Cream", amount: 1, unit: "cup" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Noodles", amount: 1, unit: "pack" },
      { name: "Cheese", amount: 1, unit: "cup" },
      { name: "Olive Oil", amount: 1, unit: "tbsp" },
      { name: "Pepper", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Cook pasta per package instructions. Reserve 1 cup pasta water before draining.",
      "Slice chicken into strips. Season with salt and pepper.",
      "Heat olive oil over medium-high. Cook chicken until golden, about 6–8 min. Remove.",
      "In the same pan, sauté minced garlic 1 min. Pour in heavy cream.",
      "Add cheese and stir until melted and sauce is smooth. Season with pepper.",
      "Toss pasta and chicken in the sauce. Add pasta water as needed for consistency."
    ]
  },
  {
    name: "Chicken Fried Rice",
    emoji: "🍳",
    time: "25 min",
    cuisine: "Asian",
    baseServings: 4,
    ingredients: [
      { name: "Chicken", amount: 1, unit: "lb" },
      { name: "Rice", amount: 2, unit: "cups" },
      { name: "Egg", amount: 2, unit: "count" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Soy Sauce", amount: 2, unit: "tbsp" },
      { name: "Oil", amount: 1, unit: "tbsp" },
      { name: "Onion", amount: 1, unit: "count" }
    ],
    steps: [
      "Use day-old cold rice if possible — it fries much better.",
      "Dice chicken. Season with a pinch of salt and pepper.",
      "Heat oil in a wok over high heat. Cook chicken until golden. Push to the side.",
      "Add onion and garlic. Stir-fry 2 min.",
      "Push everything aside. Scramble eggs in the center until just set.",
      "Add rice, soy sauce. Toss everything together over high heat for 3–4 min."
    ]
  },
  {
    name: "Beef and Broccoli",
    emoji: "🥩",
    time: "25 min",
    cuisine: "Asian",
    baseServings: 4,
    ingredients: [
      { name: "Beef Flank", amount: 1, unit: "lb" },
      { name: "Broccoli", amount: 1, unit: "head" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Soy Sauce", amount: 2, unit: "tbsp" },
      { name: "Oyster Sauce", amount: 1, unit: "tbsp" },
      { name: "Corn Starch", amount: 1, unit: "tbsp" },
      { name: "Oil", amount: 1, unit: "tbsp" }
    ],
    steps: [
      "Slice beef thinly against the grain. Marinate with soy sauce and cornstarch for 15 min.",
      "Cut broccoli into florets. Blanch 2 min in boiling water, then drain.",
      "Heat oil in wok over high heat. Stir-fry beef in batches until browned. Set aside.",
      "Add garlic to wok. Stir-fry 30 seconds.",
      "Add broccoli and return beef. Pour in oyster sauce and toss to coat.",
      "Serve immediately over rice."
    ]
  },
  {
    name: "Creamy Garlic Chicken",
    emoji: "🧄",
    time: "30 min",
    cuisine: "American",
    baseServings: 4,
    ingredients: [
      { name: "Chicken", amount: 1, unit: "lb" },
      { name: "Garlic", amount: 4, unit: "cloves" },
      { name: "Heavy Cream", amount: 1, unit: "cup" },
      { name: "Butter", amount: 2, unit: "tbsp" },
      { name: "Pepper", amount: 1, unit: "tsp" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Season chicken with salt and pepper on both sides.",
      "Melt butter in a large skillet over medium-high heat. Sear chicken 5 min per side.",
      "Remove chicken. Add sliced garlic to the pan, cook 2 min until golden.",
      "Pour in heavy cream. Stir and bring to a simmer.",
      "Return chicken to pan. Cook 10 min until sauce thickens.",
      "Spoon sauce over chicken before serving."
    ]
  },
  {
    name: "Garlic Butter Noodles",
    emoji: "🍜",
    time: "15 min",
    cuisine: "Asian",
    baseServings: 2,
    ingredients: [
      { name: "Noodles", amount: 1, unit: "pack" },
      { name: "Butter", amount: 2, unit: "tbsp" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Salt", amount: 1, unit: "tsp" },
      { name: "Pepper", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Cook noodles per package directions. Reserve ¼ cup pasta water. Drain.",
      "Melt butter in the same pot over medium heat.",
      "Add minced garlic. Cook 1–2 min until fragrant but not browned.",
      "Add drained noodles. Toss to coat in garlic butter.",
      "Add a splash of pasta water if too thick. Season with salt and pepper.",
      "Serve immediately, topped with grated cheese if desired."
    ]
  },
  {
    name: "Tilapia with Garlic Butter",
    emoji: "🐟",
    time: "15 min",
    cuisine: "American",
    baseServings: 2,
    ingredients: [
      { name: "Tilapia", amount: 2, unit: "fillets" },
      { name: "Butter", amount: 2, unit: "tbsp" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Salt", amount: 1, unit: "tsp" },
      { name: "Pepper", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Pat fish fillets dry with paper towels. Season with salt and pepper.",
      "Melt butter in a non-stick skillet over medium-high heat.",
      "Place fillets in pan. Cook 3–4 min until golden on bottom.",
      "Carefully flip fillets. Add minced garlic to the pan.",
      "Spoon butter and garlic over the fish as it cooks another 2–3 min.",
      "Serve immediately with a squeeze of lemon if available."
    ]
  },
  {
    name: "Spaghetti Carbonara",
    emoji: "🍝",
    time: "25 min",
    cuisine: "Italian",
    baseServings: 4,
    ingredients: [
      { name: "Pasta", amount: 400, unit: "g" },
      { name: "Bacon", amount: 200, unit: "g" },
      { name: "Egg", amount: 4, unit: "count" },
      { name: "Parmesan", amount: 1, unit: "cup" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Bring a large pot of salted water to a boil. Cook pasta until al dente. Reserve 1 cup pasta water before draining.",
      "While pasta cooks, cut bacon into small pieces. Fry in a large pan over medium heat until crispy. Add minced garlic in the last minute.",
      "In a bowl, whisk together eggs, grated parmesan, and a generous amount of black pepper.",
      "Remove the pan from heat. Add drained pasta and toss with the bacon and its fat.",
      "Pour in the egg mixture, tossing quickly. Add pasta water a little at a time to create a silky, creamy sauce.",
      "Serve immediately topped with extra parmesan and black pepper."
    ]
  },
  {
    name: "Butter Chicken",
    emoji: "🍛",
    time: "45 min",
    cuisine: "Indian",
    baseServings: 4,
    ingredients: [
      { name: "Chicken Thighs", amount: 1.5, unit: "lb" },
      { name: "Butter", amount: 3, unit: "tbsp" },
      { name: "Garlic", amount: 4, unit: "cloves" },
      { name: "Ginger", amount: 1, unit: "tsp" },
      { name: "Canned Tomatoes", amount: 1, unit: "cup" },
      { name: "Heavy Cream", amount: 0.5, unit: "cup" },
      { name: "Curry Powder", amount: 2, unit: "tsp" },
      { name: "Cumin", amount: 1, unit: "tsp" },
      { name: "Paprika", amount: 1, unit: "tsp" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Cut chicken thighs into bite-sized pieces. Season with half the curry powder, cumin, paprika, and salt.",
      "Melt 2 tbsp butter in a large pan over high heat. Sear chicken until browned on all sides. Remove and set aside.",
      "In the same pan, melt remaining butter. Sauté minced garlic and ginger for 1–2 min.",
      "Add canned tomatoes and remaining spices. Simmer 10 min, stirring occasionally, until sauce thickens.",
      "Blend the sauce until smooth using an immersion blender or regular blender.",
      "Return sauce to pan. Add chicken and heavy cream. Simmer 10 min. Serve over rice with fresh cilantro."
    ]
  },
  {
    name: "Shakshuka",
    emoji: "🍳",
    time: "30 min",
    cuisine: "Middle Eastern",
    baseServings: 4,
    ingredients: [
      { name: "Egg", amount: 6, unit: "count" },
      { name: "Canned Tomatoes", amount: 2, unit: "cups" },
      { name: "Bell Pepper", amount: 1, unit: "count" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Cumin", amount: 1, unit: "tsp" },
      { name: "Paprika", amount: 1, unit: "tsp" },
      { name: "Chili Flakes", amount: 0.5, unit: "tsp" },
      { name: "Olive Oil", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Heat olive oil in a large, deep skillet over medium heat.",
      "Dice onion and bell pepper. Sauté 5 min until softened. Add minced garlic and cook 1 more min.",
      "Add cumin, paprika, and chili flakes. Stir and cook 30 seconds until fragrant.",
      "Pour in canned tomatoes. Season with salt. Simmer 10 min, stirring occasionally, until sauce thickens.",
      "Use a spoon to make 6 wells in the sauce. Crack one egg into each well.",
      "Cover and cook 5–8 min until egg whites are set but yolks are still runny. Serve with crusty bread."
    ]
  },
  {
    name: "Honey Garlic Salmon",
    emoji: "🐟",
    time: "20 min",
    cuisine: "American",
    baseServings: 2,
    ingredients: [
      { name: "Salmon", amount: 2, unit: "fillets" },
      { name: "Honey", amount: 3, unit: "tbsp" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Soy Sauce", amount: 2, unit: "tbsp" },
      { name: "Butter", amount: 1, unit: "tbsp" },
      { name: "Lemon", amount: 1, unit: "count" },
      { name: "Salt", amount: 1, unit: "tsp" },
      { name: "Pepper", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Pat salmon fillets dry. Season with salt and pepper on both sides.",
      "Mix honey, soy sauce, and minced garlic together in a small bowl.",
      "Melt butter in an oven-safe skillet over medium-high heat.",
      "Place salmon skin-side up. Sear 3–4 min until golden. Flip.",
      "Pour the honey garlic sauce over the salmon. Spoon sauce over fish as it cooks another 3 min.",
      "Squeeze lemon juice over the top and serve immediately."
    ]
  },
  {
    name: "Chicken Tikka Masala",
    emoji: "🍲",
    time: "50 min",
    cuisine: "Indian",
    baseServings: 4,
    ingredients: [
      { name: "Chicken", amount: 1.5, unit: "lb" },
      { name: "Greek Yogurt", amount: 0.5, unit: "cup" },
      { name: "Canned Tomatoes", amount: 1.5, unit: "cups" },
      { name: "Heavy Cream", amount: 0.5, unit: "cup" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 4, unit: "cloves" },
      { name: "Ginger", amount: 1, unit: "tsp" },
      { name: "Curry Powder", amount: 2, unit: "tsp" },
      { name: "Cumin", amount: 1, unit: "tsp" },
      { name: "Paprika", amount: 1, unit: "tsp" },
      { name: "Turmeric", amount: 0.5, unit: "tsp" },
      { name: "Oil", amount: 2, unit: "tbsp" }
    ],
    steps: [
      "Cube chicken. Marinate in yogurt, half the spices, and a pinch of salt for at least 20 min.",
      "Cook marinated chicken in a hot oiled pan until charred on the outside. Set aside.",
      "In the same pan, sauté diced onion 5 min. Add garlic and ginger, cook 2 min.",
      "Add remaining spices. Stir 1 min until fragrant.",
      "Add canned tomatoes. Simmer 15 min until sauce thickens and deepens in color.",
      "Stir in heavy cream and return chicken to pan. Simmer 10 min. Serve with rice or naan."
    ]
  },
  {
    name: "Garlic Shrimp Pasta",
    emoji: "🍤",
    time: "20 min",
    cuisine: "Italian",
    baseServings: 4,
    ingredients: [
      { name: "Shrimp", amount: 1, unit: "lb" },
      { name: "Pasta", amount: 400, unit: "g" },
      { name: "Garlic", amount: 5, unit: "cloves" },
      { name: "Butter", amount: 3, unit: "tbsp" },
      { name: "Olive Oil", amount: 2, unit: "tbsp" },
      { name: "Lemon", amount: 1, unit: "count" },
      { name: "Chili Flakes", amount: 0.5, unit: "tsp" },
      { name: "Parmesan", amount: 0.5, unit: "cup" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Cook pasta in salted boiling water until al dente. Reserve 1 cup pasta water, then drain.",
      "Pat shrimp dry and season with salt and chili flakes.",
      "Heat olive oil in a large pan over high heat. Cook shrimp 1–2 min per side until pink. Remove.",
      "In the same pan, melt butter over medium heat. Add thinly sliced garlic and cook until golden, about 2 min.",
      "Add pasta and a splash of pasta water. Toss to coat.",
      "Return shrimp. Add lemon juice and parmesan. Toss everything together and serve immediately."
    ]
  },
  {
    name: "Classic Bolognese",
    emoji: "🍝",
    time: "1 hr",
    cuisine: "Italian",
    baseServings: 6,
    ingredients: [
      { name: "Ground Beef", amount: 1, unit: "lb" },
      { name: "Ground Pork", amount: 0.5, unit: "lb" },
      { name: "Pasta", amount: 500, unit: "g" },
      { name: "Canned Tomatoes", amount: 2, unit: "cups" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Tomato Paste", amount: 2, unit: "tbsp" },
      { name: "Milk", amount: 0.5, unit: "cup" },
      { name: "Olive Oil", amount: 2, unit: "tbsp" },
      { name: "Italian Seasoning", amount: 1, unit: "tsp" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Heat olive oil in a heavy-bottomed pot. Sauté diced onion and garlic until softened, about 5 min.",
      "Add ground beef and pork. Cook, breaking up, until no longer pink. Drain excess fat.",
      "Stir in tomato paste and cook 2 min.",
      "Add canned tomatoes and Italian seasoning. Stir to combine.",
      "Pour in milk — this is the secret to a silky, rich sauce. Simmer uncovered on low heat for 45 min, stirring occasionally.",
      "Cook pasta. Toss with sauce and serve topped with parmesan."
    ]
  },
  {
    name: "Crispy Baked Chicken Thighs",
    emoji: "🍗",
    time: "45 min",
    cuisine: "American",
    baseServings: 4,
    ingredients: [
      { name: "Chicken Thighs", amount: 4, unit: "count" },
      { name: "Smoked Paprika", amount: 2, unit: "tsp" },
      { name: "Garlic Powder", amount: 1, unit: "tsp" },
      { name: "Onion Powder", amount: 1, unit: "tsp" },
      { name: "Olive Oil", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "tsp" },
      { name: "Pepper", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Preheat oven to 425°F (220°C). Pat chicken thighs completely dry — this is key for crispy skin.",
      "Mix smoked paprika, garlic powder, onion powder, salt, and pepper together.",
      "Rub chicken thighs all over with olive oil, then coat thoroughly with the spice mix.",
      "Place skin-side up on a wire rack set over a baking sheet.",
      "Bake 35–40 min until skin is deeply golden and crispy and internal temp reaches 165°F.",
      "Rest 5 min before serving. The skin should shatter when you bite it."
    ]
  },
  {
    name: "Egg Fried Rice",
    emoji: "🍳",
    time: "15 min",
    cuisine: "Asian",
    baseServings: 2,
    ingredients: [
      { name: "Rice", amount: 2, unit: "cups" },
      { name: "Egg", amount: 3, unit: "count" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Soy Sauce", amount: 2, unit: "tbsp" },
      { name: "Sesame Oil", amount: 1, unit: "tsp" },
      { name: "Oil", amount: 2, unit: "tbsp" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Salt", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Use cold day-old rice for best results — fresh rice is too moist and clumps.",
      "Heat oil in a wok or large skillet over high heat until smoking.",
      "Add diced onion and minced garlic. Stir-fry 2 min.",
      "Push to the side. Crack eggs in the center and scramble until just set, then mix into the onion.",
      "Add rice. Press it against the wok and let it sit 30 seconds to get a slight char, then toss. Repeat.",
      "Add soy sauce and sesame oil. Toss to coat evenly. Taste and adjust salt. Serve immediately."
    ]
  },
  {
    name: "Lemon Herb Roast Chicken",
    emoji: "🍋",
    time: "1.5 hr",
    cuisine: "American",
    baseServings: 4,
    ingredients: [
      { name: "Chicken", amount: 1, unit: "whole" },
      { name: "Lemon", amount: 2, unit: "count" },
      { name: "Garlic", amount: 6, unit: "cloves" },
      { name: "Butter", amount: 4, unit: "tbsp" },
      { name: "Rosemary", amount: 3, unit: "sprigs" },
      { name: "Thyme", amount: 3, unit: "sprigs" },
      { name: "Olive Oil", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 2, unit: "tsp" },
      { name: "Pepper", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Preheat oven to 425°F (220°C). Pat the whole chicken completely dry inside and out.",
      "Mix softened butter with minced garlic, chopped rosemary, thyme, salt, and pepper.",
      "Gently loosen the skin over the breast. Push herb butter underneath the skin directly onto the meat.",
      "Rub remaining butter all over the outside. Stuff the cavity with halved lemons and remaining herbs.",
      "Tie the legs together with kitchen twine. Place in a roasting pan and drizzle with olive oil.",
      "Roast 60–75 min until skin is golden and juices run clear. Rest 15 min before carving."
    ]
  },
  {
    name: "French Onion Soup",
    emoji: "🧅",
    time: "1 hr",
    cuisine: "French",
    baseServings: 4,
    ingredients: [
      { name: "Onion", amount: 4, unit: "count" },
      { name: "Beef Broth", amount: 4, unit: "cups" },
      { name: "Butter", amount: 3, unit: "tbsp" },
      { name: "Olive Oil", amount: 1, unit: "tbsp" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Thyme", amount: 2, unit: "sprigs" },
      { name: "Bay Leaf", amount: 1, unit: "count" },
      { name: "Sugar", amount: 1, unit: "tsp" },
      { name: "Bread", amount: 4, unit: "slices" },
      { name: "Mozzarella", amount: 1, unit: "cup" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Thinly slice all onions. Heat butter and olive oil in a heavy pot over medium-low heat.",
      "Add onions and a pinch of salt. Cook stirring occasionally for 40–45 min until deeply golden and caramelized. Add sugar halfway through to help browning.",
      "Add minced garlic, thyme, and bay leaf. Cook 2 min.",
      "Pour in beef broth. Simmer 15 min. Remove bay leaf and thyme. Season to taste.",
      "Ladle soup into oven-safe bowls. Top each with a slice of bread and a generous handful of mozzarella.",
      "Broil 3–5 min until cheese is bubbly and golden. Serve immediately — the bowls will be very hot."
    ]
  },
  {
    name: "Pulled Pork Tacos",
    emoji: "🌮",
    time: "2.5 hr",
    cuisine: "Mexican",
    baseServings: 6,
    ingredients: [
      { name: "Ground Pork", amount: 2, unit: "lb" },
      { name: "Tortillas", amount: 12, unit: "count" },
      { name: "Garlic", amount: 4, unit: "cloves" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Smoked Paprika", amount: 2, unit: "tsp" },
      { name: "Cumin", amount: 2, unit: "tsp" },
      { name: "Oregano", amount: 1, unit: "tsp" },
      { name: "Tomato Paste", amount: 2, unit: "tbsp" },
      { name: "Chicken Broth", amount: 1, unit: "cup" },
      { name: "Lime", amount: 2, unit: "count" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Season pork generously with smoked paprika, cumin, oregano, and salt.",
      "Brown pork on all sides in a hot oiled pot. Remove and set aside.",
      "Sauté diced onion and garlic in the same pot 3 min. Stir in tomato paste.",
      "Return pork. Add chicken broth. Cover and cook on low heat 2 hours until fall-apart tender.",
      "Shred pork with two forks directly in the pot. Toss in the cooking juices.",
      "Warm tortillas. Fill with pulled pork and squeeze fresh lime juice over the top."
    ]
  },
  {
    name: "Mushroom Risotto",
    emoji: "🍄",
    time: "40 min",
    cuisine: "Italian",
    baseServings: 4,
    ingredients: [
      { name: "Jasmine Rice", amount: 2, unit: "cups" },
      { name: "Mushrooms", amount: 2, unit: "cups" },
      { name: "Chicken Broth", amount: 4, unit: "cups" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Butter", amount: 3, unit: "tbsp" },
      { name: "Parmesan", amount: 1, unit: "cup" },
      { name: "Olive Oil", amount: 2, unit: "tbsp" },
      { name: "Thyme", amount: 2, unit: "sprigs" },
      { name: "Salt", amount: 1, unit: "tsp" },
      { name: "Pepper", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Warm broth in a separate pot over low heat — it must be hot when added to the rice.",
      "Sauté sliced mushrooms in olive oil over high heat until golden. Season and set aside.",
      "In the same pan, melt 2 tbsp butter over medium heat. Sauté onion and garlic 3 min.",
      "Add rice and stir 2 min until translucent at the edges.",
      "Add warm broth one ladle at a time, stirring constantly and waiting until each ladle is absorbed before adding the next. This takes about 20 min.",
      "Stir in mushrooms, remaining butter, and parmesan. Season and serve immediately."
    ]
  },
  {
    name: "Lamb Chops with Garlic",
    emoji: "🥩",
    time: "25 min",
    cuisine: "Middle Eastern",
    baseServings: 2,
    ingredients: [
      { name: "Lamb Chops", amount: 4, unit: "count" },
      { name: "Garlic", amount: 4, unit: "cloves" },
      { name: "Rosemary", amount: 2, unit: "sprigs" },
      { name: "Butter", amount: 2, unit: "tbsp" },
      { name: "Olive Oil", amount: 1, unit: "tbsp" },
      { name: "Lemon", amount: 1, unit: "count" },
      { name: "Salt", amount: 1, unit: "tsp" },
      { name: "Pepper", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Pat lamb chops dry. Season generously with salt and pepper on both sides.",
      "Heat olive oil in a cast iron skillet over high heat until smoking.",
      "Sear chops 3 min per side for medium-rare. Do not move them while searing.",
      "Reduce heat to medium. Add butter, smashed garlic cloves, and rosemary.",
      "Baste chops with the herb butter for 1–2 min, spooning it continuously over the meat.",
      "Rest 5 min. Squeeze lemon juice over the top before serving."
    ]
  },
  {
    name: "Potato Soup",
    emoji: "🥣",
    time: "40 min",
    cuisine: "American",
    baseServings: 4,
    ingredients: [
      { name: "Potato", amount: 4, unit: "count" },
      { name: "Bacon", amount: 4, unit: "strips" },
      { name: "Chicken Broth", amount: 3, unit: "cups" },
      { name: "Heavy Cream", amount: 0.5, unit: "cup" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Butter", amount: 2, unit: "tbsp" },
      { name: "Cheese", amount: 1, unit: "cup" },
      { name: "Sour Cream", amount: 0.25, unit: "cup" },
      { name: "Salt", amount: 1, unit: "tsp" },
      { name: "Pepper", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Cook bacon in a large pot until crispy. Remove and crumble. Reserve 1 tbsp bacon fat.",
      "Sauté diced onion and garlic in the bacon fat and butter until softened.",
      "Add peeled, cubed potatoes and chicken broth. Bring to a boil, then simmer 15 min until potatoes are tender.",
      "Mash some of the potatoes directly in the pot for a thick, chunky texture.",
      "Stir in heavy cream and most of the cheese until melted. Season with salt and pepper.",
      "Serve topped with crumbled bacon, remaining cheese, and a dollop of sour cream."
    ]
  },
  {
    name: "Sweet and Sour Chicken",
    emoji: "🍡",
    time: "35 min",
    cuisine: "Asian",
    baseServings: 4,
    ingredients: [
      { name: "Chicken", amount: 1, unit: "lb" },
      { name: "Bell Pepper", amount: 2, unit: "count" },
      { name: "Pineapple Chunks", amount: 1, unit: "cup" },
      { name: "Ketchup", amount: 3, unit: "tbsp" },
      { name: "Vinegar", amount: 2, unit: "tbsp" },
      { name: "Sugar", amount: 3, unit: "tbsp" },
      { name: "Soy Sauce", amount: 1, unit: "tbsp" },
      { name: "Corn Starch", amount: 2, unit: "tbsp" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Oil", amount: 2, unit: "tbsp" }
    ],
    steps: [
      "Cut chicken into bite-sized pieces. Toss with 1 tbsp cornstarch and a pinch of salt.",
      "Mix ketchup, vinegar, sugar, soy sauce, and remaining cornstarch with 2 tbsp water in a bowl.",
      "Heat oil in a wok over high heat. Fry chicken until golden and cooked through. Remove.",
      "In the same wok, stir-fry minced garlic and diced bell peppers for 2 min.",
      "Add pineapple chunks and the sauce. Stir and bring to a boil until sauce thickens.",
      "Return chicken and toss everything to coat. Serve over rice."
    ]
  },
  {
    name: "Creamy Tuscan Salmon",
    emoji: "🐟",
    time: "25 min",
    cuisine: "Italian",
    baseServings: 2,
    ingredients: [
      { name: "Salmon", amount: 2, unit: "fillets" },
      { name: "Heavy Cream", amount: 0.5, unit: "cup" },
      { name: "Spinach", amount: 2, unit: "cups" },
      { name: "Tomato", amount: 2, unit: "count" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Parmesan", amount: 0.25, unit: "cup" },
      { name: "Olive Oil", amount: 2, unit: "tbsp" },
      { name: "Italian Seasoning", amount: 1, unit: "tsp" },
      { name: "Salt", amount: 1, unit: "tsp" },
      { name: "Pepper", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Season salmon fillets with salt, pepper, and Italian seasoning.",
      "Heat olive oil in a skillet over medium-high. Sear salmon 4 min per side until golden. Remove.",
      "In the same pan, sauté minced garlic 1 min. Add diced tomatoes and cook 2 min.",
      "Add spinach and stir until wilted, about 1 min.",
      "Pour in heavy cream and parmesan. Stir until sauce is smooth and simmering.",
      "Return salmon to the pan. Spoon sauce over it and cook 2 min. Serve immediately."
    ]
  },
  {
    name: "Chicken Quesadillas",
    emoji: "🫓",
    time: "20 min",
    cuisine: "Mexican",
    baseServings: 2,
    ingredients: [
      { name: "Chicken", amount: 0.5, unit: "lb" },
      { name: "Tortillas", amount: 4, unit: "count" },
      { name: "Mozzarella", amount: 1, unit: "cup" },
      { name: "Bell Pepper", amount: 1, unit: "count" },
      { name: "Onion", amount: 0.5, unit: "count" },
      { name: "Garlic Powder", amount: 1, unit: "tsp" },
      { name: "Cumin", amount: 0.5, unit: "tsp" },
      { name: "Smoked Paprika", amount: 0.5, unit: "tsp" },
      { name: "Oil", amount: 1, unit: "tbsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Season chicken with garlic powder, cumin, smoked paprika, and salt.",
      "Cook chicken in a hot oiled pan until cooked through. Slice or shred into strips.",
      "In the same pan, sauté sliced bell pepper and onion until softened, about 3 min.",
      "Place a tortilla in the pan over medium heat. Add cheese, chicken, and vegetables on one half.",
      "Fold the tortilla over. Cook 2–3 min per side until golden and cheese is melted.",
      "Slice into wedges and serve with sour cream, salsa, or guacamole."
    ]
  },
  {
    name: "Teriyaki Chicken",
    emoji: "🍱",
    time: "25 min",
    cuisine: "Asian",
    baseServings: 4,
    ingredients: [
      { name: "Chicken Thighs", amount: 1.5, unit: "lb" },
      { name: "Soy Sauce", amount: 4, unit: "tbsp" },
      { name: "Honey", amount: 3, unit: "tbsp" },
      { name: "Sugar", amount: 1, unit: "tbsp" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Ginger", amount: 1, unit: "tsp" },
      { name: "Corn Starch", amount: 1, unit: "tsp" },
      { name: "Sesame Oil", amount: 1, unit: "tsp" },
      { name: "Oil", amount: 1, unit: "tbsp" }
    ],
    steps: [
      "Mix soy sauce, honey, sugar, minced garlic, ginger, and cornstarch in a bowl. Set aside.",
      "Heat oil in a skillet over medium-high heat.",
      "Cook chicken thighs skin-side down 5–6 min until golden. Flip and cook another 4 min.",
      "Pour the teriyaki sauce over the chicken. It will bubble and thicken quickly.",
      "Spoon sauce over the chicken continuously as it glazes, about 3–4 min.",
      "Drizzle with sesame oil. Serve over rice, sliced, with the remaining sauce spooned over the top."
    ]
  },
  {
    name: "Vegetable Curry",
    emoji: "🥘",
    time: "35 min",
    cuisine: "Indian",
    baseServings: 4,
    ingredients: [
      { name: "Potato", amount: 2, unit: "count" },
      { name: "Broccoli", amount: 1, unit: "head" },
      { name: "Bell Pepper", amount: 1, unit: "count" },
      { name: "Coconut Milk", amount: 1, unit: "can" },
      { name: "Canned Tomatoes", amount: 1, unit: "cup" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Ginger", amount: 1, unit: "tsp" },
      { name: "Curry Powder", amount: 2, unit: "tsp" },
      { name: "Turmeric", amount: 0.5, unit: "tsp" },
      { name: "Oil", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Dice potato, broccoli, and bell pepper into even pieces.",
      "Heat oil in a large pot over medium heat. Sauté onion 4 min. Add garlic and ginger, cook 1 min.",
      "Add curry powder and turmeric. Stir 30 seconds until fragrant.",
      "Add canned tomatoes and potatoes. Cook 5 min.",
      "Pour in coconut milk. Bring to a simmer and cook 15 min until potatoes are tender.",
      "Add broccoli and bell pepper. Cook 5 more min until just tender. Season and serve over rice."
    ]
  },
  {
    name: "Beef Bulgogi",
    emoji: "🥩",
    time: "30 min",
    cuisine: "Asian",
    baseServings: 4,
    ingredients: [
      { name: "Beef Flank", amount: 1.5, unit: "lb" },
      { name: "Soy Sauce", amount: 4, unit: "tbsp" },
      { name: "Sugar", amount: 2, unit: "tbsp" },
      { name: "Sesame Oil", amount: 2, unit: "tsp" },
      { name: "Garlic", amount: 4, unit: "cloves" },
      { name: "Ginger", amount: 1, unit: "tsp" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Oil", amount: 1, unit: "tbsp" }
    ],
    steps: [
      "Freeze beef for 30 min then slice paper-thin against the grain — this makes it melt-in-your-mouth tender.",
      "Mix soy sauce, sugar, sesame oil, minced garlic, and ginger into a marinade.",
      "Toss beef and thinly sliced onion in the marinade. Let sit at least 20 min.",
      "Heat a wok or cast iron pan over very high heat until smoking.",
      "Cook beef in a single layer in batches — don't overcrowd or it will steam instead of sear. 1–2 min per batch.",
      "Serve over steamed rice with sesame seeds and sliced green onions."
    ]
  },
  {
    name: "Ramen",
    emoji: "🍜",
    time: "35 min",
    cuisine: "Asian",
    baseServings: 2,
    ingredients: [
      { name: "Noodles", amount: 2, unit: "packs" },
      { name: "Chicken Broth", amount: 3, unit: "cups" },
      { name: "Egg", amount: 2, unit: "count" },
      { name: "Soy Sauce", amount: 2, unit: "tbsp" },
      { name: "Sesame Oil", amount: 1, unit: "tsp" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Ginger", amount: 1, unit: "tsp" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Chicken", amount: 0.5, unit: "lb" }
    ],
    steps: [
      "Soft-boil eggs: simmer 7 min, then transfer to ice water. Peel and halve.",
      "Simmer chicken in broth with garlic, ginger, and onion for 20 min. Remove chicken and shred.",
      "Strain broth. Return to pot and season with soy sauce and sesame oil.",
      "Cook noodles per package directions. Drain.",
      "Divide noodles into bowls. Ladle hot broth over the top.",
      "Top with shredded chicken, halved soft-boiled eggs, and any desired toppings."
    ]
  },
  {
    name: "Chicken Shawarma",
    emoji: "🌯",
    time: "35 min",
    cuisine: "Middle Eastern",
    baseServings: 4,
    ingredients: [
      { name: "Chicken Thighs", amount: 1.5, unit: "lb" },
      { name: "Cumin", amount: 1, unit: "tsp" },
      { name: "Coriander", amount: 1, unit: "tsp" },
      { name: "Turmeric", amount: 0.5, unit: "tsp" },
      { name: "Paprika", amount: 1, unit: "tsp" },
      { name: "Garlic", amount: 4, unit: "cloves" },
      { name: "Lemon", amount: 1, unit: "count" },
      { name: "Olive Oil", amount: 3, unit: "tbsp" },
      { name: "Tortillas", amount: 4, unit: "count" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Mix cumin, coriander, turmeric, paprika, minced garlic, lemon juice, olive oil, and salt into a marinade.",
      "Coat chicken thighs thoroughly. Marinate at least 20 min — overnight is best.",
      "Cook chicken in a hot pan over medium-high heat 5–6 min per side until charred and cooked through.",
      "Rest 5 min then slice thinly across the grain.",
      "Warm tortillas in the same pan.",
      "Fill wraps with chicken, add garlic sauce or yogurt, and roll tightly."
    ]
  },
  {
    name: "Pasta Arrabbiata",
    emoji: "🍝",
    time: "25 min",
    cuisine: "Italian",
    baseServings: 4,
    ingredients: [
      { name: "Pasta", amount: 400, unit: "g" },
      { name: "Canned Tomatoes", amount: 2, unit: "cups" },
      { name: "Garlic", amount: 4, unit: "cloves" },
      { name: "Chili Flakes", amount: 1, unit: "tsp" },
      { name: "Olive Oil", amount: 3, unit: "tbsp" },
      { name: "Tomato Paste", amount: 1, unit: "tbsp" },
      { name: "Parmesan", amount: 0.5, unit: "cup" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Cook pasta in well-salted boiling water until al dente. Reserve 1 cup pasta water.",
      "Heat olive oil in a large pan over medium heat. Add thinly sliced garlic and chili flakes.",
      "Cook gently 2–3 min until garlic is golden — do not let it burn.",
      "Add tomato paste and stir 1 min. Pour in canned tomatoes and crush with a spoon.",
      "Simmer sauce 15 min until thick and deep red. Season generously with salt.",
      "Toss drained pasta in the sauce with a splash of pasta water. Top with parmesan."
    ]
  },
  {
    name: "Lemon Chicken Orzo",
    emoji: "🍋",
    time: "30 min",
    cuisine: "American",
    baseServings: 4,
    ingredients: [
      { name: "Chicken", amount: 1, unit: "lb" },
      { name: "Pasta", amount: 1.5, unit: "cups" },
      { name: "Chicken Broth", amount: 3, unit: "cups" },
      { name: "Lemon", amount: 2, unit: "count" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Spinach", amount: 2, unit: "cups" },
      { name: "Parmesan", amount: 0.5, unit: "cup" },
      { name: "Olive Oil", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "tsp" },
      { name: "Pepper", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Season chicken with salt and pepper. Cook in olive oil in a deep pan until golden, about 6 min per side. Remove and slice.",
      "In the same pan, sauté minced garlic 1 min.",
      "Add orzo pasta and toast 1–2 min, stirring frequently.",
      "Pour in chicken broth and lemon juice. Bring to a boil then simmer 10 min, stirring occasionally, until orzo is tender and broth is mostly absorbed.",
      "Stir in spinach until wilted. Add parmesan and lemon zest.",
      "Return chicken on top. Serve directly from the pan."
    ]
  },
  {
    name: "Dal Tadka",
    emoji: "🍲",
    time: "40 min",
    cuisine: "Indian",
    baseServings: 4,
    ingredients: [
      { name: "Rice", amount: 2, unit: "cups" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Tomato", amount: 2, unit: "count" },
      { name: "Garlic", amount: 4, unit: "cloves" },
      { name: "Ginger", amount: 1, unit: "tsp" },
      { name: "Cumin", amount: 1, unit: "tsp" },
      { name: "Turmeric", amount: 0.5, unit: "tsp" },
      { name: "Curry Powder", amount: 1, unit: "tsp" },
      { name: "Butter", amount: 2, unit: "tbsp" },
      { name: "Oil", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Cook rice separately and set aside.",
      "Heat oil in a pot over medium heat. Add cumin seeds and let them sizzle 30 seconds.",
      "Add diced onion and cook 8 min until deep golden. Add garlic and ginger, cook 2 min.",
      "Add diced tomatoes, turmeric, and curry powder. Cook 10 min until tomatoes break down into a thick paste.",
      "Add 2 cups water, stir well and simmer 15 min until thickened. Season with salt.",
      "For the tadka: heat butter in a small pan, add a pinch of cumin and chili flakes until sizzling, pour over the dal. Serve with rice."
    ]
  },
  {
    name: "Croque Monsieur",
    emoji: "🥪",
    time: "20 min",
    cuisine: "French",
    baseServings: 2,
    ingredients: [
      { name: "Bread", amount: 4, unit: "slices" },
      { name: "Bacon", amount: 4, unit: "slices" },
      { name: "Mozzarella", amount: 1, unit: "cup" },
      { name: "Butter", amount: 3, unit: "tbsp" },
      { name: "Flour", amount: 1, unit: "tbsp" },
      { name: "Milk", amount: 0.5, unit: "cup" },
      { name: "Dijon Mustard", amount: 1, unit: "tbsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" },
      { name: "Pepper", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Make béchamel: melt 2 tbsp butter, whisk in flour, cook 1 min. Gradually whisk in milk until smooth and thick. Season with salt, pepper, and a pinch of nutmeg.",
      "Spread dijon mustard on two bread slices. Layer with ham and half the cheese.",
      "Top with remaining bread slices. Butter the outside of both sides.",
      "Grill in a pan over medium heat 3 min per side until deep golden.",
      "Transfer to a baking sheet. Spread béchamel on top and sprinkle remaining cheese.",
      "Broil 3–4 min until cheese is bubbling and golden. Serve immediately."
    ]
  }
,
  {
    name: "Bibimbap",
    emoji: "🍚",
    time: "35 min",
    cuisine: "Asian",
    baseServings: 2,
    ingredients: [
      { name: "Rice", amount: 2, unit: "cups" },
      { name: "Egg", amount: 2, unit: "count" },
      { name: "Spinach", amount: 2, unit: "cups" },
      { name: "Mushrooms", amount: 1, unit: "cup" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Sesame Oil", amount: 2, unit: "tsp" },
      { name: "Soy Sauce", amount: 2, unit: "tbsp" },
      { name: "Hot Sauce", amount: 1, unit: "tbsp" },
      { name: "Oil", amount: 1, unit: "tbsp" }
    ],
    steps: [
      "Cook rice and set aside.",
      "Blanch spinach in boiling water 1 min. Squeeze dry, season with sesame oil and a pinch of salt.",
      "Sauté sliced mushrooms in oil over high heat until golden. Season with soy sauce.",
      "Fry eggs sunny side up in the same pan.",
      "Divide rice into bowls. Arrange spinach and mushrooms in sections around the bowl.",
      "Place fried egg on top. Drizzle with hot sauce and sesame oil. Mix everything together before eating."
    ]
  },
  {
    name: "Korean Fried Chicken",
    emoji: "🍗",
    time: "40 min",
    cuisine: "Asian",
    baseServings: 4,
    ingredients: [
      { name: "Chicken Wings", amount: 2, unit: "lb" },
      { name: "Corn Starch", amount: 3, unit: "tbsp" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Ginger", amount: 1, unit: "tsp" },
      { name: "Soy Sauce", amount: 2, unit: "tbsp" },
      { name: "Honey", amount: 2, unit: "tbsp" },
      { name: "Hot Sauce", amount: 1, unit: "tbsp" },
      { name: "Oil", amount: 2, unit: "cups" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Pat chicken wings dry. Season with salt and toss in cornstarch until fully coated.",
      "Heat oil in a deep pan to 350°F (175°C). Fry wings in batches 10-12 min until golden. Drain on paper towels.",
      "Mix soy sauce, honey, minced garlic, ginger, and hot sauce in a pan over medium heat. Simmer 2 min until slightly thickened.",
      "Fry the wings a second time at 375°F for 3-4 min until extra crispy. This double fry is the secret to Korean fried chicken.",
      "Toss hot wings in the sauce until fully coated.",
      "Serve immediately — they lose their crunch fast!"
    ]
  },
  {
    name: "Japchae",
    emoji: "🍜",
    time: "30 min",
    cuisine: "Asian",
    baseServings: 4,
    ingredients: [
      { name: "Noodles", amount: 1, unit: "pack" },
      { name: "Beef Flank", amount: 0.5, unit: "lb" },
      { name: "Spinach", amount: 2, unit: "cups" },
      { name: "Mushrooms", amount: 1, unit: "cup" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Soy Sauce", amount: 3, unit: "tbsp" },
      { name: "Sesame Oil", amount: 2, unit: "tsp" },
      { name: "Sugar", amount: 1, unit: "tbsp" },
      { name: "Oil", amount: 2, unit: "tbsp" }
    ],
    steps: [
      "Soak glass noodles in warm water 20 min, then boil 5 min until tender. Drain and toss with a little sesame oil.",
      "Slice beef thinly and marinate in 1 tbsp soy sauce, sugar, and garlic for 10 min.",
      "Blanch spinach 1 min, squeeze dry, season with sesame oil and salt.",
      "Stir-fry beef in hot oil until cooked. Remove. Stir-fry mushrooms and onion in the same pan.",
      "Add noodles, remaining soy sauce, and all cooked ingredients to the pan. Toss everything together over medium heat.",
      "Drizzle with sesame oil and serve warm or at room temperature."
    ]
  },
  {
    name: "Kimchi Fried Rice",
    emoji: "🍳",
    time: "15 min",
    cuisine: "Asian",
    baseServings: 2,
    ingredients: [
      { name: "Rice", amount: 2, unit: "cups" },
      { name: "Egg", amount: 2, unit: "count" },
      { name: "Onion", amount: 0.5, unit: "count" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Soy Sauce", amount: 1, unit: "tbsp" },
      { name: "Sesame Oil", amount: 1, unit: "tsp" },
      { name: "Hot Sauce", amount: 1, unit: "tbsp" },
      { name: "Oil", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Use cold day-old rice for best results.",
      "Heat oil in a wok over high heat. Sauté diced onion and garlic 2 min.",
      "Add hot sauce and stir 30 seconds until fragrant.",
      "Add rice, breaking up clumps. Press against the wok and let it sit 30 seconds for a slight char.",
      "Add soy sauce and toss everything together. Push to the side and fry eggs to your liking.",
      "Drizzle sesame oil over everything. Serve topped with the fried egg."
    ]
  },
  {
    name: "Gamja Jorim",
    emoji: "🥔",
    time: "25 min",
    cuisine: "Asian",
    baseServings: 4,
    ingredients: [
      { name: "Potato", amount: 4, unit: "count" },
      { name: "Soy Sauce", amount: 3, unit: "tbsp" },
      { name: "Sugar", amount: 1, unit: "tbsp" },
      { name: "Honey", amount: 1, unit: "tbsp" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Sesame Oil", amount: 1, unit: "tsp" },
      { name: "Oil", amount: 2, unit: "tbsp" },
      { name: "Water", amount: 0.5, unit: "cup" }
    ],
    steps: [
      "Peel and cube potatoes into small bite-sized pieces. Soak in water 10 min to remove starch, then drain and pat dry.",
      "Heat oil in a pan over medium-high. Fry potatoes until golden on all sides, about 8-10 min.",
      "Mix soy sauce, sugar, honey, minced garlic, and water in a bowl.",
      "Pour sauce over potatoes. Toss to coat and bring to a simmer.",
      "Cook uncovered 8-10 min, stirring occasionally, until sauce thickens into a glaze.",
      "Drizzle with sesame oil. Serve as a side dish with rice."
    ]
  },
  {
    name: "Char Siu Pork",
    emoji: "🥩",
    time: "1 hr",
    cuisine: "Asian",
    baseServings: 4,
    ingredients: [
      { name: "Ground Pork", amount: 1, unit: "lb" },
      { name: "Hoisin Sauce", amount: 2, unit: "tbsp" },
      { name: "Soy Sauce", amount: 2, unit: "tbsp" },
      { name: "Honey", amount: 2, unit: "tbsp" },
      { name: "Rice Wine", amount: 1, unit: "tbsp" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Sugar", amount: 1, unit: "tbsp" },
      { name: "Oil", amount: 1, unit: "tbsp" }
    ],
    steps: [
      "Mix hoisin sauce, soy sauce, honey, rice wine, minced garlic, and sugar into a marinade.",
      "Coat pork thoroughly. Marinate at least 30 min — overnight gives the best flavor.",
      "Preheat oven to 400°F (200°C). Place pork on a wire rack over a foil-lined baking sheet.",
      "Roast 25 min, basting with marinade halfway through.",
      "Brush with remaining marinade and broil 3-5 min until edges are caramelized and slightly charred.",
      "Rest 5 min before slicing. Serve over rice or in steamed buns."
    ]
  },
  {
    name: "Egg Drop Soup",
    emoji: "🍲",
    time: "10 min",
    cuisine: "Asian",
    baseServings: 4,
    ingredients: [
      { name: "Egg", amount: 3, unit: "count" },
      { name: "Chicken Broth", amount: 4, unit: "cups" },
      { name: "Corn Starch", amount: 2, unit: "tbsp" },
      { name: "Sesame Oil", amount: 1, unit: "tsp" },
      { name: "Ginger", amount: 0.5, unit: "tsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" },
      { name: "White Pepper", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Bring chicken broth to a boil. Add ginger and season with salt and white pepper.",
      "Mix cornstarch with 2 tbsp cold water until smooth. Pour into the boiling broth while stirring.",
      "Reduce to a gentle simmer — the broth should be slightly thickened.",
      "Beat eggs well in a bowl. While stirring the soup in a slow circle, pour eggs in a thin stream.",
      "The eggs will cook instantly into silky ribbons — stop stirring as soon as they set.",
      "Drizzle with sesame oil and serve immediately."
    ]
  },
  {
    name: "Red Braised Beef",
    emoji: "🥩",
    time: "2 hr",
    cuisine: "Asian",
    baseServings: 4,
    ingredients: [
      { name: "Beef Flank", amount: 2, unit: "lb" },
      { name: "Dark Soy Sauce", amount: 3, unit: "tbsp" },
      { name: "Soy Sauce", amount: 2, unit: "tbsp" },
      { name: "Sugar", amount: 2, unit: "tbsp" },
      { name: "Star Anise", amount: 3, unit: "pods" },
      { name: "Ginger", amount: 1, unit: "tbsp" },
      { name: "Garlic", amount: 4, unit: "cloves" },
      { name: "Rice Wine", amount: 2, unit: "tbsp" },
      { name: "Oil", amount: 1, unit: "tbsp" }
    ],
    steps: [
      "Cut beef into large chunks. Blanch in boiling water 3 min to remove impurities. Drain and rinse.",
      "Heat oil in a pot. Brown beef on all sides over high heat. Remove.",
      "Add garlic, ginger, and star anise. Stir 1 min until fragrant.",
      "Return beef. Add dark soy sauce, soy sauce, rice wine, sugar, and enough water to just cover.",
      "Bring to a boil, then reduce to a low simmer. Cover and cook 1.5-2 hours until melt-in-your-mouth tender.",
      "Uncover and simmer 15 more min to reduce the sauce to a rich glaze. Serve over rice."
    ]
  },
  {
    name: "Steamed Ginger Fish",
    emoji: "🐟",
    time: "20 min",
    cuisine: "Asian",
    baseServings: 2,
    ingredients: [
      { name: "Tilapia", amount: 2, unit: "fillets" },
      { name: "Ginger", amount: 2, unit: "tbsp" },
      { name: "Soy Sauce", amount: 3, unit: "tbsp" },
      { name: "Sesame Oil", amount: 1, unit: "tbsp" },
      { name: "Oil", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Pat fish dry. Score both sides with diagonal cuts. Season with salt.",
      "Lay julienned ginger over the fish.",
      "Steam over boiling water 8-10 min until fish is opaque and flakes easily.",
      "Carefully drain any liquid from the plate.",
      "Pour soy sauce over the fish.",
      "Heat oil in a small pan until smoking. Pour hot oil over the fish — it will sizzle and cook the ginger instantly. Drizzle with sesame oil and serve."
    ]
  },
  {
    name: "Dan Dan Noodles",
    emoji: "🍜",
    time: "25 min",
    cuisine: "Asian",
    baseServings: 2,
    ingredients: [
      { name: "Noodles", amount: 1, unit: "pack" },
      { name: "Ground Pork", amount: 0.5, unit: "lb" },
      { name: "Soy Sauce", amount: 2, unit: "tbsp" },
      { name: "Sesame Oil", amount: 2, unit: "tbsp" },
      { name: "Chili Flakes", amount: 1, unit: "tsp" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Ginger", amount: 1, unit: "tsp" },
      { name: "Sugar", amount: 1, unit: "tsp" },
      { name: "Oil", amount: 1, unit: "tbsp" }
    ],
    steps: [
      "Cook noodles per package directions. Reserve ¼ cup noodle water. Drain.",
      "Mix sesame oil, soy sauce, chili flakes, sugar, and a splash of noodle water in a bowl — this is your sauce.",
      "Heat oil in a wok over high heat. Add ground pork and cook, breaking up, until browned and slightly crispy.",
      "Add minced garlic and ginger. Stir 1 min.",
      "Divide noodles into bowls. Pour sauce over and toss.",
      "Top with the pork and an extra drizzle of sesame oil."
    ]
  },
  {
    name: "Cacio e Pepe",
    emoji: "🍝",
    time: "20 min",
    cuisine: "Italian",
    baseServings: 2,
    ingredients: [
      { name: "Pasta", amount: 200, unit: "g" },
      { name: "Parmesan", amount: 1, unit: "cup" },
      { name: "Pepper", amount: 2, unit: "tsp" },
      { name: "Butter", amount: 1, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Cook pasta in well-salted boiling water until al dente. Reserve 1 cup pasta water — this is crucial.",
      "Toast cracked black pepper in a dry pan over medium heat 1 min until fragrant.",
      "Add butter and ¼ cup pasta water to the pan. Let it simmer gently.",
      "Add drained pasta and toss. Remove from heat.",
      "Add grated parmesan gradually, tossing constantly and adding pasta water a splash at a time to create a smooth creamy sauce.",
      "The sauce should coat every strand. Serve immediately with extra pepper."
    ]
  },
  {
    name: "Pasta al Limone",
    emoji: "🍋",
    time: "20 min",
    cuisine: "Italian",
    baseServings: 2,
    ingredients: [
      { name: "Pasta", amount: 200, unit: "g" },
      { name: "Lemon", amount: 2, unit: "count" },
      { name: "Parmesan", amount: 0.5, unit: "cup" },
      { name: "Butter", amount: 2, unit: "tbsp" },
      { name: "Heavy Cream", amount: 0.25, unit: "cup" },
      { name: "Garlic", amount: 1, unit: "cloves" },
      { name: "Salt", amount: 1, unit: "tsp" },
      { name: "Pepper", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Cook pasta in salted boiling water until al dente. Reserve ½ cup pasta water before draining.",
      "Melt butter in a pan over medium heat. Add minced garlic and cook 1 min.",
      "Add heavy cream and lemon zest. Simmer 2 min.",
      "Add drained pasta and toss to coat. Add pasta water as needed.",
      "Remove from heat. Add parmesan and lemon juice. Toss until sauce is silky.",
      "Season with salt and pepper. Serve immediately with extra lemon zest."
    ]
  },
  {
    name: "Chicken Cacciatore",
    emoji: "🍲",
    time: "55 min",
    cuisine: "Italian",
    baseServings: 4,
    ingredients: [
      { name: "Chicken Thighs", amount: 1.5, unit: "lb" },
      { name: "Canned Tomatoes", amount: 2, unit: "cups" },
      { name: "Bell Pepper", amount: 2, unit: "count" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 4, unit: "cloves" },
      { name: "Olive Oil", amount: 3, unit: "tbsp" },
      { name: "Italian Seasoning", amount: 2, unit: "tsp" },
      { name: "Bay Leaf", amount: 2, unit: "leaves" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Season chicken thighs with salt and Italian seasoning.",
      "Heat olive oil in a large pan over high heat. Sear chicken skin-side down 5 min until golden. Flip and sear 3 more min. Remove.",
      "In the same pan, sauté diced onion and bell peppers 5 min. Add garlic and cook 1 min.",
      "Add canned tomatoes and bay leaves. Stir to combine.",
      "Return chicken to the pan, nestling it into the sauce. Bring to a simmer.",
      "Cover and cook on low 30-35 min until chicken is fall-apart tender. Remove bay leaves before serving."
    ]
  },
  {
    name: "Potato Gnocchi",
    emoji: "🥔",
    time: "50 min",
    cuisine: "Italian",
    baseServings: 4,
    ingredients: [
      { name: "Potato", amount: 4, unit: "count" },
      { name: "Flour", amount: 1, unit: "cup" },
      { name: "Egg", amount: 1, unit: "count" },
      { name: "Parmesan", amount: 0.25, unit: "cup" },
      { name: "Butter", amount: 3, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Boil potatoes whole until fork tender, about 25 min. Peel while hot and mash until completely smooth.",
      "Let mashed potato cool 10 min. Make a well in the center. Add egg, parmesan, and salt.",
      "Add flour gradually, mixing gently until a soft dough just comes together. Do not overwork — less kneading means lighter gnocchi.",
      "Divide dough into sections. Roll each into a ¾ inch rope. Cut into 1-inch pieces.",
      "Boil gnocchi in salted water until they float to the surface, about 2-3 min.",
      "Toss immediately in brown butter or your sauce of choice. Serve with parmesan."
    ]
  },
  {
    name: "Pasta e Fagioli",
    emoji: "🍝",
    time: "35 min",
    cuisine: "Italian",
    baseServings: 4,
    ingredients: [
      { name: "Pasta", amount: 200, unit: "g" },
      { name: "Canned Tomatoes", amount: 1, unit: "cup" },
      { name: "Chicken Broth", amount: 3, unit: "cups" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Olive Oil", amount: 3, unit: "tbsp" },
      { name: "Rosemary", amount: 1, unit: "sprig" },
      { name: "Tomato Paste", amount: 1, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "tsp" },
      { name: "Pepper", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Heat olive oil in a large pot. Sauté diced onion 5 min. Add garlic and rosemary, cook 1 min.",
      "Add tomato paste and stir 1 min. Add canned tomatoes and cook 5 min until thickened.",
      "Pour in chicken broth. Bring to a boil.",
      "Add pasta directly to the soup. Cook stirring often until pasta is al dente, about 8-10 min.",
      "The soup thickens as pasta releases starch — add more broth if too thick.",
      "Season with salt and pepper. Drizzle with olive oil and serve with crusty bread."
    ]
  },
  {
    name: "Greek Yogurt Chicken",
    emoji: "🍗",
    time: "35 min",
    cuisine: "Healthy",
    baseServings: 4,
    ingredients: [
      { name: "Chicken Thighs", amount: 1.5, unit: "lb" },
      { name: "Greek Yogurt", amount: 1, unit: "cup" },
      { name: "Lemon", amount: 1, unit: "count" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Cumin", amount: 1, unit: "tsp" },
      { name: "Paprika", amount: 1, unit: "tsp" },
      { name: "Olive Oil", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Mix Greek yogurt, lemon juice, minced garlic, cumin, paprika, olive oil, and salt into a marinade.",
      "Coat chicken thighs thoroughly. Marinate at least 30 min — overnight is best.",
      "The yogurt tenderizes the chicken and creates an incredible crust when cooked.",
      "Cook in a hot pan over medium-high heat 6-7 min per side until deeply golden and cooked through.",
      "Alternatively bake at 425°F for 30-35 min on a wire rack.",
      "Rest 5 min before serving. Serve with a simple salad or over rice."
    ]
  },
  {
    name: "Sweet Potato & Spinach Bowl",
    emoji: "🍠",
    time: "30 min",
    cuisine: "Healthy",
    baseServings: 2,
    ingredients: [
      { name: "Sweet Potato", amount: 2, unit: "count" },
      { name: "Spinach", amount: 3, unit: "cups" },
      { name: "Egg", amount: 2, unit: "count" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Olive Oil", amount: 2, unit: "tbsp" },
      { name: "Cumin", amount: 1, unit: "tsp" },
      { name: "Smoked Paprika", amount: 0.5, unit: "tsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Preheat oven to 425°F. Cube sweet potatoes and toss with olive oil, cumin, smoked paprika, and salt.",
      "Spread on a baking sheet and roast 20-25 min until golden and caramelized at the edges.",
      "Heat a little olive oil in a pan. Add minced garlic and sauté 30 seconds.",
      "Add spinach and toss until wilted, about 2 min. Season with salt.",
      "Fry or poach eggs to your preference.",
      "Build bowls: sweet potatoes on the bottom, wilted spinach, then top with the egg. Drizzle with olive oil."
    ]
  },
  {
    name: "Shrimp & Broccoli Stir Fry",
    emoji: "🍤",
    time: "20 min",
    cuisine: "Healthy",
    baseServings: 2,
    ingredients: [
      { name: "Shrimp", amount: 0.5, unit: "lb" },
      { name: "Broccoli", amount: 1, unit: "head" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Ginger", amount: 1, unit: "tsp" },
      { name: "Soy Sauce", amount: 2, unit: "tbsp" },
      { name: "Sesame Oil", amount: 1, unit: "tsp" },
      { name: "Corn Starch", amount: 1, unit: "tsp" },
      { name: "Oil", amount: 1, unit: "tbsp" }
    ],
    steps: [
      "Cut broccoli into small florets. Blanch in boiling water 2 min. Drain.",
      "Pat shrimp dry. Season with a pinch of salt.",
      "Mix soy sauce, sesame oil, and cornstarch with 2 tbsp water in a small bowl.",
      "Heat oil in a wok over high heat. Cook shrimp 1 min per side until pink. Remove.",
      "Add garlic and ginger to the wok. Stir-fry 30 seconds. Add broccoli and toss.",
      "Return shrimp. Pour sauce over everything and toss until coated and glossy. Serve over rice."
    ]
  },
  {
    name: "Turmeric Chicken Soup",
    emoji: "🍲",
    time: "40 min",
    cuisine: "Healthy",
    baseServings: 4,
    ingredients: [
      { name: "Chicken", amount: 1, unit: "lb" },
      { name: "Chicken Broth", amount: 4, unit: "cups" },
      { name: "Spinach", amount: 2, unit: "cups" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Ginger", amount: 1, unit: "tsp" },
      { name: "Turmeric", amount: 1, unit: "tsp" },
      { name: "Lemon", amount: 1, unit: "count" },
      { name: "Olive Oil", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Heat olive oil in a large pot over medium heat. Sauté diced onion 5 min until soft.",
      "Add minced garlic, ginger, and turmeric. Stir 1 min until fragrant.",
      "Add chicken and chicken broth. Bring to a boil.",
      "Reduce heat and simmer 20 min until chicken is cooked through. Remove and shred.",
      "Return shredded chicken to the pot. Add spinach and stir until wilted.",
      "Squeeze in lemon juice. Season with salt. Serve hot — this soup is deeply nourishing and anti-inflammatory."
    ]
  },
  {
    name: "Baked Lemon Herb Salmon",
    emoji: "🐟",
    time: "25 min",
    cuisine: "Healthy",
    baseServings: 2,
    ingredients: [
      { name: "Salmon", amount: 2, unit: "fillets" },
      { name: "Lemon", amount: 1, unit: "count" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Olive Oil", amount: 2, unit: "tbsp" },
      { name: "Thyme", amount: 2, unit: "sprigs" },
      { name: "Rosemary", amount: 1, unit: "sprig" },
      { name: "Salt", amount: 0.5, unit: "tsp" },
      { name: "Pepper", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Preheat oven to 400°F (200°C). Line a baking sheet with foil.",
      "Mix olive oil, minced garlic, lemon zest, salt, and pepper together.",
      "Place salmon fillets on the baking sheet. Brush generously with the herb oil.",
      "Lay thyme and rosemary sprigs on top. Add lemon slices over the fish.",
      "Bake 12-15 min until salmon flakes easily with a fork. Do not overcook.",
      "Squeeze fresh lemon juice over the top and serve with steamed vegetables or salad."
    ]
  }
,
  {
    name: "Coq au Vin",
    emoji: "🍷",
    time: "1.5 hr",
    cuisine: "French",
    baseServings: 4,
    ingredients: [
      { name: "Chicken Thighs", amount: 1.5, unit: "lb" },
      { name: "Bacon", amount: 4, unit: "strips" },
      { name: "Mushrooms", amount: 2, unit: "cups" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Tomato Paste", amount: 1, unit: "tbsp" },
      { name: "Chicken Broth", amount: 2, unit: "cups" },
      { name: "Thyme", amount: 3, unit: "sprigs" },
      { name: "Bay Leaf", amount: 2, unit: "leaves" },
      { name: "Olive Oil", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Cook bacon in a large Dutch oven until crispy. Remove and set aside, leaving the fat in the pot.",
      "Season chicken thighs with salt and pepper. Brown on both sides in the bacon fat over high heat, about 4 min per side. Remove.",
      "Sauté diced onion and mushrooms in the same pot 5 min. Add garlic and tomato paste, cook 1 min.",
      "Return chicken and bacon. Add chicken broth, thyme, and bay leaves.",
      "Bring to a boil, then reduce to a low simmer. Cover and cook 45 min until chicken is tender.",
      "Uncover and simmer 10 more min to reduce the sauce. Remove bay leaves and thyme. Serve with crusty bread or mashed potatoes."
    ]
  },
  {
    name: "Vichyssoise",
    emoji: "🥣",
    time: "45 min",
    cuisine: "French",
    baseServings: 4,
    ingredients: [
      { name: "Potato", amount: 4, unit: "count" },
      { name: "Onion", amount: 2, unit: "count" },
      { name: "Chicken Broth", amount: 4, unit: "cups" },
      { name: "Heavy Cream", amount: 0.5, unit: "cup" },
      { name: "Butter", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "tsp" },
      { name: "White Pepper", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Melt butter in a large pot over medium heat. Sauté thinly sliced onions 10 min until very soft but not browned.",
      "Add peeled, cubed potatoes and chicken broth. Bring to a boil.",
      "Reduce heat and simmer 20 min until potatoes are completely tender.",
      "Blend until completely smooth using an immersion blender.",
      "Stir in heavy cream. Season with salt and white pepper.",
      "Serve hot or refrigerate and serve chilled — vichyssoise is classically a cold soup. Drizzle with cream to serve."
    ]
  },
  {
    name: "Beef Bourguignon",
    emoji: "🥩",
    time: "3 hr",
    cuisine: "French",
    baseServings: 6,
    ingredients: [
      { name: "Beef Flank", amount: 2, unit: "lb" },
      { name: "Bacon", amount: 4, unit: "strips" },
      { name: "Mushrooms", amount: 2, unit: "cups" },
      { name: "Onion", amount: 2, unit: "count" },
      { name: "Garlic", amount: 4, unit: "cloves" },
      { name: "Tomato Paste", amount: 2, unit: "tbsp" },
      { name: "Beef Broth", amount: 2, unit: "cups" },
      { name: "Thyme", amount: 3, unit: "sprigs" },
      { name: "Bay Leaf", amount: 2, unit: "leaves" },
      { name: "Olive Oil", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Cut beef into large chunks. Pat dry and season generously with salt and pepper.",
      "Cook bacon in a Dutch oven until crispy. Remove. Brown beef in batches in the bacon fat. Remove.",
      "Sauté onions and garlic in the same pot 5 min. Add tomato paste and cook 2 min.",
      "Return beef and bacon. Add broth, thyme, and bay leaves. Bring to a boil.",
      "Cover and cook in a 325°F oven for 2.5 hours until beef is melt-in-your-mouth tender.",
      "Sauté mushrooms separately until golden. Add to the pot in the last 30 min. Remove bay leaves before serving."
    ]
  },
  {
    name: "Ratatouille",
    emoji: "🍆",
    time: "1 hr",
    cuisine: "French",
    baseServings: 4,
    ingredients: [
      { name: "Tomato", amount: 4, unit: "count" },
      { name: "Bell Pepper", amount: 2, unit: "count" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 4, unit: "cloves" },
      { name: "Canned Tomatoes", amount: 1, unit: "cup" },
      { name: "Olive Oil", amount: 4, unit: "tbsp" },
      { name: "Thyme", amount: 3, unit: "sprigs" },
      { name: "Bay Leaf", amount: 2, unit: "leaves" },
      { name: "Italian Seasoning", amount: 1, unit: "tsp" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Dice onion and bell peppers. Sauté in olive oil over medium heat 8 min until softened. Add garlic and cook 1 min.",
      "Add canned tomatoes, thyme, bay leaves, and Italian seasoning. Simmer 10 min to make a sauce base.",
      "Slice tomatoes into thin rounds.",
      "Spread the sauce in a baking dish. Arrange sliced tomatoes and bell peppers in overlapping circles on top.",
      "Drizzle with olive oil. Cover with foil and bake at 375°F for 30 min.",
      "Uncover and bake 15 more min until vegetables are tender and edges are caramelized. Remove bay leaves before serving."
    ]
  },
  {
    name: "Soupe à l'Oignon",
    emoji: "🧅",
    time: "1.5 hr",
    cuisine: "French",
    baseServings: 4,
    ingredients: [
      { name: "Onion", amount: 6, unit: "count" },
      { name: "Beef Broth", amount: 4, unit: "cups" },
      { name: "Butter", amount: 4, unit: "tbsp" },
      { name: "Olive Oil", amount: 1, unit: "tbsp" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Thyme", amount: 2, unit: "sprigs" },
      { name: "Bay Leaf", amount: 1, unit: "count" },
      { name: "Sugar", amount: 1, unit: "tsp" },
      { name: "Bread", amount: 4, unit: "slices" },
      { name: "Mozzarella", amount: 2, unit: "cups" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Thinly slice all onions. Melt butter with olive oil in a heavy pot over medium-low heat.",
      "Add onions and a pinch of salt. Cook 50-60 min stirring occasionally until deeply caramelized and golden brown. Add sugar halfway to help browning.",
      "Add minced garlic, thyme, and bay leaf. Cook 2 min.",
      "Pour in beef broth. Simmer 20 min. Season to taste. Remove bay leaf and thyme.",
      "Toast bread slices until golden. Ladle soup into oven-safe bowls. Top with toasted bread and a generous pile of mozzarella.",
      "Broil 4-5 min until cheese is bubbling and golden. Serve immediately."
    ]
  },
  {
    name: "Salade Niçoise",
    emoji: "🥗",
    time: "25 min",
    cuisine: "French",
    baseServings: 2,
    ingredients: [
      { name: "Egg", amount: 3, unit: "count" },
      { name: "Salmon", amount: 2, unit: "fillets" },
      { name: "Potato", amount: 2, unit: "count" },
      { name: "Tomato", amount: 2, unit: "count" },
      { name: "Olive Oil", amount: 3, unit: "tbsp" },
      { name: "Dijon Mustard", amount: 1, unit: "tbsp" },
      { name: "Lemon", amount: 1, unit: "count" },
      { name: "Salt", amount: 0.5, unit: "tsp" },
      { name: "Pepper", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Boil potatoes until tender, about 15 min. Hard boil eggs 10 min. Cool both in cold water.",
      "Season salmon with salt and pepper. Sear in olive oil 3-4 min per side until golden. Flake into chunks.",
      "Make dressing: whisk together olive oil, dijon mustard, lemon juice, salt and pepper.",
      "Slice potatoes, halve eggs and tomatoes.",
      "Arrange everything on a platter — potatoes, eggs, tomatoes, and flaked salmon.",
      "Drizzle dressing over everything and serve immediately."
    ]
  },
  {
    name: "Poulet Rôti",
    emoji: "🍗",
    time: "1.5 hr",
    cuisine: "French",
    baseServings: 4,
    ingredients: [
      { name: "Chicken", amount: 1, unit: "whole" },
      { name: "Butter", amount: 4, unit: "tbsp" },
      { name: "Garlic", amount: 6, unit: "cloves" },
      { name: "Thyme", amount: 4, unit: "sprigs" },
      { name: "Lemon", amount: 1, unit: "count" },
      { name: "Olive Oil", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 2, unit: "tsp" },
      { name: "Pepper", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Preheat oven to 425°F. Pat chicken completely dry inside and out — this is essential for crispy skin.",
      "Mix softened butter with minced garlic, thyme leaves, salt, and pepper.",
      "Loosen the skin over the breast and push herb butter directly underneath onto the meat.",
      "Rub remaining butter all over the outside. Stuff cavity with halved lemon and remaining thyme.",
      "Tie legs together. Place breast-side up in a roasting pan. Drizzle with olive oil.",
      "Roast 60-75 min until skin is deep golden and juices run clear. Rest 15 min before carving."
    ]
  },
  {
    name: "Tarte Flambée",
    emoji: "🫓",
    time: "30 min",
    cuisine: "French",
    baseServings: 2,
    ingredients: [
      { name: "Flour", amount: 2, unit: "cups" },
      { name: "Cream Cheese", amount: 0.5, unit: "cup" },
      { name: "Sour Cream", amount: 0.25, unit: "cup" },
      { name: "Bacon", amount: 4, unit: "strips" },
      { name: "Onion", amount: 2, unit: "count" },
      { name: "Olive Oil", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" },
      { name: "Pepper", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Mix flour, olive oil, a pinch of salt, and enough water to form a smooth dough. Rest 10 min.",
      "Mix cream cheese and sour cream together. Season with salt and pepper.",
      "Slice onions thinly. Cut bacon into small pieces.",
      "Roll dough as thin as possible into a rectangle on a floured surface.",
      "Spread cream mixture over the dough. Top with onions and bacon.",
      "Bake at 475°F for 10-12 min until edges are crispy and topping is golden. Slice and serve immediately."
    ]
  },
  {
    name: "Bouillabaisse",
    emoji: "🦞",
    time: "1 hr",
    cuisine: "French",
    baseServings: 4,
    ingredients: [
      { name: "Shrimp", amount: 1, unit: "lb" },
      { name: "Salmon", amount: 2, unit: "fillets" },
      { name: "Canned Tomatoes", amount: 2, unit: "cups" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 4, unit: "cloves" },
      { name: "Fennel Seeds", amount: 1, unit: "tsp" },
      { name: "Saffron", amount: 1, unit: "pinch" },
      { name: "Chicken Broth", amount: 3, unit: "cups" },
      { name: "Olive Oil", amount: 3, unit: "tbsp" },
      { name: "Thyme", amount: 2, unit: "sprigs" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Heat olive oil in a large pot. Sauté diced onion 5 min. Add garlic and fennel seeds, cook 1 min.",
      "Add canned tomatoes and thyme. Cook 10 min until thickened.",
      "Pour in chicken broth. Add saffron. Bring to a simmer and cook 15 min.",
      "Cut salmon into chunks. Add salmon and shrimp to the broth.",
      "Simmer gently 8-10 min until seafood is just cooked through — do not overcook.",
      "Season with salt. Ladle into deep bowls and serve with crusty bread for dipping."
    ]
  },
  {
    name: "Quiche Lorraine",
    emoji: "🥧",
    time: "55 min",
    cuisine: "French",
    baseServings: 6,
    ingredients: [
      { name: "Egg", amount: 4, unit: "count" },
      { name: "Heavy Cream", amount: 1, unit: "cup" },
      { name: "Bacon", amount: 4, unit: "strips" },
      { name: "Mozzarella", amount: 1, unit: "cup" },
      { name: "Flour", amount: 1.5, unit: "cups" },
      { name: "Butter", amount: 6, unit: "tbsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" },
      { name: "Pepper", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Make pastry: mix flour and cold cubed butter until crumbly. Add cold water 1 tbsp at a time until dough forms. Chill 20 min.",
      "Roll dough and press into a 9-inch tart pan. Prick the base with a fork. Blind bake at 375°F for 15 min.",
      "Cook bacon until crispy. Crumble and set aside.",
      "Whisk eggs and heavy cream together. Season with salt and pepper.",
      "Scatter bacon and cheese over the pastry base. Pour egg mixture over the top.",
      "Bake 30-35 min until filling is just set with a slight wobble in the center. Cool 10 min before slicing."
    ]
  },
  {
    name: "Hummus",
    emoji: "🫙",
    time: "10 min",
    cuisine: "Middle Eastern",
    baseServings: 4,
    ingredients: [
      { name: "Olive Oil", amount: 3, unit: "tbsp" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Lemon", amount: 1, unit: "count" },
      { name: "Cumin", amount: 0.5, unit: "tsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" },
      { name: "Paprika", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Drain and rinse canned chickpeas. Reserve the liquid from the can.",
      "Add chickpeas, minced garlic, lemon juice, cumin, and salt to a blender.",
      "Blend until smooth, adding the reserved chickpea liquid a tablespoon at a time until creamy.",
      "With the blender running, drizzle in 2 tbsp olive oil until silky.",
      "Taste and adjust salt and lemon juice.",
      "Spread in a bowl. Drizzle with remaining olive oil and dust with paprika. Serve with pita or vegetables."
    ]
  },
  {
    name: "Falafel",
    emoji: "🧆",
    time: "30 min",
    cuisine: "Middle Eastern",
    baseServings: 4,
    ingredients: [
      { name: "Flour", amount: 0.25, unit: "cup" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Onion", amount: 0.5, unit: "count" },
      { name: "Cumin", amount: 1, unit: "tsp" },
      { name: "Coriander", amount: 1, unit: "tsp" },
      { name: "Baking Powder", amount: 0.5, unit: "tsp" },
      { name: "Oil", amount: 2, unit: "cups" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Combine onion, garlic, cumin, coriander, salt, and flour in a food processor. Pulse until a coarse paste forms — do not over-blend.",
      "Add baking powder and pulse 2-3 more times.",
      "Refrigerate the mixture 30 min — this helps them hold together when frying.",
      "Heat oil to 350°F. Shape mixture into small balls or patties.",
      "Fry in batches 3-4 min until deep golden brown on all sides.",
      "Drain on paper towels. Serve in pita with tahini, tomatoes, and pickles."
    ]
  },
  {
    name: "Kofta",
    emoji: "🍢",
    time: "25 min",
    cuisine: "Middle Eastern",
    baseServings: 4,
    ingredients: [
      { name: "Ground Beef", amount: 1, unit: "lb" },
      { name: "Onion", amount: 0.5, unit: "count" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Cumin", amount: 1, unit: "tsp" },
      { name: "Coriander", amount: 1, unit: "tsp" },
      { name: "Paprika", amount: 1, unit: "tsp" },
      { name: "Cinnamon", amount: 0.25, unit: "tsp" },
      { name: "Salt", amount: 1, unit: "tsp" },
      { name: "Olive Oil", amount: 1, unit: "tbsp" }
    ],
    steps: [
      "Grate onion finely. Squeeze out excess moisture with a paper towel.",
      "Combine ground beef, grated onion, minced garlic, and all spices. Mix well with your hands.",
      "Divide into equal portions. Shape each into a long oval around a skewer or into patties.",
      "Refrigerate 15 min to firm up.",
      "Grill or pan-fry over medium-high heat 4-5 min per side until charred outside and cooked through.",
      "Serve with warm pita, yogurt sauce, and fresh tomatoes."
    ]
  },
  {
    name: "Fattoush",
    emoji: "🥗",
    time: "15 min",
    cuisine: "Middle Eastern",
    baseServings: 4,
    ingredients: [
      { name: "Tomato", amount: 3, unit: "count" },
      { name: "Bell Pepper", amount: 1, unit: "count" },
      { name: "Onion", amount: 0.5, unit: "count" },
      { name: "Bread", amount: 2, unit: "slices" },
      { name: "Lemon", amount: 2, unit: "count" },
      { name: "Olive Oil", amount: 3, unit: "tbsp" },
      { name: "Cumin", amount: 0.5, unit: "tsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" },
      { name: "Sumac", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Toast bread until crispy then break into chunks. Alternatively fry in olive oil until golden.",
      "Chop tomatoes, bell pepper, and red onion into bite-sized pieces.",
      "Make dressing: whisk lemon juice, olive oil, cumin, and salt together.",
      "Combine all vegetables in a large bowl.",
      "Pour dressing over and toss well.",
      "Add toasted bread chunks right before serving so they stay slightly crispy. Dust with sumac."
    ]
  },
  {
    name: "Mujaddara",
    emoji: "🍚",
    time: "45 min",
    cuisine: "Middle Eastern",
    baseServings: 4,
    ingredients: [
      { name: "Rice", amount: 1, unit: "cups" },
      { name: "Onion", amount: 3, unit: "count" },
      { name: "Cumin", amount: 2, unit: "tsp" },
      { name: "Coriander", amount: 1, unit: "tsp" },
      { name: "Olive Oil", amount: 4, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "tsp" },
      { name: "Pepper", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Thinly slice onions. Heat olive oil in a large pan over medium heat.",
      "Cook onions 30-35 min stirring occasionally until deeply caramelized and almost crispy. Remove half and set aside for topping.",
      "Add cumin and coriander to the remaining onions. Stir 1 min.",
      "Add rice and 2 cups water. Season with salt. Bring to a boil.",
      "Reduce heat to low. Cover and cook 18 min until rice is tender.",
      "Fluff with a fork. Top with the reserved crispy caramelized onions. Serve with yogurt."
    ]
  },
  {
    name: "Baba Ganoush",
    emoji: "🍆",
    time: "40 min",
    cuisine: "Middle Eastern",
    baseServings: 4,
    ingredients: [
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Lemon", amount: 1, unit: "count" },
      { name: "Olive Oil", amount: 3, unit: "tbsp" },
      { name: "Cumin", amount: 0.5, unit: "tsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" },
      { name: "Paprika", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Char eggplants directly over a gas flame or under the broiler, turning occasionally, until completely blackened and collapsed — about 20-25 min.",
      "Place in a bowl and cover with plastic wrap. Let steam 10 min.",
      "Peel off the charred skin. The flesh should be silky and smoky.",
      "Mash the eggplant flesh with a fork — leave it slightly chunky.",
      "Mix in minced garlic, lemon juice, olive oil, cumin, and salt.",
      "Spread in a bowl. Drizzle with olive oil and dust with paprika. Serve with pita bread."
    ]
  },
  {
    name: "Lentil Soup",
    emoji: "🍲",
    time: "40 min",
    cuisine: "Middle Eastern",
    baseServings: 4,
    ingredients: [
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Tomato", amount: 2, unit: "count" },
      { name: "Cumin", amount: 2, unit: "tsp" },
      { name: "Turmeric", amount: 0.5, unit: "tsp" },
      { name: "Coriander", amount: 1, unit: "tsp" },
      { name: "Chicken Broth", amount: 4, unit: "cups" },
      { name: "Olive Oil", amount: 3, unit: "tbsp" },
      { name: "Lemon", amount: 1, unit: "count" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Heat olive oil in a large pot. Sauté diced onion 8 min until golden.",
      "Add minced garlic, cumin, turmeric, and coriander. Stir 1 min until fragrant.",
      "Add diced tomatoes and cook 5 min until broken down.",
      "Pour in chicken broth. Bring to a boil then reduce to a simmer.",
      "Cook 25 min until everything is very soft. Blend partially for a creamy but textured soup.",
      "Squeeze in lemon juice. Season with salt. Serve with crusty bread and a drizzle of olive oil."
    ]
  },
  {
    name: "Mansaf",
    emoji: "🍖",
    time: "2 hr",
    cuisine: "Middle Eastern",
    baseServings: 6,
    ingredients: [
      { name: "Lamb Chops", amount: 4, unit: "count" },
      { name: "Rice", amount: 2, unit: "cups" },
      { name: "Greek Yogurt", amount: 1, unit: "cup" },
      { name: "Chicken Broth", amount: 4, unit: "cups" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Cumin", amount: 1, unit: "tsp" },
      { name: "Coriander", amount: 1, unit: "tsp" },
      { name: "Turmeric", amount: 0.5, unit: "tsp" },
      { name: "Butter", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Season lamb with cumin, coriander, turmeric, and salt.",
      "Brown lamb on all sides in butter over high heat. Remove.",
      "Sauté onion and garlic in the same pot 5 min. Return lamb.",
      "Add chicken broth. Bring to a boil then simmer covered 1.5 hours until lamb is very tender.",
      "Remove lamb. Cook rice in the lamb broth until tender.",
      "Stir Greek yogurt into the remaining broth over low heat — do not boil or it will curdle. Serve lamb over rice, drizzled with the yogurt sauce."
    ]
  },
  {
    name: "Tabbouleh",
    emoji: "🥗",
    time: "20 min",
    cuisine: "Middle Eastern",
    baseServings: 4,
    ingredients: [
      { name: "Tomato", amount: 3, unit: "count" },
      { name: "Onion", amount: 0.5, unit: "count" },
      { name: "Lemon", amount: 2, unit: "count" },
      { name: "Olive Oil", amount: 3, unit: "tbsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" },
      { name: "Pepper", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Finely dice tomatoes and red onion. Place in a large bowl.",
      "Chop parsley very finely — tabbouleh is mostly parsley, not grain.",
      "Add parsley to the bowl with tomatoes and onion.",
      "Whisk together lemon juice, olive oil, salt, and pepper.",
      "Pour dressing over the salad and toss well.",
      "Let sit 10 min before serving so flavors meld. Serve chilled with pita bread."
    ]
  },
  {
    name: "Musakhan",
    emoji: "🍗",
    time: "1 hr",
    cuisine: "Middle Eastern",
    baseServings: 4,
    ingredients: [
      { name: "Chicken Thighs", amount: 1.5, unit: "lb" },
      { name: "Onion", amount: 3, unit: "count" },
      { name: "Olive Oil", amount: 4, unit: "tbsp" },
      { name: "Cumin", amount: 1, unit: "tsp" },
      { name: "Coriander", amount: 1, unit: "tsp" },
      { name: "Turmeric", amount: 0.5, unit: "tsp" },
      { name: "Cinnamon", amount: 0.25, unit: "tsp" },
      { name: "Bread", amount: 4, unit: "slices" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Season chicken with cumin, coriander, turmeric, cinnamon, and salt.",
      "Heat olive oil in a pan. Brown chicken 5 min per side. Remove.",
      "In the same pan, cook thinly sliced onions over medium heat 25-30 min until deeply caramelized.",
      "Return chicken to the pan on top of the onions. Cover and cook 20 min until chicken is cooked through.",
      "Toast bread until golden.",
      "Lay toasted bread on a platter. Top with caramelized onions then chicken. Drizzle with olive oil and serve."
    ]
  }
,
  {
    name: "Scrambled Eggs",
    emoji: "🍳",
    time: "10 min",
    cuisine: "Breakfast",
    baseServings: 2,
    ingredients: [
      { name: "Egg", amount: 4, unit: "count" },
      { name: "Butter", amount: 1, unit: "tbsp" },
      { name: "Milk", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 0.25, unit: "tsp" },
      { name: "Pepper", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Crack eggs into a bowl. Add milk, salt, and pepper. Whisk until fully combined.",
      "Melt butter in a non-stick pan over medium-low heat.",
      "Pour in egg mixture. Let sit 20 seconds until edges begin to set.",
      "Using a spatula, gently push eggs from the edges toward the center in slow large folds.",
      "Remove from heat while eggs still look slightly underdone — carry-over heat will finish them.",
      "Serve immediately. Perfect scrambled eggs should be soft, creamy, and barely set."
    ]
  },
  {
    name: "French Toast",
    emoji: "🍞",
    time: "15 min",
    cuisine: "Breakfast",
    baseServings: 2,
    ingredients: [
      { name: "Bread", amount: 4, unit: "slices" },
      { name: "Egg", amount: 2, unit: "count" },
      { name: "Milk", amount: 0.25, unit: "cup" },
      { name: "Butter", amount: 1, unit: "tbsp" },
      { name: "Cinnamon", amount: 0.5, unit: "tsp" },
      { name: "Sugar", amount: 1, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "pinch" }
    ],
    steps: [
      "Whisk together eggs, milk, cinnamon, sugar, and a pinch of salt in a shallow bowl.",
      "Melt butter in a pan over medium heat.",
      "Dip each bread slice in the egg mixture, letting it soak 10 seconds per side.",
      "Cook in the pan 2-3 min per side until deeply golden.",
      "Work in batches, adding more butter as needed.",
      "Serve with honey or powdered sugar."
    ]
  },
  {
    name: "Pancakes",
    emoji: "🥞",
    time: "20 min",
    cuisine: "Breakfast",
    baseServings: 4,
    ingredients: [
      { name: "Flour", amount: 1.5, unit: "cups" },
      { name: "Egg", amount: 2, unit: "count" },
      { name: "Milk", amount: 1, unit: "cup" },
      { name: "Butter", amount: 2, unit: "tbsp" },
      { name: "Baking Powder", amount: 2, unit: "tsp" },
      { name: "Sugar", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Mix flour, baking powder, sugar, and salt in a bowl.",
      "In another bowl whisk eggs, milk, and melted butter.",
      "Pour wet into dry. Stir until just combined — lumps are fine. Do not overmix.",
      "Let batter rest 5 min — this makes fluffier pancakes.",
      "Heat a pan over medium heat. Lightly butter. Pour ¼ cup batter per pancake.",
      "Cook until bubbles form on top, about 2 min. Flip and cook 1-2 min more. Serve with honey."
    ]
  },
  {
    name: "Classic Omelette",
    emoji: "🍳",
    time: "10 min",
    cuisine: "Breakfast",
    baseServings: 1,
    ingredients: [
      { name: "Egg", amount: 3, unit: "count" },
      { name: "Butter", amount: 1, unit: "tbsp" },
      { name: "Cheese", amount: 0.25, unit: "cup" },
      { name: "Salt", amount: 0.25, unit: "tsp" },
      { name: "Pepper", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Crack eggs into a bowl. Season with salt and pepper. Whisk vigorously until completely uniform.",
      "Melt butter in a non-stick pan over medium-high heat until foaming.",
      "Pour in eggs. Immediately start shaking the pan while stirring with a spatula.",
      "When eggs are just set but still slightly wet on top, stop stirring.",
      "Add cheese along the center. Tilt the pan and fold the omelette onto itself.",
      "Slide onto a plate. The outside should be smooth and pale, the inside creamy."
    ]
  },
  {
    name: "Breakfast Burrito",
    emoji: "🌯",
    time: "20 min",
    cuisine: "Breakfast",
    baseServings: 2,
    ingredients: [
      { name: "Egg", amount: 4, unit: "count" },
      { name: "Tortillas", amount: 2, unit: "count" },
      { name: "Bacon", amount: 3, unit: "strips" },
      { name: "Bell Pepper", amount: 0.5, unit: "count" },
      { name: "Onion", amount: 0.25, unit: "count" },
      { name: "Cheese", amount: 0.5, unit: "cup" },
      { name: "Oil", amount: 1, unit: "tbsp" },
      { name: "Salt", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Cook bacon until crispy. Remove and crumble. Keep 1 tbsp bacon fat in the pan.",
      "Sauté diced bell pepper and onion in the fat 3 min until softened.",
      "Whisk eggs with salt. Add to the pan and scramble until just set.",
      "Warm tortillas in a dry pan or microwave.",
      "Layer eggs, bacon, and cheese in the center of each tortilla.",
      "Fold in the sides then roll tightly. Optional: toast seam-side down in the pan for 1 min."
    ]
  },
  {
    name: "Bacon & Eggs",
    emoji: "🥓",
    time: "15 min",
    cuisine: "Breakfast",
    baseServings: 2,
    ingredients: [
      { name: "Bacon", amount: 4, unit: "strips" },
      { name: "Egg", amount: 4, unit: "count" },
      { name: "Butter", amount: 1, unit: "tbsp" },
      { name: "Salt", amount: 0.25, unit: "tsp" },
      { name: "Pepper", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Cook bacon in a cold pan over medium heat — starting cold renders more fat and keeps it flat.",
      "Cook 4-5 min per side until crispy. Drain on paper towels.",
      "Pour off most bacon fat. Add butter to the pan.",
      "Crack eggs into the pan over medium-low heat.",
      "For sunny side up: cook 3 min without flipping. For over easy: flip gently after 2 min.",
      "Season with salt and pepper. Serve with toast."
    ]
  },
  {
    name: "Egg Muffins",
    emoji: "🧁",
    time: "25 min",
    cuisine: "Breakfast",
    baseServings: 6,
    ingredients: [
      { name: "Egg", amount: 6, unit: "count" },
      { name: "Bacon", amount: 3, unit: "strips" },
      { name: "Bell Pepper", amount: 0.5, unit: "count" },
      { name: "Cheese", amount: 0.5, unit: "cup" },
      { name: "Milk", amount: 0.25, unit: "cup" },
      { name: "Salt", amount: 0.25, unit: "tsp" },
      { name: "Pepper", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Preheat oven to 375°F. Grease a muffin tin well.",
      "Cook bacon until crispy. Crumble. Dice bell pepper finely.",
      "Whisk eggs with milk, salt, and pepper until combined.",
      "Divide bacon and bell pepper evenly among muffin cups.",
      "Pour egg mixture over the top. Sprinkle with cheese.",
      "Bake 15-18 min until puffed and set. Store refrigerated up to 4 days."
    ]
  },
  {
    name: "Congee",
    emoji: "🍚",
    time: "45 min",
    cuisine: "Breakfast",
    baseServings: 4,
    ingredients: [
      { name: "Rice", amount: 0.5, unit: "cups" },
      { name: "Chicken Broth", amount: 6, unit: "cups" },
      { name: "Ginger", amount: 1, unit: "tbsp" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Sesame Oil", amount: 1, unit: "tsp" },
      { name: "Soy Sauce", amount: 1, unit: "tbsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Rinse rice well. Combine with chicken broth in a large pot.",
      "Add sliced ginger and minced garlic. Bring to a boil.",
      "Reduce to a low simmer. Cook 35-40 min stirring occasionally until rice has completely broken down into a thick porridge.",
      "Add more broth if too thick — congee should flow slowly off a spoon.",
      "Season with soy sauce and salt.",
      "Ladle into bowls. Drizzle with sesame oil. Top with a soft boiled egg."
    ]
  },
  {
    name: "Crepes",
    emoji: "🫓",
    time: "20 min",
    cuisine: "Breakfast",
    baseServings: 4,
    ingredients: [
      { name: "Flour", amount: 1, unit: "cup" },
      { name: "Egg", amount: 2, unit: "count" },
      { name: "Milk", amount: 1, unit: "cup" },
      { name: "Butter", amount: 2, unit: "tbsp" },
      { name: "Sugar", amount: 1, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "pinch" }
    ],
    steps: [
      "Blend flour, eggs, milk, melted butter, sugar, and salt until smooth. Rest 15 min.",
      "Heat a non-stick pan over medium heat. Lightly butter.",
      "Pour ¼ cup batter into the pan. Immediately tilt and swirl to spread into a thin circle.",
      "Cook 1-2 min until edges are set and bottom is pale golden. Flip.",
      "Cook 30 seconds more. Slide onto a plate.",
      "Fill with honey and cream cheese, or fold and dust with powdered sugar."
    ]
  },
  {
    name: "Waffles",
    emoji: "🧇",
    time: "25 min",
    cuisine: "Breakfast",
    baseServings: 4,
    ingredients: [
      { name: "Flour", amount: 2, unit: "cups" },
      { name: "Egg", amount: 2, unit: "count" },
      { name: "Milk", amount: 1.5, unit: "cups" },
      { name: "Butter", amount: 4, unit: "tbsp" },
      { name: "Baking Powder", amount: 1, unit: "tsp" },
      { name: "Sugar", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Separate eggs. Whisk yolks with milk and melted butter.",
      "Mix flour, baking powder, sugar, and salt in a separate bowl.",
      "Combine wet and dry ingredients until just mixed.",
      "Beat egg whites to stiff peaks. Fold gently into the batter — this is what makes waffles light.",
      "Pour batter into a preheated greased waffle iron. Cook until golden and crispy.",
      "Serve immediately with honey or cream. Waffles lose their crunch fast."
    ]
  },
  {
    name: "Huevos Rancheros",
    emoji: "🌮",
    time: "20 min",
    cuisine: "Breakfast",
    baseServings: 2,
    ingredients: [
      { name: "Egg", amount: 4, unit: "count" },
      { name: "Tortillas", amount: 2, unit: "count" },
      { name: "Tomato", amount: 2, unit: "count" },
      { name: "Onion", amount: 0.5, unit: "count" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Cumin", amount: 0.5, unit: "tsp" },
      { name: "Chili Flakes", amount: 0.25, unit: "tsp" },
      { name: "Olive Oil", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Make salsa: dice tomatoes, onion, and garlic. Simmer in olive oil with cumin, chili flakes, and salt for 10 min.",
      "Warm tortillas in a dry pan until lightly charred.",
      "In the same pan with a little olive oil, fry eggs sunny-side up.",
      "Lay warm tortillas on plates. Spoon salsa generously over each.",
      "Top with fried eggs.",
      "Serve immediately with sour cream and cheese if desired."
    ]
  },
  {
    name: "Breakfast Fried Rice",
    emoji: "🍳",
    time: "15 min",
    cuisine: "Breakfast",
    baseServings: 2,
    ingredients: [
      { name: "Rice", amount: 2, unit: "cups" },
      { name: "Egg", amount: 3, unit: "count" },
      { name: "Bacon", amount: 3, unit: "strips" },
      { name: "Onion", amount: 0.5, unit: "count" },
      { name: "Soy Sauce", amount: 2, unit: "tbsp" },
      { name: "Sesame Oil", amount: 1, unit: "tsp" },
      { name: "Oil", amount: 1, unit: "tbsp" }
    ],
    steps: [
      "Use cold day-old rice — fresh rice makes mushy fried rice.",
      "Cook bacon until crispy in a wok. Remove and crumble. Keep the fat.",
      "Sauté diced onion 2 min over high heat.",
      "Push to the side. Scramble eggs in the center until just set.",
      "Add rice. Toss everything together over high heat pressing rice against the wok for slight char.",
      "Add soy sauce and sesame oil. Top with crumbled bacon. Serve immediately."
    ]
  },
  {
    name: "Turkish Eggs",
    emoji: "🍳",
    time: "15 min",
    cuisine: "Breakfast",
    baseServings: 2,
    ingredients: [
      { name: "Egg", amount: 4, unit: "count" },
      { name: "Greek Yogurt", amount: 1, unit: "cup" },
      { name: "Butter", amount: 2, unit: "tbsp" },
      { name: "Garlic", amount: 1, unit: "cloves" },
      { name: "Paprika", amount: 1, unit: "tsp" },
      { name: "Chili Flakes", amount: 0.5, unit: "tsp" },
      { name: "Vinegar", amount: 1, unit: "tbsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Mix Greek yogurt with minced garlic and a pinch of salt. Spread across two plates.",
      "Bring a pot of water to a gentle simmer. Add vinegar.",
      "Crack each egg into a small cup. Swirl the water and slide eggs in one at a time.",
      "Poach 3-4 min until whites are set but yolks are still runny. Remove with a slotted spoon.",
      "Melt butter in a small pan. Add paprika and chili flakes. Sizzle 30 seconds.",
      "Place poached eggs on the yogurt. Drizzle the red butter over the top. Serve with bread."
    ]
  },
  {
    name: "Potato Hash",
    emoji: "🥔",
    time: "25 min",
    cuisine: "Breakfast",
    baseServings: 2,
    ingredients: [
      { name: "Potato", amount: 3, unit: "count" },
      { name: "Bacon", amount: 3, unit: "strips" },
      { name: "Onion", amount: 0.5, unit: "count" },
      { name: "Bell Pepper", amount: 0.5, unit: "count" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Smoked Paprika", amount: 0.5, unit: "tsp" },
      { name: "Oil", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" },
      { name: "Pepper", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Dice potatoes into small cubes. Microwave 4 min to par-cook.",
      "Cook bacon until crispy. Remove and crumble.",
      "In the same pan with bacon fat fry potatoes over medium-high heat. Don't stir for 3-4 min — let them crust.",
      "Add diced onion, bell pepper, and garlic. Cook 5 min stirring occasionally.",
      "Season with smoked paprika, salt, and pepper.",
      "Top with crumbled bacon. Serve with fried eggs."
    ]
  },
  {
    name: "Egg & Cheese Sandwich",
    emoji: "🥪",
    time: "10 min",
    cuisine: "Breakfast",
    baseServings: 1,
    ingredients: [
      { name: "Egg", amount: 2, unit: "count" },
      { name: "Bread", amount: 2, unit: "slices" },
      { name: "American Cheese", amount: 1, unit: "slices" },
      { name: "Butter", amount: 1, unit: "tbsp" },
      { name: "Salt", amount: 0.25, unit: "tsp" },
      { name: "Pepper", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Toast bread until golden.",
      "Melt butter in a non-stick pan over medium heat.",
      "Crack eggs into the pan. Break yolks and let cook flat like a patty, about 2 min.",
      "Season with salt and pepper. Flip and cook 1 more min.",
      "Place cheese on top and let melt.",
      "Stack on toasted bread and serve immediately."
    ]
  },
  {
    name: "Spanish Tortilla",
    emoji: "🍳",
    time: "35 min",
    cuisine: "Breakfast",
    baseServings: 4,
    ingredients: [
      { name: "Egg", amount: 6, unit: "count" },
      { name: "Potato", amount: 3, unit: "count" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Olive Oil", amount: 0.5, unit: "cup" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Thinly slice potatoes and onion. Heat olive oil in a pan over medium heat.",
      "Add potato and onion. Cook 20 min until potatoes are tender but not browned. Drain excess oil.",
      "Whisk eggs with salt. Add potato mixture to the eggs. Let sit 5 min.",
      "Heat 1 tbsp oil in the pan. Pour in egg and potato mixture.",
      "Cook until edges are set, about 5 min. Flip using a large plate.",
      "Slide back into the pan. Cook 3-5 more min. Serve warm or at room temperature."
    ]
  },
  {
    name: "Soft Boiled Eggs & Toast",
    emoji: "🥚",
    time: "10 min",
    cuisine: "Breakfast",
    baseServings: 2,
    ingredients: [
      { name: "Egg", amount: 4, unit: "count" },
      { name: "Bread", amount: 4, unit: "slices" },
      { name: "Butter", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 0.25, unit: "tsp" },
      { name: "Pepper", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Bring a pot of water to a full boil.",
      "Gently lower eggs in using a spoon.",
      "Cook exactly 6 minutes for runny yolk, 7 minutes for jammy.",
      "Transfer immediately to ice water for 1 minute.",
      "Toast bread and butter generously. Cut into long soldiers for dipping.",
      "Tap the top of each egg, peel away, and season. Dip your soldiers."
    ]
  },
  {
    name: "Caesar Salad",
    emoji: "🥗",
    time: "15 min",
    cuisine: "American",
    baseServings: 4,
    ingredients: [
      { name: "Spinach", amount: 4, unit: "cups" },
      { name: "Parmesan", amount: 0.5, unit: "cup" },
      { name: "Bread", amount: 2, unit: "slices" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Olive Oil", amount: 3, unit: "tbsp" },
      { name: "Lemon", amount: 1, unit: "count" },
      { name: "Dijon Mustard", amount: 1, unit: "tsp" },
      { name: "Worcestershire Sauce", amount: 1, unit: "tsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" },
      { name: "Pepper", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Make croutons: cube bread, toss with olive oil and a pinch of garlic, toast in oven at 375°F for 10 min.",
      "Make dressing: whisk lemon juice, dijon mustard, worcestershire, minced garlic, salt, and pepper. Drizzle in olive oil while whisking.",
      "Toss spinach with dressing until well coated.",
      "Add half the parmesan and toss again.",
      "Top with croutons and remaining parmesan.",
      "Serve immediately — dressed salad wilts quickly."
    ]
  },
  {
    name: "Greek Salad",
    emoji: "🥗",
    time: "10 min",
    cuisine: "Greek",
    baseServings: 4,
    ingredients: [
      { name: "Tomato", amount: 3, unit: "count" },
      { name: "Bell Pepper", amount: 1, unit: "count" },
      { name: "Red Onion", amount: 0.5, unit: "count" },
      { name: "Mozzarella", amount: 1, unit: "cup" },
      { name: "Olive Oil", amount: 3, unit: "tbsp" },
      { name: "Lemon", amount: 1, unit: "count" },
      { name: "Oregano", amount: 1, unit: "tsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" },
      { name: "Pepper", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Chop tomatoes into large chunks. Dice bell pepper and red onion.",
      "Combine vegetables in a large bowl.",
      "Add mozzarella cubes on top.",
      "Drizzle with olive oil and lemon juice.",
      "Season with oregano, salt, and pepper.",
      "Toss gently and serve immediately."
    ]
  },
  {
    name: "Caprese Salad",
    emoji: "🍅",
    time: "10 min",
    cuisine: "Italian",
    baseServings: 4,
    ingredients: [
      { name: "Tomato", amount: 4, unit: "count" },
      { name: "Mozzarella", amount: 1.5, unit: "cups" },
      { name: "Basil", amount: 1, unit: "bunch" },
      { name: "Olive Oil", amount: 3, unit: "tbsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" },
      { name: "Pepper", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Slice tomatoes and mozzarella into even rounds about ¼ inch thick.",
      "Arrange alternating slices on a platter.",
      "Tuck fresh basil leaves between the slices.",
      "Drizzle generously with olive oil.",
      "Season with salt and black pepper.",
      "Serve at room temperature — never refrigerate a caprese."
    ]
  },
  {
    name: "Pasta Salad",
    emoji: "🍝",
    time: "20 min",
    cuisine: "Italian",
    baseServings: 6,
    ingredients: [
      { name: "Pasta", amount: 300, unit: "g" },
      { name: "Tomato", amount: 2, unit: "count" },
      { name: "Bell Pepper", amount: 1, unit: "count" },
      { name: "Red Onion", amount: 0.5, unit: "count" },
      { name: "Olive Oil", amount: 4, unit: "tbsp" },
      { name: "Vinegar", amount: 2, unit: "tbsp" },
      { name: "Italian Seasoning", amount: 1, unit: "tsp" },
      { name: "Parmesan", amount: 0.5, unit: "cup" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Cook pasta until al dente. Rinse under cold water. Drain well.",
      "Dice tomatoes, bell pepper, and red onion into small pieces.",
      "Whisk olive oil, vinegar, Italian seasoning, salt, and pepper to make the dressing.",
      "Combine cooled pasta with all vegetables.",
      "Pour dressing over and toss well.",
      "Add parmesan and toss again. Refrigerate 30 min before serving."
    ]
  },
  {
    name: "Potato Salad",
    emoji: "🥔",
    time: "30 min",
    cuisine: "American",
    baseServings: 6,
    ingredients: [
      { name: "Potato", amount: 6, unit: "count" },
      { name: "Egg", amount: 3, unit: "count" },
      { name: "Red Onion", amount: 0.5, unit: "count" },
      { name: "Dijon Mustard", amount: 2, unit: "tbsp" },
      { name: "Sour Cream", amount: 0.5, unit: "cup" },
      { name: "Vinegar", amount: 1, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "tsp" },
      { name: "Pepper", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Boil potatoes until just tender about 15-20 min. Cool completely.",
      "Hard boil eggs 10 min. Cool in ice water, peel, and chop.",
      "Peel and cube cooled potatoes.",
      "Make dressing: mix sour cream, dijon mustard, vinegar, salt, and pepper.",
      "Combine potatoes, eggs, and diced red onion.",
      "Fold in dressing gently. Refrigerate at least 1 hour before serving."
    ]
  },
  {
    name: "Spinach Bacon Salad",
    emoji: "🥗",
    time: "15 min",
    cuisine: "American",
    baseServings: 4,
    ingredients: [
      { name: "Spinach", amount: 4, unit: "cups" },
      { name: "Bacon", amount: 4, unit: "strips" },
      { name: "Egg", amount: 2, unit: "count" },
      { name: "Red Onion", amount: 0.25, unit: "count" },
      { name: "Vinegar", amount: 2, unit: "tbsp" },
      { name: "Dijon Mustard", amount: 1, unit: "tsp" },
      { name: "Olive Oil", amount: 3, unit: "tbsp" },
      { name: "Salt", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Hard boil eggs 10 min. Cool, peel, and slice.",
      "Cook bacon until crispy. Remove and crumble. Keep 1 tbsp drippings.",
      "Make warm dressing: add vinegar and dijon to the bacon drippings. Whisk in olive oil.",
      "Place spinach in a large bowl. Thinly slice red onion and add.",
      "Pour warm dressing over spinach — it will wilt slightly.",
      "Top with sliced eggs and crumbled bacon. Serve immediately."
    ]
  },
  {
    name: "Thai Beef Salad",
    emoji: "🥗",
    time: "20 min",
    cuisine: "Asian",
    baseServings: 2,
    ingredients: [
      { name: "Beef Flank", amount: 0.5, unit: "lb" },
      { name: "Red Onion", amount: 0.5, unit: "count" },
      { name: "Tomato", amount: 1, unit: "count" },
      { name: "Lime", amount: 2, unit: "count" },
      { name: "Fish Sauce", amount: 2, unit: "tbsp" },
      { name: "Sugar", amount: 1, unit: "tsp" },
      { name: "Chili Flakes", amount: 0.5, unit: "tsp" },
      { name: "Garlic", amount: 1, unit: "cloves" },
      { name: "Sesame Oil", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Season beef with salt. Sear in a hot pan over high heat 3-4 min per side for medium-rare.",
      "Rest 5 min then slice thinly against the grain.",
      "Make dressing: whisk lime juice, fish sauce, sugar, minced garlic, and chili flakes.",
      "Thinly slice red onion and tomato.",
      "Combine sliced beef, onion, and tomato.",
      "Pour dressing over and toss. Drizzle with sesame oil. Serve immediately."
    ]
  },
  {
    name: "Egg Salad",
    emoji: "🥚",
    time: "15 min",
    cuisine: "American",
    baseServings: 4,
    ingredients: [
      { name: "Egg", amount: 6, unit: "count" },
      { name: "Dijon Mustard", amount: 1, unit: "tbsp" },
      { name: "Sour Cream", amount: 3, unit: "tbsp" },
      { name: "Red Onion", amount: 0.25, unit: "count" },
      { name: "Lemon", amount: 0.5, unit: "count" },
      { name: "Salt", amount: 0.5, unit: "tsp" },
      { name: "Pepper", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Hard boil eggs 10-12 min. Transfer to ice water, peel, and chop roughly.",
      "Finely dice red onion.",
      "Mix dijon mustard, sour cream, lemon juice, salt, and pepper.",
      "Fold eggs and onion into the dressing gently.",
      "Taste and adjust seasoning.",
      "Serve on toast or in a sandwich. Refrigerate up to 3 days."
    ]
  },
  {
    name: "Tomato Basil Salad",
    emoji: "🍅",
    time: "10 min",
    cuisine: "Italian",
    baseServings: 4,
    ingredients: [
      { name: "Tomato", amount: 4, unit: "count" },
      { name: "Basil", amount: 1, unit: "bunch" },
      { name: "Garlic", amount: 1, unit: "cloves" },
      { name: "Olive Oil", amount: 3, unit: "tbsp" },
      { name: "Vinegar", amount: 1, unit: "tbsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" },
      { name: "Pepper", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Slice tomatoes into thick rounds or wedges.",
      "Arrange on a platter.",
      "Mince garlic and scatter over the tomatoes.",
      "Drizzle with olive oil and vinegar.",
      "Season with salt and pepper.",
      "Tear basil leaves and scatter over the top. Let sit 5 min — the salt draws out the juices."
    ]
  },
  {
    name: "Mushroom Spinach Salad",
    emoji: "🍄",
    time: "15 min",
    cuisine: "American",
    baseServings: 4,
    ingredients: [
      { name: "Spinach", amount: 4, unit: "cups" },
      { name: "Mushrooms", amount: 2, unit: "cups" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Olive Oil", amount: 3, unit: "tbsp" },
      { name: "Lemon", amount: 1, unit: "count" },
      { name: "Parmesan", amount: 0.25, unit: "cup" },
      { name: "Salt", amount: 0.5, unit: "tsp" },
      { name: "Pepper", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Sauté sliced mushrooms in 2 tbsp olive oil over high heat until golden, about 5 min. Season and set aside.",
      "Add garlic to the pan. Cook 30 seconds.",
      "Whisk remaining olive oil with lemon juice, salt, and pepper for the dressing.",
      "Place spinach in a large bowl.",
      "Add warm mushrooms on top — the heat gently wilts the spinach.",
      "Pour dressing over and toss. Top with parmesan and serve immediately."
    ]
  }
,
  {
    name: "Tom Yum Soup",
    emoji: "🍲",
    time: "30 min",
    cuisine: "Thai",
    baseServings: 4,
    ingredients: [
      { name: "Shrimp", amount: 0.5, unit: "lb" },
      { name: "Mushrooms", amount: 1, unit: "cup" },
      { name: "Chicken Broth", amount: 4, unit: "cups" },
      { name: "Lemongrass", amount: 2, unit: "stalks" },
      { name: "Ginger", amount: 1, unit: "tbsp" },
      { name: "Lime", amount: 2, unit: "count" },
      { name: "Fish Sauce", amount: 2, unit: "tbsp" },
      { name: "Chili Flakes", amount: 1, unit: "tsp" },
      { name: "Tomato", amount: 2, unit: "count" },
      { name: "Sugar", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Bring chicken broth to a boil. Add bruised lemongrass and sliced ginger. Simmer 10 min to infuse.",
      "Add sliced mushrooms and diced tomatoes. Cook 5 min.",
      "Add shrimp. Cook 2-3 min until pink.",
      "Season with fish sauce, lime juice, sugar, and chili flakes.",
      "Taste and adjust — it should be sour, spicy, and slightly salty.",
      "Remove lemongrass before serving. Ladle into bowls."
    ]
  },
  {
    name: "Minestrone",
    emoji: "🍲",
    time: "40 min",
    cuisine: "Italian",
    baseServings: 6,
    ingredients: [
      { name: "Pasta", amount: 100, unit: "g" },
      { name: "Canned Tomatoes", amount: 2, unit: "cups" },
      { name: "Chicken Broth", amount: 4, unit: "cups" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Carrot", amount: 2, unit: "count" },
      { name: "Potato", amount: 2, unit: "count" },
      { name: "Spinach", amount: 2, unit: "cups" },
      { name: "Olive Oil", amount: 3, unit: "tbsp" },
      { name: "Italian Seasoning", amount: 1, unit: "tsp" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Heat olive oil in a large pot. Sauté diced onion and garlic 5 min.",
      "Add diced carrots and potatoes. Cook 3 min.",
      "Add canned tomatoes, broth, and Italian seasoning. Bring to a boil.",
      "Simmer 15 min until vegetables are tender.",
      "Add pasta and cook 8-10 min until al dente.",
      "Stir in spinach until wilted. Season with salt. Serve with parmesan."
    ]
  },
  {
    name: "Miso Soup",
    emoji: "🍜",
    time: "10 min",
    cuisine: "Japanese",
    baseServings: 4,
    ingredients: [
      { name: "Mushrooms", amount: 1, unit: "cup" },
      { name: "Chicken Broth", amount: 4, unit: "cups" },
      { name: "Soy Sauce", amount: 1, unit: "tbsp" },
      { name: "Sesame Oil", amount: 1, unit: "tsp" },
      { name: "Ginger", amount: 1, unit: "tsp" },
      { name: "Egg", amount: 2, unit: "count" },
      { name: "Onion", amount: 2, unit: "count" },
      { name: "Salt", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Bring chicken broth to a simmer. Add ginger and soy sauce.",
      "Add sliced mushrooms. Cook 3 min.",
      "Whisk eggs and drizzle slowly into the simmering broth while stirring to create ribbons.",
      "Season with salt and sesame oil.",
      "Slice green onions thinly.",
      "Ladle into bowls and top with green onions. Serve immediately."
    ]
  },
  {
    name: "Tortilla Soup",
    emoji: "🍲",
    time: "35 min",
    cuisine: "Mexican",
    baseServings: 4,
    ingredients: [
      { name: "Chicken", amount: 1, unit: "lb" },
      { name: "Canned Tomatoes", amount: 2, unit: "cups" },
      { name: "Chicken Broth", amount: 4, unit: "cups" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Cumin", amount: 1, unit: "tsp" },
      { name: "Chili Flakes", amount: 0.5, unit: "tsp" },
      { name: "Tortillas", amount: 4, unit: "count" },
      { name: "Olive Oil", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Heat olive oil in a pot. Sauté diced onion and garlic 5 min.",
      "Add cumin and chili flakes. Stir 30 seconds.",
      "Add canned tomatoes and broth. Bring to a boil.",
      "Add chicken breasts whole. Simmer 20 min until cooked through. Remove and shred.",
      "Return chicken to the pot. Season with salt.",
      "Cut tortillas into strips and bake at 400°F 8 min until crispy. Serve soup topped with tortilla strips and sour cream."
    ]
  },
  {
    name: "Tomato Bisque",
    emoji: "🍅",
    time: "35 min",
    cuisine: "American",
    baseServings: 4,
    ingredients: [
      { name: "Canned Tomatoes", amount: 3, unit: "cups" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Heavy Cream", amount: 0.5, unit: "cup" },
      { name: "Chicken Broth", amount: 2, unit: "cups" },
      { name: "Butter", amount: 2, unit: "tbsp" },
      { name: "Tomato Paste", amount: 2, unit: "tbsp" },
      { name: "Sugar", amount: 1, unit: "tsp" },
      { name: "Salt", amount: 1, unit: "tsp" },
      { name: "Pepper", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Melt butter in a pot over medium heat. Sauté diced onion 8 min until soft.",
      "Add garlic and tomato paste. Cook 2 min.",
      "Add canned tomatoes, broth, and sugar. Bring to a boil.",
      "Simmer 15 min. Blend completely smooth with an immersion blender.",
      "Stir in heavy cream. Simmer 5 more min.",
      "Season with salt and pepper. Serve with grilled cheese for dipping."
    ]
  },
  {
    name: "Chicken Noodle Soup",
    emoji: "🍜",
    time: "40 min",
    cuisine: "American",
    baseServings: 6,
    ingredients: [
      { name: "Chicken", amount: 1, unit: "lb" },
      { name: "Noodles", amount: 1, unit: "pack" },
      { name: "Chicken Broth", amount: 6, unit: "cups" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Ginger", amount: 1, unit: "tsp" },
      { name: "Thyme", amount: 2, unit: "sprigs" },
      { name: "Bay Leaf", amount: 2, unit: "leaves" },
      { name: "Salt", amount: 1, unit: "tsp" },
      { name: "Pepper", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Add chicken, broth, diced onion, garlic, ginger, thyme, and bay leaves to a large pot.",
      "Bring to a boil then reduce to a simmer. Cook 25 min.",
      "Remove chicken and shred. Remove bay leaves and thyme.",
      "Return shredded chicken to the pot.",
      "Add noodles and cook per package directions.",
      "Season with salt and pepper. Serve hot — this soup cures everything."
    ]
  },
  {
    name: "Hot & Sour Soup",
    emoji: "🍲",
    time: "25 min",
    cuisine: "Asian",
    baseServings: 4,
    ingredients: [
      { name: "Mushrooms", amount: 1, unit: "cup" },
      { name: "Chicken Broth", amount: 4, unit: "cups" },
      { name: "Egg", amount: 2, unit: "count" },
      { name: "Corn Starch", amount: 2, unit: "tbsp" },
      { name: "Vinegar", amount: 3, unit: "tbsp" },
      { name: "Soy Sauce", amount: 2, unit: "tbsp" },
      { name: "Sesame Oil", amount: 1, unit: "tsp" },
      { name: "White Pepper", amount: 1, unit: "tsp" },
      { name: "Ginger", amount: 1, unit: "tsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Bring broth to a boil. Add ginger and sliced mushrooms. Cook 5 min.",
      "Mix cornstarch with 3 tbsp cold water. Stir into broth until slightly thickened.",
      "Add soy sauce, vinegar, and white pepper. Stir.",
      "Beat eggs and drizzle slowly into the soup while stirring to create ribbons.",
      "Add sesame oil. Taste and adjust vinegar and pepper.",
      "Ladle into bowls. This soup should be tangy, spicy, and deeply savory."
    ]
  },
  {
    name: "Lemon Chicken Soup",
    emoji: "🍋",
    time: "30 min",
    cuisine: "Greek",
    baseServings: 4,
    ingredients: [
      { name: "Chicken", amount: 1, unit: "lb" },
      { name: "Rice", amount: 0.5, unit: "cups" },
      { name: "Egg", amount: 3, unit: "count" },
      { name: "Lemon", amount: 2, unit: "count" },
      { name: "Chicken Broth", amount: 6, unit: "cups" },
      { name: "Salt", amount: 1, unit: "tsp" },
      { name: "Pepper", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Simmer chicken in broth 20 min until cooked. Remove and shred.",
      "Add rice to the broth. Cook 15 min until tender.",
      "Whisk eggs and lemon juice together in a bowl.",
      "Slowly ladle 2 cups of hot broth into the egg mixture while whisking constantly — this tempers the eggs.",
      "Pour the egg mixture back into the pot while stirring. Do not boil again or eggs will scramble.",
      "Return chicken. Season with salt and pepper. The soup should be creamy and lemony."
    ]
  },
  {
    name: "Garlic Bread",
    emoji: "🥖",
    time: "15 min",
    cuisine: "Italian",
    baseServings: 4,
    ingredients: [
      { name: "Bread", amount: 1, unit: "loaf" },
      { name: "Butter", amount: 4, unit: "tbsp" },
      { name: "Garlic", amount: 4, unit: "cloves" },
      { name: "Parmesan", amount: 0.25, unit: "cup" },
      { name: "Italian Seasoning", amount: 0.5, unit: "tsp" },
      { name: "Salt", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Preheat oven to 375°F.",
      "Mix softened butter with minced garlic, Italian seasoning, and salt.",
      "Slice bread in half lengthwise.",
      "Spread garlic butter generously over the cut sides.",
      "Sprinkle with parmesan.",
      "Bake 10-12 min until golden and crispy at the edges. Broil the last 2 min for extra crunch."
    ]
  },
  {
    name: "Spring Rolls",
    emoji: "🥢",
    time: "30 min",
    cuisine: "Asian",
    baseServings: 4,
    ingredients: [
      { name: "Ground Pork", amount: 0.5, unit: "lb" },
      { name: "Mushrooms", amount: 1, unit: "cup" },
      { name: "Onion", amount: 0.5, unit: "count" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Soy Sauce", amount: 2, unit: "tbsp" },
      { name: "Sesame Oil", amount: 1, unit: "tsp" },
      { name: "Corn Starch", amount: 1, unit: "tbsp" },
      { name: "Oil", amount: 2, unit: "cups" },
      { name: "Salt", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Cook ground pork in a pan until browned. Add minced garlic, diced onion, and mushrooms.",
      "Season with soy sauce and sesame oil. Cook 3 min. Mix in cornstarch to bind.",
      "Let filling cool completely — warm filling makes soggy rolls.",
      "Place 2 tbsp filling on the lower third of each wrapper. Fold sides in then roll tightly.",
      "Seal the edge with water.",
      "Fry in oil at 350°F for 3-4 min until golden. Drain and serve with sweet chili sauce."
    ]
  },
  {
    name: "Dumplings",
    emoji: "🥟",
    time: "45 min",
    cuisine: "Asian",
    baseServings: 4,
    ingredients: [
      { name: "Ground Pork", amount: 0.5, unit: "lb" },
      { name: "Flour", amount: 2, unit: "cups" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Ginger", amount: 1, unit: "tsp" },
      { name: "Soy Sauce", amount: 2, unit: "tbsp" },
      { name: "Sesame Oil", amount: 1, unit: "tsp" },
      { name: "Onion", amount: 2, unit: "count" },
      { name: "Salt", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Make dough: mix flour with ½ cup boiling water. Knead 5 min until smooth. Rest 20 min covered.",
      "Make filling: combine ground pork, minced garlic, ginger, soy sauce, sesame oil, and sliced green onions.",
      "Roll dough thin and cut into 3-inch circles.",
      "Place 1 tsp filling in the center. Fold and pleat the edges to seal.",
      "Pan-fry in oil over medium heat 2 min until golden on the bottom.",
      "Add ¼ cup water. Cover immediately and steam 6 min until water evaporates. Serve with soy sauce."
    ]
  },
  {
    name: "Bruschetta",
    emoji: "🍅",
    time: "15 min",
    cuisine: "Italian",
    baseServings: 4,
    ingredients: [
      { name: "Bread", amount: 1, unit: "loaf" },
      { name: "Tomato", amount: 3, unit: "count" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Basil", amount: 1, unit: "bunch" },
      { name: "Olive Oil", amount: 3, unit: "tbsp" },
      { name: "Vinegar", amount: 1, unit: "tbsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" },
      { name: "Pepper", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Slice bread into thick rounds. Brush with olive oil.",
      "Toast under broiler or in a pan until deeply golden.",
      "Rub each slice immediately with a raw garlic clove — the rough surface grates the garlic onto the bread.",
      "Dice tomatoes finely. Toss with olive oil, vinegar, salt, and pepper.",
      "Tear basil and mix into the tomatoes.",
      "Spoon tomato mixture onto toasted bread just before serving — don't let it sit or bread goes soggy."
    ]
  },
  {
    name: "Stuffed Mushrooms",
    emoji: "🍄",
    time: "30 min",
    cuisine: "American",
    baseServings: 4,
    ingredients: [
      { name: "Mushrooms", amount: 2, unit: "cups" },
      { name: "Cream Cheese", amount: 0.5, unit: "cup" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Parmesan", amount: 0.25, unit: "cup" },
      { name: "Bacon", amount: 3, unit: "strips" },
      { name: "Olive Oil", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 0.25, unit: "tsp" },
      { name: "Pepper", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Preheat oven to 375°F. Remove mushroom stems and chop finely.",
      "Cook bacon until crispy. Crumble. Sauté chopped stems with garlic in bacon fat 3 min.",
      "Mix cream cheese, parmesan, bacon, and cooked stems. Season with salt and pepper.",
      "Brush mushroom caps with olive oil. Fill each generously with the cream cheese mixture.",
      "Place on a baking sheet.",
      "Bake 20 min until mushrooms are tender and tops are golden."
    ]
  },
  {
    name: "Mac & Cheese",
    emoji: "🧀",
    time: "30 min",
    cuisine: "American",
    baseServings: 4,
    ingredients: [
      { name: "Pasta", amount: 300, unit: "g" },
      { name: "Cheese", amount: 2, unit: "cups" },
      { name: "Milk", amount: 1.5, unit: "cups" },
      { name: "Butter", amount: 3, unit: "tbsp" },
      { name: "Flour", amount: 2, unit: "tbsp" },
      { name: "Cream Cheese", amount: 0.25, unit: "cup" },
      { name: "Salt", amount: 0.5, unit: "tsp" },
      { name: "Pepper", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Cook pasta until al dente. Drain and set aside.",
      "Melt butter in the same pot over medium heat. Whisk in flour and cook 1 min.",
      "Gradually whisk in milk until smooth. Simmer 3-4 min until thickened.",
      "Remove from heat. Add cream cheese and stir until melted.",
      "Add shredded cheese in handfuls, stirring between each addition.",
      "Add pasta and toss to coat. Season with salt and pepper. Serve immediately."
    ]
  },
  {
    name: "Mashed Potatoes",
    emoji: "🥔",
    time: "30 min",
    cuisine: "American",
    baseServings: 4,
    ingredients: [
      { name: "Potato", amount: 6, unit: "count" },
      { name: "Butter", amount: 4, unit: "tbsp" },
      { name: "Heavy Cream", amount: 0.5, unit: "cup" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Salt", amount: 1, unit: "tsp" },
      { name: "Pepper", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Peel and cube potatoes. Boil in salted water 20 min until very tender.",
      "Warm heavy cream and butter together in a small pan.",
      "Drain potatoes completely. Return to the hot pot and let steam dry 1 min.",
      "Mash potatoes until no lumps remain.",
      "Pour in warm cream mixture gradually, stirring until smooth and fluffy.",
      "Season with salt and pepper. Serve immediately topped with extra butter."
    ]
  },
  {
    name: "Guacamole",
    emoji: "🥑",
    time: "10 min",
    cuisine: "Mexican",
    baseServings: 4,
    ingredients: [
      { name: "Lime", amount: 2, unit: "count" },
      { name: "Red Onion", amount: 0.25, unit: "count" },
      { name: "Tomato", amount: 1, unit: "count" },
      { name: "Garlic", amount: 1, unit: "cloves" },
      { name: "Chili Flakes", amount: 0.25, unit: "tsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Halve avocados and remove the pit. Scoop flesh into a bowl.",
      "Add lime juice immediately to prevent browning.",
      "Mash with a fork to your preferred texture — chunky or smooth.",
      "Finely dice red onion, tomato, and garlic. Add to the bowl.",
      "Season with chili flakes and salt.",
      "Taste and adjust lime and salt. Serve immediately with tortilla chips."
    ]
  },
  {
    name: "Deviled Eggs",
    emoji: "🥚",
    time: "20 min",
    cuisine: "American",
    baseServings: 6,
    ingredients: [
      { name: "Egg", amount: 6, unit: "count" },
      { name: "Dijon Mustard", amount: 1, unit: "tbsp" },
      { name: "Sour Cream", amount: 2, unit: "tbsp" },
      { name: "Vinegar", amount: 1, unit: "tsp" },
      { name: "Paprika", amount: 0.5, unit: "tsp" },
      { name: "Salt", amount: 0.25, unit: "tsp" },
      { name: "Pepper", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Hard boil eggs 12 min. Transfer to ice water. Peel carefully.",
      "Slice eggs in half lengthwise. Pop yolks into a bowl.",
      "Mash yolks with dijon mustard, sour cream, vinegar, salt, and pepper until smooth.",
      "Taste and adjust seasoning — it should be tangy and rich.",
      "Spoon or pipe filling back into egg white halves.",
      "Dust with paprika and serve chilled."
    ]
  },
  {
    name: "Roasted Vegetables",
    emoji: "🥦",
    time: "35 min",
    cuisine: "Healthy",
    baseServings: 4,
    ingredients: [
      { name: "Broccoli", amount: 1, unit: "head" },
      { name: "Bell Pepper", amount: 2, unit: "count" },
      { name: "Mushrooms", amount: 1, unit: "cup" },
      { name: "Red Onion", amount: 1, unit: "count" },
      { name: "Olive Oil", amount: 3, unit: "tbsp" },
      { name: "Garlic Powder", amount: 1, unit: "tsp" },
      { name: "Italian Seasoning", amount: 1, unit: "tsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" },
      { name: "Pepper", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Preheat oven to 425°F.",
      "Cut all vegetables into similar sized pieces so they cook evenly.",
      "Toss with olive oil, garlic powder, Italian seasoning, salt, and pepper.",
      "Spread in a single layer on a large baking sheet — do not crowd or they will steam instead of roast.",
      "Roast 20-25 min until edges are caramelized and slightly charred.",
      "Serve as a side or over rice."
    ]
  }
,
  {
    name: "Gyoza",
    emoji: "🥟",
    time: "30 min",
    cuisine: "Japanese",
    baseServings: 4,
    ingredients: [
      { name: "Ground Pork", amount: 0.5, unit: "lb" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Ginger", amount: 1, unit: "tsp" },
      { name: "Soy Sauce", amount: 2, unit: "tbsp" },
      { name: "Sesame Oil", amount: 1, unit: "tsp" },
      { name: "Flour", amount: 2, unit: "cups" },
      { name: "Onion", amount: 2, unit: "count" },
      { name: "Oil", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Mix flour with ½ cup boiling water. Knead until smooth. Rest 20 min.",
      "Combine ground pork, minced garlic, ginger, soy sauce, sesame oil, and sliced green onions.",
      "Roll dough thin. Cut into 3-inch circles.",
      "Place 1 tsp filling in center. Fold and pleat edges tightly to seal.",
      "Heat oil in a pan over medium-high. Place gyoza flat-side down. Cook 2 min until golden.",
      "Add ¼ cup water. Cover and steam 5 min until water evaporates. Serve with soy sauce and vinegar."
    ]
  },
  {
    name: "Teriyaki Salmon",
    emoji: "🐟",
    time: "20 min",
    cuisine: "Japanese",
    baseServings: 2,
    ingredients: [
      { name: "Salmon", amount: 2, unit: "fillets" },
      { name: "Soy Sauce", amount: 3, unit: "tbsp" },
      { name: "Honey", amount: 2, unit: "tbsp" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Ginger", amount: 1, unit: "tsp" },
      { name: "Sesame Oil", amount: 1, unit: "tsp" },
      { name: "Oil", amount: 1, unit: "tbsp" }
    ],
    steps: [
      "Mix soy sauce, honey, minced garlic, ginger, and sesame oil into a marinade.",
      "Pat salmon dry. Marinate 15 min.",
      "Heat oil in an oven-safe pan over medium-high heat.",
      "Sear salmon skin-side up 3 min until golden. Flip.",
      "Pour remaining marinade over the top. It will bubble and thicken.",
      "Baste continuously 2-3 min until salmon is cooked and glazed. Serve over rice."
    ]
  },
  {
    name: "Katsu Curry",
    emoji: "🍛",
    time: "45 min",
    cuisine: "Japanese",
    baseServings: 4,
    ingredients: [
      { name: "Chicken Thighs", amount: 1.5, unit: "lb" },
      { name: "Panko Breadcrumbs", amount: 1, unit: "cup" },
      { name: "Egg", amount: 2, unit: "count" },
      { name: "Flour", amount: 0.5, unit: "cup" },
      { name: "Curry Powder", amount: 2, unit: "tsp" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Chicken Broth", amount: 2, unit: "cups" },
      { name: "Oil", amount: 2, unit: "cups" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Pound chicken thighs flat. Season with salt.",
      "Set up three bowls: flour, beaten eggs, and panko breadcrumbs.",
      "Coat chicken in flour, then egg, then panko pressing firmly.",
      "Fry in oil at 350°F for 5-6 min per side until golden and cooked through. Drain.",
      "Make curry sauce: sauté onion and garlic, add curry powder, then broth. Simmer 10 min and blend smooth.",
      "Slice chicken into strips. Serve over rice with curry sauce poured over."
    ]
  },
  {
    name: "Okonomiyaki",
    emoji: "🥞",
    time: "25 min",
    cuisine: "Japanese",
    baseServings: 2,
    ingredients: [
      { name: "Flour", amount: 1, unit: "cup" },
      { name: "Egg", amount: 2, unit: "count" },
      { name: "Bacon", amount: 4, unit: "strips" },
      { name: "Mushrooms", amount: 1, unit: "cup" },
      { name: "Onion", amount: 2, unit: "count" },
      { name: "Soy Sauce", amount: 2, unit: "tbsp" },
      { name: "Oil", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Mix flour, eggs, soy sauce, and ½ cup water into a batter.",
      "Fold in sliced mushrooms and green onions.",
      "Heat oil in a pan over medium heat. Pour in half the batter to form a thick round pancake.",
      "Lay bacon strips on top.",
      "Cook 4-5 min until bottom is set and golden. Flip carefully.",
      "Cook 4 more min until bacon is crispy. Drizzle with ketchup and mayonnaise to serve."
    ]
  },
  {
    name: "Miso Glazed Cod",
    emoji: "🐟",
    time: "25 min",
    cuisine: "Japanese",
    baseServings: 2,
    ingredients: [
      { name: "Tilapia", amount: 2, unit: "fillets" },
      { name: "Soy Sauce", amount: 2, unit: "tbsp" },
      { name: "Honey", amount: 2, unit: "tbsp" },
      { name: "Ginger", amount: 1, unit: "tsp" },
      { name: "Garlic", amount: 1, unit: "cloves" },
      { name: "Sesame Oil", amount: 1, unit: "tsp" },
      { name: "Oil", amount: 1, unit: "tbsp" }
    ],
    steps: [
      "Mix soy sauce, honey, minced garlic, ginger, and sesame oil into a glaze.",
      "Pat fish dry. Brush generously with glaze on both sides.",
      "Marinate 15 min.",
      "Heat oil in an oven-safe pan over high heat. Sear fish 2 min until caramelized.",
      "Flip carefully. Brush with more glaze.",
      "Broil 3-4 min until glaze is sticky and fish flakes easily. Serve with steamed rice."
    ]
  },
  {
    name: "Pad Thai",
    emoji: "🍜",
    time: "25 min",
    cuisine: "Thai",
    baseServings: 2,
    ingredients: [
      { name: "Noodles", amount: 1, unit: "pack" },
      { name: "Shrimp", amount: 0.5, unit: "lb" },
      { name: "Egg", amount: 2, unit: "count" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Fish Sauce", amount: 2, unit: "tbsp" },
      { name: "Soy Sauce", amount: 1, unit: "tbsp" },
      { name: "Sugar", amount: 1, unit: "tbsp" },
      { name: "Lime", amount: 1, unit: "count" },
      { name: "Oil", amount: 2, unit: "tbsp" },
      { name: "Chili Flakes", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Soak rice noodles in warm water 20 min until pliable. Drain.",
      "Mix fish sauce, soy sauce, and sugar into a sauce.",
      "Heat oil in a wok over high heat. Cook shrimp 1 min per side. Push to the side.",
      "Add garlic. Scramble eggs in the center until just set.",
      "Add noodles and sauce. Toss everything together over high heat 2-3 min.",
      "Add chili flakes. Serve with lime wedges and crushed peanuts."
    ]
  },
  {
    name: "Green Curry",
    emoji: "🍛",
    time: "30 min",
    cuisine: "Thai",
    baseServings: 4,
    ingredients: [
      { name: "Chicken Thighs", amount: 1.5, unit: "lb" },
      { name: "Coconut Milk", amount: 1, unit: "can" },
      { name: "Bell Pepper", amount: 1, unit: "count" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Ginger", amount: 1, unit: "tsp" },
      { name: "Fish Sauce", amount: 2, unit: "tbsp" },
      { name: "Sugar", amount: 1, unit: "tsp" },
      { name: "Curry Powder", amount: 2, unit: "tsp" },
      { name: "Oil", amount: 1, unit: "tbsp" },
      { name: "Basil", amount: 1, unit: "bunch" }
    ],
    steps: [
      "Heat oil in a wok over medium heat. Add minced garlic and ginger. Cook 1 min.",
      "Add curry powder and stir 30 seconds until fragrant.",
      "Add sliced chicken. Cook 5-6 min until browned.",
      "Pour in coconut milk. Bring to a simmer.",
      "Add sliced bell pepper. Cook 10 min until sauce thickens and chicken is cooked through.",
      "Season with fish sauce and sugar. Fold in basil. Serve over jasmine rice."
    ]
  },
  {
    name: "Massaman Curry",
    emoji: "🍲",
    time: "1 hr",
    cuisine: "Thai",
    baseServings: 4,
    ingredients: [
      { name: "Chicken Thighs", amount: 1.5, unit: "lb" },
      { name: "Potato", amount: 2, unit: "count" },
      { name: "Coconut Milk", amount: 1, unit: "can" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Ginger", amount: 1, unit: "tsp" },
      { name: "Curry Powder", amount: 2, unit: "tsp" },
      { name: "Cinnamon", amount: 1, unit: "stick" },
      { name: "Fish Sauce", amount: 2, unit: "tbsp" },
      { name: "Sugar", amount: 1, unit: "tbsp" },
      { name: "Oil", amount: 2, unit: "tbsp" }
    ],
    steps: [
      "Heat oil in a pot. Brown chicken on all sides over high heat. Remove.",
      "Sauté diced onion, garlic, and ginger 5 min. Add curry powder and cinnamon. Stir 1 min.",
      "Return chicken. Pour in coconut milk. Bring to a simmer.",
      "Add cubed potatoes. Cover and cook 30 min until potatoes are tender.",
      "Season with fish sauce and sugar. The curry should be rich, slightly sweet, and aromatic.",
      "Serve over jasmine rice."
    ]
  },
  {
    name: "Pad See Ew",
    emoji: "🍜",
    time: "20 min",
    cuisine: "Thai",
    baseServings: 2,
    ingredients: [
      { name: "Noodles", amount: 1, unit: "pack" },
      { name: "Chicken", amount: 0.5, unit: "lb" },
      { name: "Egg", amount: 2, unit: "count" },
      { name: "Broccoli", amount: 1, unit: "head" },
      { name: "Dark Soy Sauce", amount: 2, unit: "tbsp" },
      { name: "Soy Sauce", amount: 1, unit: "tbsp" },
      { name: "Sugar", amount: 1, unit: "tsp" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Oil", amount: 2, unit: "tbsp" }
    ],
    steps: [
      "Soak wide rice noodles in warm water 20 min. Drain.",
      "Mix dark soy sauce, soy sauce, and sugar into a sauce.",
      "Heat oil in a wok over high heat. Cook sliced chicken until golden. Push aside.",
      "Add garlic. Crack eggs in center and scramble until just set.",
      "Add broccoli florets and cook 2 min.",
      "Add noodles and sauce. Toss everything over high heat until noodles are caramelized and dark. Serve immediately."
    ]
  },
  {
    name: "Tom Kha",
    emoji: "🥥",
    time: "25 min",
    cuisine: "Thai",
    baseServings: 4,
    ingredients: [
      { name: "Chicken", amount: 1, unit: "lb" },
      { name: "Coconut Milk", amount: 1, unit: "can" },
      { name: "Chicken Broth", amount: 2, unit: "cups" },
      { name: "Mushrooms", amount: 1, unit: "cup" },
      { name: "Ginger", amount: 2, unit: "tbsp" },
      { name: "Lime", amount: 2, unit: "count" },
      { name: "Fish Sauce", amount: 2, unit: "tbsp" },
      { name: "Sugar", amount: 1, unit: "tsp" },
      { name: "Chili Flakes", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Bring chicken broth to a simmer. Add sliced ginger and cook 5 min to infuse.",
      "Add coconut milk. Bring back to a gentle simmer — do not boil or coconut milk will split.",
      "Add sliced chicken and mushrooms. Cook 10 min until chicken is cooked through.",
      "Season with fish sauce, lime juice, and sugar.",
      "Taste — it should be creamy, sour, and gently spiced.",
      "Add chili flakes to taste. Serve immediately."
    ]
  },
  {
    name: "Banh Mi",
    emoji: "🥖",
    time: "20 min",
    cuisine: "Vietnamese",
    baseServings: 2,
    ingredients: [
      { name: "Chicken", amount: 0.5, unit: "lb" },
      { name: "Bread", amount: 1, unit: "loaf" },
      { name: "Pickles", amount: 0.25, unit: "cup" },
      { name: "Cucumber", amount: 1, unit: "count" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Soy Sauce", amount: 2, unit: "tbsp" },
      { name: "Honey", amount: 1, unit: "tbsp" },
      { name: "Lime", amount: 1, unit: "count" },
      { name: "Hot Sauce", amount: 1, unit: "tbsp" },
      { name: "Oil", amount: 1, unit: "tbsp" }
    ],
    steps: [
      "Marinate sliced chicken in soy sauce, honey, minced garlic, and lime juice for 15 min.",
      "Cook chicken in hot oil over medium-high heat until caramelized and cooked through.",
      "Slice bread lengthwise. Toast until crispy.",
      "Spread hot sauce on the bread.",
      "Layer chicken, pickles, and sliced cucumber.",
      "Close the sandwich and press firmly. The contrast of crispy bread, savory chicken, and pickles is everything."
    ]
  },
  {
    name: "Pho Bo",
    emoji: "🍜",
    time: "45 min",
    cuisine: "Vietnamese",
    baseServings: 2,
    ingredients: [
      { name: "Beef Flank", amount: 0.5, unit: "lb" },
      { name: "Beef Broth", amount: 4, unit: "cups" },
      { name: "Noodles", amount: 1, unit: "pack" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Ginger", amount: 2, unit: "tbsp" },
      { name: "Star Anise", amount: 3, unit: "pods" },
      { name: "Fish Sauce", amount: 2, unit: "tbsp" },
      { name: "Sugar", amount: 1, unit: "tsp" },
      { name: "Lime", amount: 1, unit: "count" },
      { name: "Basil", amount: 1, unit: "bunch" }
    ],
    steps: [
      "Char halved onion and sliced ginger directly over a flame or under the broiler until blackened.",
      "Bring beef broth to a boil. Add charred onion, ginger, and star anise. Simmer 30 min.",
      "Strain broth. Season with fish sauce and sugar.",
      "Slice beef paper-thin against the grain.",
      "Cook noodles per package. Divide into deep bowls with raw beef on top.",
      "Ladle boiling broth over — it cooks the beef instantly. Serve with lime and basil."
    ]
  },
  {
    name: "Vietnamese Lemongrass Chicken",
    emoji: "🍗",
    time: "30 min",
    cuisine: "Vietnamese",
    baseServings: 4,
    ingredients: [
      { name: "Chicken Thighs", amount: 1.5, unit: "lb" },
      { name: "Garlic", amount: 4, unit: "cloves" },
      { name: "Ginger", amount: 1, unit: "tbsp" },
      { name: "Fish Sauce", amount: 3, unit: "tbsp" },
      { name: "Sugar", amount: 2, unit: "tbsp" },
      { name: "Chili Flakes", amount: 1, unit: "tsp" },
      { name: "Lime", amount: 1, unit: "count" },
      { name: "Oil", amount: 2, unit: "tbsp" },
      { name: "Onion", amount: 1, unit: "count" }
    ],
    steps: [
      "Mix fish sauce, sugar, minced garlic, ginger, and chili flakes into a marinade.",
      "Coat chicken thighs thoroughly. Marinate 20 min.",
      "Heat oil in a pan over medium-high heat.",
      "Cook chicken 6-7 min per side until deeply caramelized and cooked through.",
      "Add sliced onion in the last 3 min.",
      "Squeeze lime over the top. Serve over rice with the caramelized pan juices."
    ]
  },
  {
    name: "Vietnamese Caramel Pork",
    emoji: "🍖",
    time: "35 min",
    cuisine: "Vietnamese",
    baseServings: 4,
    ingredients: [
      { name: "Ground Pork", amount: 1, unit: "lb" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Ginger", amount: 1, unit: "tsp" },
      { name: "Fish Sauce", amount: 3, unit: "tbsp" },
      { name: "Sugar", amount: 3, unit: "tbsp" },
      { name: "Coconut Milk", amount: 0.5, unit: "cup" },
      { name: "Egg", amount: 4, unit: "count" },
      { name: "Pepper", amount: 0.5, unit: "tsp" },
      { name: "Oil", amount: 1, unit: "tbsp" }
    ],
    steps: [
      "Hard boil eggs 10 min. Peel and set aside.",
      "Cook sugar in a pot over medium heat until it turns amber caramel — do not stir.",
      "Add pork and stir to coat in the caramel. Cook until browned.",
      "Add minced garlic, ginger, fish sauce, and coconut milk.",
      "Add whole peeled eggs. Simmer 20 min until sauce is thick and deeply flavored.",
      "Season with pepper. Serve over rice — the eggs absorb the caramel sauce beautifully."
    ]
  },
  {
    name: "Vietnamese Shrimp Rice Paper Rolls",
    emoji: "🍤",
    time: "30 min",
    cuisine: "Vietnamese",
    baseServings: 4,
    ingredients: [
      { name: "Shrimp", amount: 0.5, unit: "lb" },
      { name: "Rice", amount: 1, unit: "cups" },
      { name: "Cucumber", amount: 1, unit: "count" },
      { name: "Lime", amount: 1, unit: "count" },
      { name: "Fish Sauce", amount: 2, unit: "tbsp" },
      { name: "Sugar", amount: 1, unit: "tsp" },
      { name: "Garlic", amount: 1, unit: "cloves" },
      { name: "Chili Flakes", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Cook shrimp in boiling water 2 min until pink. Cool and halve lengthwise.",
      "Cook rice noodles per package. Rinse cold.",
      "Make dipping sauce: mix fish sauce, lime juice, sugar, minced garlic, and chili flakes with 2 tbsp water.",
      "Dip rice paper briefly in warm water until pliable.",
      "Layer shrimp, noodles, and julienned cucumber on the lower third.",
      "Fold sides in and roll tightly. Serve immediately with dipping sauce."
    ]
  },
  {
    name: "Moussaka",
    emoji: "🍆",
    time: "1.5 hr",
    cuisine: "Greek",
    baseServings: 6,
    ingredients: [
      { name: "Ground Beef", amount: 1, unit: "lb" },
      { name: "Potato", amount: 3, unit: "count" },
      { name: "Canned Tomatoes", amount: 1, unit: "cup" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Cinnamon", amount: 0.5, unit: "tsp" },
      { name: "Milk", amount: 2, unit: "cups" },
      { name: "Butter", amount: 3, unit: "tbsp" },
      { name: "Flour", amount: 3, unit: "tbsp" },
      { name: "Egg", amount: 2, unit: "count" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Slice potatoes thin. Roast at 400°F 20 min until golden.",
      "Brown ground beef with onion and garlic. Add canned tomatoes and cinnamon. Simmer 15 min.",
      "Make béchamel: melt butter, whisk in flour, gradually add milk. Simmer until thick. Cool slightly and whisk in eggs.",
      "Layer potato slices in a baking dish. Top with meat sauce.",
      "Pour béchamel over the top.",
      "Bake at 375°F for 45 min until golden and set. Rest 15 min before slicing."
    ]
  },
  {
    name: "Souvlaki",
    emoji: "🍢",
    time: "30 min",
    cuisine: "Greek",
    baseServings: 4,
    ingredients: [
      { name: "Chicken Thighs", amount: 1.5, unit: "lb" },
      { name: "Olive Oil", amount: 3, unit: "tbsp" },
      { name: "Lemon", amount: 2, unit: "count" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Oregano", amount: 2, unit: "tsp" },
      { name: "Cumin", amount: 0.5, unit: "tsp" },
      { name: "Salt", amount: 1, unit: "tsp" },
      { name: "Pepper", amount: 0.5, unit: "tsp" },
      { name: "Tortillas", amount: 4, unit: "count" }
    ],
    steps: [
      "Cut chicken into chunks. Mix olive oil, lemon juice, minced garlic, oregano, cumin, salt, and pepper.",
      "Marinate chicken at least 30 min — overnight is best.",
      "Thread onto skewers.",
      "Grill or pan-fry over high heat 4-5 min per side until charred and cooked through.",
      "Warm pitas in the same pan.",
      "Serve chicken in pitas with tzatziki, tomatoes, and red onion."
    ]
  },
  {
    name: "Spanakopita",
    emoji: "🥧",
    time: "50 min",
    cuisine: "Greek",
    baseServings: 6,
    ingredients: [
      { name: "Spinach", amount: 4, unit: "cups" },
      { name: "Egg", amount: 3, unit: "count" },
      { name: "Mozzarella", amount: 1, unit: "cup" },
      { name: "Cream Cheese", amount: 0.5, unit: "cup" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Olive Oil", amount: 3, unit: "tbsp" },
      { name: "Flour", amount: 1.5, unit: "cups" },
      { name: "Butter", amount: 4, unit: "tbsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Make pastry: mix flour, cold butter, and salt. Add cold water until dough forms. Chill 20 min.",
      "Sauté onion and garlic in olive oil. Add spinach and cook until wilted. Cool completely.",
      "Squeeze out all excess moisture from spinach — this is crucial.",
      "Mix spinach with eggs, mozzarella, and cream cheese. Season well.",
      "Line a baking dish with half the pastry. Add filling. Cover with remaining pastry and crimp edges.",
      "Brush with egg wash. Bake at 375°F for 35-40 min until deep golden."
    ]
  },
  {
    name: "Pastitsio",
    emoji: "🍝",
    time: "1.5 hr",
    cuisine: "Greek",
    baseServings: 6,
    ingredients: [
      { name: "Pasta", amount: 300, unit: "g" },
      { name: "Ground Beef", amount: 1, unit: "lb" },
      { name: "Canned Tomatoes", amount: 1, unit: "cup" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Cinnamon", amount: 0.5, unit: "tsp" },
      { name: "Milk", amount: 2, unit: "cups" },
      { name: "Butter", amount: 3, unit: "tbsp" },
      { name: "Flour", amount: 3, unit: "tbsp" },
      { name: "Egg", amount: 2, unit: "count" },
      { name: "Parmesan", amount: 0.5, unit: "cup" }
    ],
    steps: [
      "Cook pasta until al dente. Drain.",
      "Brown beef with onion and garlic. Add canned tomatoes and cinnamon. Simmer 15 min.",
      "Make béchamel: melt butter, whisk in flour, gradually add milk. Simmer until thick. Cool and whisk in eggs.",
      "Layer half the pasta in a baking dish. Add all the meat sauce. Top with remaining pasta.",
      "Pour béchamel over the top. Sprinkle with parmesan.",
      "Bake at 375°F for 45 min until golden and set. Rest 15 min before slicing."
    ]
  },
  {
    name: "Enchiladas",
    emoji: "🌮",
    time: "45 min",
    cuisine: "Mexican",
    baseServings: 4,
    ingredients: [
      { name: "Chicken", amount: 1, unit: "lb" },
      { name: "Tortillas", amount: 8, unit: "count" },
      { name: "Canned Tomatoes", amount: 2, unit: "cups" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Cumin", amount: 1, unit: "tsp" },
      { name: "Chili Flakes", amount: 0.5, unit: "tsp" },
      { name: "Mozzarella", amount: 1.5, unit: "cups" },
      { name: "Olive Oil", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Cook chicken in seasoned water 20 min. Shred.",
      "Make sauce: blend canned tomatoes, onion, garlic, cumin, chili flakes, and salt.",
      "Simmer sauce in olive oil 10 min until thickened.",
      "Dip each tortilla briefly in sauce. Fill with shredded chicken and cheese. Roll tightly.",
      "Place seam-side down in a baking dish. Pour remaining sauce over. Top with cheese.",
      "Bake at 375°F for 20 min until bubbly and golden."
    ]
  },
  {
    name: "Pozole",
    emoji: "🍲",
    time: "1.5 hr",
    cuisine: "Mexican",
    baseServings: 6,
    ingredients: [
      { name: "Chicken Thighs", amount: 1.5, unit: "lb" },
      { name: "Chicken Broth", amount: 6, unit: "cups" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 4, unit: "cloves" },
      { name: "Cumin", amount: 1, unit: "tsp" },
      { name: "Oregano", amount: 1, unit: "tsp" },
      { name: "Chili Flakes", amount: 1, unit: "tsp" },
      { name: "Lime", amount: 2, unit: "count" },
      { name: "Salt", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Add chicken, broth, halved onion, garlic, cumin, and oregano to a large pot.",
      "Bring to a boil then simmer 30 min until chicken is cooked through.",
      "Remove chicken and shred. Return to the pot.",
      "Add chili flakes. Simmer 20 more min until broth is rich and flavored.",
      "Season with salt and lime juice.",
      "Serve topped with shredded cabbage, radishes, and lime wedges."
    ]
  },
  {
    name: "Chiles Rellenos",
    emoji: "🌶️",
    time: "45 min",
    cuisine: "Mexican",
    baseServings: 4,
    ingredients: [
      { name: "Bell Pepper", amount: 4, unit: "count" },
      { name: "Ground Beef", amount: 0.5, unit: "lb" },
      { name: "Mozzarella", amount: 1, unit: "cup" },
      { name: "Onion", amount: 0.5, unit: "count" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Cumin", amount: 0.5, unit: "tsp" },
      { name: "Egg", amount: 3, unit: "count" },
      { name: "Flour", amount: 0.25, unit: "cup" },
      { name: "Oil", amount: 2, unit: "cups" },
      { name: "Salt", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Roast bell peppers under the broiler turning until charred all over. Steam in a covered bowl 10 min. Peel and make a slit to remove seeds.",
      "Cook ground beef with onion, garlic, and cumin. Season with salt.",
      "Stuff each pepper with beef and cheese. Secure with a toothpick.",
      "Separate eggs. Beat whites to stiff peaks. Fold in yolks to make a batter.",
      "Dust stuffed peppers in flour then dip in egg batter.",
      "Fry in oil at 350°F until golden on all sides. Drain and serve with tomato sauce."
    ]
  },
  {
    name: "Elote",
    emoji: "🌽",
    time: "20 min",
    cuisine: "Mexican",
    baseServings: 4,
    ingredients: [
      { name: "Sour Cream", amount: 0.25, unit: "cup" },
      { name: "Lime", amount: 2, unit: "count" },
      { name: "Chili Flakes", amount: 1, unit: "tsp" },
      { name: "Parmesan", amount: 0.5, unit: "cup" },
      { name: "Garlic Powder", amount: 0.5, unit: "tsp" },
      { name: "Butter", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Grill corn directly over a gas flame or in a hot pan turning until charred on all sides.",
      "Mix sour cream with garlic powder and a pinch of salt.",
      "Brush hot corn with butter.",
      "Spread sour cream mixture all over the corn.",
      "Roll in grated parmesan until fully coated.",
      "Dust generously with chili flakes and squeeze fresh lime over the top."
    ]
  }
,
  {
    name: "Stuffed Bell Peppers",
    emoji: "🫑",
    time: "45 min",
    cuisine: "Healthy",
    baseServings: 4,
    ingredients: [
      { name: "Bell Pepper", amount: 4, unit: "count" },
      { name: "Ground Beef", amount: 0.5, unit: "lb" },
      { name: "Rice", amount: 0.5, unit: "cups" },
      { name: "Onion", amount: 0.5, unit: "count" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Canned Tomatoes", amount: 1, unit: "cup" },
      { name: "Mozzarella", amount: 0.5, unit: "cup" },
      { name: "Salt", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Preheat oven to 375°F. Cook rice and set aside.",
      "Cut tops off bell peppers and remove seeds. Place in a baking dish.",
      "Brown ground beef with onion and garlic. Add canned tomatoes. Simmer 5 min.",
      "Mix beef with cooked rice. Season with salt.",
      "Stuff each pepper generously with the beef mixture.",
      "Top with mozzarella. Bake 30 min until peppers are tender and cheese is golden."
    ]
  },
  {
    name: "Egg White Omelette",
    emoji: "🍳",
    time: "10 min",
    cuisine: "Healthy",
    baseServings: 1,
    ingredients: [
      { name: "Egg", amount: 4, unit: "count" },
      { name: "Spinach", amount: 1, unit: "cups" },
      { name: "Mushrooms", amount: 0.5, unit: "cup" },
      { name: "Onion", amount: 0.25, unit: "count" },
      { name: "Olive Oil", amount: 1, unit: "tsp" },
      { name: "Salt", amount: 0.25, unit: "tsp" },
      { name: "Pepper", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Separate eggs. Whisk whites vigorously with salt and pepper until slightly frothy.",
      "Sauté mushrooms and onion in olive oil over medium heat 3 min.",
      "Add spinach and cook until wilted. Remove and set aside.",
      "Pour egg whites into the same pan over medium heat.",
      "When edges set, add vegetables to one half. Fold over.",
      "Cook 1 more min. Slide onto a plate. High protein, low calorie."
    ]
  },
  {
    name: "Chicken Lettuce Wraps",
    emoji: "🥬",
    time: "20 min",
    cuisine: "Healthy",
    baseServings: 4,
    ingredients: [
      { name: "Ground Chicken", amount: 1, unit: "lb" },
      { name: "Mushrooms", amount: 1, unit: "cup" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Ginger", amount: 1, unit: "tsp" },
      { name: "Soy Sauce", amount: 3, unit: "tbsp" },
      { name: "Sesame Oil", amount: 1, unit: "tsp" },
      { name: "Hoisin Sauce", amount: 2, unit: "tbsp" },
      { name: "Oil", amount: 1, unit: "tbsp" }
    ],
    steps: [
      "Heat oil in a wok over high heat. Cook ground chicken breaking it up until no longer pink.",
      "Add minced garlic and ginger. Cook 1 min.",
      "Add diced mushrooms. Cook 3 min until tender.",
      "Add soy sauce, hoisin, and sesame oil. Toss everything together.",
      "Cook 2 more min until sauce coats everything and caramelizes slightly.",
      "Spoon into lettuce cups or spinach leaves. Serve immediately."
    ]
  },
  {
    name: "Poached Salmon & Spinach",
    emoji: "🐟",
    time: "20 min",
    cuisine: "Healthy",
    baseServings: 2,
    ingredients: [
      { name: "Salmon", amount: 2, unit: "fillets" },
      { name: "Spinach", amount: 3, unit: "cups" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Lemon", amount: 1, unit: "count" },
      { name: "Chicken Broth", amount: 2, unit: "cups" },
      { name: "Olive Oil", amount: 1, unit: "tbsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" },
      { name: "Pepper", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Bring chicken broth to a gentle simmer in a wide pan. Season with salt.",
      "Add salmon fillets. Poach 8-10 min until just cooked through — the flesh should flake easily.",
      "Meanwhile sauté minced garlic in olive oil 1 min.",
      "Add spinach and toss until wilted. Season with salt and pepper.",
      "Remove salmon carefully with a slotted spatula.",
      "Serve salmon on bed of spinach. Squeeze fresh lemon over the top."
    ]
  },
  {
    name: "Chicken Meatballs",
    emoji: "🍗",
    time: "30 min",
    cuisine: "Healthy",
    baseServings: 4,
    ingredients: [
      { name: "Ground Chicken", amount: 1, unit: "lb" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Onion", amount: 0.25, unit: "count" },
      { name: "Panko Breadcrumbs", amount: 0.25, unit: "cup" },
      { name: "Egg", amount: 1, unit: "count" },
      { name: "Italian Seasoning", amount: 1, unit: "tsp" },
      { name: "Olive Oil", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Combine ground chicken, minced garlic, grated onion, panko, egg, Italian seasoning, and salt.",
      "Mix gently — overworking makes tough meatballs.",
      "Roll into golf ball-sized portions.",
      "Heat olive oil in an oven-safe pan over medium-high heat.",
      "Brown meatballs on all sides, about 4 min total.",
      "Transfer to oven at 400°F for 10-12 min until cooked through. Serve with marinara or over zucchini noodles."
    ]
  },
  {
    name: "Sweet Potato Buddha Bowl",
    emoji: "🍠",
    time: "35 min",
    cuisine: "Healthy",
    baseServings: 2,
    ingredients: [
      { name: "Sweet Potato", amount: 2, unit: "count" },
      { name: "Spinach", amount: 2, unit: "cups" },
      { name: "Egg", amount: 2, unit: "count" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Olive Oil", amount: 2, unit: "tbsp" },
      { name: "Cumin", amount: 0.5, unit: "tsp" },
      { name: "Paprika", amount: 0.5, unit: "tsp" },
      { name: "Lemon", amount: 1, unit: "count" },
      { name: "Salt", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Cube sweet potatoes. Toss with olive oil, cumin, paprika, and salt.",
      "Roast at 425°F for 25 min until golden and caramelized.",
      "Sauté minced garlic in olive oil. Add spinach and wilt 2 min.",
      "Fry eggs sunny side up.",
      "Build bowls: roasted sweet potato, wilted spinach, fried egg on top.",
      "Squeeze lemon over everything and drizzle with olive oil."
    ]
  },
  {
    name: "Spinach & Mushroom Sauté",
    emoji: "🍄",
    time: "15 min",
    cuisine: "Healthy",
    baseServings: 2,
    ingredients: [
      { name: "Spinach", amount: 4, unit: "cups" },
      { name: "Mushrooms", amount: 2, unit: "cups" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Olive Oil", amount: 2, unit: "tbsp" },
      { name: "Lemon", amount: 0.5, unit: "count" },
      { name: "Salt", amount: 0.5, unit: "tsp" },
      { name: "Pepper", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Heat olive oil in a large pan over high heat.",
      "Add sliced mushrooms in a single layer. Do not stir for 2 min — let them brown.",
      "Toss and cook 2 more min until golden on all sides.",
      "Add minced garlic. Cook 30 seconds.",
      "Add spinach and toss until just wilted, about 1-2 min.",
      "Season with salt, pepper, and lemon juice. Serve as a side or over rice."
    ]
  },
  {
    name: "Baked Chicken & Broccoli",
    emoji: "🥦",
    time: "35 min",
    cuisine: "Healthy",
    baseServings: 4,
    ingredients: [
      { name: "Chicken Thighs", amount: 1.5, unit: "lb" },
      { name: "Broccoli", amount: 1, unit: "head" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Olive Oil", amount: 3, unit: "tbsp" },
      { name: "Lemon", amount: 1, unit: "count" },
      { name: "Italian Seasoning", amount: 1, unit: "tsp" },
      { name: "Salt", amount: 1, unit: "tsp" },
      { name: "Pepper", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Preheat oven to 425°F.",
      "Cut broccoli into florets. Toss with 2 tbsp olive oil, salt, and pepper.",
      "Rub chicken with remaining olive oil, minced garlic, Italian seasoning, salt, and pepper.",
      "Place chicken and broccoli on a large baking sheet — don't overlap.",
      "Bake 25-30 min until chicken is golden and broccoli edges are crispy.",
      "Squeeze lemon over everything before serving."
    ]
  },
  {
    name: "Shrimp Avocado Bowl",
    emoji: "🍤",
    time: "20 min",
    cuisine: "Healthy",
    baseServings: 2,
    ingredients: [
      { name: "Shrimp", amount: 0.5, unit: "lb" },
      { name: "Rice", amount: 1, unit: "cups" },
      { name: "Lime", amount: 2, unit: "count" },
      { name: "Garlic", amount: 2, unit: "cloves" },
      { name: "Olive Oil", amount: 2, unit: "tbsp" },
      { name: "Cumin", amount: 0.5, unit: "tsp" },
      { name: "Chili Flakes", amount: 0.25, unit: "tsp" },
      { name: "Salt", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Cook rice and set aside.",
      "Pat shrimp dry. Season with cumin, chili flakes, and salt.",
      "Heat olive oil in a pan over high heat. Cook shrimp 1-2 min per side until pink and slightly charred.",
      "Add minced garlic in the last 30 seconds.",
      "Squeeze lime over the shrimp.",
      "Serve shrimp over rice with extra lime wedges."
    ]
  },
  {
    name: "Vegetable Omelette",
    emoji: "🍳",
    time: "15 min",
    cuisine: "Healthy",
    baseServings: 1,
    ingredients: [
      { name: "Egg", amount: 3, unit: "count" },
      { name: "Bell Pepper", amount: 0.5, unit: "count" },
      { name: "Mushrooms", amount: 0.5, unit: "cup" },
      { name: "Onion", amount: 0.25, unit: "count" },
      { name: "Spinach", amount: 1, unit: "cups" },
      { name: "Olive Oil", amount: 1, unit: "tbsp" },
      { name: "Salt", amount: 0.25, unit: "tsp" },
      { name: "Pepper", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Dice bell pepper, mushrooms, and onion finely.",
      "Sauté vegetables in olive oil over medium heat 4 min until soft. Add spinach until wilted.",
      "Whisk eggs with salt and pepper.",
      "Push vegetables to the side. Pour eggs into the pan.",
      "Cook until edges set. Add vegetables to one half.",
      "Fold over and slide onto a plate. Simple, nutritious, and endlessly customizable."
    ]
  },
  {
    name: "Rice Pudding",
    emoji: "🍚",
    time: "35 min",
    cuisine: "Dessert",
    baseServings: 4,
    ingredients: [
      { name: "Rice", amount: 0.5, unit: "cups" },
      { name: "Milk", amount: 3, unit: "cups" },
      { name: "Sugar", amount: 0.25, unit: "cup" },
      { name: "Butter", amount: 1, unit: "tbsp" },
      { name: "Cinnamon", amount: 0.5, unit: "tsp" },
      { name: "Salt", amount: 1, unit: "pinch" }
    ],
    steps: [
      "Combine rice, milk, sugar, and a pinch of salt in a heavy pot.",
      "Bring to a gentle simmer over medium heat stirring frequently.",
      "Reduce heat to low. Cook 25-30 min stirring every few minutes until rice is tender and mixture is thick and creamy.",
      "Remove from heat. Stir in butter.",
      "Pour into bowls. Dust with cinnamon.",
      "Serve warm or refrigerate and serve cold. Keeps for 3 days."
    ]
  },
  {
    name: "Bread Pudding",
    emoji: "🍞",
    time: "55 min",
    cuisine: "Dessert",
    baseServings: 6,
    ingredients: [
      { name: "Bread", amount: 1, unit: "loaf" },
      { name: "Egg", amount: 4, unit: "count" },
      { name: "Milk", amount: 2, unit: "cups" },
      { name: "Heavy Cream", amount: 0.5, unit: "cup" },
      { name: "Sugar", amount: 0.5, unit: "cup" },
      { name: "Butter", amount: 2, unit: "tbsp" },
      { name: "Cinnamon", amount: 1, unit: "tsp" },
      { name: "Salt", amount: 1, unit: "pinch" }
    ],
    steps: [
      "Cut bread into cubes. Spread on a baking sheet and let dry out 30 min or toast lightly.",
      "Whisk eggs, milk, heavy cream, sugar, cinnamon, and salt together.",
      "Place bread in a buttered baking dish. Pour custard over the top.",
      "Press bread down gently. Let soak 15 min.",
      "Bake at 350°F for 40-45 min until top is golden and custard is just set.",
      "Serve warm with a drizzle of honey or cream."
    ]
  },
  {
    name: "Churros",
    emoji: "🍩",
    time: "30 min",
    cuisine: "Dessert",
    baseServings: 4,
    ingredients: [
      { name: "Flour", amount: 1, unit: "cup" },
      { name: "Egg", amount: 2, unit: "count" },
      { name: "Butter", amount: 2, unit: "tbsp" },
      { name: "Sugar", amount: 0.5, unit: "cup" },
      { name: "Cinnamon", amount: 1, unit: "tsp" },
      { name: "Oil", amount: 2, unit: "cups" },
      { name: "Salt", amount: 1, unit: "pinch" }
    ],
    steps: [
      "Bring 1 cup water, butter, and a pinch of salt to a boil. Add flour all at once and stir vigorously until dough pulls away from the sides.",
      "Cool 5 min. Beat in eggs one at a time until smooth and glossy.",
      "Transfer to a piping bag with a star tip.",
      "Heat oil to 375°F. Pipe 4-inch strips directly into the oil. Cut with scissors.",
      "Fry 3-4 min until deep golden. Drain on paper towels.",
      "Mix sugar and cinnamon. Roll hot churros in the mixture immediately. Serve with honey for dipping."
    ]
  },
  {
    name: "Panna Cotta",
    emoji: "🍮",
    time: "20 min",
    cuisine: "Dessert",
    baseServings: 4,
    ingredients: [
      { name: "Heavy Cream", amount: 2, unit: "cups" },
      { name: "Milk", amount: 0.5, unit: "cup" },
      { name: "Sugar", amount: 0.25, unit: "cup" },
      { name: "Honey", amount: 2, unit: "tbsp" }
    ],
    steps: [
      "Combine heavy cream, milk, and sugar in a pot over medium heat. Stir until sugar dissolves.",
      "Bring just to a simmer — do not boil.",
      "Remove from heat. Stir in honey.",
      "Pour into ramekins or glasses.",
      "Refrigerate at least 4 hours until set — overnight is best.",
      "Serve chilled. Drizzle with honey or top with fresh fruit."
    ]
  },
  {
    name: "Crème Brûlée",
    emoji: "🍮",
    time: "1 hr",
    cuisine: "Dessert",
    baseServings: 4,
    ingredients: [
      { name: "Heavy Cream", amount: 2, unit: "cups" },
      { name: "Egg", amount: 5, unit: "count" },
      { name: "Sugar", amount: 0.5, unit: "cup" },
      { name: "Salt", amount: 1, unit: "pinch" }
    ],
    steps: [
      "Preheat oven to 325°F. Heat cream until just simmering.",
      "Whisk egg yolks with ¼ cup sugar and a pinch of salt until pale.",
      "Slowly pour warm cream into eggs while whisking constantly.",
      "Strain through a sieve into ramekins.",
      "Place in a baking dish filled with hot water halfway up the ramekins. Bake 35-40 min until barely set.",
      "Cool then refrigerate 2 hours. Before serving sprinkle with sugar and torch until caramelized."
    ]
  },
  {
    name: "Tiramisu",
    emoji: "☕",
    time: "30 min",
    cuisine: "Dessert",
    baseServings: 6,
    ingredients: [
      { name: "Heavy Cream", amount: 1, unit: "cup" },
      { name: "Cream Cheese", amount: 1, unit: "cup" },
      { name: "Egg", amount: 3, unit: "count" },
      { name: "Sugar", amount: 0.5, unit: "cup" },
      { name: "Bread", amount: 1, unit: "loaf" },
      { name: "Honey", amount: 2, unit: "tbsp" }
    ],
    steps: [
      "Whip heavy cream to stiff peaks. Set aside.",
      "Beat cream cheese with sugar and honey until smooth.",
      "Separate eggs. Whisk yolks into the cream cheese mixture.",
      "Fold in whipped cream gently.",
      "Slice bread thin and dip briefly in strong coffee or milk.",
      "Layer soaked bread and cream mixture in a dish. Refrigerate overnight. Dust with cinnamon before serving."
    ]
  },
  {
    name: "Mango Sticky Rice",
    emoji: "🥭",
    time: "35 min",
    cuisine: "Dessert",
    baseServings: 4,
    ingredients: [
      { name: "Jasmine Rice", amount: 1, unit: "cups" },
      { name: "Coconut Milk", amount: 1, unit: "can" },
      { name: "Sugar", amount: 0.25, unit: "cup" },
      { name: "Salt", amount: 0.25, unit: "tsp" },
      { name: "Honey", amount: 1, unit: "tbsp" }
    ],
    steps: [
      "Cook jasmine rice with coconut milk instead of water — use the same ratio.",
      "While hot, stir in sugar and a pinch of salt until dissolved.",
      "Cover and let the rice steam and absorb for 10 min.",
      "Heat remaining coconut milk with honey and a pinch of salt for the sauce.",
      "Plate the sticky rice. Pour warm coconut sauce over the top.",
      "Serve with sliced fresh fruit on the side."
    ]
  },
  {
    name: "Coconut Pudding",
    emoji: "🥥",
    time: "20 min",
    cuisine: "Dessert",
    baseServings: 4,
    ingredients: [
      { name: "Coconut Milk", amount: 1, unit: "can" },
      { name: "Milk", amount: 1, unit: "cup" },
      { name: "Sugar", amount: 0.25, unit: "cup" },
      { name: "Corn Starch", amount: 3, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "pinch" }
    ],
    steps: [
      "Whisk corn starch with ¼ cup cold milk until smooth.",
      "Combine coconut milk, remaining milk, sugar, and salt in a pot.",
      "Bring to a gentle simmer over medium heat.",
      "Pour in the cornstarch mixture while whisking constantly.",
      "Cook 5-7 min stirring until thick enough to coat the back of a spoon.",
      "Pour into cups. Refrigerate 2 hours until set. Serve chilled."
    ]
  },
  {
    name: "Tres Leches Cake",
    emoji: "🎂",
    time: "1 hr",
    cuisine: "Dessert",
    baseServings: 8,
    ingredients: [
      { name: "Flour", amount: 1, unit: "cup" },
      { name: "Egg", amount: 4, unit: "count" },
      { name: "Sugar", amount: 1, unit: "cup" },
      { name: "Butter", amount: 2, unit: "tbsp" },
      { name: "Baking Powder", amount: 1, unit: "tsp" },
      { name: "Milk", amount: 1, unit: "cup" },
      { name: "Heavy Cream", amount: 1, unit: "cup" },
      { name: "Coconut Milk", amount: 0.5, unit: "cup" }
    ],
    steps: [
      "Beat eggs and sugar until pale and thick, about 5 min.",
      "Fold in flour and baking powder gently.",
      "Pour into a greased baking dish. Bake at 350°F for 25 min until golden.",
      "Mix milk, heavy cream, and coconut milk together.",
      "While cake is still hot, poke all over with a fork. Pour the milk mixture slowly over the top — it will absorb completely.",
      "Refrigerate 4 hours. Serve chilled topped with whipped cream."
    ]
  },
  {
    name: "Egg Custard",
    emoji: "🍮",
    time: "40 min",
    cuisine: "Dessert",
    baseServings: 4,
    ingredients: [
      { name: "Egg", amount: 4, unit: "count" },
      { name: "Milk", amount: 2, unit: "cups" },
      { name: "Sugar", amount: 0.25, unit: "cup" },
      { name: "Cinnamon", amount: 0.25, unit: "tsp" },
      { name: "Salt", amount: 1, unit: "pinch" }
    ],
    steps: [
      "Preheat oven to 325°F. Warm milk until steaming — do not boil.",
      "Whisk eggs, sugar, and a pinch of salt until combined.",
      "Slowly pour warm milk into eggs while whisking.",
      "Strain through a sieve into ramekins. Dust with cinnamon.",
      "Place in a baking dish filled with hot water halfway up the sides.",
      "Bake 35-40 min until just set with a slight wobble. Serve warm or chilled."
    ]
  },
  {
    name: "Honey Cake",
    emoji: "🍯",
    time: "45 min",
    cuisine: "Dessert",
    baseServings: 8,
    ingredients: [
      { name: "Flour", amount: 2, unit: "cups" },
      { name: "Egg", amount: 3, unit: "count" },
      { name: "Honey", amount: 0.5, unit: "cup" },
      { name: "Sugar", amount: 0.25, unit: "cup" },
      { name: "Butter", amount: 0.5, unit: "cup" },
      { name: "Milk", amount: 0.5, unit: "cup" },
      { name: "Baking Powder", amount: 1, unit: "tsp" },
      { name: "Cinnamon", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Preheat oven to 350°F. Melt butter and let cool slightly.",
      "Whisk eggs, honey, sugar, and melted butter until smooth.",
      "Mix flour, baking powder, and cinnamon. Fold into the wet ingredients alternating with milk.",
      "Pour into a greased loaf pan.",
      "Bake 40-45 min until a skewer comes out clean.",
      "Cool 10 min before slicing. Drizzle with extra honey to serve."
    ]
  },
  {
    name: "Profiteroles",
    emoji: "🍡",
    time: "45 min",
    cuisine: "Dessert",
    baseServings: 6,
    ingredients: [
      { name: "Flour", amount: 0.5, unit: "cup" },
      { name: "Egg", amount: 3, unit: "count" },
      { name: "Butter", amount: 0.25, unit: "cup" },
      { name: "Milk", amount: 0.25, unit: "cup" },
      { name: "Heavy Cream", amount: 1, unit: "cup" },
      { name: "Sugar", amount: 2, unit: "tbsp" },
      { name: "Salt", amount: 1, unit: "pinch" }
    ],
    steps: [
      "Bring ½ cup water, milk, butter, and salt to a boil. Add flour all at once and stir hard until dough forms a ball.",
      "Cool 5 min. Beat in eggs one at a time until smooth and shiny.",
      "Pipe or spoon golf ball-sized mounds onto a lined baking sheet.",
      "Bake at 400°F for 25-30 min until puffed and golden. Do not open the oven early.",
      "Cool completely. Whip heavy cream with sugar to stiff peaks.",
      "Cut each puff in half. Fill with whipped cream. Drizzle with honey and serve."
    ]
  },
  {
    name: "Caramel Flan",
    emoji: "🍮",
    time: "1 hr",
    cuisine: "Dessert",
    baseServings: 6,
    ingredients: [
      { name: "Egg", amount: 4, unit: "count" },
      { name: "Milk", amount: 1, unit: "cup" },
      { name: "Heavy Cream", amount: 1, unit: "cup" },
      { name: "Sugar", amount: 0.75, unit: "cup" },
      { name: "Salt", amount: 1, unit: "pinch" }
    ],
    steps: [
      "Make caramel: cook ½ cup sugar in a pan over medium heat without stirring until amber. Quickly pour into a round baking dish.",
      "Whisk eggs, remaining sugar, and a pinch of salt until combined.",
      "Warm milk and cream until steaming. Slowly pour into egg mixture whisking constantly.",
      "Pour custard over the caramel.",
      "Bake in a water bath at 325°F for 45-50 min until barely set.",
      "Refrigerate overnight. Run a knife around the edge, invert onto a plate — the caramel flows over the top."
    ]
  },
  {
    name: "Coconut Macaroons",
    emoji: "🍪",
    time: "25 min",
    cuisine: "Dessert",
    baseServings: 12,
    ingredients: [
      { name: "Egg", amount: 3, unit: "count" },
      { name: "Sugar", amount: 0.5, unit: "cup" },
      { name: "Coconut Milk", amount: 0.5, unit: "cup" },
      { name: "Flour", amount: 0.25, unit: "cup" },
      { name: "Salt", amount: 1, unit: "pinch" }
    ],
    steps: [
      "Preheat oven to 375°F. Line a baking sheet with parchment.",
      "Whisk egg whites with a pinch of salt until frothy.",
      "Mix in sugar, coconut milk, and flour until a sticky dough forms.",
      "Drop rounded tablespoons onto the baking sheet spacing 2 inches apart.",
      "Bake 15-18 min until edges are golden and tops are lightly browned.",
      "Cool on the tray — they firm up as they cool. Store in an airtight container."
    ]
  },
  {
    name: "Honey Yogurt Parfait",
    emoji: "🍯",
    time: "5 min",
    cuisine: "Dessert",
    baseServings: 2,
    ingredients: [
      { name: "Greek Yogurt", amount: 1, unit: "cup" },
      { name: "Honey", amount: 3, unit: "tbsp" },
      { name: "Cinnamon", amount: 0.25, unit: "tsp" },
      { name: "Butter", amount: 1, unit: "tbsp" }
    ],
    steps: [
      "Toast a handful of whatever nuts or oats you have in butter until golden.",
      "Layer Greek yogurt in glasses.",
      "Drizzle honey generously over the yogurt.",
      "Sprinkle with cinnamon.",
      "Top with the toasted butter mixture for crunch.",
      "Serve immediately — simple, refreshing, and naturally sweet."
    ]
  },
  {
    name: "Crepes Suzette",
    emoji: "🫓",
    time: "30 min",
    cuisine: "Dessert",
    baseServings: 4,
    ingredients: [
      { name: "Flour", amount: 1, unit: "cup" },
      { name: "Egg", amount: 2, unit: "count" },
      { name: "Milk", amount: 1, unit: "cup" },
      { name: "Butter", amount: 4, unit: "tbsp" },
      { name: "Sugar", amount: 3, unit: "tbsp" },
      { name: "Lemon", amount: 1, unit: "count" },
      { name: "Orange", amount: 1, unit: "count" }
    ],
    steps: [
      "Make crepe batter: blend flour, eggs, milk, 1 tbsp melted butter, and a pinch of salt. Rest 15 min.",
      "Cook thin crepes in a buttered pan. Fold each into quarters.",
      "Make the sauce: melt 3 tbsp butter with sugar in a wide pan until golden.",
      "Add lemon and orange juice. Simmer 2 min until slightly syrupy.",
      "Add folded crepes to the pan. Spoon sauce over them.",
      "Serve immediately — the orange butter sauce caramelizes the crepes beautifully."
    ]
  },
  {
    name: "Butter Cookies",
    emoji: "🍪",
    time: "25 min",
    cuisine: "Dessert",
    baseServings: 24,
    ingredients: [
      { name: "Flour", amount: 2, unit: "cups" },
      { name: "Butter", amount: 1, unit: "cup" },
      { name: "Sugar", amount: 0.5, unit: "cup" },
      { name: "Egg", amount: 1, unit: "count" },
      { name: "Salt", amount: 0.25, unit: "tsp" }
    ],
    steps: [
      "Preheat oven to 350°F. Beat softened butter and sugar until pale and fluffy.",
      "Add egg and beat until combined.",
      "Mix in flour and salt until a soft dough forms.",
      "Roll into small balls or pipe into rosettes on a lined baking sheet.",
      "Bake 12-14 min until edges are just golden — centers will look underdone.",
      "Cool on the tray. They firm up beautifully as they cool and keep for a week in a tin."
    ]
  },
  {
    name: "Cinnamon French Toast Bake",
    emoji: "🍞",
    time: "50 min",
    cuisine: "Dessert",
    baseServings: 6,
    ingredients: [
      { name: "Bread", amount: 1, unit: "loaf" },
      { name: "Egg", amount: 5, unit: "count" },
      { name: "Milk", amount: 1.5, unit: "cups" },
      { name: "Heavy Cream", amount: 0.5, unit: "cup" },
      { name: "Sugar", amount: 0.25, unit: "cup" },
      { name: "Cinnamon", amount: 2, unit: "tsp" },
      { name: "Butter", amount: 3, unit: "tbsp" },
      { name: "Honey", amount: 2, unit: "tbsp" }
    ],
    steps: [
      "Slice bread thick and arrange in a buttered baking dish slightly overlapping.",
      "Whisk eggs, milk, heavy cream, sugar, cinnamon, and honey together.",
      "Pour custard over the bread. Press down gently. Let soak 20 min.",
      "Dot the top with small pieces of butter.",
      "Bake at 350°F for 35-40 min until puffed and golden.",
      "Serve warm dusted with cinnamon and drizzled with honey."
    ]
  },
  {
    name: "Muhallebi",
    emoji: "🥛",
    time: "20 min",
    cuisine: "Dessert",
    baseServings: 4,
    ingredients: [
      { name: "Milk", amount: 3, unit: "cups" },
      { name: "Sugar", amount: 0.25, unit: "cup" },
      { name: "Corn Starch", amount: 4, unit: "tbsp" },
      { name: "Honey", amount: 2, unit: "tbsp" },
      { name: "Cinnamon", amount: 0.5, unit: "tsp" }
    ],
    steps: [
      "Whisk corn starch with ½ cup cold milk until completely smooth.",
      "Heat remaining milk and sugar in a pot over medium heat stirring until sugar dissolves.",
      "Pour in the cornstarch mixture while whisking constantly.",
      "Cook 8-10 min stirring until mixture thickens to a pudding consistency.",
      "Pour into small bowls or glasses.",
      "Refrigerate 2 hours until set. Drizzle with honey and dust with cinnamon before serving."
    ]
  },
  {
    name: "Sesame Honey Balls",
    emoji: "🍡",
    time: "20 min",
    cuisine: "Dessert",
    baseServings: 12,
    ingredients: [
      { name: "Flour", amount: 1, unit: "cup" },
      { name: "Sugar", amount: 0.25, unit: "cup" },
      { name: "Honey", amount: 3, unit: "tbsp" },
      { name: "Sesame Oil", amount: 1, unit: "tbsp" },
      { name: "Butter", amount: 2, unit: "tbsp" },
      { name: "Egg", amount: 1, unit: "count" },
      { name: "Oil", amount: 2, unit: "cups" }
    ],
    steps: [
      "Mix flour, sugar, honey, sesame oil, melted butter, and egg into a soft dough.",
      "Roll into small balls about 1 inch in diameter.",
      "Heat oil to 325°F. Fry balls in batches — they need low heat to cook through.",
      "Fry 4-5 min turning occasionally until deep golden.",
      "Drain on paper towels.",
      "Drizzle with honey while still hot. The sesame oil gives these a gorgeous nutty flavor."
    ]
  },
  {
    name: "Vanilla Cream Cups",
    emoji: "🍮",
    time: "15 min",
    cuisine: "Dessert",
    baseServings: 4,
    ingredients: [
      { name: "Heavy Cream", amount: 1.5, unit: "cups" },
      { name: "Milk", amount: 0.5, unit: "cup" },
      { name: "Sugar", amount: 3, unit: "tbsp" },
      { name: "Egg", amount: 2, unit: "count" },
      { name: "Corn Starch", amount: 2, unit: "tbsp" },
      { name: "Butter", amount: 1, unit: "tbsp" },
      { name: "Honey", amount: 1, unit: "tbsp" }
    ],
    steps: [
      "Whisk egg yolks, sugar, and corn starch together in a bowl.",
      "Heat milk and heavy cream until simmering.",
      "Slowly pour hot cream into egg mixture while whisking constantly.",
      "Return to pot over medium heat. Cook stirring constantly until thick.",
      "Remove from heat. Stir in butter and honey.",
      "Pour into cups. Press cling film directly onto the surface. Refrigerate 1 hour. Serve chilled."
    ]
  }
];

function findCategory(itemName) {
  for (const [cat, items] of Object.entries(PANTRY_CATALOG)) {
    if (items.includes(itemName)) return cat;
  }
  return "Other";
}