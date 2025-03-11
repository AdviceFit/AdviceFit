"use server";

import { BASE_URL } from "@/constants/constant";
import { cookies } from "next/headers";

const API_URL = `${BASE_URL}/reports`;

export const downloadReport = async (payload: Record<string, unknown>) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");

  const response = await fetch(API_URL + "/get-report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
    body: JSON.stringify(payload),
  });  

  if (!response.ok) {
    throw new Error(`Failed to download report: ${response.statusText}`);
  }

  const blob = await response.blob();
  return blob;
};
