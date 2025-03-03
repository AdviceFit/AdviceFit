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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import EditSubscription from "./EditSubscription";
import { deleteSubscription } from "../../actions/subscriptions.action";

const SubscriptionActionDropdown = ({ id }: { id: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent) => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

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
            <Button variant="ghost" onClick={handleOpen}>
              Edit
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              variant="ghost"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>

      {/* Controlled Dialog Component */}
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[765px] lg:h-3/4 h-5/6 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Subscription</DialogTitle>
          </DialogHeader>
          <EditSubscription id={id} onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  );
};

export default SubscriptionActionDropdown;
