"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddAndEditAttendance from "./AddAndEditAttendance";
import { Download, Plus } from "lucide-react";



interface Attendance {
  [key: string]: any;
}

const AttendanceHeader = () => {
  const [modal, setModal] = useState(false);



  const handleClose = () => {
    setModal(false);
  };

  const exportToCSV = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/attendance`, {
        withCredentials: true,
      });

      const attendanceData: Attendance[] = response.data.attendance;

      if (!attendanceData.length) {
     
        alert("No attendance data to export.");

      
        return;
      }

      const headers = Object.keys(attendanceData[0]);
      const csvRows: string[] = [headers.join(",")];

      attendanceData.forEach((record: Attendance) => {
        const row = headers.map((field) => `"${record[field] ?? ""}"`).join(",");
        csvRows.push(row);
      });

      const csvString = csvRows.join("\n");
      const blob = new Blob([csvString], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "attendance.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export attendance.");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        {/* Add Attendance (Left Side) */}
        <Dialog open={modal} onOpenChange={setModal}>
          <DialogTrigger asChild>
            <Button className="w-40" variant="default">
              <Plus className="mr-2 h-4 w-4" />
              Add Attendance
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[765px] lg:h-2/4 h-5/6 overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Attendance</DialogTitle>
            </DialogHeader>
            <AddAndEditAttendance onClose={handleClose} />
          </DialogContent>
        </Dialog>

        {/* Export Attendance (Right Side) */}
        <Button variant="outline" className="w-44" onClick={exportToCSV}>
          <Download className="mr-2 h-4 w-4" />
          Export Attendance
        </Button>
      </div>

      {/* Radix Toast component for notification (optional) */}
      {/* 
      <ToastPrimitive.Provider>
        <ToastPrimitive.Root open={openToast} onOpenChange={setOpenToast} className="bg-red-600 text-white p-3 rounded">
          <ToastPrimitive.Title>No attendance data to export.</ToastPrimitive.Title>
        </ToastPrimitive.Root>
        <ToastPrimitive.Viewport />
      </ToastPrimitive.Provider> 
      */}
    </>
  );
};

export default AttendanceHeader;
