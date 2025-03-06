"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MessageHistoryList = ({ messages }: { messages: any[] }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Message History</h2>
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        messages.map((msg) => (
          <Card key={msg._id} className="border rounded-lg shadow-sm p-4">
            <CardHeader>
              <CardTitle className="text-lg">
                Sent by: <span className="font-medium">{msg.userId.gym_owner_name }</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Center:</strong> {msg.center.name}
              </p>
              <p>
                <strong>Recipients:</strong> {msg.recipients.join(", ")}
              </p>
              <p>
                <strong>Message Type:</strong>{" "}
                <Badge variant="outline">{msg.messageType}</Badge>
              </p>
              <p>
                <strong>Category:</strong>{" "}
                <Badge variant="secondary">{msg.messageCategory}</Badge>
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
                Sent on: {new Date(msg.createdAt).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default MessageHistoryList;
