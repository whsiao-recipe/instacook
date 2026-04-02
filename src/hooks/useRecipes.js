import { useState, useEffect, useMemo } from "react";
import { RECIPE_LIBRARY } from "../data/recipes";
import { getIngredientConfig, UNIT_CONVERSIONS } from "../data/ingredients";

export function useRecipes(pantryState, servings, allPantryItems) {
  const [searchTerm, setSearchTerm] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [asianSubFilter, setAsianSubFilter] = useState("All Asian");
  const [medSubFilter, setMedSubFilter] = useState("All Mediterranean");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("instacook_favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("instacook_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (name) => {
    setFavorites(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  };

  const getScaledIngredients = (recipe) => {
    const scale = servings / recipe.baseServings;
    return recipe.ingredients.map(ing => ({ ...ing, scaledAmount: Number((ing.amount * scale).toFixed(2)) }));
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
      .filter(r => {
        if (cuisineFilter === "All") return true;
        if (cuisineFilter === "Asian") {
          const asianCuisines = ["Asian", "Japanese", "Thai", "Vietnamese", "Korean", "Chinese"];
          if (asianSubFilter === "All Asian") return asianCuisines.includes(r.cuisine);
          return r.cuisine === asianSubFilter;
        }
        if (cuisineFilter === "Mediterranean") {
          const medCuisines = ["Mediterranean", "Greek", "Turkish", "Lebanese", "Moroccan"];
          if (medSubFilter === "All Mediterranean") return medCuisines.includes(r.cuisine);
          return r.cuisine === medSubFilter;
        }
        return r.cuisine === cuisineFilter;
      })
      .filter(r => difficultyFilter === "All" || r.difficulty === difficultyFilter)
      .filter(r => !favoritesOnly || favorites.includes(r.name))
      .map(r => ({ ...r, analysis: getRecipeAnalysis(r) }))
      .sort((a, b) => b.analysis.matchPercent - a.analysis.matchPercent);
  }, [searchTerm, cuisineFilter, asianSubFilter, medSubFilter, difficultyFilter, favoritesOnly, favorites, servings, pantryState]);

  const canMakeRecipes = filteredRecipes.filter(r => r.analysis.canMake);
  const missingRecipes = filteredRecipes.filter(r => !r.analysis.canMake);

  const addMissingToGrocery = (recipe) => {
    const analysis = getRecipeAnalysis(recipe);
    return analysis.missing.map(m => ({ name: m.name, checked: false }));
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

  const setCuisine = (c) => {
    setCuisineFilter(c);
    setAsianSubFilter("All Asian");
    setMedSubFilter("All Mediterranean");
  };

  return {
    searchTerm,
    setSearchTerm,
    cuisineFilter,
    setCuisine,
    difficultyFilter,
    setDifficultyFilter,
    asianSubFilter,
    setAsianSubFilter,
    medSubFilter,
    setMedSubFilter,
    favoritesOnly,
    setFavoritesOnly,
    favorites,
    toggleFavorite,
    selectedRecipe,
    setSelectedRecipe,
    aiSuggestion,
    aiLoading,
    getSurprise,
    getScaledIngredients,
    getRecipeAnalysis,
    filteredRecipes,
    canMakeRecipes,
    missingRecipes,
    addMissingToGrocery,
  };
}
