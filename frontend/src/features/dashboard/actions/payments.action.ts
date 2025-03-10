"use server";

import { BASE_URL } from "@/constants/constant";
import { cookies } from "next/headers";

const API_URL = `${BASE_URL}/payments`;

export const getPayments = async (): Promise<{
  payments: PaymentsParams[];
}> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");

  const res = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
    cache: "no-cache",
  });
  return res.json();
};

// Update an existing Payment (PUT request)
export const updatePayment = async (
  id: string,
  data: Partial<PaymentsParams>
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
    cache: "no-cache",
    body: JSON.stringify(data),
  });

  return res.json();
};

// Delete a payment (DELETE request)
export const deletePayment = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");

  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
    cache: "no-cache",
  });

  return res.json();
};

// Fetch a single Payment by ID (GET request)
export const getPaymentById = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");

  const res = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
    cache: "no-cache",
  });

  return res.json();
};
