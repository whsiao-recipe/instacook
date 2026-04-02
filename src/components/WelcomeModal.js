import React from "react";

export default function WelcomeModal({ onSetupPantry, onSkip }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ background: "var(--surface)", borderRadius: "12px", padding: "32px 28px", maxWidth: "340px", textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>👨‍🍳</div>
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "26px", marginBottom: "12px", color: "var(--text)" }}>Welcome to InstaCook!</h2>
        <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: "1.6", marginBottom: "24px" }}>Start by adding ingredients to your pantry for personalized recipe matches!</p>
        <button onClick={onSetupPantry} style={{ background: "var(--accent)", color: "white", border: "none", borderRadius: "8px", padding: "12px 24px", fontSize: "14px", fontWeight: "700", cursor: "pointer", width: "100%", marginBottom: "10px", fontFamily: "Outfit, sans-serif" }}>Set Up My Pantry</button>
        <button onClick={onSkip} style={{ background: "transparent", color: "var(--muted)", border: "none", fontSize: "13px", cursor: "pointer", fontFamily: "Outfit, sans-serif" }}>Skip for now</button>
      </div>
    </div>
  );
}
