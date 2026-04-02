import React from "react";
import { CUISINES, ASIAN_SUBCUISINES, MEDITERRANEAN_SUBCUISINES } from "../data/pantry";

export default function RecipeList({
  mobileTab,
  cuisineFilter, setCuisine,
  asianSubFilter, setAsianSubFilter,
  medSubFilter, setMedSubFilter,
  favoritesOnly, setFavoritesOnly,
  difficultyFilter, setDifficultyFilter,
  favorites, toggleFavorite,
  aiLoading, aiSuggestion,
  canMakeRecipes, missingRecipes,
  selectedRecipe, setSelectedRecipe,
  setMobileTab,
}) {
  return (
    <main className={`main ${mobileTab === "recipes" ? "mobile-active" : ""}`}>
      <div className="main-inner">
        <div className="cuisine-filter">
          {CUISINES.map(c => (
            <button
              key={c}
              className={`cuisine-btn ${cuisineFilter === c ? "active" : ""}`}
              onClick={() => setCuisine(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {cuisineFilter === "Asian" && (
          <div className="asian-subfilter">
            {ASIAN_SUBCUISINES.map(s => (
              <button
                key={s}
                className={`cuisine-btn sub ${asianSubFilter === s ? "active" : ""}`}
                onClick={() => setAsianSubFilter(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}
        {cuisineFilter === "Mediterranean" && (
          <div className="asian-subfilter">
            {MEDITERRANEAN_SUBCUISINES.map(s => (
              <button
                key={s}
                className={`cuisine-btn sub ${medSubFilter === s ? "active" : ""}`}
                onClick={() => setMedSubFilter(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}
        <button className={`favorites-btn ${favoritesOnly ? "active" : ""}`} onClick={() => setFavoritesOnly(f => !f)}>
          {favoritesOnly ? "♥ Favorites" : "♡ Favorites"}
        </button>
        <div className="difficulty-filter">
          {["All", "Easy", "Medium", "Hard"].map(d => (
            <button
              key={d}
              className={`difficulty-btn ${d.toLowerCase()} ${difficultyFilter === d ? "active" : ""}`}
              onClick={() => setDifficultyFilter(d)}
            >
              {d === "All" ? "All Levels" : d}
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
                <RecipeCard
                  key={recipe.name}
                  recipe={recipe}
                  isActive={selectedRecipe?.name === recipe.name}
                  isFavorite={favorites.includes(recipe.name)}
                  onSelect={() => { setSelectedRecipe(recipe); setMobileTab("detail"); }}
                  onToggleFav={() => toggleFavorite(recipe.name)}
                  status="ok"
                />
              ))}
            </div>
          </div>
        )}

        {missingRecipes.length > 0 && (
          <div>
            <div className="section-label">need ingredients — {missingRecipes.length}</div>
            <div className="recipes-grid">
              {missingRecipes.map(recipe => (
                <RecipeCard
                  key={recipe.name}
                  recipe={recipe}
                  isActive={selectedRecipe?.name === recipe.name}
                  isFavorite={favorites.includes(recipe.name)}
                  onSelect={() => { setSelectedRecipe(recipe); setMobileTab("detail"); }}
                  onToggleFav={() => toggleFavorite(recipe.name)}
                  status="miss"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function RecipeCard({ recipe, isActive, isFavorite, onSelect, onToggleFav, status }) {
  return (
    <div className={`recipe-card ${isActive ? "active" : ""}`} onClick={onSelect}>
      <span className="card-emoji">{recipe.emoji}</span>
      <button className={`fav-heart ${isFavorite ? "active" : ""}`} onClick={(e) => { e.stopPropagation(); onToggleFav(); }}>
        {isFavorite ? "♥" : "♡"}
      </button>
      <div className="card-name">{recipe.name}</div>
      <div className="card-meta">
        <span className={`difficulty-tag ${recipe.difficulty?.toLowerCase()}`}>{recipe.difficulty}</span>
        <span className="card-time">⏱ {recipe.time}</span>
      </div>
      <div className={`card-status ${status}`}>
        {status === "ok" ? "✓ All ingredients on hand" : `Missing ${recipe.analysis.missing.length}`}
      </div>
    </div>
  );
}
