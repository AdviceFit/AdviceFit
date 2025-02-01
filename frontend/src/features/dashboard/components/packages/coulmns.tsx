"use client"

import { ColumnDef } from "@tanstack/react-table";
import PackageActionDropdown from "./PackageActionDropdown";

const columns: ColumnDef<PackageParams>[] = [
    {
        accessorKey: "packageName",
        header: "Package Details",
        cell: ({ row }) => {
            const pkg = row.original;
            return (
                <div className="flex flex-col space-y-1">
                    <span className="font-medium text-gray-800">
                        {pkg.packageName}
                    </span>
                    <span className="text-sm text-gray-500">
                        ₹ {pkg.price} for {pkg.noOfDays} days
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
        accessorKey: "trainingType",
        header: "Training Type",
    },
    {
        accessorKey: "packageTiming",
        header: "Package Timimg"
    },
    {
        accessorKey: "packageType",
        header: "Package Type",
    },
    {
        accessorKey: "productType",
        header: "Product Type",
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            const id = row.original._id;
            return (
                <PackageActionDropdown id={id} />
            );
        },
    }
];

export { columns };
