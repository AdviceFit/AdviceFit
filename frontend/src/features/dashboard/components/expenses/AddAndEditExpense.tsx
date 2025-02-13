"use client"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getCenters } from "../../actions/centers.action";
import { toast } from "sonner";
import { createExpense, getExpenseById, updateExpense } from "../../actions/expenses.action";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// Form Schema Validation
const formSchema = z.object({
  expense_title: z.string().min(1, "Expense title is required"),
  amount: z.number().positive("Amount must be positive"),
  type_of_expense: z.enum([
    "Electric Bill",
    "Water Bill",
    "Internet Bill",
    "Medical Kit",
    "Cleaning Kit",
    "AC Service",
    "Rent",
    "Employee Salary",
    "Other",
  ]),
  center: z.string().min(1, "Center is required"),
  expense_date: z.date(),
  payment_mode: z.enum(["Cash", "Cheque", "Paytm", "Bank Transfer", "UPI", "Card"]),
  comment: z.string().optional(),
});

export default function AddAndEditExpense({ id, onClose }: { id?: string; onClose?: () => void }) {
  const [centers, setCenters] = useState<{ _id: string; name: string }[]>([]);
  const router = useRouter();

  // Format Data
  const formatExpenseData = (data: any): z.infer<typeof formSchema> => ({
    expense_title: data.expense_title || "",
    amount: data.amount || 0,
    type_of_expense: data.type_of_expense || "Other",
    center: data.center._id || "",
    expense_date: data.expense_date || new Date(),
    payment_mode: data.payment_mode || "Cash",
    comment: data.comment || "",
  });

  // Fetch Centers for Dropdown
  useEffect(() => {
    async function fetchCenters() {
      try {
        const data = await getCenters();
        setCenters(data?.centers || []);
      } catch (error) {
        toast.error("Failed to load centers.");
      }
    }
    fetchCenters();
  }, []);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (!id) return;
      try {
        const data = await getExpenseById(id);
        form.reset(formatExpenseData(data.expense));
      } catch (error) {
        toast.error("Failed to fetch session details.");
      }
    };

    fetchSessionDetails();
  }, [id]);


  // Form Setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expense_title: "",
      amount: 0,
      type_of_expense: "Other",
      center: "",
      expense_date: new Date(),
      payment_mode: "Cash",
      comment: "",
    },
  });

  // Handle Submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const payload = {
        ...values,
        center: {
          _id: values.center,
          name: "",
          centerCode: "",
        },
      };
      let response;
      if (id) {
        response = await updateExpense(id, payload);
        response.expense ? toast.success("Expense updated successfully!") : toast.error("Failed to update expense.");
      } else {
        response = await createExpense(payload);
        response.expense ? toast.success("Expense created successfully!") : toast.error("Failed to create expense.");
      }
      router.replace("/dashboard/expenses");
      onClose?.();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
  
      <div className="grid grid-cols-12 gap-4">
        
        {/* Expense Title */}
        <div className="col-span-6">
          <FormField
            control={form.control}
            name="expense_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expense Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter expense title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
  
        {/* Amount */}
        <div className="col-span-6">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))} // Ensure number type
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
  
      </div>
  
      <div className="grid grid-cols-12 gap-4">
        
        {/* Type of Expense */}
        <div className="col-span-6">
          <FormField
            control={form.control}
            name="type_of_expense"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type of Expense</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      "Electric Bill", "Water Bill", "Internet Bill",
                      "Medical Kit", "Cleaning Kit", "AC Service",
                      "Rent", "Employee Salary", "Other"
                    ].map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
  
        {/* Expense Date */}
        <div className="col-span-6">
          <FormField
            control={form.control}
            name="expense_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Expense Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
  
      </div>
  
      <div className="grid grid-cols-12 gap-4">
        
        {/* Payment Mode */}
        <div className="col-span-6">
          <FormField
            control={form.control}
            name="payment_mode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Mode</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment mode" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["Cash", "Cheque", "Paytm", "Bank Transfer", "UPI", "Card"].map((mode) => (
                      <SelectItem key={mode} value={mode}>
                        {mode}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
  
        {/* Center */}
        <div className="col-span-6">
          <FormField
            control={form.control}
            name="center"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Center</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a center" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {centers.map(center => (
                      <SelectItem key={center._id} value={center._id}>
                        {center.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
  
      </div>
  
      {/* Comment */}
      <FormField
        control={form.control}
        name="comment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Comment</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter any additional comments..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
  
      <div className="w-full flex">
        <Button type="submit">Submit</Button>
      </div>
  
    </form>
  </Form>
  
  );
}
