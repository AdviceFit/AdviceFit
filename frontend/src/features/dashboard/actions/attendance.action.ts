"use server";

import { BASE_URL } from "@/constants/constant";
import apiClient from "@/lib/axios";

const API_URL = `${BASE_URL}/attendance`;

export const createAttendance = async (data: {
  member: string;
  time_in: string;
  time_out: string;
}) => {
  const response = await apiClient.post(API_URL, data);
  return response.data;
};

export const updateAttendance = async (
  id: string,
  data: Partial<{ member: string; time_in: string; time_out: string }>
) => {
  const response = await apiClient.patch(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteAttendance = async (id: string) => {
  const response = await apiClient.delete(`${API_URL}/${id}`);
  return response.data;
};

export const getAttendanceById = async (id: string) => {
  const response = await apiClient.get(`${API_URL}/${id}`);
  return response.data;
};
