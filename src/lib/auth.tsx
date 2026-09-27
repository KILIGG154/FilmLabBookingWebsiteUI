import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Role = "Photographer" | "Film Lab Owner" | "Moderator" | "Admin";

export type User = { name: string; email: string; role: Role };

// Demo directory — login resolves the role from the email address.
const DEMO_ACCOUNTS: Record<string, User> = {
  "ansel@studio.com": { name: "Ansel Rivera", email: "ansel@studio.com", role: "Photographer" },
  "owner@lab.com": { name: "Goldenhour Collective", email: "owner@lab.com", role: "Film Lab Owner" },
  "mod@halide.com": { name: "Reyes Mod", email: "mod@halide.com", role: "Moderator" },
  "admin@halide.com": { name: "Halide Admin", email: "admin@halide.com", role: "Admin" },
};

export const roleHome: Record<Role, string> = {
  Photographer: "/profile",
  "Film Lab Owner": "/portal/owner",
  Moderator: "/portal/moderator",
  Admin: "/portal/admin",
};

const STORAGE_KEY = "halide-auth";

type AuthContextValue = {
  user: User | null;
  login: (email: string, remember: boolean) => User;
  register: (name: string, email: string) => User;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function resolve(email: string, fallbackName?: string): User {
  const key = email.trim().toLowerCase();
  return (
    DEMO_ACCOUNTS[key] ?? {
      name: fallbackName || key.split("@")[0] || "Guest",
      email: key,
      role: "Photographer",
    }
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Restore a remembered session on first load.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) ?? sessionStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as User);
    } catch {
      // ignore corrupt storage
    }
  }, []);

  const persist = (u: User, remember: boolean) => {
    setUser(u);
    const store = remember ? localStorage : sessionStorage;
    const other = remember ? sessionStorage : localStorage;
    store.setItem(STORAGE_KEY, JSON.stringify(u));
    other.removeItem(STORAGE_KEY);
  };

  const login: AuthContextValue["login"] = (email, remember) => {
    const u = resolve(email);
    persist(u, remember);
    return u;
  };

  const register: AuthContextValue["register"] = (name, email) => {
    const u = resolve(email, name);
    persist(u, true);
    return u;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
