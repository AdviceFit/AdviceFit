import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddAndEditCenters from "./AddAndEditCenters";

const CentersHeader = () => {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="default" className="w-28">Add Center</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[765px] lg:h-3/4 h-5/6 overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Add Center</DialogTitle>
      </DialogHeader>
        <AddAndEditCenters/>
    </DialogContent>
  </Dialog>
  )
}

export default CentersHeader
