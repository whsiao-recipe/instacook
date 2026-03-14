import React, { useMemo, useState, useEffect, useRef } from "react";

// --- DATA CONSTANTS ---
const PANTRY_CATALOG = {
  "Meat & Proteins": [
    "Ground Chicken", "Ground Beef", "Beef Flank", "Chicken", "Rib Eye Steak",
    "Tilapia", "Chicken Thighs", "Chicken Wings"
  ],
  "Produce & Dairy": [
    "Broccoli", "Tomato", "Heavy Cream", "Cream", "American Cheese", "Banana Peppers",
    "Basil", "Butter", "Cheese", "Egg", "Garlic", "Onion", "Red Onion", "Shallot"
  ],
  "Pantry Staples": [
    "Jasmine Rice", "Rice", "Noodles", "Bread", "Flour", "Corn Starch",
    "Beef Broth", "Chicken Broth", "Oil", "Olive Oil", "Avocado Oil"
  ],
  "Spices & Sauces": [
    "Adobo", "Chicken Powder", "Cinnamon", "Cloves", "Coriander", "Cumin",
    "Dark Soy Sauce", "Dark Vinegar", "Fennel Seeds", "Fish Sauce", "Garlic Powder",
    "Ginger", "Hoisin Sauce", "Ketchup", "Mushroom Powder", "Mustard",
    "Onion Powder", "Oregano", "Oyster Sauce", "Paprika", "Pepper", "Peppercorn",
    "Rice Wine", "Salt", "Sesame Oil", "Soy Sauce", "Star Anise", "Sugar",
    "Vinegar", "White Pepper", "Bay Leaf", "Rosemary", "Thyme",
    "Pickles", "Sour Cream", "Water"
  ]
};

