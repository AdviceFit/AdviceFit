"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddAndEditVisitors from "./AddAndEditVisitors";
import { useState } from "react";

const VisitorsHeader = () => {
  const [modal, setModal] = useState(false);
  const handleClose = () => {
    setModal(false);
  };
  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button className="w-28" variant="default">
          Add Visitor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[765px] lg:h-3/4 h-5/6 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Visitor</DialogTitle>
        </DialogHeader>
        <AddAndEditVisitors onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default VisitorsHeader;
