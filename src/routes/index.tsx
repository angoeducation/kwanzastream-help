import { createFileRoute } from "@tanstack/react-router";
import { SearchProvider } from "@/context/SearchContext";
import { Hero } from "@/components/sections/Hero";
import { CategoryGrid } from "@/components/sections/CategoryGrid";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kwanza Stream Ajuda" },
      { name: "description", content: "Pesquisa na Base de Conhecimento ou consulta tópicos específicos abaixo." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SearchProvider>
      <Hero />
      <CategoryGrid />
    </SearchProvider>
  );
}
