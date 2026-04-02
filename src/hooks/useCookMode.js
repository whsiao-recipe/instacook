import React, { useState, useEffect, useRef } from "react";

export function useCookMode() {
  const [cookMode, setCookMode] = useState(null);
  const [cookStep, setCookStep] = useState(0);
  const [cookPhase, setCookPhase] = useState("checklist");
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerInput, setTimerInput] = useState("");
  const timerRef = useRef(null);

  const detectTimer = (stepText) => {
    const match = stepText.match(/(\d+)[–\-]?(\d+)?\s*min/i);
    if (match) {
      const mins = match[2] ? Math.round((parseInt(match[1]) + parseInt(match[2])) / 2) : parseInt(match[1]);
      return mins * 60;
    }
    const secMatch = stepText.match(/(\d+)\s*sec/i);
    if (secMatch) return parseInt(secMatch[1]);
    return 0;
  };

  const startCooking = (recipe) => {
    setCookMode(recipe);
    setCookStep(0);
    setCookPhase("checklist");
    setTimerSeconds(0);
    setTimerRunning(false);
    setTimerInput("");
  };

  const closeCooking = () => {
    clearInterval(timerRef.current);
    setCookMode(null);
    setTimerSeconds(0);
    setTimerRunning(false);
  };

  const goToStep = (step) => {
    clearInterval(timerRef.current);
    setTimerRunning(false);
    setTimerSeconds(0);
    setTimerInput("");
    setCookStep(step);
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  // Auto-detect timer from step text
  useEffect(() => {
    if (cookMode && cookPhase === "cooking") {
      const detected = detectTimer(cookMode.steps[cookStep]);
      setTimerSeconds(detected);
      setTimerInput(detected ? String(Math.floor(detected / 60)) : "");
      setTimerRunning(false);
      clearInterval(timerRef.current);
    }
  }, [cookStep, cookPhase, cookMode]);

  // Timer countdown
  useEffect(() => {
    if (timerRunning && timerSeconds > 0) {
      timerRef.current = setInterval(() => {
        setTimerSeconds(s => {
          if (s <= 1) { clearInterval(timerRef.current); setTimerRunning(false); return 0; }
          return s - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerRunning]);

  return {
    cookMode,
    cookStep,
    cookPhase,
    setCookPhase,
    timerSeconds,
    setTimerSeconds,
    timerRunning,
    setTimerRunning,
    timerInput,
    setTimerInput,
    timerRef,
    startCooking,
    closeCooking,
    goToStep,
    formatTime,
  };
}
