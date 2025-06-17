"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

interface Center {
  [key: string]: any;
}

const CentersHeader = () => {
  const router = useRouter();

  const handleExport = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/center`, {
        withCredentials: true,
      });

      const centers: Center[] = response.data.centers;

      if (!centers.length) {
        toast.error("No centers to export.");
        return;
      }

      const headers = Object.keys(centers[0]);
      const csvRows: string[] = [headers.join(",")];

      centers.forEach((center) => {
        const row = headers.map((field) => `"${center[field] ?? ""}"`).join(",");
        csvRows.push(row);
      });

      const csvContent = csvRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "centers.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Export error:", error);
      alert("Failed to export centers.");
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      {/* Navigate to New Add Center Page */}
      <Button
        variant="default"
        className="w-36"
        onClick={() => router.push("/dashboard/add-center")}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Center
      </Button>

      {/* Export Button */}
      <Button variant="outline" className="w-44" onClick={handleExport}>
        <Download className="mr-2 h-4 w-4" />
        Export Centers
      </Button>
    </div>
  );
};

export default CentersHeader;
