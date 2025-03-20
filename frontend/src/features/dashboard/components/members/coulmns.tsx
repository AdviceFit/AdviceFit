"use client";

import { ColumnDef } from "@tanstack/react-table";
import MemberActionDropdown from "./MemberActionDropdown";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/utils";

const columns: ColumnDef<MembersParams>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="relative right-1"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="relative right-1"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "mobile",
    header: "Mobile Number",
  },
  {
    accessorKey: "gym_member_code",
    header: "Membership Code",
  },
  {
    accessorKey: "joining_date",
    header: "Joining Date",
    cell: ({ getValue }) => <span>{formatDate(getValue() as string)}</span>,
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "health_conditions",
    header: "Health Conditions",
  },
  {
    accessorKey: "marital_status",
    header: "Marital Status",
  },
  {
    accessorKey: "action",
    header: "Action",
  },
];

const getColumns = (
  payload: Record<string, unknown>[],
  centers: CenterParams[],
  setMemberState: any
) => {
  const tempColumns = [...columns];
  tempColumns[tempColumns.length - 1].cell = ({ row }) => {
    const columnData = payload[row.index];
    return (
      <MemberActionDropdown
        centers={centers}
        columnData={columnData}
        setMemberState={setMemberState}
      />
    );
  };

  return tempColumns;
};

export { columns, getColumns };
