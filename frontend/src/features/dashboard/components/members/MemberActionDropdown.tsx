"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { deleteMembers } from "../../actions/members.action";
import { toast } from "sonner";

const MemberActionDropdown = ({ id }: { id: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteMember = async () => {
    setIsDeleting(true);
    try {
      await deleteMembers(id);
      toast.success("Member deleted successfully!");
      //for re-render page
      router.push("/dashboard/members");

    } catch (error) {
      toast.error("Failed to delete member.");
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
            <Button variant="ghost"
              onClick={() => router.push(`/dashboard/update-member?action=edit&id=${id}`)}>
              Edit Member
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              variant="ghost"
              onClick={handleDeleteMember}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Member"}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MemberActionDropdown;
