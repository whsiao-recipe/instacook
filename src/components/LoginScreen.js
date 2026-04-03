import React, { useState } from "react";

export default function LoginScreen({ onLogin, onSignup, onGoogleLogin, error, clearError, onSkip }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      onSignup(email, password, displayName);
    } else {
      onLogin(email, password);
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    clearError();
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg2)",
      fontFamily: "Outfit, sans-serif",
      padding: "20px",
    }}>
      <div style={{
        background: "var(--surface)",
        borderRadius: "16px",
        padding: "40px 32px",
        maxWidth: "380px",
        width: "100%",
        textAlign: "center",
      }}>
        <img src="/icon.png" alt="InstaCook" style={{ width: "100px", height: "100px", objectFit: "contain", marginBottom: "16px" }} />
        <h1 style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "28px",
          marginBottom: "4px",
          color: "var(--text)",
        }}>
          {isSignup ? "Create Account" : "Welcome Back"}
        </h1>
        <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "28px" }}>
          {isSignup ? "Sign up to save your recipes and pantry" : "Log in to your InstaCook account"}
        </p>

        <button
          onClick={onGoogleLogin}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid var(--border2)",
            background: "var(--surface)",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            fontFamily: "Outfit, sans-serif",
            color: "var(--text)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Continue with Google
        </button>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "20px",
          color: "var(--muted)",
          fontSize: "12px",
        }}>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }}></div>
          or
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }}></div>
        </div>

        <div>
          {isSignup && (
            <input
              type="text"
              placeholder="Your name"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "8px",
                border: "1px solid var(--border2)",
                fontSize: "14px",
                fontFamily: "Outfit, sans-serif",
                marginBottom: "10px",
                background: "var(--surface)",
                color: "var(--text)",
                boxSizing: "border-box",
              }}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "8px",
              border: "1px solid var(--border2)",
              fontSize: "14px",
              fontFamily: "Outfit, sans-serif",
              marginBottom: "10px",
              background: "var(--surface)",
              color: "var(--text)",
              boxSizing: "border-box",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "8px",
              border: "1px solid var(--border2)",
              fontSize: "14px",
              fontFamily: "Outfit, sans-serif",
              marginBottom: "16px",
              background: "var(--surface)",
              color: "var(--text)",
              boxSizing: "border-box",
            }}
          />

          {error && (
            <p style={{
              color: "var(--red)",
              fontSize: "13px",
              marginBottom: "12px",
              textAlign: "left",
            }}>
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: "var(--accent)",
              color: "white",
              fontSize: "14px",
              fontWeight: "700",
              fontFamily: "Outfit, sans-serif",
              cursor: "pointer",
              marginBottom: "16px",
            }}
          >
            {isSignup ? "Create Account" : "Log In"}
          </button>
        </div>

        <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "12px" }}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={toggleMode}
            style={{ color: "var(--accent)", cursor: "pointer", fontWeight: "600" }}
          >
            {isSignup ? "Log in" : "Sign up"}
          </span>
        </p>

        <button
          onClick={onSkip}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--muted)",
            fontSize: "13px",
            cursor: "pointer",
            fontFamily: "Outfit, sans-serif",
          }}
        >
          Continue as guest
        </button>
      </div>
    </div>
  );
}