const RECIPE_LIBRARY = [
  {
    name: "Marry Me Chicken",
    emoji: "🍗",
    time: "30 min",
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
    time: "1 hr",
    baseServings: 4,
    ingredients: [
      { name: "Beef Broth", amount: 4, unit: "cups" },
      { name: "Noodles", amount: 1, unit: "pack" },
      { name: "Onion", amount: 1, unit: "count" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Fish Sauce", amount: 1, unit: "tbsp" },
      { name: "Star Anise", amount: 2, unit: "pods" },
      { name: "Cinnamon", amount: 1, unit: "stick" },
      { name: "Cloves", amount: 4, unit: "count" }
    ],
    steps: [
      "Char halved onion and garlic directly over flame or under broiler until slightly blackened.",
      "Combine beef broth, star anise, cinnamon, and cloves in a large pot. Bring to a boil.",
      "Add charred onion and garlic. Simmer 30 min to develop broth flavor.",
      "Strain broth through a fine mesh sieve. Season with fish sauce and salt.",
      "Cook rice noodles per package directions. Drain and divide into bowls.",
      "Ladle hot broth over noodles. Serve with bean sprouts, lime, and herbs."
    ]
  },
  {
    name: "Rib Eye Steak",
    emoji: "🥩",
    time: "20 min",
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
      "Place steaks in pan. Sear 3–4 min without moving for a deep crust.",
      "Flip steaks. Add butter, garlic, and rosemary to the pan.",
      "Tilt the pan and baste steaks continuously with melted butter for 2–3 min.",
      "Rest steaks 5 min before slicing to lock in juices."
    ]
  },
  {
    name: "Birria",
    emoji: "🌯",
    time: "2 hr",
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
  }
];

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0e0e11;
    --surface: #17171c;
    --surface2: #1f1f26;
    --surface3: #27272f;
    --border: rgba(255,255,255,0.07);
    --border2: rgba(255,255,255,0.12);
    --text: #f0f0f5;
    --muted: #7a7a8a;
    --accent: #f97316;
    --accent-dim: rgba(249,115,22,0.15);
    --accent-glow: rgba(249,115,22,0.08);
    --green: #34d399;
    --green-dim: rgba(52,211,153,0.12);
    --red: #f87171;
    --red-dim: rgba(248,113,113,0.1);
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); }

  .app { display: flex; flex-direction: column; height: 100vh; overflow: hidden; }

  /* TOPBAR */
  .topbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 24px; height: 60px;
    background: var(--surface); border-bottom: 1px solid var(--border);
    flex-shrink: 0; gap: 16px;
  }
  .logo { font-family: 'DM Serif Display', serif; font-size: 22px; color: var(--accent); font-style: italic; white-space: nowrap; }
  .topbar-center { display: flex; align-items: center; gap: 10px; flex: 1; max-width: 400px; }
  .search-wrap { position: relative; flex: 1; }
  .search-wrap input { width: 100%; background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; padding: 8px 12px 8px 36px; color: var(--text); font-size: 14px; font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.2s; }
  .search-wrap input:focus { border-color: var(--accent); }
  .search-wrap .si { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--muted); font-size: 16px; pointer-events: none; }
  .servings-ctrl { display: flex; align-items: center; gap: 8px; white-space: nowrap; }
  .servings-ctrl label { font-size: 13px; color: var(--muted); }
  .servings-ctrl select { background: var(--surface2); border: 1px solid var(--border); color: var(--text); border-radius: 8px; padding: 7px 10px; font-size: 13px; font-family: 'DM Sans', sans-serif; cursor: pointer; outline: none; }
  .topbar-right { display: flex; gap: 8px; }
  .btn-surprise { background: var(--accent); color: white; border: none; border-radius: 10px; padding: 8px 14px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: opacity 0.2s; white-space: nowrap; }
  .btn-surprise:hover { opacity: 0.85; }
  .btn-surprise:disabled { opacity: 0.5; cursor: not-allowed; }

  /* LAYOUT */
  .layout { display: grid; grid-template-columns: 280px 1fr 340px; flex: 1; overflow: hidden; }

  /* SIDEBAR */
  .sidebar { background: var(--surface); border-right: 1px solid var(--border); overflow-y: auto; display: flex; flex-direction: column; }
  .sidebar::-webkit-scrollbar { width: 4px; }
  .sidebar::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }
  .sidebar-header { padding: 16px 20px 12px; border-bottom: 1px solid var(--border); position: sticky; top: 0; background: var(--surface); z-index: 1; }
  .sidebar-header h2 { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); }
  .pantry-search { margin-top: 10px; position: relative; }
  .pantry-search input { width: 100%; background: var(--surface2); border: 1px solid var(--border); border-radius: 8px; padding: 7px 10px 7px 32px; font-size: 13px; color: var(--text); font-family: 'DM Sans', sans-serif; outline: none; }
  .pantry-search input:focus { border-color: var(--accent); }
  .pantry-search .si { position: absolute; left: 9px; top: 50%; transform: translateY(-50%); color: var(--muted); font-size: 14px; pointer-events: none; }
  .cat-block { border-bottom: 1px solid var(--border); }
  .cat-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; cursor: pointer; user-select: none; }
  .cat-header:hover { background: var(--surface2); }
  .cat-title { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); }
  .cat-count { font-size: 11px; color: var(--muted); background: var(--surface3); padding: 2px 7px; border-radius: 99px; }
  .cat-chevron { font-size: 10px; color: var(--muted); transition: transform 0.2s; }
  .cat-chevron.open { transform: rotate(90deg); }
  .cat-items { padding: 4px 0 8px; }
  .pantry-row { display: flex; align-items: center; justify-content: space-between; padding: 5px 20px; gap: 8px; }
  .pantry-row:hover { background: var(--surface2); }
  .pantry-label { display: flex; align-items: center; gap: 9px; cursor: pointer; flex: 1; min-width: 0; }
  .pantry-label span { font-size: 13px; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .pantry-label input[type=checkbox] { width: 15px; height: 15px; accent-color: var(--accent); cursor: pointer; flex-shrink: 0; }
  .qty-input { width: 44px; background: var(--surface3); border: 1px solid var(--border); border-radius: 6px; padding: 3px 6px; color: var(--text); font-size: 12px; text-align: center; font-family: 'DM Sans', sans-serif; outline: none; }
  .qty-input:focus { border-color: var(--accent); }

  /* MAIN */
  .main { overflow-y: auto; background: var(--bg); }
  .main::-webkit-scrollbar { width: 4px; }
  .main::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }
  .main-inner { padding: 24px; display: flex; flex-direction: column; gap: 28px; }
  .section-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
  .section-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }
  .recipes-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px; }
  .recipe-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 18px; cursor: pointer; transition: border-color 0.2s, background 0.2s; position: relative; overflow: hidden; }
  .recipe-card:hover { border-color: var(--accent); background: var(--surface2); }
  .recipe-card.active { border-color: var(--accent); background: var(--surface2); }
  .card-emoji { font-size: 28px; margin-bottom: 10px; display: block; }
  .card-name { font-size: 15px; font-weight: 600; margin-bottom: 6px; line-height: 1.3; }
  .card-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
  .card-time { font-size: 12px; color: var(--muted); }
  .match-bar { height: 3px; background: var(--surface3); border-radius: 2px; overflow: hidden; margin-bottom: 8px; }
  .match-fill { height: 100%; border-radius: 2px; background: var(--accent); transition: width 0.3s; }
  .match-fill.full { background: var(--green); }
  .card-status { font-size: 12px; font-weight: 500; }
  .card-status.ok { color: var(--green); }
  .card-status.miss { color: var(--muted); }
  .match-pct { font-size: 11px; color: var(--muted); }

  /* AI SUGGESTION CARD */
  .ai-card { background: var(--surface); border: 1px solid var(--accent); border-radius: 16px; padding: 20px; position: relative; overflow: hidden; }
  .ai-card::before { content: ''; position: absolute; inset: 0; background: var(--accent-glow); pointer-events: none; }
  .ai-badge { display: inline-flex; align-items: center; gap: 5px; background: var(--accent-dim); color: var(--accent); font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 99px; margin-bottom: 12px; }
  .ai-card h3 { font-size: 16px; font-weight: 600; margin-bottom: 6px; }
  .ai-card p { font-size: 13px; color: var(--muted); line-height: 1.6; }
  .ai-ingredients { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 5px; }
  .ai-ing-tag { background: var(--surface3); color: var(--text); font-size: 12px; padding: 3px 9px; border-radius: 6px; }
  .ai-loading { display: flex; align-items: center; gap: 10px; color: var(--muted); font-size: 14px; }
  .spinner { width: 16px; height: 16px; border: 2px solid var(--border2); border-top-color: var(--accent); border-radius: 50%; animation: spin 0.7s linear infinite; flex-shrink: 0; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* RIGHT PANEL */
  .right-panel { background: var(--surface); border-left: 1px solid var(--border); overflow-y: auto; display: flex; flex-direction: column; }
  .right-panel::-webkit-scrollbar { width: 4px; }
  .right-panel::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }

  /* RECIPE DETAIL */
  .detail-section { padding: 20px; border-bottom: 1px solid var(--border); }
  .detail-section h2 { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin-bottom: 14px; }
  .detail-empty { color: var(--muted); font-size: 14px; padding: 40px 20px; text-align: center; }
  .detail-title-row { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 16px; }
  .detail-emoji { font-size: 32px; flex-shrink: 0; }
  .detail-name { font-size: 18px; font-weight: 600; line-height: 1.3; }
  .detail-time { font-size: 13px; color: var(--muted); margin-top: 3px; }
  .ing-table { width: 100%; border-collapse: collapse; }
  .ing-table th { font-size: 11px; text-transform: uppercase; letter-spacing: 0.07em; color: var(--muted); font-weight: 600; padding: 0 0 8px; text-align: left; }
  .ing-table td { padding: 7px 0; font-size: 13px; border-top: 1px solid var(--border); }
  .ing-table tr.have td { color: var(--green); }
  .ing-table tr.miss td { color: var(--red); }
  .btn-add-grocery { width: 100%; padding: 11px; background: var(--accent); color: white; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: opacity 0.2s; margin-top: 14px; }
  .btn-add-grocery:hover { opacity: 0.85; }
  .btn-cook { width: 100%; padding: 11px; background: transparent; color: var(--green); border: 1px solid var(--green); border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.2s; margin-top: 8px; }
  .btn-cook:hover { background: var(--green-dim); }

  /* GROCERY */
  .grocery-section { padding: 20px; flex: 1; }
  .grocery-section h2 { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin-bottom: 14px; }
  .grocery-empty { font-size: 13px; color: var(--muted); text-align: center; padding: 20px 0; }
  .grocery-group { margin-bottom: 14px; }
  .grocery-group-title { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; color: var(--muted); margin-bottom: 6px; }
  .grocery-item { display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; background: var(--surface2); border-radius: 8px; margin-bottom: 4px; }
  .grocery-item.checked { opacity: 0.4; }
  .grocery-left { display: flex; align-items: center; gap: 8px; cursor: pointer; }
  .grocery-left input[type=checkbox] { accent-color: var(--accent); cursor: pointer; }
  .grocery-left span { font-size: 13px; }
  .grocery-item.checked .grocery-left span { text-decoration: line-through; }
  .btn-del { background: none; border: none; color: var(--muted); cursor: pointer; font-size: 16px; line-height: 1; padding: 2px 4px; border-radius: 4px; }
  .btn-del:hover { color: var(--red); background: var(--red-dim); }
  .grocery-actions { display: flex; gap: 8px; margin-top: 12px; }
  .btn-clear-done { flex: 1; background: var(--surface3); border: none; color: var(--muted); border-radius: 8px; padding: 8px; font-size: 12px; cursor: pointer; font-family: 'DM Sans', sans-serif; }
  .btn-clear-all { flex: 1; background: var(--surface3); border: none; color: var(--red); border-radius: 8px; padding: 8px; font-size: 12px; cursor: pointer; font-family: 'DM Sans', sans-serif; }

  /* COOKING MODE OVERLAY */
  .cook-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 100; display: flex; align-items: center; justify-content: center; }
  .cook-modal { background: var(--surface); border: 1px solid var(--border2); border-radius: 24px; width: 560px; max-width: 90vw; max-height: 90vh; overflow: hidden; display: flex; flex-direction: column; }
  .cook-header { padding: 24px 28px 0; }
  .cook-header-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
  .cook-title { font-size: 20px; font-weight: 600; }
  .btn-close { background: var(--surface3); border: none; color: var(--muted); font-size: 20px; line-height: 1; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
  .btn-close:hover { color: var(--text); }
  .cook-progress { display: flex; gap: 4px; margin-bottom: 24px; }
  .prog-dot { flex: 1; height: 3px; border-radius: 2px; background: var(--surface3); transition: background 0.3s; }
  .prog-dot.done { background: var(--green); }
  .prog-dot.active { background: var(--accent); }
  .cook-body { padding: 0 28px 28px; overflow-y: auto; flex: 1; }
  .step-num { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent); margin-bottom: 10px; }
  .step-text { font-size: 16px; line-height: 1.7; color: var(--text); }
  .cook-footer { padding: 20px 28px; border-top: 1px solid var(--border); display: flex; gap: 10px; }
  .btn-prev { flex: 1; background: var(--surface2); border: none; color: var(--text); border-radius: 10px; padding: 12px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; }
  .btn-prev:disabled { opacity: 0.3; cursor: not-allowed; }
  .btn-next { flex: 2; background: var(--accent); border: none; color: white; border-radius: 10px; padding: 12px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; }
  .btn-next:hover { opacity: 0.9; }
  .btn-done-cook { flex: 2; background: var(--green); border: none; color: white; border-radius: 10px; padding: 12px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; }
