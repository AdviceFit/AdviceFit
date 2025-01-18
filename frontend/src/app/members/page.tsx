"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/ui/header";
import Sidebar from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

interface Member {
  _id: string;
  name: string;
  mobile: number;
  gym_member_code: string;
  joining_date: string;
  email: string;
  center: string;
  gender: string;
  source: string;
  occupation: string;
  dob: string;
  health_conditions: string;
  marital_status: string;
}

const MemberRoute: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authentication token is missing");
        }
        const response = await fetch("http://localhost:5000/members", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }); if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMembers(data.members);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Handle delete member
  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(`http://localhost:5000/members/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete member");
      }

      // Remove deleted member from state
      setMembers((prevMembers) => prevMembers.filter((member) => member._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  // Handle update member (Dummy example for now)
  const handleUpdate = async (id: string) => {
    router.push(`/members/update-member/${id}`);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="members-list p-6 overflow-y-auto">
          {loading && <p className="text-center text-lg">Loading...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {!loading && !error && members.length === 0 && (
            <p className="text-center text-lg">No members found.</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {!loading &&
              !error &&
              members.map((member) => (
                <div
                  key={member._id}
                  className="member-card border border-gray-300 rounded-lg shadow-md p-4 bg-white hover:bg-gray-50 transition duration-200 ease-in-out"
                >
                  <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
                  <p>
                    <strong>Mobile:</strong> {member.mobile}
                  </p>
                  <p>
                    <strong>Gym Member Code:</strong> {member.gym_member_code}
                  </p>
                  <p>
                    <strong>Joining Date:</strong>{" "}
                    {new Date(member.joining_date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Email:</strong> {member.email}
                  </p>
                  <p>
                    <strong>Center:</strong> {member.center}
                  </p>
                  <p>
                    <strong>Gender:</strong> {member.gender}
                  </p>
                  <p>
                    <strong>Source:</strong> {member.source}
                  </p>
                  <p>
                    <strong>Occupation:</strong> {member.occupation}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong>{" "}
                    {new Date(member.dob).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Health Conditions:</strong> {member.health_conditions}
                  </p>
                  <p>
                    <strong>Marital Status:</strong> {member.marital_status}
                  </p>
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => router.push("members/add-member")}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Add Member
                    </button>
                    <button
                      onClick={() => handleUpdate(member._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => handleDelete(member._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberRoute;
