"use client";

import { ColumnDef } from "@tanstack/react-table";
import ExpenseActionDropdown from "./ExpenseActionDropdown";

const columns: ColumnDef<ExpenseParams>[] = [
    {
        accessorKey: "title",
        header: "Expense Title",
        cell: ({ row }) => <span className="font-medium">{row.original.expense_title}</span>,
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => <span>₹{row.original.amount}</span>,
    },
    {
        accessorKey: "type",
        header: "Type of Expense",
        cell: ({ row }) => <span>{row.original.type_of_expense}</span>,

    },
    {
        accessorKey: "center",
        header: "Center",
        cell: ({ row }) => {
            const center = row.original.center;
            return <span>{typeof center === "object" && center ? center.name : "N/A"}</span>;
        },
    },
    {
        accessorKey: "expense_date",
        header: "Expense Date",
        cell: ({ row }) => (
            <span>{new Date(row.original.expense_date).toLocaleDateString()}</span>
        ),
    },
    {
        accessorKey: "payment_mode",
        header: "Payment Mode",
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            const id = row.original._id;
            return <ExpenseActionDropdown id={id!} />;
        },
    },
];

export { columns };
