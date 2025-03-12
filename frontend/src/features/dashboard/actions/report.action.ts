"use server";

import { BASE_URL } from "@/constants/constant";
import { cookies } from "next/headers";

const API_URL = `${BASE_URL}/reports`;

export const getReport = async (
  payload: Record<string, string | Record<string, Date>>
): Promise<any> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");

  const res = await fetch(API_URL + "/get-report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
    body: JSON.stringify(payload),
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch reports");
  }

  return res.json();
};


export const getInvoice = async () => { 
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");

  const res = await fetch(API_URL + "/get-invoice", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch reports");
  }

  return res.blob();
}