// sessions.action.ts
"use server";
import { BASE_URL } from "@/constants/constant";
import apiClient from "@/lib/axios";

const API_URL = `${BASE_URL}/sessions`;

export const getSessions = async (): Promise<SessionDataParams> => {
  const response = await apiClient.get(`${API_URL}`);
  return response.data;
};

export const createSession = async (data: SessionParams) => {
  const response = await apiClient.post(API_URL, data);
  return response.data;
};

export const updateSession = async (
  id: string,
  data: Partial<SessionParams>
) => {
  const response = await apiClient.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteSession = async (id: string) => {
  const response = await apiClient.delete(`${API_URL}/${id}`);
  return response.data;
};

export const getSessionById = async (
  id: string
): Promise<SessionDataParams> => {
  const response = await apiClient.get(`${API_URL}/${id}`);
  return response.data;
};
