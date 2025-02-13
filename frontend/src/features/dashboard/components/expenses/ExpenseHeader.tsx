import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddAndEditExpense from "./AddAndEditExpense";

const ExpenseHeader = () => {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="default">Add Expense</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[765px] lg:h-3/4 h-5/6 overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Add Expense</DialogTitle>
      </DialogHeader>
        <AddAndEditExpense/>
    </DialogContent>
  </Dialog>
  )
}

export default ExpenseHeader
