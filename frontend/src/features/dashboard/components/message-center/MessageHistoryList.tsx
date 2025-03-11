"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MessageHistoryList = ({ messages }: { messages: any[] }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Email History</h2>
      {messages?.length === 0 ? (
        <p>No email history found.</p>
      ) : (
        messages?.map((msg) => (
          <Card key={msg._id} className="border rounded-lg shadow-sm p-4">
            <CardHeader>
              <CardTitle className="text-lg">
                Sent by: <span className="font-medium">{msg.userId.email}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Center:</strong> {msg.center.name}
              </p>
              <p>
                <strong>Recipients:</strong> {msg.to.join(", ")}
              </p>
              <p>
                <strong>Sent To:</strong> {msg.sentTo.join(", ")}
              </p>
              <p className="mt-2">
                <strong>Message:</strong> {msg.message}
              </p>
              <p className="mt-2">
                <strong>Status:</strong>{" "}
                <Badge
                  className={
                    msg.status === "Pending"
                      ? "bg-yellow-500 text-white"
                      : "bg-green-500 text-white"
                  }
                >
                  {msg.status}
                </Badge>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Sent on: {new Date(msg.sentAt).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default MessageHistoryList;
