"use server";

import { BASE_URL } from "@/constants/constant";
import apiClient from "@/lib/axios";

const API_URL = `${BASE_URL}/templates`;

export const getTemplates = async (): Promise<{
  templates: TemplateDataParams[];
}> => {
  const response = await apiClient.get(`${API_URL}`);
  return response.data;
};
