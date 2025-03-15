"use server";

import { BASE_URL } from "@/constants/constant";
import apiClient from "@/lib/axios";

const API_URL = `${BASE_URL}/reports`;

export const getReport = async (
  payload: Record<string, string | Record<string, Date>>
): Promise<any> => {
  const response = await apiClient.post(`${API_URL}/get-report`, payload, {
    responseType: "blob",
  });    
  return response.data;
};

export const getPaymentInvoice = async (id: string) => {
  const response = await apiClient.get(`${API_URL}/get-invoice/${id}`, {
    responseType: "blob",
  });
  console.log(response.data);

  return response.data;
};
