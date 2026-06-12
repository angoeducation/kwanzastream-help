import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; to?: string; params?: Record<string, string> };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] text-ks-muted flex-wrap">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {item.to && !last ? (
              <Link to={item.to} params={item.params as never} className="hover:text-ks-text transition-colors duration-150">
                {item.label}
              </Link>
            ) : (
              <span className={last ? "text-ks-text" : ""}>{item.label}</span>
            )}
            {!last && <ChevronRight className="w-3.5 h-3.5" />}
          </span>
        );
      })}
    </nav>
  );
}
