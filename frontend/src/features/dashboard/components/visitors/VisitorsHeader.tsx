import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddAndEditVisitors from "./AddAndEditVisitors";

const VisitorsHeader = () => {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button className="w-28" variant="default">Add Visitor</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[765px] lg:h-3/4 h-5/6 overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Add Visitor</DialogTitle>
      </DialogHeader>
        <AddAndEditVisitors />
    </DialogContent>
  </Dialog>
  )
}

export default VisitorsHeader
