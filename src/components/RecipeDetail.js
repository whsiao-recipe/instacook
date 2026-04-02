import React from "react";
import { getIngredientConfig } from "../data/ingredients";

export default function RecipeDetail({
  mobileTab,
  selectedRecipe,
  favorites, toggleFavorite,
  pantryState,
  getScaledIngredients,
  getRecipeAnalysis,
  startCooking,
  onAddToPlan,
  onAddMissingToGrocery,
}) {
  if (!selectedRecipe) {
    return (
      <div className={`detail-section ${mobileTab === "grocery" ? "mobile-hidden" : ""}`}>
        <h2>Recipe Detail</h2>
        <div className="detail-empty">Select a recipe</div>
      </div>
    );
  }

  const analysis = getRecipeAnalysis(selectedRecipe);

  return (
    <div className={`detail-section ${mobileTab === "grocery" ? "mobile-hidden" : ""}`}>
      <h2>Recipe Detail</h2>
      <div className="detail-title-row">
        <span className="detail-emoji">{selectedRecipe.emoji}</span>
        <div>
          <div className="detail-name">
            {selectedRecipe.name}
            <button className={`fav-heart detail ${favorites.includes(selectedRecipe.name) ? "active" : ""}`} onClick={() => toggleFavorite(selectedRecipe.name)}>
              {favorites.includes(selectedRecipe.name) ? "♥" : "♡"}
            </button>
          </div>
          <div className="detail-time">⏱ {selectedRecipe.time}</div>
          <span className={`difficulty-tag ${selectedRecipe.difficulty?.toLowerCase()}`}>{selectedRecipe.difficulty}</span>
        </div>
      </div>
      <table className="ing-table">
        <thead><tr><th>Ingredient</th><th>Need</th><th>Have</th></tr></thead>
        <tbody>
          {getScaledIngredients(selectedRecipe).map(ing => {
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
      <button className="btn-add-plan" onClick={() => onAddToPlan(selectedRecipe)}>📅 Add to Meal Plan</button>
      {analysis.missing.length > 0 && (
        <button className="btn-add-grocery" onClick={() => onAddMissingToGrocery(selectedRecipe)}>
          + Add Missing to Grocery List
        </button>
      )}
    </div>
  );
}
