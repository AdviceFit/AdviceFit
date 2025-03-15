"use server";

import { BASE_URL } from "@/constants/constant";
import { LoginHistory } from "../components/loginHistory/History";
import apiClient from "@/lib/axios";

const API_URL = `${BASE_URL}/api/users`;

export const getLoginHistory = async (): Promise<{ history: LoginHistory}> => {
  const response = await apiClient.get(`${API_URL}/history`);
  return response.data;
};
