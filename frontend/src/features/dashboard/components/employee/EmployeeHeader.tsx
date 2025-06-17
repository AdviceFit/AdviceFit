"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Employee {
  [key: string]: any;
}

const EmployeeHeader = () => {
  const router = useRouter(); // ✅ FIXED: Missing router initialization
  const [modal, setModal] = useState(false);

  const handleExport = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/employee`,
        {
          withCredentials: true,
        }
      );

      const employees: Employee[] = response.data.employees;

      if (!employees.length) {
        toast.error("No employees to export.");
        return;
      }

      const headers = Object.keys(employees[0]);
      const csvRows: string[] = [headers.join(",")];

      employees.forEach((emp) => {
        const row = headers.map((field) => `"${emp[field] ?? ""}"`).join(",");
        csvRows.push(row);
      });

      const csvContent = csvRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "employees.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export employees.");
    }
  };

  return (
    <div className="flex justify-between items-left mb-4">
      {/* Add Employee (Left Side) */}
      <Button
        variant="default"
        className="w-40"
        onClick={() => router.push("/dashboard/add-employee")}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Employee
      </Button>

      {/* Export Employees (Right Side) */}
      <Button variant="outline" className="w-44" onClick={handleExport}>
        <Download className="mr-2 h-4 w-4" />
        Export Employees
      </Button>
    </div>
  );
};

export default EmployeeHeader;
