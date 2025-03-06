"use client";

import { useEffect, useState } from "react";
import { getMessagesHistory } from "../actions/message.actions";
import MessageHistoryList from "../components/message-center/MessageHistoryList";
import { toast } from "sonner";

const MessageHistoryMain = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messageHistory = await getMessagesHistory();        
        setMessages(messageHistory.messages);
      } catch (error) {
        toast.error("Failed to load message history.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return <p>Loading messages...</p>;
  }

  return <MessageHistoryList messages={messages} />;
};

export default MessageHistoryMain;
