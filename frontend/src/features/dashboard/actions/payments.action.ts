"use server";

import { BASE_URL } from "@/constants/constant";
import apiClient from "@/lib/axios";

const API_URL = `${BASE_URL}/payments`;

export const getPayments = async (): Promise<{
  payments: PaymentsParams[];
}> => {
  const response = await apiClient.get(`${API_URL}`);
  return response.data;
};

// Update an existing Payment (PUT request)
export const updatePayment = async (
  id: string,
  data: Partial<PaymentsParams>
) => {
  const response = await apiClient.put(`${API_URL}/${id}`, data);
  return response.data;
};

// Delete a payment (DELETE request)
export const deletePayment = async (id: string) => {
  const response = await apiClient.delete(`${API_URL}/${id}`);
  return response.data;
};

// Fetch a single Payment by ID (GET request)
export const getPaymentById = async (id: string) => {
  const response = await apiClient.get(`${API_URL}/${id}`);
  return response.data;
};
