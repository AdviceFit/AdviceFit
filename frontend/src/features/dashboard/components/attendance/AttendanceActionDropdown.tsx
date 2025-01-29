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
import { deleteAttendance } from "../../actions/attendence.action";

const AttendanceActionDropdown = ({ id, onDeleteSuccess }: { id: string; onDeleteSuccess: (id: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
  
    const handleDelete = async (e: React.MouseEvent) => {
      e.stopPropagation();
  
      setIsDeleting(true);
      try {
        await deleteAttendance(id);
        toast.success("Attendance deleted successfully!");
        // Remove from state
        onDeleteSuccess(id);
        setIsOpen(false)
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
              <Button variant="ghost" onClick={() => setIsOpen(true)}>
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
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[765px] lg:h-3/4 h-5/6 overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Attendance</DialogTitle>
            </DialogHeader>
            <AddAndEditAttendance />
          </DialogContent>
        </Dialog>
      </DropdownMenu>
    );
  };
  
  export default AttendanceActionDropdown;
  

