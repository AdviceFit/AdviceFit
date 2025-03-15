"use server";
import { BASE_URL } from "@/constants/constant";
import apiClient from "@/lib/axios";

const API_URL = `${BASE_URL}/expenses`;

export const getExpenses = async (): Promise<ExpenseDataParams> => {
  const response = await apiClient.get(API_URL);
  return response.data;
};

export const createExpense = async (data: ExpenseParams) => {
  const response = await apiClient.post(API_URL, data);
  return response.data;
};

export const updateExpense = async (
  id: string,
  data: Partial<ExpenseParams>
) => {
  const response = await apiClient.patch(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteExpense = async (id: string) => {
  const response = await apiClient.delete(`${API_URL}/${id}`);
  return response.data;
};

export const getExpenseById = async (
  id: string
): Promise<ExpenseDataParams> => {
  const response = await apiClient.get(`${API_URL}/${id}`);
  return response.data;
};
