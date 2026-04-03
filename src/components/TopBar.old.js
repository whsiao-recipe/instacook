import React from "react";

export default function TopBar({
  searchTerm, setSearchTerm,
  servings, setServings,
  darkMode, setDarkMode,
  onOpenPlanner, plannerTotalMeals,
  onSurprise, aiLoading,
}) {
  return (
    <header className="topbar">
      <div className="logo">
        <img src="/icon.png" alt="InstaCook" style={{ width: "150px", height: "150px", objectFit: "contain" }} />
        <div className="logo-text" style={{ display: "none" }}>
          <span className="logo-wordmark">Insta<strong>Cook</strong></span>
          <span className="logo-tagline">From pantry to plate</span>
        </div>
      </div>
      <div className="topbar-center">
        <div className="topbar-divider"></div>
        <div className="search-wrap">
          <span className="si">⌕</span>
          <input placeholder="Search recipes..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className="servings-ctrl">
          <label>Serves</label>
          <select value={servings} onChange={e => setServings(Number(e.target.value))}>
            {[2, 4, 6, 8].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>
      <div className="topbar-right">
        <button className="btn-darkmode" onClick={() => setDarkMode(d => !d)}>
          {darkMode ? "☀️" : "🌙"}
        </button>
        <button className="btn-planner-toggle" onClick={onOpenPlanner}>
          📅 {plannerTotalMeals > 0 ? `Plan (${plannerTotalMeals})` : "Planner"}
        </button>
        <button className="btn-surprise" onClick={onSurprise} disabled={aiLoading}>
          {aiLoading ? "Thinking..." : "✦ Surprise Me"}
        </button>
      </div>
    </header>
  );
}
