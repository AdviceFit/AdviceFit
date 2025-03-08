"use client";

import { ColumnDef } from "@tanstack/react-table";
import SubscriptionActionDropdown from "./SubscriptionActionDropdown";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const columns: ColumnDef<SubscriptionsParams>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <span>{row.original.memberId.name || ""}</span>;
    },
  },
  {
    accessorKey: "package",
    header: "Package",
    cell: ({ row }) => {
      return <span>{row.original.package || ""}</span>;
    },
  },
  {
    accessorKey: "promoCoupon",
    header: "Promo Coupon",
    cell: ({ row }) => {
      const coupon = row.original.promoCoupon || "";
      return <span>{coupon}</span>;
    },
  },
  {
    accessorKey: "offerAmount",
    header: "Offer Amount",
    cell: ({ row }) => {
      return <span>{row.original.offerAmount || 0}</span>;
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
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      return <span>{formatDate(row.original.startDate) || ""}</span>;
    },
  },
  {
    accessorKey: "paidAmount",
    header: "Paid Amount",
    cell: ({ row }) => {
      return <span>{row.original.paidAmount || 0}</span>;
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
    accessorKey: "paymentDueDate",
    header: "Payment Due Date",
    cell: ({ row }) => {
      return <span>{formatDate(row.original.paymentDueDate) || ""}</span>;
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
      return <SubscriptionActionDropdown id={id} />;
    },
  },
];

export { columns };
