export const INGREDIENT_CONFIG = {
  // --- PROTEINS (Standardized to 1 lb or Count) ---
  "Chicken":        { unit: "lb",    step: 0.5,  default: 1 },
  "Chicken Thighs": { unit: "lb",    step: 0.5,  default: 1 },
  "Chicken Wings":  { unit: "lb",    step: 0.5,  default: 1 },
  "Ground Chicken": { unit: "lb",    step: 0.5,  default: 1 },
  "Ground Beef":    { unit: "lb",    step: 0.5,  default: 1 },
  "Pork Shoulder":  { unit: "lb",    step: 0.5,  default: 2 },
  "Pork Ribs":      { unit: "lb",    step: 0.5,  default: 2 },
  "Fish Balls":     { unit: "bag",   step: 1,    default: 1 },
  "Ham":            { unit: "lb",    step: 0.5,  default: 1 },
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
  "Romaine":        { unit: "count",  step: 1,    default: 1 },
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
  "Arborio Rice":   { unit: "bag",    step: 1,    default: 1 },
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
 "Cannellini Beans":{ unit: "can",   step: 1,    default: 2 },
  "Canned Tomatoes":{ unit: "can",    step: 1,    default: 3 },
  "Pineapple Chunks":{ unit: "can",   step: 1,    default: 1 },
  "Beef Broth":     { unit: "carton", step: 1,    default: 1 },
  "Chicken Broth":  { unit: "carton", step: 1,    default: 1 },
  "Tomato Paste":   { unit: "can",    step: 1,    default: 1 },
  "Kimchi":         { unit: "jar",    step: 1,    default: 1 },
  "Apple Cider Vinegar": { unit: "bottle", step: 1, default: 1 },
  "Short Ribs":     { unit: "lb",     step: 0.5,  default: 1 },
  "Lentils":        { unit: "bag",    step: 1,    default: 1 },
  "Ground Lamb":    { unit: "lb",     step: 0.5,  default: 1 },
  "Paneer":         { unit: "pack",   step: 1,    default: 1 },
  "Saffron":        { unit: "jar",    step: 1,    default: 1 },
  "Pine Nuts":      { unit: "bag",    step: 1,    default: 1 },
  "Grape Leaves":   { unit: "jar",    step: 1,    default: 1 },
  "Masa Harina":    { unit: "bag",    step: 1,    default: 1 },
  "Dijon Mustard":  { unit: "jar",    step: 1,    default: 1 },
  "Worcestershire Sauce": { unit: "bottle", step: 1, default: 1 },
  "BBQ Sauce":      { unit: "bottle", step: 1,    default: 1 },
  "Doubanjiang":    { unit: "jar",    step: 1,    default: 1 },
  "Rice Vinegar":   { unit: "bottle", step: 1,    default: 1 },
  "Shrimp Paste":   { unit: "jar",    step: 1,    default: 1 },
  "Sichuan Peppercorn": { unit: "jar", step: 1,   default: 1 },
  "Peanuts":        { unit: "bag",    step: 1,    default: 1 },
  "Wonton Wrappers":{ unit: "pack",   step: 1,    default: 1 },
  "Nori":           { unit: "pack",   step: 1,    default: 1 },
  "Sushi Rice":     { unit: "bag",    step: 1,    default: 1 },
  "Yeast":          { unit: "pack",   step: 1,    default: 1 },
  "Lemongrass":     { unit: "count",  step: 1,    default: 3 },
  "Spam":           { unit: "can",    step: 1,    default: 1 },
  "Gochujang":      { unit: "jar",    step: 1,    default: 1 },
  "Rice Cakes":     { unit: "pack",   step: 1,    default: 1 },
  "Sumac":          { unit: "jar",    step: 1,    default: 1 },
};

export function getIngredientConfig(item) {
  return INGREDIENT_CONFIG[item] || { unit: "count", step: 1, default: 1 };
}

export const UNIT_CONVERSIONS = {
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
