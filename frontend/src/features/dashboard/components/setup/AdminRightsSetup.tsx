"use client";

import React, { useState, useEffect } from "react";
import { updateAdminRights } from "../../actions/adminRIghts.action";

interface Role {
  _id: string;
  name: string;
}

interface Right {
  _id: string;
  name: string;
  actions: string[];
}

interface SelectedRights {
  [roleName: string]: {
    [rightName: string]: string[];
  };
}

interface AdminRightsDataParams {
  roles: Role[];
  rights: Right[];
  selectedRights: SelectedRights;
}

interface AdminRightsSetupProps {
  adminRightsData: AdminRightsDataParams;
}

const AdminRightsSetup: React.FC<AdminRightsSetupProps> = ({
  adminRightsData,
}) => {
  const {
    roles,
    rights,
    selectedRights: initialSelectedRights,
  } = adminRightsData;

  const [selectedRights, setSelectedRights] = useState<SelectedRights>(
    JSON.parse(JSON.stringify(initialSelectedRights)) // Deep clone to prevent state mutation
  );

  const [updated, setUpdated] = useState(false);

  const handleCheckboxChange = (
    roleName: string,
    rightName: string,
    action: string
  ) => {
    setSelectedRights((prev) => {
      const updatedRights = JSON.parse(JSON.stringify(prev)); // Deep clone prev state

      // Ensure role structure exists
      if (!updatedRights[roleName]) updatedRights[roleName] = {};
      if (!updatedRights[roleName][rightName])
        updatedRights[roleName][rightName] = [];

      // Toggle action
      const actionIndex = updatedRights[roleName][rightName].indexOf(action);
      if (actionIndex > -1) {
        // If action exists, remove it
        updatedRights[roleName][rightName].splice(actionIndex, 1);
        if (updatedRights[roleName][rightName].length === 0) {
          delete updatedRights[roleName][rightName]; // Remove empty rights
        }
        if (Object.keys(updatedRights[roleName]).length === 0) {
          delete updatedRights[roleName]; // Remove empty roles
        }
      } else {
        // If action does not exist, add it
        updatedRights[roleName][rightName].push(action);
      }

      // console.log("Updated Selected Rights:", updatedRights);

      setUpdated(true);
      return updatedRights;
    });
  };

  useEffect(() => {
    if (updated) {
      updateAdminRights({ adminRightsData: selectedRights })
        .then(() => setUpdated(false))
        .catch((error) =>
          console.error("Failed to update admin rights:", error)
        );
    }
  }, [updated, selectedRights]);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">Admin Rights</h1>
      <div className="overflow-auto max-h-[calc(100vh-150px)]">
        <table className="bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="p-4 border-b text-left">Rights Name</th>
              {roles.map((role) => (
                <th key={role._id} className="p-4 border-b text-left">
                  {role.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rights.map((right) => (
              <tr key={right._id}>
                <td className="p-4 border-b">{right.name}</td>
                {roles.map((role) => (
                  <td key={role._id} className="p-4 border-b">
                    <div className="space-y-2">
                      {right.actions.map((action) => (
                        <div key={action} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={
                              selectedRights[role.name]?.[right.name]?.includes(
                                action
                              ) || false
                            }
                            onChange={() =>
                              handleCheckboxChange(
                                role.name,
                                right.name,
                                action
                              )
                            }
                          />
                          <label className="ml-2">{action}</label>
                        </div>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRightsSetup;
