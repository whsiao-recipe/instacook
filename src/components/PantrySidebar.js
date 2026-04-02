import React from "react";
import { getIngredientConfig } from "../data/ingredients";

export default function PantrySidebar({
  mobileTab,
  pantryState,
  pantrySearch, setPantrySearch,
  filteredCatalog,
  collapsedCats, toggleCategory,
  togglePantryItem,
  updatePantryQty,
  selectAllCat,
}) {
  return (
    <aside className={`sidebar ${mobileTab === "pantry" ? "mobile-active" : ""}`}>
      <div className="sidebar-header">
        <h2>My Pantry</h2>
        <div className="pantry-search">
          <span className="si">⌕</span>
          <input placeholder="Filter ingredients..." value={pantrySearch} onChange={e => setPantrySearch(e.target.value)} />
        </div>
      </div>
      {Object.entries(filteredCatalog).map(([cat, items]) => {
        const open = !collapsedCats[cat];
        const checkedCount = items.filter(i => pantryState[i]?.checked).length;
        return (
          <div key={cat} className="cat-block">
            <div className="cat-header" onClick={() => toggleCategory(cat)}>
              <span className="cat-title">{cat}</span>
              <div className="cat-header-right">
                <span className="cat-count">{checkedCount}/{items.length}</span>
                <span className={`cat-chevron ${open ? "open" : ""}`}>▶</span>
              </div>
            </div>
            {open && (
              <div className="cat-items">
                <div className="cat-select-all-row">
                  <button
                    className="btn-select-all"
                    onClick={(e) => { e.stopPropagation(); selectAllCat(cat, items); }}
                  >
                    {items.every(i => pantryState[i]?.checked) ? "✓ Deselect All" : "Select All"}
                  </button>
                </div>
                {items.map(item => {
                  const cfg = getIngredientConfig(item);
                  return (
                    <div key={item} className="pantry-row">
                      <label className="pantry-label">
                        <input type="checkbox" checked={!!pantryState[item]?.checked} onChange={() => togglePantryItem(item)} />
                        <span>{item}</span>
                      </label>
                      <div className="qty-wrap">
                        <input type="number" step={cfg.step} min={0} className="qty-input" value={pantryState[item]?.qty ?? cfg.default} onChange={e => updatePantryQty(item, e.target.value)} />
                        <span className="qty-unit">{cfg.unit}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}
