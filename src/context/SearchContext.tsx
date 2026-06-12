import { createContext, useContext, useState, type ReactNode } from "react";

type SearchCtx = {
  query: string;
  setQuery: (q: string) => void;
};

const Ctx = createContext<SearchCtx>({ query: "", setQuery: () => {} });

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  return <Ctx.Provider value={{ query, setQuery }}>{children}</Ctx.Provider>;
}

export const useSearch = () => useContext(Ctx);
