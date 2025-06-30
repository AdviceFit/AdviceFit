"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "@/features/dashboard/components/visitors/data-table";

interface Visit {
  date: string;
  location: string;
  purpose: string;
}

interface Visitor {
  id: string;
  name: string;
  email: string;
  visits: Visit[];
}

interface VisitorInfoProps {
  visitorId: string;
}

export default function VisitorInfo({ visitorId }: VisitorInfoProps) {
  const [visitor, setVisitor] = useState<Visitor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVisitor() {
      try {
        const res = await fetch(`/api/visitors/${visitorId}`);
        if (!res.ok) {
          throw new Error("Visitor not found");
        }
        const data = await res.json();
        setVisitor(data);
      } catch (err: any) {
        setError(err.message || "Failed to load visitor");
      } finally {
        setLoading(false);
      }
    }

    fetchVisitor();
  }, [visitorId]);

  if (loading) return <div>Loading visitor info...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!visitor) return <div>Visitor not found</div>;

  const columns = [
    {
      accessorKey: "date",
      header: "Visit Date",
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "purpose",
      header: "Purpose",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Visitor Info</h2>
      <p>
        <strong>ID:</strong> {visitor.id}
      </p>
      <p>
        <strong>Name:</strong> {visitor.name}
      </p>
      <p>
        <strong>Email:</strong> {visitor.email}
      </p>

      <h3 className="mt-8 mb-4 text-xl font-semibold">Visit History</h3>
      <DataTable columns={columns} data={visitor.visits || []} />
    </div>
  );
}
