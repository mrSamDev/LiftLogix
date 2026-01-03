import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useStore } from "../../lib/mockStore";

export const Route = createFileRoute("/auth/logout")({
  component: Logout,
});

function Logout() {
  const navigate = useNavigate();
  const logout = useStore((state) => state.logout);

  useEffect(() => {
    logout();
    navigate({ to: "/auth/login" });
  }, [logout, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Logging out...</p>
    </div>
  );
}
