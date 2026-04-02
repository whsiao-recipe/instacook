export const PANTRY_CATALOG = {
  "Meat & Proteins": [
    "Bacon", "Beef Flank", "Chicken", "Chicken Thighs", "Chicken Wings",
    "Chorizo", "Cod", "Duck Breast", "Fish Balls", "Ground Beef", "Ground Chicken",
    "Ground Lamb", "Ground Pork", "Ham", "Lamb Chops", "Pork Belly", "Pork Chops", "Pork Ribs", "Pork Shoulder",
    "Rib Eye Steak", "Salmon", "Short Ribs", "Sausage", "Shrimp", "Spam", "Tilapia",
    "Tofu", "Tuna", "Turkey"
  ],
  "Produce": [
    "Arugula", "Asparagus", "Avocado", "Banana Peppers", "Basil",
    "Bell Pepper", "Broccoli", "Cabbage", "Carrot", "Celery", "Cilantro",
    "Corn", "Cucumber", "Garlic", "Ginger", "Green Onion", "Jalapeño",
    "Kale", "Lemon", "Lemongrass", "Lime", "Mushrooms", "Onion", "Parsley", "Potato",
    "Red Onion", "Romaine", "Shallot", "Spinach", "Sweet Potato", "Tomato", "Zucchini"
  ],
  "Dairy & Eggs": [
    "American Cheese", "Butter", "Cheddar", "Cheese", "Cottage Cheese",
    "Cream", "Cream Cheese", "Egg", "Feta", "Greek Yogurt", "Heavy Cream",
    "Milk", "Mozzarella", "Paneer", "Parmesan", "Ricotta", "Sour Cream", "Whipping Cream"
  ],
  "Pantry Staples": [
    "Avocado Oil", "Baking Powder", "Baking Soda", "Basmati Rice",
    "Beef Broth", "Black Beans", "Bread", "Brown Sugar", "Canned Tomatoes",
    "Chicken Broth", "Chickpeas", "Cocoa Powder", "Coconut Milk",
    "Corn Starch", "Couscous", "Flour", "Grape Leaves", "Honey", "Jasmine Rice", "Lentils", "Noodles", "Nori",
    "Masa Harina", "Oats", "Oil", "Olive Oil", "Panko Breadcrumbs", "Pasta",
    "Peanut Butter", "Peanuts", "Pine Nuts", "Pineapple Chunks", "Pita Bread", "Quinoa", "Rice",
    "Rice Cakes", "Sushi Rice", "Tomato Sauce", "Tortillas", "Vanilla Extract",
    "Wonton Wrappers", "Yeast"
  ],
  "Spices & Seasonings": [
    "Adobo", "Allspice", "Bay Leaf", "Cardamom", "Cayenne Pepper",
    "Chicken Powder", "Chiles de Arbol", "Chili Flakes", "Chili Powder", "Cinnamon", "Cloves",
    "Coriander", "Cumin", "Curry Powder", "Dried Guajillo Chiles", "Dried Ancho Chiles", "Dried Mint", "Fennel Seeds",
    "Five Spice", "Garam Masala", "Garlic Powder", "Italian Seasoning",
    "Mushroom Powder", "Nutmeg", "Onion Powder", "Oregano", "Paprika",
    "Pepper", "Peppercorn", "Rosemary", "Saffron", "Salt", "Sichuan Peppercorn", "Smoked Paprika",
    "Star Anise", "Sugar", "Sumac", "Thyme", "Turmeric", "White Pepper", "Za'atar"
  ],
  "Sauces & Condiments": [
    "Balsamic Vinegar", "BBQ Sauce", "Chili Oil", "Coconut Aminos", "Dark Soy Sauce",
    "Dark Vinegar", "Dijon Mustard", "Doubanjiang", "Fish Sauce", "Gochujang", "Hoisin Sauce",
    "Apple Cider Vinegar", "Hot Sauce", "Ketchup", "Kimchi", "Maple Syrup", "Mayonnaise", "Miso Paste",
    "Mustard", "Oyster Sauce", "Pickles", "Rice Vinegar", "Rice Wine", "Sesame Oil",
    "Soy Sauce", "Shrimp Paste", "Sriracha", "Tahini", "Tomato Paste", "Vinegar",
    "Water", "Worcestershire Sauce"
  ]
};

export const CUISINES = ["All", "American", "Asian", "Italian", "Mexican", "Indian", "Middle Eastern", "Mediterranean", "French", "Healthy", "Breakfast", "Dessert"];
export const MEDITERRANEAN_SUBCUISINES = ["All Mediterranean", "Greek", "Turkish", "Lebanese", "Moroccan"];
export const ASIAN_SUBCUISINES = ["All Asian", "Japanese", "Thai", "Vietnamese", "Korean", "Chinese"];

export const PANTRY_VERSION = "v11_new_recipes";

export function findCategory(itemName) {
  for (const [cat, items] of Object.entries(PANTRY_CATALOG)) {
    if (items.includes(itemName)) return cat;
  }
  return "Other";
}
