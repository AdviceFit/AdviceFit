"use client"

import { ColumnDef } from "@tanstack/react-table";
import SessionActionDropdown from "./SessionActionDropdown";

const columns: ColumnDef<SessionParams>[] = [
    {
        accessorKey: "sessionTitle",
        header: "Session Details",
        cell: ({ row }) => {
            const session = row.original;
            return (
                <div className="flex flex-col space-y-1">
                    <span className="font-medium text-gray-800">
                        {session.title}
                    </span>
                    <span className="text-sm text-gray-500">
                        {new Date(session.session_date).toLocaleDateString()} | {session.start_time} - {session.end_time}
                    </span>
                </div>
            );
        },
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
        accessorKey: "member_capacity",
        header: "Member Capacity",
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            const id = row.original._id;
            return (
                <SessionActionDropdown id={id!} />
            );
        },
    }
];

export { columns };
