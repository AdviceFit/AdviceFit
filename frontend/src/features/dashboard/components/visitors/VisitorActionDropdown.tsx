"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';
import { deleteVisitor } from '../../actions/visitors.action';
import { toast } from 'sonner';

const VisitorActionDropdown = ({ id }: { id: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteVisitor(id);
      toast.success("Visitor deleted successfully!");
      router.push("/dashboard/visitors");
    } catch (error) {
      toast.error("Failed to delete visitor.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="text-center">
        <Button variant="ghost">•••</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Button
              variant="ghost"
              onClick={() => router.push(`/dashboard/update-visitor?action=edit&id=${id}`)}
            >
              Edit Visitor
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button variant="ghost" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete Visitor"}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default VisitorActionDropdown;
