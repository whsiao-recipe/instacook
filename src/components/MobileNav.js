import React from "react";

export default function MobileNav({ mobileTab, setMobileTab }) {
  return (
    <nav className="mobile-tabs">
      <button className={mobileTab === "recipes" ? "active" : ""} onClick={() => setMobileTab("recipes")}>
        <span>🍽️</span>
        <span>Recipes</span>
      </button>
      <button className={mobileTab === "pantry" ? "active" : ""} onClick={() => setMobileTab("pantry")}>
        <span>🥫</span>
        <span>Pantry</span>
      </button>
      <button className={mobileTab === "detail" ? "active" : ""} onClick={() => setMobileTab("detail")}>
        <span>📋</span>
        <span>Detail</span>
      </button>
      <button className={mobileTab === "grocery" ? "active" : ""} onClick={() => setMobileTab("grocery")}>
        <span>🛒</span>
        <span>Grocery</span>
      </button>
    </nav>
  );
}
