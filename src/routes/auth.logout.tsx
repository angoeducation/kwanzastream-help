import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { clearToken } from "@/lib/auth";

export const Route = createFileRoute("/auth/logout")({
  component: AuthLogoutPage,
});

function AuthLogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    clearToken();
    navigate({ to: "/", replace: true });
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ks-bg">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-ks-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[14px] text-ks-text-secondary">A terminar sessão...</p>
      </div>
    </div>
  );
}
