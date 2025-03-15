import AdminRightsSetup from "../components/setup/AdminRightsSetup";
import { BASE_URL } from "@/constants/constant";
import apiClient from "@/lib/axios";

async function fetchAdminRightsData() {
  try {

    // Fetch Roles, Rights, and Existing Admin Rights
    const [rolesResponse, rightsResponse, adminRightsResponse] =
      await Promise.all([
        apiClient.get(`${BASE_URL}/api/users/roles`),
        apiClient.get(`${BASE_URL}/api/users/rights`),
        apiClient.get(`${BASE_URL}/admin-rights`),
      ]);

    const roles = await rolesResponse.data;
    const rights = await rightsResponse.data;
    const adminRights = await adminRightsResponse.data;

    // Exclude "Admin" and "Member" roles
    const filteredRoles = roles.filter(
      (role: { name: string; }) => role.name !== "Admin" && role.name !== "Member"
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
