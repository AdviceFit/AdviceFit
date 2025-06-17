"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const MembersHeader = () => {
  const router = useRouter();

  const exportToCSV = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/members`,
        { withCredentials: true }
      );

      const members = response.data.members;

      if (!members.length) {
        toast.error("No members to export.");
        return;
      }

      // CSV generation (you can improve this as needed)
      const csvHeader = Object.keys(members[0]).join(",") + "\n";
      const csvRows = members.map((member: any) =>
        Object.values(member).join(",")
      );
      const csvContent = csvHeader + csvRows.join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "members.csv";
      link.click();

      toast.success("Members exported successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export members.");
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <Button
        variant="default"
        className="w-36"
        onClick={() => router.push("/dashboard/add-member")}
      >
        Add Members
      </Button>

      <Button variant="outline" className="w-40" onClick={exportToCSV}>
        <Download className="mr-2 h-4 w-4" />
        Export Members
      </Button>
    </div>
  );
};

export default MembersHeader;
