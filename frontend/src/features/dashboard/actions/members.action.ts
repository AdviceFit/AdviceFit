"use server";

import { BASE_URL } from "@/constants/constant";
import { cookies } from "next/headers";

const API_URL = `${BASE_URL}/members`;

const addMembers = async (payload: unknown) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
  });

  if (!response.ok) {
    return { error: (await response.json())?.error ?? "Failed to add member" };
  }

  return response.json();
};

const editMember = async (id : string , payload: unknown) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
  });

  if (!response.ok) {
    return { error: (await response.json())?.error ?? "Failed to add member" };
  }

  return response.json();
};


const deleteMembers = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete member");
  }

  return response.json();
};

const getAllMembers = async () => {
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
  if (!res.ok) {
    throw new Error("Failed to fetch members");
  }

  return res.json();
};

export { deleteMembers, getAllMembers, addMembers , editMember };
