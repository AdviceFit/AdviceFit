import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddAndEditEmployee from "./AddAndEditEmployee";

const EmployeeHeader = () => {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="default">Add Employee</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[765px] lg:h-3/4 h-5/6 overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Add Employee</DialogTitle>
      </DialogHeader>
        <AddAndEditEmployee/>
    </DialogContent>
  </Dialog>
  )
}

export default EmployeeHeader
