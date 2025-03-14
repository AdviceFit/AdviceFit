"use server";

import { BASE_URL } from "@/constants/constant";
import { cookies } from "next/headers";

const API_URL = `${BASE_URL}/subscriptions`;

export const getSubscriptions = async (): Promise<{
  subscriptions: SubscriptionsParams[];
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

// Update an existing Subscription (PUT request)
export const updateSubscription = async (
  id: string,
  data: Partial<SubscriptionsParams>
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

// Delete a subscription (DELETE request)
export const deleteSubscription = async (id: string) => {
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

// Fetch a single Subscription by ID (GET request)
export const getSubscriptionById = async (id: string) => {
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
