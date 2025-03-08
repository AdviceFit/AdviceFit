import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./coulmns";

const SubscriptionsTable = ({
  adviceFitSubscriptions,
}: {
  adviceFitSubscriptions: SubscriptionsParams[];
}) => {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={adviceFitSubscriptions} />
    </div>
  );
};

export default SubscriptionsTable;
