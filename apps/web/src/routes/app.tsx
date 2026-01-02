import { createFileRoute, Outlet, Link, redirect } from "@tanstack/react-router";
import { safetry } from "@lift-logic/utils";
import { getSession } from "@/features/auth";

export const Route = createFileRoute("/app")({
  component: AppLayout,
  beforeLoad: async () => {
    const [error, sessionData] = await safetry(getSession());

    if (error || !sessionData) {
      throw redirect({
        to: "/auth/login",
      });
    }

    return { sessionData };
  },
});

function AppLayout() {
  const { sessionData } = Route.useRouteContext();

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b-4 border-black bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-12">
              <h1 className="text-2xl font-bold uppercase tracking-tighter">Lift Logic</h1>
              <div className="flex gap-0">
                <Link
                  to="/app/dashboard"
                  className="border-r-4 border-black px-6 py-2 font-bold uppercase transition-all hover:bg-lime-400"
                  activeProps={{ className: "bg-lime-400 border-r-4 border-black px-6 py-2 font-bold uppercase" }}
                >
                  Dashboard
                </Link>
                {sessionData.user.role === "admin" && (
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
                <Link to="/app/profile" className="px-6 py-2 font-bold uppercase transition-all hover:bg-lime-400" activeProps={{ className: "bg-lime-400 px-6 py-2 font-bold uppercase" }}>
                  Profile
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="border-4 border-black bg-white px-4 py-2">
                <span className="font-mono text-sm font-bold uppercase">{sessionData.user.name}</span>
                <span className="ml-3 border-l-4 border-black pl-3 font-mono text-sm font-bold uppercase">{sessionData.user.role}</span>
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
