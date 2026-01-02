import { createFileRoute, Outlet, useNavigate, Link } from "@tanstack/react-router";
import { useStore } from "../lib/mockStore";
import { useEffect } from "react";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useStore();

  useEffect(() => {
    if (!isAuthenticated || !currentUser) {
      navigate({ to: "/auth/login" });
    }
  }, [isAuthenticated, currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b-4 border-black bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-12">
              <h1 className="text-2xl font-bold uppercase tracking-tighter">
                Lift Logic
              </h1>
              <div className="flex gap-0">
                <Link
                  to="/app/dashboard"
                  className="border-r-4 border-black px-6 py-2 font-bold uppercase transition-all hover:bg-lime-400"
                  activeProps={{ className: "bg-lime-400 border-r-4 border-black px-6 py-2 font-bold uppercase" }}
                >
                  Dashboard
                </Link>
                {currentUser.role === "admin" && (
                  <>
                    <Link
                      to="/app/organizations"
                      className="border-r-4 border-black px-6 py-2 font-bold uppercase transition-all hover:bg-lime-400"
                      activeProps={{ className: "bg-lime-400 border-r-4 border-black px-6 py-2 font-bold uppercase" }}
                    >
                      Orgs
                    </Link>
                    <Link
                      to="/app/users"
                      className="border-r-4 border-black px-6 py-2 font-bold uppercase transition-all hover:bg-lime-400"
                      activeProps={{ className: "bg-lime-400 border-r-4 border-black px-6 py-2 font-bold uppercase" }}
                    >
                      Users
                    </Link>
                  </>
                )}
                <Link
                  to="/app/profile"
                  className="px-6 py-2 font-bold uppercase transition-all hover:bg-lime-400"
                  activeProps={{ className: "bg-lime-400 px-6 py-2 font-bold uppercase" }}
                >
                  Profile
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="border-4 border-black bg-white px-4 py-2">
                <span className="font-mono text-sm font-bold uppercase">
                  {currentUser.name}
                </span>
                <span className="ml-3 border-l-4 border-black pl-3 font-mono text-sm font-bold uppercase">
                  {currentUser.role}
                </span>
              </div>
              <Link
                to="/auth/logout"
                className="border-4 border-black bg-white px-6 py-2 font-bold uppercase transition-all hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0"
              >
                Exit
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl px-4 py-12">
        <Outlet />
      </main>
    </div>
  );
}
