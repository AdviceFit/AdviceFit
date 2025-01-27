"use client"

import { ColumnDef } from "@tanstack/react-table";
import MemberActionDropdown from "./MemberActionDropdown";

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

const columns: ColumnDef<MembersParams>[] = [
    {
        accessorKey: "name",
        header: "Name",
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
        accessorKey:"action",
        header: "Action",
        cell: ({ row }) => {
            const id = row.original._id;
            return (
                <MemberActionDropdown id={id} />
            );
        },
    }
];

export { columns };