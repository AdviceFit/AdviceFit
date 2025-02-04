"use client"

import { ColumnDef } from "@tanstack/react-table";
import VisitorActionDropdown from "./VisitorActionDropdown";

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
};

const columns: ColumnDef<VisitorParams>[] = [
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
        accessorKey: "visiting_center",
        header: "Gym Name",
    },
    {
        accessorKey: "visiting_date",
        header: "Visiting Date",
        cell: ({ getValue }) => <span>{formatDate(getValue() as string)}</span>,
    },
    {
        accessorKey:"action",
        header: "Action",
        cell: ({ row }) => {
            const id = row.original._id;
            return (
                <VisitorActionDropdown id={id} />
            );
        },
    }
];

export { columns };
