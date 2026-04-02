import React from "react";

export default function CookMode({
  cookMode,
  cookStep,
  cookPhase, setCookPhase,
  timerSeconds, setTimerSeconds,
  timerRunning, setTimerRunning,
  timerInput, setTimerInput,
  timerRef,
  closeCooking,
  goToStep,
  formatTime,
  getScaledIngredients,
  servings,
}) {
  if (!cookMode) return null;

  return (
    <div className="cook-overlay" onClick={e => { if (e.target === e.currentTarget) closeCooking(); }}>
      <div className="cook-modal">
        <div className="cook-header">
          <div className="cook-header-top">
            <div className="cook-title">{cookMode.emoji} {cookMode.name}</div>
            <button className="btn-close" onClick={closeCooking}>×</button>
          </div>
          {cookPhase === "cooking" && (
            <div className="cook-progress">
              {cookMode.steps.map((_, i) => (
                <div key={i} className={`prog-dot ${i < cookStep ? "done" : i === cookStep ? "active" : ""}`}></div>
              ))}
            </div>
          )}
        </div>

        {/* CHECKLIST PHASE */}
        {cookPhase === "checklist" && (
          <>
            <div className="cook-body">
              <div className="cook-phase-label">Before you start</div>
              <p className="cook-phase-sub">Confirm you have everything ready for {servings} servings</p>
              <table className="cook-ing-table">
                <thead>
                  <tr><th>Ingredient</th><th>Amount</th></tr>
                </thead>
                <tbody>
                  {getScaledIngredients(cookMode).map(ing => (
                    <tr key={ing.name}>
                      <td>{ing.name}</td>
                      <td className="ing-amount">{ing.scaledAmount} {ing.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="cook-footer">
              <button className="btn-prev" onClick={closeCooking}>Cancel</button>
              <button className="btn-next" onClick={() => setCookPhase("cooking")}>I'm ready — Let's cook →</button>
            </div>
          </>
        )}

        {/* COOKING PHASE */}
        {cookPhase === "cooking" && (
          <>
            <div className="cook-body">
              <div className="step-num">Step {cookStep + 1} of {cookMode.steps.length}</div>
              <div className="step-text">{cookMode.steps[cookStep]}</div>

              {/* SCALED INGREDIENTS REMINDER */}
              <div className="cook-ing-strip">
                {getScaledIngredients(cookMode).map(ing => (
                  <span key={ing.name} className="cook-ing-pill">
                    <span className="pill-name">{ing.name}</span>
                    <span className="pill-amt">{ing.scaledAmount} {ing.unit}</span>
                  </span>
                ))}
              </div>

              {/* TIMER */}
              <div className="cook-timer">
                <div className="timer-label">
                  {timerSeconds > 0 && timerRunning ? "⏱ Timer running" : timerSeconds > 0 && !timerRunning ? "⏱ Timer ready" : "⏱ Set a timer"}
                </div>
                <div className="timer-display" style={{ color: timerSeconds > 0 && timerSeconds <= 10 ? "var(--red)" : "var(--text)" }}>
                  {formatTime(timerSeconds)}
                </div>
                <div className="timer-controls">
                  <input
                    className="timer-input"
                    type="number"
                    placeholder="min"
                    value={timerInput}
                    onChange={e => {
                      setTimerInput(e.target.value);
                      const mins = parseInt(e.target.value);
                      if (!isNaN(mins) && mins > 0) setTimerSeconds(mins * 60);
                    }}
                  />
                  <button className="btn-timer-action" onClick={() => setTimerRunning(r => !r)} disabled={timerSeconds === 0}>
                    {timerRunning ? "⏸ Pause" : "▶ Start"}
                  </button>
                  <button className="btn-timer-reset" onClick={() => {
                    clearInterval(timerRef.current);
                    setTimerRunning(false);
                    const mins = parseInt(timerInput);
                    setTimerSeconds(!isNaN(mins) && mins > 0 ? mins * 60 : 0);
                  }}>↺</button>
                </div>
              </div>
            </div>
            <div className="cook-footer">
              <button className="btn-prev" disabled={cookStep === 0} onClick={() => goToStep(cookStep - 1)}>← Back</button>
              {cookStep < cookMode.steps.length - 1 ? (
                <button className="btn-next" onClick={() => goToStep(cookStep + 1)}>Next →</button>
              ) : (
                <button className="btn-done-cook" onClick={closeCooking}>✓ Done! Enjoy</button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
