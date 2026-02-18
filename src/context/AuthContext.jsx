import { createContext, useContext, useState, useEffect } from "react";

const CREDENTIALS = { email: "intern@demo.com", password: "intern123" };
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = sessionStorage.getItem("tf_auth");
    const remember = localStorage.getItem("tf_remember");
    if (session === "true" || remember === "true") setIsAuth(true);
    setLoading(false);
  }, []);

  function login(email, password, remember) {
    if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
      sessionStorage.setItem("tf_auth", "true");
      if (remember) localStorage.setItem("tf_remember", "true");
      setIsAuth(true);
      return { success: true };
    }
    return {
      success: false,
      error: "Invalid email or password. Please try again.",
    };
  }

  function logout() {
    sessionStorage.removeItem("tf_auth");
    localStorage.removeItem("tf_remember");
    setIsAuth(false);
  }

  return (
    <AuthContext.Provider value={{ isAuth, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
