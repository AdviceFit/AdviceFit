"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddAndEditAttendance from "./AddAndEditAttendance";
import { useState } from "react";

const AttendanceHeader = () => {
  const [modal, setModal] = useState(false);

  const handleClose = () => {
    setModal(false);
  };

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button className="w-32" variant="default">
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
  );
};

export default AttendanceHeader;
