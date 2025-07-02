

"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const statusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-500";
    case "Failed":
      return "bg-destructive";
    case "In Review":
      return "bg-orange-500";
    default:
      return "bg-primary";
  }
};



function exportToCSV(messages: any[]) {
  if (!messages.length) return;
  const headers = [
    "Sender",
    "Center",
    "Recipients",
    "Sent To",
    "Message",
    "Status",
    "Sent At",
    "Role"
  ];
  const rows = messages.map((msg) => [
    msg.userId.email,
    msg.center.name,
    msg.to.join("; "),
    msg.sentTo.join("; "),
    msg.message.replace(/\n/g, " "),
    msg.status,
    new Date(msg.sentAt).toLocaleString(),
    msg.userId.role || "Member"
  ]);
  const csvContent =
    [headers, ...rows]
      .map((row) =>
        row
          .map((field) =>
            `"${String(field).replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "message_history.csv";
  a.click();
  URL.revokeObjectURL(url);
}

const MessageHistoryList = ({ messages }: { messages: any[] }) => {
  const [filter, setFilter] = useState("");

  const filteredMessages = useMemo(() => {
    if (!filter.trim()) return messages;
    const f = filter.toLowerCase();
    return messages.filter(
      (msg) =>
        msg.userId.email.toLowerCase().includes(f) ||
        msg.center.name.toLowerCase().includes(f) ||
        msg.to.some((r: string) => r.toLowerCase().includes(f)) ||
        msg.sentTo.some((r: string) => r.toLowerCase().includes(f)) ||
        msg.message.toLowerCase().includes(f) ||
        (msg.userId.role || "").toLowerCase().includes(f)
    );
  }, [messages, filter]);

  return (
    <div className="container mx-auto px-4 space-y-6">
      <h2 className="text-2xl font-extrabold text-center mb-6 text-gray-700 tracking-tight">
        Message Center History
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-6">
        <Input
          type="text"
          placeholder="🔍 Search messages..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full"
        />
        <div className="flex justify-end">
          <Button
            variant="default"
            size="lg"
            onClick={() => exportToCSV(filteredMessages)}
          >
            Export Data
          </Button>
        </div>
      </div>

      {filteredMessages?.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No messages found.</p>
      ) : (
        <div className="grid gap-6 md:gap-8">
          {filteredMessages.map((msg) => (
            <Card key={msg._id} className="p-4 md:p-6 shadow-sm">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{msg.userId.email}</span>
                    <Badge variant="outline">{msg.userId.role || "Member"}</Badge>
                  </div>
                  <Badge className={statusColor(msg.status)}>{msg.status}</Badge>
                </div>

                <div className="text-sm text-gray-500">
                  Sent on: {new Date(msg.sentAt).toLocaleString()}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Center: </span>
                    <span>{msg.center.name}</span>
                  </div>
                  <div>
                    <span className="font-medium">Recipients: </span>
                    <span>{msg.to.join(", ")}</span>
                  </div>
                </div>

                <div>
                  <span className="font-medium">Sent To: </span>
                  <span>{msg.sentTo.join(", ")}</span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mt-2">
                  <span className="block font-medium mb-2">Message:</span>
                  <span className="whitespace-pre-line">{msg.message}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageHistoryList;