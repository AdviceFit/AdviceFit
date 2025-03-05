"use client";

import { ColumnDef } from "@tanstack/react-table";
import PaymentActionDropdown from "./PaymentActionDropdown";

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
    accessorKey: "paidAmount",
    header: "Amount",
    cell: ({ row }) => {
      return <span>{row.original.subscriptionDetails.paidAmount || 0}</span>;
    },
  },
  {
    accessorKey: "dueAmount",
    header: "Due Amount",
    cell: ({ row }) => {
      const offerAmount = row.original.subscriptionDetails?.offerAmount || 0;
      const paidAmount = row.original.subscriptionDetails?.paidAmount || 0;
      const dueAmount = offerAmount - paidAmount;
      return <span>{dueAmount}</span>;
    },
  },
  {
    accessorKey: "gymName",
    header: "Gym Name",
    cell: ({ row }) => {
      const coupon = row.original.center.name || "";
      return <span>{coupon}</span>;
    },
  },
  {
    accessorKey: "paymentDate",
    header: "Payment Date",
    cell: ({ row }) => {
      return (
        <span>
          {formatDate(row.original.subscriptionDetails.paymentDate) || ""}
        </span>
      );
    },
  },
  {
    accessorKey: "collectedBy",
    header: "Collected By",
    cell: ({ row }) => {
      return <span>{row.original.name || ""}</span>;
    },
  },
  {
    accessorKey: "paymentMode",
    header: "Payment Mode",
    cell: ({ row }) => {
      return <span>{row.original.subscriptionDetails.paymentMode || ""}</span>;
    },
  },
  {
    accessorKey: "comments",
    header: "Comments",
    cell: ({ row }) => {
      const comments =
        row.original.subscriptionDetails.comments || "No comments";
      return <span>{comments}</span>;
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const id = row.original.subscriptionDetails._id;
      return <PaymentActionDropdown id={id} />;
    },
  },
];

export { columns };
