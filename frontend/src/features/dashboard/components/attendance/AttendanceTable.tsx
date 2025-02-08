'use client'
import React, { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const AttendanceTable = ({ adviceFitAttendance }: { adviceFitAttendance: AttendanceParams[] }) => {


  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={adviceFitAttendance} />
    </div>
  );
};

export default AttendanceTable;
