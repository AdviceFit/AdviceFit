"use server";

import { BASE_URL } from "@/constants/constant";
import apiClient from "@/lib/axios";

const API_URL = `${BASE_URL}/members`;

const addMembers = async (payload: unknown) => {
    const response = await apiClient.post(API_URL, payload);
    return response.data;
};

const editMember = async (id: string, payload: unknown) => {
  const response = await apiClient.patch(`${API_URL}/${id}`, payload);
  return response.data;
};

const deleteMembers = async (id: string) => {
  const response = await apiClient.delete(`${API_URL}/${id}`);
  return response.data;
};

const getAllMembers = async () => {
  const res = await apiClient.get(`${API_URL}`);
  return res.data;
};

export { deleteMembers, getAllMembers, addMembers, editMember };