`;

// --- HELPERS ---
function findCategory(itemName) {
  for (const [cat, items] of Object.entries(PANTRY_CATALOG)) {
    if (items.includes(itemName)) return cat;
  }
  return "Other";
}

function App() {
  const allPantryItems = Object.values(PANTRY_CATALOG).flat();

  const [pantryState, setPantryState] = useState(() => {
    const initial = {};
    allPantryItems.forEach(item => initial[item] = { checked: false, qty: 1 });
    ["Chicken", "Garlic", "Olive Oil", "Oregano", "Paprika", "Heavy Cream", "Chicken Broth", "Basil"].forEach(i => {
      if (initial[i]) initial[i] = { checked: true, qty: i === "Garlic" ? 6 : 1 };
    });
    return initial;
  });

  const [groceryList, setGroceryList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pantrySearch, setPantrySearch] = useState("");
  const [servings, setServings] = useState(4);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [collapsedCats, setCollapsedCats] = useState({});
  const [cookMode, setCookMode] = useState(null);
  const [cookStep, setCookStep] = useState(0);
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

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

  const getRecipeAnalysis = (recipe) => {
    const scaled = getScaledIngredients(recipe);
    const have = [], missing = [];
    scaled.forEach(ing => {
      const available = pantryState[ing.name]?.checked ? pantryState[ing.name].qty : 0;
      if (available >= ing.scaledAmount) have.push(ing); else missing.push(ing);
    });
    return { have, missing, matchPercent: Math.round((have.length / scaled.length) * 100), canMake: missing.length === 0 };
  };

  const filteredRecipes = useMemo(() => {
    return RECIPE_LIBRARY
      .filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(r => ({ ...r, analysis: getRecipeAnalysis(r) }))
      .sort((a, b) => b.analysis.matchPercent - a.analysis.matchPercent);
  }, [searchTerm, servings, pantryState]);

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

  // Group grocery by category
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

  // Pantry filtered
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

  // Cooking mode
  const startCooking = (recipe) => {
    setCookMode(recipe);
    setCookStep(0);
  };
  const closeCooking = () => setCookMode(null);

  // AI suggestion
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
            content: `I have these ingredients: ${ownedItems.join(", ")}. Suggest ONE creative recipe I can make. Respond ONLY with valid JSON, no markdown, no extra text: {"name":"Recipe Name","description":"One compelling sentence about this dish.","ingredients":["ing1","ing2","ing3"],"tip":"One quick cooking tip."}`
          }]
        })
      });
      const data = await resp.json();
      const text = data.content?.find(b => b.type === "text")?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setAiSuggestion(parsed);
    } catch (e) {
      setAiSuggestion({ name: "Surprise unavailable", description: "Could not reach AI. Try again!", ingredients: [], tip: "" });
    }
    setAiLoading(false);
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">
        {/* TOPBAR */}
        <header className="topbar">
          <div className="logo">InstaCook</div>
          <div className="topbar-center">
            <div className="search-wrap">
              <span className="si">⌕</span>
              <input placeholder="Search recipes..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="servings-ctrl">
              <label>Serves</label>
              <select value={servings} onChange={e => setServings(Number(e.target.value))}>
                {[2,4,6,8].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>
          <div className="topbar-right">
            <button className="btn-surprise" onClick={getSurprise} disabled={aiLoading}>
              {aiLoading ? "Thinking..." : "✦ Surprise Me"}
            </button>
          </div>
        </header>

        <div className="layout">
          {/* SIDEBAR */}
          <aside className="sidebar">
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
                    <div style={{display:'flex',gap:6,alignItems:'center'}}>
                      <span className="cat-count">{checkedCount}/{items.length}</span>
                      <span className={`cat-chevron ${open ? 'open' : ''}`}>▶</span>
                    </div>
                  </div>
                  {open && (
                    <div className="cat-items">
                      {items.map(item => (
                        <div key={item} className="pantry-row">
                          <label className="pantry-label">
                            <input type="checkbox" checked={!!pantryState[item]?.checked} onChange={() => togglePantryItem(item)} />
                            <span>{item}</span>
                          </label>
                          <input type="number" step="0.5" className="qty-input" value={pantryState[item]?.qty ?? 1} onChange={e => updatePantryQty(item, e.target.value)} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </aside>

          {/* MAIN */}
          <main className="main">
            <div className="main-inner">
              {/* AI Suggestion */}
              {(aiLoading || aiSuggestion) && (
                <div>
                  <div className="section-label">AI suggestion</div>
                  {aiLoading ? (
                    <div className="ai-card"><div className="ai-loading"><div className="spinner"></div>Finding the perfect recipe for your pantry...</div></div>
                  ) : aiSuggestion && (
                    <div className="ai-card">
                      <div className="ai-badge">✦ AI Pick</div>
                      <h3>{aiSuggestion.name}</h3>
                      <p>{aiSuggestion.description}</p>
                      {aiSuggestion.tip && <p style={{marginTop:8,color:'var(--accent)',fontSize:13}}>💡 {aiSuggestion.tip}</p>}
                      <div className="ai-ingredients">
                        {aiSuggestion.ingredients?.map(i => <span key={i} className="ai-ing-tag">{i}</span>)}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Can Make */}
              {canMakeRecipes.length > 0 && (
                <div>
                  <div className="section-label">ready to cook — {canMakeRecipes.length}</div>
                  <div className="recipes-grid">
                    {canMakeRecipes.map(recipe => (
                      <div key={recipe.name} className={`recipe-card ${selectedRecipe?.name === recipe.name ? 'active' : ''}`} onClick={() => setSelectedRecipe(recipe)}>
                        <span className="card-emoji">{recipe.emoji}</span>
                        <div className="card-name">{recipe.name}</div>
                        <div className="card-meta">
                          <span className="card-time">⏱ {recipe.time}</span>
                        </div>
                        <div className="match-bar"><div className="match-fill full" style={{width:'100%'}}></div></div>
                        <div className="card-status ok">✓ All ingredients on hand</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing */}
              {missingRecipes.length > 0 && (
                <div>
                  <div className="section-label">need ingredients — {missingRecipes.length}</div>
                  <div className="recipes-grid">
                    {missingRecipes.map(recipe => (
                      <div key={recipe.name} className={`recipe-card ${selectedRecipe?.name === recipe.name ? 'active' : ''}`} onClick={() => setSelectedRecipe(recipe)}>
                        <span className="card-emoji">{recipe.emoji}</span>
                        <div className="card-name">{recipe.name}</div>
                        <div className="card-meta">
                          <span className="card-time">⏱ {recipe.time}</span>
                          <span className="match-pct">{recipe.analysis.matchPercent}%</span>
                        </div>
                        <div className="match-bar"><div className="match-fill" style={{width:`${recipe.analysis.matchPercent}%`}}></div></div>
                        <div className="card-status miss">Missing {recipe.analysis.missing.length} ingredient{recipe.analysis.missing.length !== 1 ? 's' : ''}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </main>

          {/* RIGHT PANEL */}
          <aside className="right-panel">
            {/* Recipe Detail */}
            <div className="detail-section">
              <h2>Recipe Detail</h2>
              {!selectedRecipe ? (
                <div className="detail-empty">Select a recipe to see details</div>
              ) : (
                <>
                  <div className="detail-title-row">
                    <span className="detail-emoji">{selectedRecipe.emoji}</span>
                    <div>
                      <div className="detail-name">{selectedRecipe.name}</div>
                      <div className="detail-time">⏱ {selectedRecipe.time} · Serves {servings}</div>
                    </div>
                  </div>
                  <table className="ing-table">
                    <thead><tr><th>Ingredient</th><th>Need</th><th>Have</th></tr></thead>
                    <tbody>
                      {getScaledIngredients(selectedRecipe).map(ing => {
                        const hasEnough = (pantryState[ing.name]?.qty || 0) >= ing.scaledAmount && pantryState[ing.name]?.checked;
                        return (
                          <tr key={ing.name} className={hasEnough ? 'have' : 'miss'}>
                            <td>{ing.name}</td>
                            <td>{ing.scaledAmount} {ing.unit}</td>
                            <td>{pantryState[ing.name]?.checked ? pantryState[ing.name].qty : 0}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {getRecipeAnalysis(selectedRecipe).missing.length > 0 && (
                    <button className="btn-add-grocery" onClick={() => addMissingToGrocery(selectedRecipe)}>
                      + Add Missing to Grocery List
                    </button>
                  )}
                  <button className="btn-cook" onClick={() => startCooking(selectedRecipe)}>
                    ▶ Start Cooking Mode
                  </button>
                </>
              )}
            </div>

            {/* Grocery List */}
            <div className="grocery-section">
              <h2>Grocery List</h2>
              {groceryList.length === 0 ? (
                <div className="grocery-empty">Your grocery list is empty</div>
              ) : (
                <>
                  {Object.entries(groceryByCategory).map(([cat, items]) => (
                    <div key={cat} className="grocery-group">
                      <div className="grocery-group-title">{cat}</div>
                      {items.map(item => (
                        <div key={item.name} className={`grocery-item ${item.checked ? 'checked' : ''}`}>
                          <div className="grocery-left" onClick={() => toggleGroceryCheck(item.name)}>
                            <input type="checkbox" checked={item.checked} onChange={() => toggleGroceryCheck(item.name)} />
                            <span>{item.name}</span>
                          </div>
                          <button className="btn-del" onClick={() => removeGroceryItem(item.name)}>×</button>
                        </div>
                      ))}
                    </div>
                  ))}
                  <div className="grocery-actions">
                    <button className="btn-clear-done" onClick={clearDone}>Clear done</button>
                    <button className="btn-clear-all" onClick={clearAll}>Clear all</button>
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* COOKING MODE */}
      {cookMode && (
        <div className="cook-overlay" onClick={e => { if (e.target === e.currentTarget) closeCooking(); }}>
          <div className="cook-modal">
            <div className="cook-header">
              <div className="cook-header-top">
                <div className="cook-title">{cookMode.emoji} {cookMode.name}</div>
                <button className="btn-close" onClick={closeCooking}>×</button>
              </div>
              <div className="cook-progress">
                {cookMode.steps.map((_, i) => (
                  <div key={i} className={`prog-dot ${i < cookStep ? 'done' : i === cookStep ? 'active' : ''}`}></div>
                ))}
              </div>
            </div>
            <div className="cook-body">
              <div className="step-num">Step {cookStep + 1} of {cookMode.steps.length}</div>
              <div className="step-text">{cookMode.steps[cookStep]}</div>
            </div>
            <div className="cook-footer">
              <button className="btn-prev" disabled={cookStep === 0} onClick={() => setCookStep(s => s - 1)}>← Back</button>
              {cookStep < cookMode.steps.length - 1 ? (
                <button className="btn-next" onClick={() => setCookStep(s => s + 1)}>Next →</button>
              ) : (
                <button className="btn-done-cook" onClick={closeCooking}>✓ Done! Enjoy</button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
