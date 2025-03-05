import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./coulmns";

const PaymentsTable = ({
  adviceFitPayments,
}: {
  adviceFitPayments: MembersParams[];
}) => {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={adviceFitPayments} />
    </div>
  );
};

export default PaymentsTable;
