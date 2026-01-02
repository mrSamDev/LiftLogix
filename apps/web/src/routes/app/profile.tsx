import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "../../lib/mockStore";

export const Route = createFileRoute("/app/profile")({
  component: Profile,
});

function Profile() {
  const { currentUser, organizations, users } = useStore();

  if (!currentUser) {
    return null;
  }

  const organization = organizations.find((org) => org.id === currentUser.organizationId);
  const coach = currentUser.coachId
    ? users.find((u) => u.id === currentUser.coachId)
    : null;

  return (
    <div>
      <h1 className="mb-12 border-b-4 border-black pb-6 text-5xl font-bold uppercase leading-none tracking-tighter">
        Profile
      </h1>

      <div className="border-4 border-black bg-white">
        <div className="p-8">
          <div className="mb-8">
            <p className="mb-2 font-mono text-xs font-bold uppercase tracking-wider">Name</p>
            <p className="text-2xl font-bold">{currentUser.name}</p>
          </div>

          <div className="mb-8">
            <p className="mb-2 font-mono text-xs font-bold uppercase tracking-wider">Email</p>
            <p className="font-mono text-lg font-bold">{currentUser.email}</p>
          </div>

          <div className="mb-8">
            <p className="mb-2 font-mono text-xs font-bold uppercase tracking-wider">Role</p>
            <span className="inline-block border-4 border-black bg-lime-400 px-4 py-2 font-mono text-sm font-bold uppercase">
              {currentUser.role}
            </span>
          </div>

          {organization && (
            <div className="mb-8">
              <p className="mb-4 font-mono text-xs font-bold uppercase tracking-wider">
                Organization
              </p>
              <div className="border-4 border-black bg-white p-6">
                <p className="mb-2 text-xl font-bold uppercase">{organization.title}</p>
                <p className="font-mono text-sm font-bold uppercase">
                  {organization.geoLocation.latitude.toFixed(4)},{" "}
                  {organization.geoLocation.longitude.toFixed(4)}
                </p>
              </div>
            </div>
          )}

          {coach && (
            <div>
              <p className="mb-4 font-mono text-xs font-bold uppercase tracking-wider">Coach</p>
              <div className="border-4 border-black bg-white p-6">
                <p className="mb-2 font-bold uppercase">{coach.name}</p>
                <p className="font-mono text-sm font-bold">{coach.email}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
