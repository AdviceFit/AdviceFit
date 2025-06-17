"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

interface Visitor {
  name: string;
  email: string;
  phone: string;
  [key: string]: any;
}

const VisitorsHeader = () => {
  const router = useRouter();

  const exportToCSV = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/visitors`,
        { withCredentials: true }
      );

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

      const csvString = csvRows.join("\n");
      const blob = new Blob([csvString], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "visitors.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Visitors exported successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export visitors.");
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      {/* Navigate to Add Visitor Page */}
      <Button
        className="w-36"
        variant="default"
        onClick={() => router.push("/dashboard/add-visitors")}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Visitor
      </Button>

      {/* Export Visitors */}
      <Button variant="outline" className="w-40" onClick={exportToCSV}>
        <Download className="mr-2 h-4 w-4" />
        Export Visitors
      </Button>
    </div>
  );
};

export default VisitorsHeader;
