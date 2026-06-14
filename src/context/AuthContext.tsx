import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getToken, fetchUser, clearToken, buildLoginUrl } from "@/lib/auth";

export interface User {
  id: string;
  email: string;
  display_name: string;
  avatar?: string;
  profile_image_url?: string;
  login?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: () => void;
  logout: () => void;
  loading: boolean;
  status: "loading" | "authenticated" | "unauthenticated";
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    fetchUser(token)
      .then((u) => {
        if (u) {
          // Add compatibility mappings for Navbar and other components
          const compatUser = {
            ...u,
            profile_image_url: u.profile_image_url || u.avatar || "",
            login: u.login || u.display_name?.toLowerCase().replace(/\s+/g, "") || "",
          };
          setUser(compatUser);
        } else {
          clearToken();
        }
      })
      .catch(() => clearToken())
      .finally(() => setLoading(false));
  }, []);

  const login = () => {
    window.location.href = buildLoginUrl();
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  const status = loading ? "loading" : user ? "authenticated" : "unauthenticated";

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading, status }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
