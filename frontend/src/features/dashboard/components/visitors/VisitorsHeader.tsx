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
import AddAndEditVisitors from "./AddAndEditVisitors";
import { Plus, Download } from "lucide-react";
import { toast } from "sonner";

interface Visitor {
  name: string;
  email: string;
  phone: string;
  [key: string]: any;
}

const VisitorsHeader = () => {
  const [modal, setModal] = useState(false);

  const handleClose = () => {
    setModal(false);
  };

  const exportToCSV = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/visitors`, {
        withCredentials: true,
      });

      const visitors: Visitor[] = response.data.visitors;

      if (!visitors.length) {
        toast.error("No visitors to export.");
        return;
      }

      const headers = Object.keys(visitors[0]);
      const csvRows: string[] = [headers.join(",")];

      visitors.forEach((visitor: Visitor) => {
        const row = headers.map((field) => `"${visitor[field] ?? ""}"`).join(",");
        csvRows.push(row);
      });
      
      toast.success("Visitors exported successfully!");

      const csvString = csvRows.join("\n");
      const blob = new Blob([csvString], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "visitors.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export visitors.");
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      {/* Add Visitor (Left) */}
      <Dialog open={modal} onOpenChange={setModal}>
        <DialogTrigger asChild>
          <Button className="w-36" variant="default">
            <Plus className="mr-2 h-4 w-4" />
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

      {/* Export Visitors (Right) */}
      <Button variant="outline" className="w-40" onClick={exportToCSV}>
        <Download className="mr-2 h-4 w-4" />
        Export Visitors
      </Button>
    </div>
  );
};

export default VisitorsHeader;
