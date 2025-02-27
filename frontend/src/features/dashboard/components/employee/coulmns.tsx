"use client"

import { ColumnDef } from "@tanstack/react-table";
import EmployeeActionDropdown from "./EmployeeActionDropdown";

const columns: ColumnDef<EmployeeParams>[] = [
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
        accessorKey: "center",
        header: "Gym Name",
        cell: ({ row }) => {
            const center = row.original.center;
            const gymName = typeof center === "object" && center !== null ? center.name : "No gym name";
            return <span>{gymName}</span>;
        }
    },

    {
        accessorKey: "gender",
        header: "Gender",
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            const id = row.original._id;
            return (
                <EmployeeActionDropdown id={id} />
            );
        },
    }
];

export { columns };
