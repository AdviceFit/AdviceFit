"use server"

import { BASE_URL } from "@/constants/constant";
import apiClient from "@/lib/axios";

const URL = `${BASE_URL}/api/users`;

export const getUserInfo = async () => {    
    const response = await apiClient.get(`${URL+ '/me'}`);    
    return response.data
}
