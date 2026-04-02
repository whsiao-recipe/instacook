import { useState, useEffect } from "react";

export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const WEEK_DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function useMealPlanner() {
  const [mealPlan, setMealPlan] = useState(() => {
    const saved = localStorage.getItem("instacook_mealplan");
    return saved ? JSON.parse(saved) : {};
  });
  const [showPlanner, setShowPlanner] = useState(false);
  const [plannerMonth, setPlannerMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [plannerAddRecipe, setPlannerAddRecipe] = useState(null);
  const [plannerView, setPlannerView] = useState("month");
  const [plannerSelectedDay, setPlannerSelectedDay] = useState(null);

  useEffect(() => {
    localStorage.setItem("instacook_mealplan", JSON.stringify(mealPlan));
  }, [mealPlan]);

  const addToPlan = (dateKey, recipeName) => {
    setMealPlan(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), recipeName]
    }));
    setPlannerAddRecipe(null);
  };

  const removeFromPlan = (dateKey, idx) => {
    setMealPlan(prev => {
      const updated = { ...prev, [dateKey]: (prev[dateKey] || []).filter((_, i) => i !== idx) };
      if (updated[dateKey].length === 0) delete updated[dateKey];
      return updated;
    });
  };

  const clearPlan = () => setMealPlan({});

  const plannerTotalMeals = Object.values(mealPlan).flat().length;

  const getCalendarDays = () => {
    const year = plannerMonth.getFullYear();
    const month = plannerMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPad = (firstDay.getDay() + 6) % 7;
    const days = [];
    for (let i = startPad - 1; i >= 0; i--) {
      const d = new Date(year, month, -i);
      days.push({ date: d, outside: true });
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), outside: false });
    }
    while (days.length % 7 !== 0) {
      const d = new Date(year, month + 1, days.length - startPad - lastDay.getDate() + 1);
      days.push({ date: d, outside: true });
    }
    return days;
  };

  const getWeekDays = () => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const closePlanner = () => {
    setShowPlanner(false);
    setPlannerAddRecipe(null);
    setPlannerSelectedDay(null);
  };

  return {
    mealPlan,
    showPlanner,
    setShowPlanner,
    plannerMonth,
    setPlannerMonth,
    plannerAddRecipe,
    setPlannerAddRecipe,
    plannerView,
    setPlannerView,
    plannerSelectedDay,
    setPlannerSelectedDay,
    addToPlan,
    removeFromPlan,
    clearPlan,
    plannerTotalMeals,
    getCalendarDays,
    getWeekDays,
    closePlanner,
  };
}
