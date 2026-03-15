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
];

function findCategory(itemName) {
  for (const [cat, items] of Object.entries(PANTRY_CATALOG)) {
    if (items.includes(itemName)) return cat;
  }
  return "Other";
}

const PANTRY_VERSION = "v8_sorted_pantry";

const INGREDIENT_CONFIG = {
  // --- PROTEINS (Standardized to 1 lb or Count) ---
  "Chicken":        { unit: "lb",    step: 0.5,  default: 1 },
  "Chicken Thighs": { unit: "lb",    step: 0.5,  default: 1 },
  "Chicken Wings":  { unit: "lb",    step: 0.5,  default: 1 },
  "Ground Chicken": { unit: "lb",    step: 0.5,  default: 1 },
  "Ground Beef":    { unit: "lb",    step: 0.5,  default: 1 },
  "Ground Pork":    { unit: "lb",    step: 0.5,  default: 1 },
  "Beef Flank":     { unit: "lb",    step: 0.5,  default: 1 },
  "Shrimp":         { unit: "lb",    step: 0.5,  default: 1 },
  "Rib Eye Steak":  { unit: "count", step: 1,    default: 1 },
  "Lamb Chops":     { unit: "count", step: 1,    default: 4 },
  "Tilapia":        { unit: "fillets", step: 1,  default: 2 },
  "Salmon":         { unit: "fillets", step: 1,  default: 2 },
  "Bacon":          { unit: "pack",  step: 1,    default: 1 },

  // --- LIQUIDS & CONDIMENTS (Bulk Containers) ---
  "Soy Sauce":      { unit: "bottle", step: 1,    default: 1 },
  "Dark Soy Sauce": { unit: "bottle", step: 1,    default: 1 },
  "Vinegar":        { unit: "bottle", step: 1,    default: 1 },
  "Dark Vinegar":   { unit: "bottle", step: 1,    default: 1 },
  "Fish Sauce":     { unit: "bottle", step: 1,    default: 1 },
  "Oyster Sauce":   { unit: "bottle", step: 1,    default: 1 },
  "Hoisin Sauce":   { unit: "jar",    step: 1,    default: 1 },
  "Sesame Oil":     { unit: "bottle", step: 1,    default: 1 },
  "Olive Oil":      { unit: "bottle", step: 1,    default: 1 },
  "Avocado Oil":    { unit: "bottle", step: 1,    default: 1 },
  "Oil":            { unit: "bottle", step: 1,    default: 1 },
  "Hot Sauce":      { unit: "bottle", step: 1,    default: 1 },
  "Ketchup":        { unit: "bottle", step: 1,    default: 1 },
  "Honey":          { unit: "bottle", step: 1,    default: 1 },

  // --- PRODUCE & DAIRY (Counts/Bulk) ---
  "Garlic":         { unit: "bulb",   step: 1,    default: 2 },
  "Onion":          { unit: "count",  step: 1,    default: 3 },
  "Tomato":         { unit: "count",  step: 1,    default: 3 },
  "Lemon":          { unit: "count",  step: 1,    default: 3 },
  "Lime":           { unit: "count",  step: 1,    default: 3 },
  "Egg":            { unit: "dozen",  step: 0.5,  default: 1 },
  "Butter":         { unit: "stick",  step: 1,    default: 4 },
  "Heavy Cream":    { unit: "carton", step: 1,    default: 1 },
  "Greek Yogurt":   { unit: "tub",    step: 1,    default: 1 },
  "Milk":           { unit: "carton", step: 1,    default: 1 },

  // --- SPICES (Bulk Containers) ---
  "Salt":           { unit: "container", step: 1, default: 1 },
  "Pepper":         { unit: "jar",    step: 1,    default: 1 },
  "Cumin":          { unit: "jar",    step: 1,    default: 1 },
  "Paprika":        { unit: "jar",    step: 1,    default: 1 },
  "Garlic Powder":  { unit: "jar",    step: 1,    default: 1 },
  "Curry Powder":   { unit: "jar",    step: 1,    default: 1 },

  // --- DRY GOODS (Bulk Bags) ---
  "Jasmine Rice":   { unit: "bag",    step: 1,    default: 1 },
  "Rice":           { unit: "bag",    step: 1,    default: 1 },
  "Pasta":          { unit: "box",    step: 1,    default: 1 },
  "Noodles":        { unit: "pack",   step: 1,    default: 2 },
  "Flour":          { unit: "bag",    step: 1,    default: 1 },
  "Bread":          { unit: "loaf",   step: 1,    default: 1 },
  "Sugar":          { unit: "bag",    step: 1,    default: 1 },   // ~4lb bag
  "Corn Starch":    { unit: "box",    step: 1,    default: 1 },
  "Panko Breadcrumbs": { unit: "bag", step: 1,    default: 1 },
  "Baking Powder":  { unit: "can",    step: 1,    default: 1 },
  "Tortillas":      { unit: "pack",   step: 1,    default: 1 },
  "Coconut Milk":   { unit: "can",    step: 1,    default: 2 },
  "Canned Tomatoes":{ unit: "can",    step: 1,    default: 3 },
  "Pineapple Chunks":{ unit: "can",   step: 1,    default: 1 },
  "Beef Broth":     { unit: "carton", step: 1,    default: 1 },
  "Chicken Broth":  { unit: "carton", step: 1,    default: 1 },
  "Tomato Paste":   { unit: "can",    step: 1,    default: 1 },
  "Dijon Mustard":  { unit: "jar",    step: 1,    default: 1 },
  "Worcestershire Sauce": { unit: "bottle", step: 1, default: 1 },
};

