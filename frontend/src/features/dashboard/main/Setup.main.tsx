import { cookies } from "next/headers";
import AdminRightsSetup from "../components/setup/AdminRightsSetup";
import { BASE_URL } from "@/constants/constant";

async function fetchAdminRightsData() {
  try {
    // Get auth token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken");

    // Fetch Roles, Rights, and Existing Admin Rights
    const [rolesResponse, rightsResponse, adminRightsResponse] =
      await Promise.all([
        fetch(`${BASE_URL}/api/users/roles`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.value}`,
          },
          cache: "no-cache",
          credentials: "include",
        }),
        fetch(`${BASE_URL}/api/users/rights`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.value}`,
          },
          cache: "no-cache",
          credentials: "include",
        }),
        fetch(`${BASE_URL}/admin-rights`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.value}`,
          },
          cache: "no-cache",
          credentials: "include",
        }),
      ]);

    if (!rolesResponse.ok || !rightsResponse.ok || !adminRightsResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    const roles = await rolesResponse.json();
    const rights = await rightsResponse.json();
    const adminRights = await adminRightsResponse.json();

    // Exclude "Admin" and "Member" roles
    const filteredRoles = roles.filter(
      (role) => role.name !== "Admin" && role.name !== "Member"
    );

    return {
      roles: filteredRoles,
      rights,
      selectedRights: adminRights.adminRightsData ?? {},
    };
  } catch (error) {
    console.error("Error fetching admin rights:", error);
    return { roles: [], rights: [], selectedRights: {} };
  }
}

export default async function SetupMain() {
  const adminRightsData = await fetchAdminRightsData();
  if (
    !adminRightsData ||
    Object.keys(adminRightsData.selectedRights).length === 0
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full w-full">
      <AdminRightsSetup adminRightsData={adminRightsData} />
    </div>
  );
}
