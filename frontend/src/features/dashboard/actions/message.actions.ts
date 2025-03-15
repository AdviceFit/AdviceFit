"use server";

import { BASE_URL } from "@/constants/constant";
import apiClient from "@/lib/axios";

const API_URL = `${BASE_URL}/messages`;

// Fetch all bulk messages
export const getMessagesHistory = async () => {
  const response = await apiClient.get(`${API_URL}`);
  return response.data;
};

//To-do for type any
export const sendBulkMessage = async (data: any) => {
  const response = await apiClient.post(API_URL, data);
  return response.data;
};
