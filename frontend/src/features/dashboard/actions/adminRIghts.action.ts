"use server";

import { cookies } from "next/headers";

export const updateAdminRights = async (adminRightsData: any) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken");

    console.log(adminRightsData);

    const response = await fetch("http://localhost:5000/admin-rights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      credentials: "include",
      body: JSON.stringify({ adminRightsData }),
    });

    if (!response.ok) {
      throw new Error("Failed to update admin rights");
    }

    return response.json();
  } catch (error) {
    console.error("Error updating admin rights:", error);
    throw error;
  }
};
