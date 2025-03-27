"use server";

import { BASE_URL } from "@/constants/constant";
import apiClient from "@/lib/axios";

const API_URL = `${BASE_URL}/subscriptions`;

export const getSubscriptions = async (): Promise<{
  subscriptions: SubscriptionsParams[];
}> => {
  const response = await apiClient.get(`${API_URL}`);
  return response.data;
};

// Update an existing Subscription (PUT request)
export const updateSubscription = async (
  id: string,
  data: Partial<SubscriptionsParams>
) => {
  const response = await apiClient.put(`${API_URL}/${id}`, data);
  return response.data;
};

// Delete a subscription (DELETE request)
export const deleteSubscription = async (id: string) => {
  const response = await apiClient.delete(`${API_URL}/${id}`);
  return response.data;
};

// Fetch a single Subscription by ID (GET request)
export const getSubscriptionById = async (id: string, options?: { searchByMemberId?: boolean }) => { // set searchByMemberId option as we need to get data direct from id insted of member id
  const response = await apiClient.get(`${API_URL}/${id}`, {
    params: options?.searchByMemberId ? { searchByMemberId: true } : {},
  });  
  return response.data;
};
