"use server";

import { BASE_URL } from "@/constants/constant";
import { cookies } from "next/headers";
import { LoginHistory } from "../components/loginHistory/History";

const API_URL = `${BASE_URL}/api/users`;

export const getLoginHistory = async (): Promise<{ history: LoginHistory}> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");

  const response = await fetch(API_URL + "/history", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to get login history");
  }

  return response.json();
};
