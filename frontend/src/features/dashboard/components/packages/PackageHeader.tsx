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
import AddAndEditPackage from "./AddAndEditPackage";
import { toast } from "sonner";

interface Package {
  [key: string]: any;
}

const PackageHeader = () => {
  const [modal, setModal] = useState(false);

  const handleExport = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/packages`, {
        withCredentials: true,
      });

      const packages: Package[] = response.data.packages;

      if (!packages.length) {
        toast.error("No packages to export.");
        return;
      }

      const headers = Object.keys(packages[0]);
      const csvRows: string[] = [headers.join(",")];

      packages.forEach((pkg) => {
        const row = headers.map((field) => `"${pkg[field] ?? ""}"`).join(",");
        csvRows.push(row);
      });

      const csvContent = csvRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "packages.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export packages.");
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      {/* Add Package (Left) */}
      <Dialog open={modal} onOpenChange={setModal}>
        <DialogTrigger asChild>
          <Button variant="default" className="w-36">
            <Plus className="mr-2 h-4 w-4" />
            Add Package
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[765px] lg:h-3/4 h-5/6 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Package</DialogTitle>
          </DialogHeader>
          <AddAndEditPackage />
        </DialogContent>
      </Dialog>

      {/* Export Packages (Right) */}
      <Button variant="outline" className="w-44" onClick={handleExport}>
        <Download className="mr-2 h-4 w-4" />
        Export Packages
      </Button>
    </div>
  );
};

export default PackageHeader;
