"use server";

import { BASE_URL } from "@/constants/constant";
import apiClient from "@/lib/axios";

const API_URL = `${BASE_URL}/center`;

export const getCenters = async (): Promise<CentersDataParams> => {
  const response = await apiClient.get(API_URL);
  return response.data;
};

export const createCenter = async (data: CenterParams) => {
  const response = await apiClient.post(API_URL, data);
  return response.data;
};

export const updateCenter = async (id: string, data: Partial<CenterParams>) => {
  const response = await apiClient.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteCenter = async (id: string) => {
  const response = await apiClient.delete(`${API_URL}/${id}`);
  return response.data;
};

export const getCenterById = async (id: string) => {
  const response = await apiClient.get(`${API_URL}/${id}`);
  return response.data;
};
