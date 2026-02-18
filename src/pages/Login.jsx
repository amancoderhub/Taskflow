import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("intern@demo.com");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit() {
    const result = login(email, password, remember);
    if (result.success) navigate("/board");
    else setError(result.error);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A78BFA 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: 40,
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: "#4F46E5",
              borderRadius: 14,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              fontSize: 28,
            }}
          >
            ⚡
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>
            Welcome to TaskFlow
          </h1>
          <p style={{ fontSize: 14, color: "#6B7280", marginTop: 4 }}>
            Sign in to manage your tasks and projects
          </p>
        </div>
        {error && (
          <div
            style={{
              background: "#FEF2F2",
              border: "1px solid #FECACA",
              color: "#DC2626",
              borderRadius: 8,
              padding: "10px 14px",
              fontSize: 13,
              marginBottom: 16,
            }}
          >
            {error}
          </div>
        )}
        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 500,
              color: "#374151",
              marginBottom: 6,
            }}
          >
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="intern@demo.com"
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #D1D5DB",
              borderRadius: 8,
              fontSize: 14,
            }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 500,
              color: "#374151",
              marginBottom: 6,
            }}
          >
            Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "10px 40px 10px 12px",
                border: "1px solid #D1D5DB",
                borderRadius: 8,
                fontSize: 14,
              }}
            />
            <button
              onClick={() => setShowPw((s) => !s)}
              type="button"
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#9CA3AF",
                fontSize: 16,
              }}
            >
              {showPw ? "🙈" : "👁"}
            </button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              color: "#4B5563",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              style={{ accentColor: "#4F46E5" }}
            />{" "}
            Remember me
          </label>
          <a
            href="#"
            style={{ fontSize: 14, color: "#6B7280", textDecoration: "none" }}
          >
            Forgot password?
          </a>
        </div>
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: 11,
            background: "#4F46E5",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Sign In
        </button>
        <div
          style={{
            marginTop: 20,
            padding: "12px 16px",
            background: "#F0F4FF",
            border: "1px solid #C7D7FD",
            borderRadius: 8,
            fontSize: 13,
            color: "#374151",
          }}
        >
          <div style={{ fontWeight: 600, color: "#4F46E5", marginBottom: 6 }}>
            ℹ️ Demo Credentials
          </div>
          <div>
            Email:{" "}
            <code
              style={{
                background: "white",
                padding: "1px 5px",
                borderRadius: 4,
              }}
            >
              intern@demo.com
            </code>
          </div>
          <div style={{ marginTop: 4 }}>
            Password:{" "}
            <code
              style={{
                background: "white",
                padding: "1px 5px",
                borderRadius: 4,
              }}
            >
              intern123
            </code>
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 13,
            color: "#6B7280",
          }}
        >
          Don't have an account?{" "}
          <a href="#" style={{ color: "#4F46E5", fontWeight: 500 }}>
            Contact your administrator
          </a>
        </div>
      </div>
    </div>
  );
}
