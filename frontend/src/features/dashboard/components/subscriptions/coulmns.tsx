"use client";

import { ColumnDef } from "@tanstack/react-table";
import SubscriptionActionDropdown from "./SubscriptionActionDropdown";

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
    accessorKey: "package",
    header: "Package",
    cell: ({ row }) => {
      return <span>{row.original.subscriptionDetails.package || ""}</span>;
    },
  },
  {
    accessorKey: "promoCoupon",
    header: "Promo Coupon",
    cell: ({ row }) => {
      const coupon = row.original.subscriptionDetails.promoCoupon || "";
      return <span>{coupon}</span>;
    },
  },
  {
    accessorKey: "offerAmount",
    header: "Offer Amount",
    cell: ({ row }) => {
      return <span>{row.original.subscriptionDetails.offerAmount || 0}</span>;
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
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      return (
        <span>
          {formatDate(row.original.subscriptionDetails.startDate) || ""}
        </span>
      );
    },
  },
  {
    accessorKey: "paidAmount",
    header: "Paid Amount",
    cell: ({ row }) => {
      return <span>{row.original.subscriptionDetails.paidAmount || 0}</span>;
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
    accessorKey: "paymentDueDate",
    header: "Payment Due Date",
    cell: ({ row }) => {
      return (
        <span>
          {formatDate(row.original.subscriptionDetails.paymentDueDate) || ""}
        </span>
      );
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
      return <SubscriptionActionDropdown id={id} />;
    },
  },
];

export { columns };
