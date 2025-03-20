"use server";

import { BASE_URL } from "@/constants/constant";
import apiClient from "@/lib/axios";

const API_URL = `${BASE_URL}/packages`;

export const getPackages = async (
  centerId: string
): Promise<PackageDataParams> => {
  const url = API_URL + (centerId ? `?centerId=${centerId}` : "");
  const response = await apiClient.get(url);
  return response.data;
};

// Create a new Packages (POST request)
export const createPackage = async (data: PackageParams) => {
  const response = await apiClient.post(API_URL, data);
  return response.data;
};

// Update an existing Packages (PATCH request)
export const updatePackage = async (
  id: string,
  data: Partial<PackageParams>
) => {
  const response = await apiClient.patch(`${API_URL}/${id}`, data);
  return response.data;
};

// Delete a Packages (DELETE request)
export const deletePackage = async (id: string) => {
  const response = await apiClient.delete(`${API_URL}/${id}`);
  return response.data;
};
// Get a single Package by ID (GET request)
export const getPackageById = async (
  id: string
): Promise<PackageDataParams> => {
  const response = await apiClient.get(`${API_URL}/${id}`);
  return response.data;
};
