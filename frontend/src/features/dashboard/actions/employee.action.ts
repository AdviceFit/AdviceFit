"use server";

import { BASE_URL } from "@/constants/constant";
import apiClient from "@/lib/axios";

const API_URL = `${BASE_URL}/employee`;

export const getEmployees = async (): Promise<EmployeesDataParams> => {
  const response = await apiClient.get(API_URL);
  return response.data;
};

// Create a new employee (POST request)
export const createEmployee = async (data: EmployeeParams) => {
  const response = await apiClient.post(API_URL, data);
  return response.data;
};

// Update an existing employee (PUT request)
export const updateEmployee = async (
  id: string,
  data: Partial<EmployeeParams>
) => {
  const response = await apiClient.put(`${API_URL}/${id}`, data);
  return response.data;
};

// Delete a employee (DELETE request)
export const deleteEmployee = async (id: string) => {
  const response = await apiClient.delete(`${API_URL}/${id}`);
  return response.data;
};

export const getEmployeeById = async (id: string) => {
  const response = await apiClient.get(`${API_URL}/${id}`);
  return response.data;
};
