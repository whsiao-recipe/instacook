import React from "react";

export default function GroceryList({
  mobileTab,
  groceryList,
  groceryByCategory,
  toggleGroceryCheck,
  removeGroceryItem,
  clearDone,
  clearAll,
}) {
  return (
    <div className={`grocery-section ${mobileTab === "detail" ? "mobile-hidden" : ""}`}>
      <h2>Grocery List</h2>
      {groceryList.length === 0 ? <div className="grocery-empty">Empty</div> : (
        <>
          {Object.entries(groceryByCategory).map(([cat, items]) => (
            <div key={cat} className="grocery-group">
              <div className="grocery-group-title">{cat}</div>
              {items.map(item => (
                <div key={item.name} className={`grocery-item ${item.checked ? "checked" : ""}`}>
                  <div className="grocery-left" onClick={() => toggleGroceryCheck(item.name)}>
                    <input type="checkbox" checked={item.checked} readOnly />
                    <span>{item.name}</span>
                  </div>
                  <button className="btn-del" onClick={() => removeGroceryItem(item.name)}>×</button>
                </div>
              ))}
            </div>
          ))}
          <div className="grocery-actions">
            <button className="btn-clear-done" onClick={clearDone}>Clear Done</button>
            <button className="btn-clear-all" onClick={clearAll}>Clear All</button>
          </div>
        </>
      )}
    </div>
  );
}
