"use client";

import { useState } from "react";
import { toast } from "sonner";
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
    DialogTrigger,
} from "@/components/ui/dialog";
import AddAndEditAttendance from "./AddAndEditAttendance";
import { deleteAttendance } from "../../actions/attendance.action";
import { useRouter } from "next/navigation";

const AttendanceActionDropdown =  ({ id }: { id: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
        const router = useRouter()
    

    const handleOpen = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent dropdown from closing
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };
  
    const handleDelete = async (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsDeleting(true);
      try {
        await deleteAttendance(id);
        toast.success("Attendance deleted successfully!");
        router.push("/dashboard/attendace");
      } catch (error) {
        toast.error("Failed to delete attendance.");
      } finally {
        setIsDeleting(false);
      }
    };
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">•••</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Button variant="ghost" onClick={handleOpen}>
                Edit Attendance
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button variant="ghost" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete Attendance"}
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
  
        {/* Edit Dialog */}
        <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[765px] lg:h-2/4 h-5/6 overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Attendance</DialogTitle>
            </DialogHeader>
            <AddAndEditAttendance id={id} onClose={handleClose} />
          </DialogContent>
        </Dialog>
      </DropdownMenu>
    );
  };
  
  export default AttendanceActionDropdown;
  

