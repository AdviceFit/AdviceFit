"use server";

import { BASE_URL } from "@/constants/constant";
import apiClient from "@/lib/axios";

const API_URL = `${BASE_URL}/order`;

export const intializeOrder = async (
  payload: Record<string, string | number>
): Promise<any> => {
  const url = API_URL + "/initialize";
  const response = await apiClient.post(url, payload);
  return response.data;
};

export const verifyOrder = async (payload: Record<string, string>): Promise<any> => {
  const url = API_URL + "/verify-payment";
  const response = await apiClient.post(url, payload);
  return response.data;
};