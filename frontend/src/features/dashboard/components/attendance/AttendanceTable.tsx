'use client'
import React, { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const AttendanceTable = ({ adviceFitAttendance }: { adviceFitAttendance: AttendanceParams[] }) => {
  const [attendanceData, setAttendanceData] = useState(adviceFitAttendance);

  const handleDeleteSuccess = (id: string) => {
    setAttendanceData((prev) => prev.filter((record) => record._id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns(handleDeleteSuccess)} data={attendanceData} />
    </div>
  );
};

export default AttendanceTable;
