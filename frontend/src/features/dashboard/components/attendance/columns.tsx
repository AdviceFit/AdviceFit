import { ColumnDef } from "@tanstack/react-table";
import AttendanceActionDropdown from "./AttendanceActionDropdown";
import { formatDateTime } from "@/lib/utils";

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "member.name",
    header: "Member",
    cell: ({ row }) => <span>{row.original?.member?.name}</span>,
  },
  {
    accessorKey: "time_in",
    header: "Time In",
    cell: ({ getValue }) => {
      const timeIn = getValue() as string;
      return <span>{formatDateTime(timeIn)}</span>;
    },
  },
  {
    accessorKey: "time_out",
    header: "Time Out",
    cell: ({ getValue }) => {
      const timeOut = getValue() as string;
      return <span>{formatDateTime(timeOut)}</span>;
    },
  },
  {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original._id;
      return <AttendanceActionDropdown id={id} />;
    },
  },
];

export { columns };
