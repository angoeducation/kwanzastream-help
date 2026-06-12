import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { type KSUser, fetchUser, loadToken, saveToken, clearToken } from "@/lib/auth";

type AuthState =
  | { status: "loading" }
  | { status: "authenticated"; user: KSUser; token: string }
  | { status: "unauthenticated" };

type AuthCtx = AuthState & {
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthCtx>({
  status: "loading",
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ status: "loading" });

  useEffect(() => {
    const token = loadToken();
    if (!token) {
      setState({ status: "unauthenticated" });
      return;
    }
    fetchUser(token)
      .then((user) => setState({ status: "authenticated", user, token }))
      .catch(() => {
        clearToken();
        setState({ status: "unauthenticated" });
      });
  }, []);

  function login() {
    import("@/lib/auth").then(({ loginWithKwanzaStream }) => loginWithKwanzaStream());
  }

  function logout() {
    clearToken();
    setState({ status: "unauthenticated" });
    window.location.href = "/";
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
