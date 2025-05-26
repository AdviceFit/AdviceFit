"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

const PaymentsHeader = () => {
  const [loading, setLoading] = useState(false);

  const exportToCSV = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/payments`, {
        withCredentials: true,
      });

      const payments = response.data.payments;

      if (!payments || payments.length === 0) {
        toast.error("No payments to export.");
        setLoading(false);
        return;
      }

      const headers = Object.keys(payments[0]);
      const csvRows: string[] = [headers.join(",")];

      payments.forEach((payment: any) => {
        const row = headers.map((field) => `"${payment[field] ?? ""}"`).join(",");
        csvRows.push(row);
      });

      const csvString = csvRows.join("\n");
      const blob = new Blob([csvString], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "payments.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Payments exported successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export payments.");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-xl font-bold">Payments</h1>

      <Button
        variant="outline"
        className="flex items-center"
        onClick={exportToCSV}
        disabled={loading}
      >
        <Download className="mr-2 h-4 w-4" />
        {loading ? "Exporting..." : "Export Payments"}
      </Button>
    </div>
  );
};

export default PaymentsHeader;
