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
import { Plus, Download } from "lucide-react";
import AddAndEditExpense from "./AddAndEditExpense";
import { toast } from "sonner";

interface Expense {
  [key: string]: any;
}

const ExpenseHeader = () => {
  const [modal, setModal] = useState(false);

  const handleClose = () => {
    setModal(false);
  };

  const handleExport = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/expenses`, {
      withCredentials: true,
    });

    console.log("Export response data:", response.data);

    const expenses = Array.isArray(response.data.expenses) ? response.data.expenses : [];

    if (!expenses.length) {
      toast.error("No expenses to export.");
      return;
    }

    const headers = Object.keys(expenses[0]);
    const csvRows: string[] = [headers.join(",")];

    expenses.forEach((exp : Expense) => {
      const row = headers.map((field) => `"${exp[field] ?? ""}"`).join(",");
      csvRows.push(row);
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Export error:", error);
    alert("Failed to export expenses.");
  }
};


  return (
    <div className="flex justify-between items-center mb-4">
      {/* Add Expense (Left) */}
      <Dialog open={modal} onOpenChange={setModal}>
        <DialogTrigger asChild>
          <Button variant="default" className="w-40">
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
        </DialogTrigger>
        <DialogContent className=" h-[90vh] sm:max-w-[765px] lg:h-3/4 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
          </DialogHeader>
          <AddAndEditExpense onClose={handleClose} />
        </DialogContent>
      </Dialog>

      {/* Export Expenses (Right) */}
      <Button variant="outline" className="w-44" onClick={handleExport}>
        <Download className="mr-2 h-4 w-4" />
        Export Expenses
      </Button>
    </div>
  );
};

export default ExpenseHeader;
