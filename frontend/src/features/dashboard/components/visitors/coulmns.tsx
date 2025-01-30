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
        header: "Visiting Center",
    },
    {
        accessorKey: "visiting_date",
        header: "Visiting Date",
        cell: ({ getValue }) => <span>{formatDate(getValue() as string)}</span>,
    },
    {
        accessorKey: "tentative_visiting_date",
        header: "Tentative Visiting Date",
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
        accessorKey: "remarks",
        header: "Remarks",
    },
    {
        accessorKey: "enquire_mode",
        header: "Enquire Mode",
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
