"use client";

import { ColumnDef } from "@tanstack/react-table";
import PaymentActionDropdown from "./PaymentActionDropdown";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const columns: ColumnDef<PaymentsParams>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <span>{row.original.memberId.name || ""}</span>;
    },
  },
  {
    accessorKey: "paidAmount",
    header: "Amount",
    cell: ({ row }) => {
      return <span>{row.original.paidAmount || 0}</span>;
    },
  },
  {
    accessorKey: "dueAmount",
    header: "Due Amount",
    cell: ({ row }) => {
      return <span>{row.original.dueAmount || 0}</span>;
    },
  },
  {
    accessorKey: "gymName",
    header: "Gym Name",
    cell: ({ row }) => {
      const coupon = (row.original.memberId.center as EmployeeCenter).name || "";
      return <span>{coupon}</span>;
    },
  },
  {
    accessorKey: "paymentDate",
    header: "Payment Date",
    cell: ({ row }) => {
      return <span>{formatDate(row.original.paymentDate) || ""}</span>;
    },
  },
  {
    accessorKey: "collectedBy",
    header: "Collected By",
    cell: ({ row }) => {
      return <span>{row.original.memberId.name || ""}</span>;
    },
  },
  {
    accessorKey: "paymentMode",
    header: "Payment Mode",
    cell: ({ row }) => {
      return <span>{row.original.paymentMode || ""}</span>;
    },
  },
  {
    accessorKey: "comments",
    header: "Comments",
    cell: ({ row }) => {
      const comments = row.original.comments || "No comments";
      return <span>{comments}</span>;
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const id = row.original._id;
      return <PaymentActionDropdown id={id} />;
    },
  },
];

export { columns };
