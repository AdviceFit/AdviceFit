"use server";

import { BASE_URL } from "@/constants/constant";
import { cookies } from "next/headers";

const API_URL = `${BASE_URL}/templates`;

export const getTemplates = async (): Promise<{ templates : TemplateDataParams[]}> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken");
  
    const res = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token?.value}`,
      },
      cache: "no-cache",
    });
  
    return res.json();
};