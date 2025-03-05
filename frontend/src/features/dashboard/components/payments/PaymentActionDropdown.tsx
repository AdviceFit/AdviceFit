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
import { toast } from "sonner";
import { deleteSubscription } from "../../actions/subscriptions.action";

const PaymentActionDropdown = ({ id }: { id: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    setIsDeleting(true);
    try {
      await deleteSubscription(id);
      toast.success("Subscription deleted successfully!");
      router.push("/dashboard/subscriptions");
    } catch (error) {
      toast.error("Failed to delete subscription.");
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
              onClick={handleDelete}
              // disabled={isDeleting}
              disabled
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PaymentActionDropdown;
