import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddAndEditAttendance from "./AddAndEditAttendance";

const AttendanceHeader = () => {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="default">Add Attendance</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[765px] lg:h-3/4 h-5/6 overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Add Attendance</DialogTitle>
      </DialogHeader>
        <AddAndEditAttendance/>
    </DialogContent>
  </Dialog>
  )
}

export default AttendanceHeader
