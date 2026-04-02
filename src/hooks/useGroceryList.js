import { useState, useEffect, useMemo } from "react";
import { findCategory } from "../data/pantry";

export function useGroceryList() {
  const [groceryList, setGroceryList] = useState(() => {
    const saved = localStorage.getItem("instacook_groceries");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("instacook_groceries", JSON.stringify(groceryList));
  }, [groceryList]);

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

  const addItemsToGrocery = (items) => {
    setGroceryList(prev => {
      const existing = new Set(prev.map(i => i.name));
      return [...prev, ...items.filter(i => !existing.has(i.name))];
    });
  };

  return {
    groceryList,
    groceryByCategory,
    toggleGroceryCheck,
    removeGroceryItem,
    clearDone,
    clearAll,
    addItemsToGrocery,
  };
}
