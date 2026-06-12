import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { parseCallbackHash, saveToken } from "@/lib/auth";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallbackPage,
});

function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = parseCallbackHash();
    if (token) {
      saveToken(token);
      // Clean the hash from the URL then go home
      window.history.replaceState({}, document.title, "/");
    }
    navigate({ to: "/", replace: true });
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ks-bg">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-ks-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[14px] text-ks-text-secondary">A autenticar...</p>
      </div>
    </div>
  );
}
