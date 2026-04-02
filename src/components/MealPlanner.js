import React from "react";
import { RECIPE_LIBRARY } from "../data/recipes";
import { MONTH_NAMES, WEEK_DAY_NAMES } from "../hooks/useMealPlanner";

export default function MealPlanner({
  mealPlan,
  showPlanner,
  plannerMonth, setPlannerMonth,
  plannerAddRecipe, setPlannerAddRecipe,
  plannerView, setPlannerView,
  plannerSelectedDay, setPlannerSelectedDay,
  plannerTotalMeals,
  addToPlan, removeFromPlan, clearPlan,
  getCalendarDays, getWeekDays,
  closePlanner,
  addPlanToGrocery,
  setSelectedRecipe, setShowPlanner, setMobileTab,
}) {
  if (!showPlanner) return null;

  return (
    <div className="planner-overlay" onClick={closePlanner}>
      <div className="planner-modal" onClick={e => e.stopPropagation()}>
        <div className="planner-modal-header">
          <h2>
            {plannerAddRecipe
              ? <><span className="planner-adding-label">Adding:</span> {plannerAddRecipe.emoji} {plannerAddRecipe.name}</>
              : "Meal Planner"
            }
          </h2>
          <div className="planner-header-controls">
            <div className="planner-view-toggle">
              <button className={plannerView === "week" ? "active" : ""} onClick={() => setPlannerView("week")}>Week</button>
              <button className={plannerView === "month" ? "active" : ""} onClick={() => setPlannerView("month")}>Month</button>
            </div>
            <button className="planner-close" onClick={closePlanner}>×</button>
          </div>
        </div>

        {plannerAddRecipe && (
          <div className="planner-add-hint">Tap a day to add this recipe</div>
        )}

        {/* === DAY DETAIL VIEW === */}
        {plannerSelectedDay && !plannerAddRecipe && (
          <div className="planner-day-detail">
            <div className="planner-day-detail-header">
              <button className="planner-back" onClick={() => setPlannerSelectedDay(null)}>← Back</button>
              <span className="planner-day-detail-title">
                {new Date(plannerSelectedDay + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </span>
            </div>
            {(mealPlan[plannerSelectedDay] || []).length === 0 ? (
              <div className="planner-day-empty">No meals planned for this day</div>
            ) : (
              <div className="planner-day-recipes">
                {(mealPlan[plannerSelectedDay] || []).map((name, idx) => {
                  const recipe = RECIPE_LIBRARY.find(r => r.name === name);
                  return (
                    <div key={idx} className="planner-recipe-card">
                      <div className="planner-recipe-info" onClick={() => {
                        if (recipe) {
                          setSelectedRecipe(recipe);
                          setShowPlanner(false);
                          setPlannerSelectedDay(null);
                          setMobileTab("detail");
                        }
                      }}>
                        <span className="planner-recipe-emoji">{recipe?.emoji || "🍽️"}</span>
                        <div className="planner-recipe-text">
                          <div className="planner-recipe-name">{name}</div>
                          <div className="planner-recipe-meta">
                            {recipe && <><span>⏱ {recipe.time}</span><span className={`difficulty-tag ${recipe.difficulty?.toLowerCase()}`}>{recipe.difficulty}</span></>}
                          </div>
                        </div>
                      </div>
                      <button className="planner-recipe-remove" onClick={() => removeFromPlan(plannerSelectedDay, idx)}>×</button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* === MONTH VIEW === */}
        {plannerView === "month" && !plannerSelectedDay && (
          <>
            <div className="planner-month-nav">
              <button onClick={() => setPlannerMonth(new Date(plannerMonth.getFullYear(), plannerMonth.getMonth() - 1, 1))}>‹</button>
              <span>{MONTH_NAMES[plannerMonth.getMonth()]} {plannerMonth.getFullYear()}</span>
              <button onClick={() => setPlannerMonth(new Date(plannerMonth.getFullYear(), plannerMonth.getMonth() + 1, 1))}>›</button>
            </div>
            <div className="planner-cal-grid">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
                <div key={d} className="planner-cal-head">{d}</div>
              ))}
              {getCalendarDays().map(({ date, outside }, i) => {
                const key = date.toISOString().split("T")[0];
                const meals = mealPlan[key] || [];
                const isToday = key === new Date().toISOString().split("T")[0];
                return (
                  <div
                    key={i}
                    className={`planner-cal-day ${outside ? "outside" : ""} ${isToday ? "today" : ""} ${plannerAddRecipe ? "selectable" : ""} ${meals.length > 0 && !plannerAddRecipe ? "has-meals" : ""}`}
                    onClick={() => {
                      if (plannerAddRecipe && !outside) addToPlan(key, plannerAddRecipe.name);
                      else if (!outside && !plannerAddRecipe) setPlannerSelectedDay(key);
                    }}
                  >
                    <span className="cal-day-num">{date.getDate()}</span>
                    <div className="cal-day-meals">
                      {meals.map((name, idx) => {
                        const recipe = RECIPE_LIBRARY.find(r => r.name === name);
                        return (
                          <div key={idx} className="cal-meal-chip">
                            <span>{recipe?.emoji || "🍽️"}</span>
                            <span className="cal-meal-name">{name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* === WEEK VIEW === */}
        {plannerView === "week" && !plannerSelectedDay && (
          <div className="planner-week-view">
            {getWeekDays().map((date, i) => {
              const key = date.toISOString().split("T")[0];
              const meals = mealPlan[key] || [];
              const isToday = key === new Date().toISOString().split("T")[0];
              return (
                <div key={key} className={`planner-week-day ${isToday ? "today" : ""}`}>
                  <div className="planner-week-day-header"
                    onClick={() => { if (!plannerAddRecipe) setPlannerSelectedDay(key); }}
                  >
                    <span className="planner-week-day-name">{WEEK_DAY_NAMES[i]}</span>
                    <span className="planner-week-day-date">{date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  </div>
                  <div className="planner-week-meals">
                    {meals.map((name, idx) => {
                      const recipe = RECIPE_LIBRARY.find(r => r.name === name);
                      return (
                        <div key={idx} className="planner-week-meal" onClick={() => {
                          if (recipe) {
                            setSelectedRecipe(recipe);
                            setShowPlanner(false);
                            setMobileTab("detail");
                          }
                        }}>
                          <span className="planner-week-meal-emoji">{recipe?.emoji || "🍽️"}</span>
                          <span className="planner-week-meal-name">{name}</span>
                          <span className="planner-week-meal-time">{recipe?.time}</span>
                          {!plannerAddRecipe && (
                            <button className="planner-week-meal-x" onClick={(e) => { e.stopPropagation(); removeFromPlan(key, idx); }}>×</button>
                          )}
                        </div>
                      );
                    })}
                    {plannerAddRecipe && (
                      <button className="btn-add-to-day" onClick={() => addToPlan(key, plannerAddRecipe.name)}>
                        + Add here
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!plannerAddRecipe && !plannerSelectedDay && plannerTotalMeals > 0 && (
          <div className="planner-modal-footer">
            <button className="btn-plan-grocery-modal" onClick={addPlanToGrocery}>+ Add All Missing to Grocery List</button>
            <button className="btn-plan-clear-modal" onClick={clearPlan}>Clear All</button>
          </div>
        )}
      </div>
    </div>
  );
}
