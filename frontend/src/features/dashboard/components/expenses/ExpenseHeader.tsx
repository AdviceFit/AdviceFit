"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddAndEditExpense from "./AddAndEditExpense";
import { useState } from "react";

const ExpenseHeader = () => {
  const [modal, setModal] = useState(false);

  const handleClose = () => {
    setModal(false);
  }

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-32">Add Expense</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[765px] lg:h-4/6 h-5/6 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
        </DialogHeader>
        <AddAndEditExpense onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseHeader;
