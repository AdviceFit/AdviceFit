"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/ui/header";
import Sidebar from "@/components/ui/sidebar";
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
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Address } from "../members/add-member/page";

export interface Visitor {
  _id: string;
  name: string;
  mobile: number;
  visiting_date: string;
  tentative_visiting_date: string;
  email?: string;
  visiting_center: string;
  gender: string;
  source?: string;
  occupation?: string;
  dob?: string;
  health_conditions: string;
  marital_status?: string;
  remarks: string;
  enquire_mode: string;
  address?: Address;
}

const VisitorRoute: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await fetch("http://localhost:5000/visitors", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setVisitors(data.visitors);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchVisitors();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/visitors/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      });

      if (!response.ok) throw new Error("Failed to delete visitor");

      setVisitors((prev) => prev.filter((visitor) => visitor._id !== id));
      toast.success("Visitor Deleted Successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      toast.error("Failed to Delete the Visitor!");
    }
  };

  const handleUpdate = (id: string) => {
    router.push(`/visitors/update-visitor/${id}`);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="visitors-list p-6 overflow-y-auto w-full">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold">Visitors</h1>
            <Button onClick={() => router.push("/visitors/add-visitor")}>Add Visitor</Button>
          </div>
          {loading && <p className="text-center text-lg">Loading...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {!loading && !error && visitors.length === 0 && (
            <p className="text-center text-lg">No visitors found.</p>
          )}
          {!loading && !error && visitors.length > 0 && (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Visiting Center</TableHead>
                    <TableHead>Visiting Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visitors.map((visitor) => (
                    <TableRow key={visitor._id}>
                      <TableCell>{visitor.name}</TableCell>
                      <TableCell>{visitor.mobile}</TableCell>
                      <TableCell>{visitor.visiting_center}</TableCell>
                      <TableCell>
                        {new Date(visitor.visiting_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>•••
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleUpdate(visitor._id)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(visitor._id)}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitorRoute;
