"use client";

import { ColumnDef } from "@tanstack/react-table";
import VisitorActionDropdown from "./VisitorActionDropdown";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";

const columns: ColumnDef<VisitorParams>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const router = useRouter();
      const visitor = row.original;

      return (
        <span
          onClick={() => router.push(`/dashboard/visitors/${visitor._id}`)}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          {visitor.name}
        </span>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "mobile",
    header: "Mobile Number",
  },
  {
    accessorKey: "visiting_center",
    header: "Gym Name",
    cell: ({ row }) => {
      const center = row.original.visiting_center;
      const gymName = typeof center === "object" && center !== null ? center.name : "No gym name";
      return <span>{gymName}</span>;
    },
  },
  {
    accessorKey: "visiting_date",
    header: "Visiting Date",
    cell: ({ getValue }) => <span>{formatDate(getValue() as string)}</span>,
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const id = row.original._id;
      return <VisitorActionDropdown id={id} />;
    },
  },
];

export { columns };
