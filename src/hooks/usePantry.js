import { useState, useEffect, useMemo } from "react";
import { PANTRY_CATALOG, PANTRY_VERSION } from "../data/pantry";
import { getIngredientConfig } from "../data/ingredients";

const allPantryItems = Object.values(PANTRY_CATALOG).flat();

export function usePantry() {
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

  const [pantrySearch, setPantrySearch] = useState("");
  const [collapsedCats, setCollapsedCats] = useState({});

  useEffect(() => {
    localStorage.setItem("instacook_pantry", JSON.stringify(pantryState));
    localStorage.setItem("instacook_pantry_version", PANTRY_VERSION);
  }, [pantryState]);

  const togglePantryItem = (item) => {
    setPantryState(prev => ({ ...prev, [item]: { ...prev[item], checked: !prev[item].checked } }));
  };

  const updatePantryQty = (item, value) => {
    const parsed = parseFloat(value);
    setPantryState(prev => ({ ...prev, [item]: { ...prev[item], qty: isNaN(parsed) ? 0 : parsed } }));
  };

  const selectAllCat = (cat, items) => {
    const allChecked = items.every(i => pantryState[i]?.checked);
    setPantryState(prev => {
      const updated = { ...prev };
      items.forEach(item => {
        updated[item] = { ...updated[item], checked: !allChecked };
      });
      return updated;
    });
  };

  const toggleCategory = (cat) => {
    setCollapsedCats(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

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

  return {
    allPantryItems,
    pantryState,
    pantrySearch,
    setPantrySearch,
    collapsedCats,
    toggleCategory,
    togglePantryItem,
    updatePantryQty,
    selectAllCat,
    filteredCatalog,
  };
}
