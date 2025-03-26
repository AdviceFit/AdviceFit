"use client";

import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./coulmns";

const MembersTable = ({
  centers,
  adviceFitMembers,
  setMemberState,
}: {
  centers: CenterParams[];
  adviceFitMembers: MembersParams[];
  setMemberState: any;
}) => {
    
  return (
    <div className="container py-6 mx-auto">
      <DataTable
        columns={columns}
        data={adviceFitMembers}
      />
    </div>
  );
};

export default MembersTable;
