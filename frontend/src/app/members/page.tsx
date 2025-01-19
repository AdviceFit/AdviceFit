"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/ui/header";
import Sidebar from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
        setTotalPages(data.totalPages || 1);
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
          <div className="flex flex-col ">
            <div className=" w-10/12 absolute " >
              <Button
                onClick={() => router.push("members/add-member")}
                className="float-right"
              >
                Add Member
              </Button>
            </div>
            <div className="flex flex-col mt-12 w-10/12 absolute">
              <div className="py-2">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>Member Code</TableHead>
                        <TableHead>Gym Name - Center</TableHead>
                        <TableHead>Joining Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {members.map((member) => (
                        <TableRow key={member._id}>
                          <TableCell>{member.name}</TableCell>
                          <TableCell>{member.mobile}</TableCell>
                          <TableCell>{member.gym_member_code || "N/A"}</TableCell>
                          <TableCell>{member.center}</TableCell>
                          <TableCell>
                            {new Date(member.joining_date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>•••
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleUpdate(member._id)}>
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDelete(member._id)}
                                  className="text-red-500"
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  Previous
                </Button>
                <div className="hidden md:flex items-center gap-x-3">
                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i}
                      variant='default'
                      size="sm"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                  Next
                </Button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default MemberRoute;
