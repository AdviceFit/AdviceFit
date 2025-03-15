"use server";

import { BASE_URL } from "@/constants/constant";
import apiClient from "@/lib/axios";

const API_URL = `${BASE_URL}/visitors`;

export const getVisitor = async (): Promise<VisitorsDataParams> => {
  const response = await apiClient.get(API_URL);
  return response.data;
};

// Create a new visitor (POST request)
export const createVisitor = async (data: VisitorParams) => {
  const response = await apiClient.post(API_URL, data);
  return response.data;
};

// Update an existing visitor (PUT request)
export const updateVisitor = async (
  id: string,
  data: Partial<VisitorParams>
) => {
  const response = await apiClient.put(`${API_URL}/${id}`, data);
  return response.data;
};

// Delete a visitor (DELETE request)
export const deleteVisitor = async (id: string) => {
  const response = await apiClient.delete(`${API_URL}/${id}`);
  return response.data;
};

// Fetch a single visitor by ID (GET request)
export const getVisitorById = async (id: string) => {
  const response = await apiClient.get(`${API_URL}/${id}`);
  return response.data;
};
