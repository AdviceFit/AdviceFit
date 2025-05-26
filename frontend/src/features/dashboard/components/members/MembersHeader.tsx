"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Toast } from "@radix-ui/react-toast";

const MembersHeader = () => {
  const router = useRouter();

 const exportToCSV = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/members`, {
      withCredentials: true,
    });

    const members = response.data.members;

    if (!members.length) {
      toast.error("No members to export.");
      return;
    }

    // ... rest of your CSV export code

    toast.success("Members exported successfully!");
  } catch (error) {
    console.error("Export failed:", error);
    toast.error("Failed to export members.");
  }
};
  return (
    <div className="flex justify-between items-center mb-4">
      {/* Add Members (Left) */}
      <Button
        variant="default"
        className="w-36"
        onClick={() => router.push("/dashboard/add-member")}
      >
        Add Members
      </Button>

      {/* Export Members (Right) */}
      <Button
        variant="outline"
        className="w-40"
        onClick={exportToCSV}
      >
        <Download className="mr-2 h-4 w-4" />
        Export Members
      </Button>
    </div>
  );
};

export default MembersHeader;