function getIngredientConfig(item) {
  return INGREDIENT_CONFIG[item] || { unit: "count", step: 1, default: 1 };
}

function App() {
  const allPantryItems = Object.values(PANTRY_CATALOG).flat();

  const [pantryState, setPantryState] = useState(() => {
    const savedVersion = localStorage.getItem("instacook_pantry_version");
    const saved = localStorage.getItem("instacook_pantry");
    if (saved && savedVersion === PANTRY_VERSION) return JSON.parse(saved);
    const initial = {};
    allPantryItems.forEach(item => {
      const cfg = getIngredientConfig(item);
      initial[item] = { checked: false, qty: cfg.default };
    });
    return initial;
  });

  const [groceryList, setGroceryList] = useState(() => {
    const saved = localStorage.getItem("instacook_groceries");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [pantrySearch, setPantrySearch] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState("All");
  const [servings, setServings] = useState(4);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [collapsedCats, setCollapsedCats] = useState({});
  const [cookMode, setCookMode] = useState(null);
  const [cookStep, setCookStep] = useState(0);
  const [cookPhase, setCookPhase] = useState("checklist");
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerInput, setTimerInput] = useState("");
  const timerRef = React.useRef(null);
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [mobileTab, setMobileTab] = useState("pantry");
  const [darkMode, setDarkMode] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("instacook_pantry", JSON.stringify(pantryState));
    localStorage.setItem("instacook_pantry_version", PANTRY_VERSION);
  }, [pantryState]);

  useEffect(() => {
    localStorage.setItem("instacook_groceries", JSON.stringify(groceryList));
  }, [groceryList]);

  const togglePantryItem = (item) => {
    setPantryState(prev => ({ ...prev, [item]: { ...prev[item], checked: !prev[item].checked } }));
  };

  const updatePantryQty = (item, value) => {
    const parsed = parseFloat(value);
    setPantryState(prev => ({ ...prev, [item]: { ...prev[item], qty: isNaN(parsed) ? 0 : parsed } }));
  };

  const toggleCat = (cat) => setCollapsedCats(prev => ({ ...prev, [cat]: !prev[cat] }));

  const getScaledIngredients = (recipe) => {
    const scale = servings / recipe.baseServings;
    return recipe.ingredients.map(ing => ({ ...ing, scaledAmount: Number((ing.amount * scale).toFixed(2)) }));
  };

  // Unit conversions: pantryUnit->recipeUnit = multiplier
  const UNIT_CONVERSIONS = {
    // Garlic
    "bulb->cloves":   12,   // 1 bulb = 12 cloves
    "bulbs->cloves":  12,

    // Sugar & dry goods (1 standard bag is more than enough for any recipe amount)
    "bag->tsp":       230,  // 4lb sugar bag ≈ 460 tsp, mark as 230 to be conservative
    "bag->tbsp":      77,   // 4lb sugar bag ≈ 154 tbsp
    "bag->cup":       10,   // 4lb bag ≈ 10 cups
    "box->tsp":       96,   // cornstarch/baking powder box ≈ generous supply
    "box->tbsp":      32,
    "can->tsp":       24,   // baking powder can
    "can->tbsp":      8,    // tomato paste can ≈ 8 tbsp

    // Butter: 1 stick = 8 tbsp = 0.5 cup = 24 tsp
    "stick->tbsp":    8,
    "stick->cup":     0.5,
    "stick->tsp":     24,

    // Eggs: 1 dozen = 12 eggs
    "dozen->count":   12,

    // Broths & liquids: 1 standard carton = 4 cups = 32 fl oz
    "carton->cup":    4,
    "carton->cups":   4,

    // Bottles (sauces/oils): treat as ample supply — compare as "have it or not"
    // These are already in bulkUnits so they pass automatically

    // Packs & loaves
    "loaf->slices":   20,   // standard bread loaf ≈ 20 slices
    "pack->count":    10,   // tortilla pack ≈ 10, noodle pack ≈ usable
  };

  const getRecipeAnalysis = (recipe) => {
    const scaled = getScaledIngredients(recipe);
    const have = [], missing = [];
    const bulkUnits = ["bag", "bottle", "jar", "container", "box", "pack", "loaf", "dozen", "carton", "tub", "can", "stick", "bulb", "bulbs", "fillets", "lb"];

    scaled.forEach(ing => {
      const pantryEntry = pantryState[ing.name];
      const isItemChecked = pantryEntry?.checked;
      let availableQty = pantryEntry?.qty || 0;
      const pantryUnit = getIngredientConfig(ing.name).unit;

      // Convert pantry unit to recipe unit if they differ
      const conversionKey = `${pantryUnit}->${ing.unit}`;
      if (UNIT_CONVERSIONS[conversionKey]) {
        availableQty = availableQty * UNIT_CONVERSIONS[conversionKey];
      }

      const hasEnough = isItemChecked && (
        bulkUnits.includes(pantryUnit)
          ? availableQty >= 1
          : availableQty >= ing.scaledAmount
      );

      if (hasEnough) have.push(ing); else missing.push(ing);
    });
    return { have, missing, matchPercent: Math.round((have.length / scaled.length) * 100), canMake: missing.length === 0 };
  };

  const filteredRecipes = useMemo(() => {
    return RECIPE_LIBRARY
      .filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(r => cuisineFilter === "All" || r.cuisine === cuisineFilter)
      .map(r => ({ ...r, analysis: getRecipeAnalysis(r) }))
      .sort((a, b) => b.analysis.matchPercent - a.analysis.matchPercent);
  }, [searchTerm, cuisineFilter, servings, pantryState]);

  const canMakeRecipes = filteredRecipes.filter(r => r.analysis.canMake);
  const missingRecipes = filteredRecipes.filter(r => !r.analysis.canMake);

  const addMissingToGrocery = (recipe) => {
    const analysis = getRecipeAnalysis(recipe);
    const toAdd = analysis.missing.map(m => ({ name: m.name, checked: false }));
    setGroceryList(prev => {
      const existing = new Set(prev.map(i => i.name));
      return [...prev, ...toAdd.filter(i => !existing.has(i.name))];
    });
  };

  const groceryByCategory = useMemo(() => {
    const grouped = {};
    groceryList.forEach(item => {
      const cat = findCategory(item.name);
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(item);
    });
    return grouped;
  }, [groceryList]);

  const toggleGroceryCheck = (name) => {
    setGroceryList(prev => prev.map(i => i.name === name ? { ...i, checked: !i.checked } : i));
  };
  const removeGroceryItem = (name) => setGroceryList(prev => prev.filter(i => i.name !== name));
  const clearDone = () => setGroceryList(prev => prev.filter(i => !i.checked));
  const clearAll = () => setGroceryList([]);

  const filteredCatalog = useMemo(() => {
    if (!pantrySearch) return PANTRY_CATALOG;
    const q = pantrySearch.toLowerCase();
    const result = {};
    for (const [cat, items] of Object.entries(PANTRY_CATALOG)) {
      const filtered = items.filter(i => i.toLowerCase().includes(q));
      if (filtered.length) result[cat] = filtered;
    }
    return result;
  }, [pantrySearch]);

  const startCooking = (recipe) => {
    setCookMode(recipe);
    setCookStep(0);
    setCookPhase("checklist");
    setTimerSeconds(0);
    setTimerRunning(false);
    setTimerInput("");
  };

  const closeCooking = () => {
    clearInterval(timerRef.current);
    setCookMode(null);
    setTimerSeconds(0);
    setTimerRunning(false);
  };

  const goToStep = (step) => {
    clearInterval(timerRef.current);
    setTimerRunning(false);
    setTimerSeconds(0);
    setTimerInput("");
    setCookStep(step);
  };

  const detectTimer = (stepText) => {
    const match = stepText.match(/(\d+)[–\-]?(\d+)?\s*min/i);
    if (match) {
      const mins = match[2] ? Math.round((parseInt(match[1]) + parseInt(match[2])) / 2) : parseInt(match[1]);
      return mins * 60;
    }
    const secMatch = stepText.match(/(\d+)\s*sec/i);
    if (secMatch) return parseInt(secMatch[1]);
    return 0;
  };

  React.useEffect(() => {
    if (cookMode && cookPhase === "cooking") {
      const detected = detectTimer(cookMode.steps[cookStep]);
      setTimerSeconds(detected);
      setTimerInput(detected ? String(Math.floor(detected / 60)) : "");
      setTimerRunning(false);
      clearInterval(timerRef.current);
    }
  }, [cookStep, cookPhase, cookMode]);

  React.useEffect(() => {
    if (timerRunning && timerSeconds > 0) {
      timerRef.current = setInterval(() => {
        setTimerSeconds(s => {
          if (s <= 1) { clearInterval(timerRef.current); setTimerRunning(false); return 0; }
          return s - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerRunning]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const getSurprise = async () => {
    setAiLoading(true);
    setAiSuggestion(null);
    const ownedItems = allPantryItems.filter(i => pantryState[i]?.checked);
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 400,
          messages: [{
            role: "user",
            content: `I have these ingredients: ${ownedItems.join(", ")}. Suggest ONE creative recipe I can make. Respond ONLY with valid JSON...`
          }]
        })
      });
      const data = await resp.json();
      const text = data.content?.find(b => b.type === "text")?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      setAiSuggestion(JSON.parse(clean));
    } catch (e) {
      setAiSuggestion({ name: "Surprise unavailable", description: "Could not reach AI. Try again!", ingredients: [], tip: "" });
    }
    setAiLoading(false);
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <header className="topbar">
        <div className="logo">
          <svg className="logo-emblem" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16.5" stroke="#5dbd74" strokeWidth="1.5" fill="rgba(93,189,116,0.08)"/>
            <circle cx="18" cy="18" r="12.5" stroke="#5dbd74" strokeWidth="0.5" strokeDasharray="2 3" fill="none" opacity="0.5"/>
            <text x="18" y="24" textAnchor="middle" fontSize="15" fill="#5dbd74" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontWeight="600">ic</text>
          </svg>
          <div className="logo-text">
            <span className="logo-wordmark">Insta<strong>Cook</strong></span>
            <span className="logo-tagline">From pantry to plate</span>
          </div>
        </div>
        <div className="topbar-center">
          <div className="topbar-divider"></div>
          <div className="search-wrap">
            <span className="si">⌕</span>
            <input placeholder="Search recipes..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <div className="servings-ctrl">
            <label>Serves</label>
            <select value={servings} onChange={e => setServings(Number(e.target.value))}>
              {[2, 4, 6, 8].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>
        <div className="topbar-right">
          <button className="btn-darkmode" onClick={() => setDarkMode(d => !d)}>
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button className="btn-surprise" onClick={getSurprise} disabled={aiLoading}>
            {aiLoading ? "Thinking..." : "✦ Surprise Me"}
          </button>
        </div>
      </header>

      <div className="layout">
        <aside className={`sidebar ${mobileTab === "pantry" ? "mobile-active" : ""}`}>
          <div className="sidebar-header">
            <h2>My Pantry</h2>
            <div className="pantry-search">
              <span className="si">⌕</span>
              <input placeholder="Filter ingredients..." value={pantrySearch} onChange={e => setPantrySearch(e.target.value)} />
            </div>
          </div>
          {Object.entries(filteredCatalog).map(([cat, items]) => {
            const open = !collapsedCats[cat];
            const checkedCount = items.filter(i => pantryState[i]?.checked).length;
            return (
              <div key={cat} className="cat-block">
                <div className="cat-header" onClick={() => toggleCat(cat)}>
                  <span className="cat-title">{cat}</span>
                  <div className="cat-header-right">
                    <span className="cat-count">{checkedCount}/{items.length}</span>
                    <span className={`cat-chevron ${open ? "open" : ""}`}>▶</span>
                  </div>
                </div>
                {open && (
                  <div className="cat-items">
                    {items.map(item => {
                      const cfg = getIngredientConfig(item);
                      return (
                        <div key={item} className="pantry-row">
                          <label className="pantry-label">
                            <input type="checkbox" checked={!!pantryState[item]?.checked} onChange={() => togglePantryItem(item)} />
                            <span>{item}</span>
                          </label>
                          <div className="qty-wrap">
                            <input type="number" step={cfg.step} min={0} className="qty-input" value={pantryState[item]?.qty ?? cfg.default} onChange={e => updatePantryQty(item, e.target.value)} />
                            <span className="qty-unit">{cfg.unit}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </aside>

        <main className={`main ${mobileTab === "recipes" ? "mobile-active" : ""}`}>
          <div className="main-inner">
            <div className="cuisine-filter">
              {CUISINES.map(c => (
                <button
                  key={c}
                  className={`cuisine-btn ${cuisineFilter === c ? "active" : ""}`}
                  onClick={() => setCuisineFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            {(aiLoading || aiSuggestion) && (
              <div>
                <div className="section-label">AI suggestion</div>
                {aiLoading ? (
                  <div className="ai-card"><div className="ai-loading"><div className="spinner"></div>Finding...</div></div>
                ) : aiSuggestion && (
                  <div className="ai-card">
                    <div className="ai-badge">✦ AI Pick</div>
                    <h3>{aiSuggestion.name}</h3>
                    <p>{aiSuggestion.description}</p>
                  </div>
                )}
              </div>
            )}

            {canMakeRecipes.length > 0 && (
              <div>
                <div className="section-label">ready to cook — {canMakeRecipes.length}</div>
                <div className="recipes-grid">
                  {canMakeRecipes.map(recipe => (
                    <div key={recipe.name} className={`recipe-card ${selectedRecipe?.name === recipe.name ? "active" : ""}`} onClick={() => { setSelectedRecipe(recipe); setMobileTab("detail"); }}>
                      <span className="card-emoji">{recipe.emoji}</span>
                      <div className="card-name">{recipe.name}</div>
                      <div className="card-status ok">✓ All ingredients on hand</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {missingRecipes.length > 0 && (
              <div>
                <div className="section-label">need ingredients — {missingRecipes.length}</div>
                <div className="recipes-grid">
                  {missingRecipes.map(recipe => (
                    <div key={recipe.name} className={`recipe-card ${selectedRecipe?.name === recipe.name ? "active" : ""}`} onClick={() => setSelectedRecipe(recipe)}>
                      <span className="card-emoji">{recipe.emoji}</span>
                      <div className="card-name">{recipe.name}</div>
                      <div className="card-status miss">Missing {recipe.analysis.missing.length}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        <aside className={`right-panel ${mobileTab === "detail" || mobileTab === "grocery" ? "mobile-active" : ""}`}>
          <div className="detail-section">
            <h2>Recipe Detail</h2>
            {!selectedRecipe ? (
              <div className="detail-empty">Select a recipe</div>
            ) : (
              <>
                <div className="detail-title-row">
                  <span className="detail-emoji">{selectedRecipe.emoji}</span>
                  <div>
                    <div className="detail-name">{selectedRecipe.name}</div>
                    <div className="detail-time">⏱ {selectedRecipe.time}</div>
                  </div>
                </div>
                <table className="ing-table">
                  <thead><tr><th>Ingredient</th><th>Need</th><th>Have</th></tr></thead>
                  <tbody>
                    {getScaledIngredients(selectedRecipe).map(ing => {
                      const analysis = getRecipeAnalysis(selectedRecipe);
                      const hasEnough = !analysis.missing.find(m => m.name === ing.name);
                      return (
                        <tr key={ing.name} className={hasEnough ? "have" : "miss"}>
                          <td>{ing.name}</td>
                          <td>{ing.scaledAmount} {ing.unit}</td>
                          <td>
                            {pantryState[ing.name]?.checked 
                              ? `${pantryState[ing.name].qty} ${getIngredientConfig(ing.name).unit}` 
                              : 0}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="detail-steps">
                  <div className="detail-steps-label">Steps</div>
                  {selectedRecipe.steps.map((step, i) => (
                    <div key={i} className="detail-step">
                      <div className="detail-step-num">{i + 1}</div>
                      <div className="detail-step-text">{step}</div>
                    </div>
                  ))}
                </div>

                <button className="btn-cook" onClick={() => startCooking(selectedRecipe)}>▶ Start Cooking Mode</button>
              </>
            )}
          </div>

          <div className="grocery-section">
            <h2>Grocery List</h2>
            {groceryList.length === 0 ? <div className="grocery-empty">Empty</div> : (
              <>
                {Object.entries(groceryByCategory).map(([cat, items]) => (
                  <div key={cat} className="grocery-group">
                    <div className="grocery-group-title">{cat}</div>
                    {items.map(item => (
                      <div key={item.name} className={`grocery-item ${item.checked ? "checked" : ""}`}>
                        <div className="grocery-left" onClick={() => toggleGroceryCheck(item.name)}>
                          <input type="checkbox" checked={item.checked} readOnly />
                          <span>{item.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )}
          </div>
        </aside>
      <nav className="mobile-tabs">
          <button className={mobileTab === "pantry" ? "active" : ""} onClick={() => setMobileTab("pantry")}>
            <span>🥫</span>
            <span>Pantry</span>
          </button>
          <button className={mobileTab === "recipes" ? "active" : ""} onClick={() => setMobileTab("recipes")}>
            <span>🍽️</span>
            <span>Recipes</span>
          </button>
          <button className={mobileTab === "detail" ? "active" : ""} onClick={() => setMobileTab("detail")}>
            <span>📋</span>
            <span>Detail</span>
          </button>
          <button className={mobileTab === "grocery" ? "active" : ""} onClick={() => setMobileTab("grocery")}>
            <span>🛒</span>
            <span>Grocery</span>
          </button>
        </nav>
      </div>
      {cookMode && (
        <div className="cook-overlay" onClick={e => { if (e.target === e.currentTarget) closeCooking(); }}>
          <div className="cook-modal">
            <div className="cook-header">
              <div className="cook-header-top">
                <div className="cook-title">{cookMode.emoji} {cookMode.name}</div>
                <button className="btn-close" onClick={closeCooking}>×</button>
              </div>
              {cookPhase === "cooking" && (
                <div className="cook-progress">
                  {cookMode.steps.map((_, i) => (
                    <div key={i} className={`prog-dot ${i < cookStep ? "done" : i === cookStep ? "active" : ""}`}></div>
                  ))}
                </div>
              )}
            </div>

            {/* CHECKLIST PHASE */}
            {cookPhase === "checklist" && (
              <>
                <div className="cook-body">
                  <div className="cook-phase-label">Before you start</div>
                  <p className="cook-phase-sub">Confirm you have everything ready for {servings} servings</p>
                  <table className="cook-ing-table">
                    <thead>
                      <tr><th>Ingredient</th><th>Amount</th></tr>
                    </thead>
                    <tbody>
                      {getScaledIngredients(cookMode).map(ing => (
                        <tr key={ing.name}>
                          <td>{ing.name}</td>
                          <td className="ing-amount">{ing.scaledAmount} {ing.unit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="cook-footer">
                  <button className="btn-prev" onClick={closeCooking}>Cancel</button>
                  <button className="btn-next" onClick={() => setCookPhase("cooking")}>I'm ready — Let's cook →</button>
                </div>
              </>
            )}

            {/* COOKING PHASE */}
            {cookPhase === "cooking" && (
              <>
                <div className="cook-body">
                  <div className="step-num">Step {cookStep + 1} of {cookMode.steps.length}</div>
                  <div className="step-text">{cookMode.steps[cookStep]}</div>

                  {/* SCALED INGREDIENTS REMINDER */}
                  <div className="cook-ing-strip">
                    {getScaledIngredients(cookMode).map(ing => (
                      <span key={ing.name} className="cook-ing-pill">
                        <span className="pill-name">{ing.name}</span>
                        <span className="pill-amt">{ing.scaledAmount} {ing.unit}</span>
                      </span>
                    ))}
                  </div>

                  {/* TIMER */}
                  <div className="cook-timer">
                    <div className="timer-label">
                      {timerSeconds > 0 && timerRunning ? "⏱ Timer running" : timerSeconds > 0 && !timerRunning ? "⏱ Timer ready" : "⏱ Set a timer"}
                    </div>
                    <div className="timer-display" style={{ color: timerSeconds > 0 && timerSeconds <= 10 ? "var(--red)" : "var(--text)" }}>
                      {formatTime(timerSeconds)}
                    </div>
                    <div className="timer-controls">
                      <input
                        className="timer-input"
                        type="number"
                        placeholder="min"
                        value={timerInput}
                        onChange={e => {
                          setTimerInput(e.target.value);
                          const mins = parseInt(e.target.value);
                          if (!isNaN(mins) && mins > 0) setTimerSeconds(mins * 60);
                        }}
                      />
                      <button className="btn-timer-action" onClick={() => setTimerRunning(r => !r)} disabled={timerSeconds === 0}>
                        {timerRunning ? "⏸ Pause" : "▶ Start"}
                      </button>
                      <button className="btn-timer-reset" onClick={() => {
                        clearInterval(timerRef.current);
                        setTimerRunning(false);
                        const mins = parseInt(timerInput);
                        setTimerSeconds(!isNaN(mins) && mins > 0 ? mins * 60 : 0);
                      }}>↺</button>
                    </div>
                  </div>
                </div>
                <div className="cook-footer">
                  <button className="btn-prev" disabled={cookStep === 0} onClick={() => goToStep(cookStep - 1)}>← Back</button>
                  {cookStep < cookMode.steps.length - 1 ? (
                    <button className="btn-next" onClick={() => goToStep(cookStep + 1)}>Next →</button>
                  ) : (
                    <button className="btn-done-cook" onClick={closeCooking}>✓ Done! Enjoy</button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;