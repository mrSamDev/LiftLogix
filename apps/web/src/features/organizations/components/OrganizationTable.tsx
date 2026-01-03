import { Link } from "@tanstack/react-router";
import type { Organization } from "../types";

type OrganizationTableProps = {
  organizations: Organization[];
};

export function OrganizationTable({ organizations }: OrganizationTableProps) {
  return (
    <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-3">
      {organizations.map((org) => (
        <Link
          key={org.id}
          to="/app/organizations/$id"
          params={{ id: org.id }}
          className="border-4 border-black bg-white transition-all hover:translate-x-1 hover:translate-y-1"
        >
          <img
            src={org.imageUrl}
            alt={org.title}
            className="h-48 w-full border-b-4 border-black object-cover"
          />
          <div className="p-6">
            <h2 className="mb-3 text-2xl font-bold uppercase leading-tight tracking-tight">
              {org.title}
            </h2>
            <p className="font-mono text-sm font-bold uppercase">
              {org.geoLocation.latitude.toFixed(4)}, {org.geoLocation.longitude.toFixed(4)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
