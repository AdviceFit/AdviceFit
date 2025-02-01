import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddAndEditPackage from "./AddAndEditPackage";

const PackageHeader = () => {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="default">Add Package</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[765px] lg:h-3/4 h-5/6 overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Add Package</DialogTitle>
      </DialogHeader>
        <AddAndEditPackage/>
    </DialogContent>
  </Dialog>
  )
}

export default PackageHeader
