"use server";

import { BASE_URL } from "@/constants/constant";
import apiClient from "@/lib/axios";

export const updateAdminRights = async (adminRightsData: any) => {
    const response = await apiClient.post(`${BASE_URL}/admin-rights`, adminRightsData);
    return response.data;
};
