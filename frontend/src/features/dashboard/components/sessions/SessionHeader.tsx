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
import AddAndEditSession from "./AddAndEditSession";
import { toast } from "sonner";

interface Session {
  [key: string]: any;
}

const SessionHeader = () => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sessions`,
        { withCredentials: true }
      );

      const data = response.data;
      console.log("✅ Raw API response:", data);

      let sessions: Session[] = [];

      if (Array.isArray(data.sessions)) {
        sessions = data.sessions;
        console.log("📦 Found sessions in `data.sessions`:", sessions);
      } else if (Array.isArray(data.session)) {
        sessions = data.session;
        console.log("📦 Found sessions in `data.session`:", sessions);
      } else if (Array.isArray(data)) {
        sessions = data;
        console.log("📦 Found sessions directly in `data`:", sessions);
      } else {
        console.warn("⚠️ Unrecognized response format");
        toast.error("Unexpected response format from server.");
        setLoading(false);
        return;
      }

      if (!sessions.length) {
        console.warn("⚠️ Sessions array is empty.");
        toast.error("No sessions to export.");
        setLoading(false);
        return;
      }

      // Generate CSV
      const headers = Object.keys(sessions[0]);
      const csvRows: string[] = [headers.join(",")];

      sessions.forEach((session) => {
        const row = headers
          .map((field) => `"${String(session[field] ?? "")}"`)
          .join(",");
        csvRows.push(row);
      });

      const csvContent = csvRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "sessions.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("✅ Sessions exported successfully!");
    } catch (error) {
      console.error("❌ Export failed:", error);
      toast.error("Failed to export sessions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      {/* Add Session Button */}
      <Dialog open={modal} onOpenChange={setModal}>
        <DialogTrigger asChild>
          <Button variant="default" className="w-36">
            <Plus className="mr-2 h-4 w-4" />
            Add Session
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[765px] lg:h-3/4 h-5/6 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Session</DialogTitle>
          </DialogHeader>
          <AddAndEditSession />
        </DialogContent>
      </Dialog>

      {/* Export Button */}
      <Button
        variant="outline"
        className="w-44"
        onClick={handleExport}
        disabled={loading}
      >
        <Download className="mr-2 h-4 w-4" />
        {loading ? "Exporting..." : "Export Sessions"}
      </Button>
    </div>
  );
};

export default SessionHeader;
