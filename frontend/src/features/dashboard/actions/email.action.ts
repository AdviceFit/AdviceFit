"use server";

import { BASE_URL } from "@/constants/constant";
import apiClient from "@/lib/axios";

const API_URL = `${BASE_URL}/email`;


// Todo : There is bit confusion here so update this with the apiClient if anyone gets clear about this.
const sendEmail = async (payload: unknown) => {
  const response = await apiClient.post(API_URL, payload)
  const text = await response.data;

  try {
    const data = text ? JSON.parse(text) : null;
    return data;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return { error: "Invalid server response" };
  }
};

const getEmails = async () => {
  const response = await apiClient.get(`${API_URL}`);
  return response.data;
};

export { sendEmail, getEmails };
