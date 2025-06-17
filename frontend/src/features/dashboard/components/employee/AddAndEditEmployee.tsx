"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { CalendarIcon } from "lucide-react";
import { DatePickerDemo } from "@/components/ui/DatePickerDemo";
import { SmartDatetimeInput } from "@/components/ui/smart-date-time-input";
import { useState, useEffect } from "react";
import LocationSelector from "@/components/ui/location-input";
import { useRouter,useSearchParams } from "next/navigation";
import { getCenters } from "../../actions/centers.action";
import { format } from "date-fns";
import { ChevronsUpDown, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "../../actions/employee.action";
import { PopoverContent } from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { log } from "console";

const formSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  mobile: z
    .string()
    .min(1)
    .max(15, "Mobile number must be between 1 and 15 characters"),
  email: z.string().email("Enter a valid email address"),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required",
  }),
  role: z.enum(
    ["Center Manager", "Reception", "Trainer", "Accountant", "Housekeeping"],
    { required_error: "Role is required" }
  ),
  center: z.string().min(1, "Center is required"),
  joining_date: z.coerce.date(),
  anniversary_date: z.coerce.date().optional(),
  description: z.string().optional(),
  employee_id_proof: z.string().optional(),
  dob: z.coerce.date(),
  address: z
    .object({
      addressLine1: z.string().optional(),
      addressLine2: z.string().optional(),
      state: z.string().optional(),
      city: z.string().optional(),
      pincode: z
        .string()
        .regex(/^\d{6}$/, "Pincode must be a valid 6-digit number")
        .optional(),
    })
    .optional(),
});

export default function AddAndEditEmployee({
  id,
  onClose,
}: {
  id?: string;
  onClose?: () => void;
}) {
  const [centers, setCenters] = useState<{ _id: string; name: string }[]>([]);
  const router = useRouter();
  const [countryName, setCountryName] = useState<string>("");
  const [stateName, setStateName] = useState<string>("");

  const searchParams = useSearchParams();
  
  const paramId = searchParams.get("id");
      const finalId = id || paramId;
    const action = searchParams.get("action"); // add/edi

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "Male",
      role: "Trainer",
      center: "",
      joining_date: new Date(),
    },
  });

  const formatEmployeeData = (data: any): z.infer<typeof formSchema> => ({
    _id: data._id || "",
    name: data.name || "",
    mobile: data.mobile || "",
    role: data.role as
      | "Center Manager"
      | "Reception"
      | "Trainer"
      | "Accountant"
      | "Housekeeping",
    center: typeof data.center === "string" ? data.center : data.center._id, // Handle center object
    joining_date: data.joining_date,
    dob: data.dob,
    anniversary_date: data.anniversary_date ?? "",
    email: data.email || "",
    gender: data.gender as "Male" | "Female" | "Other",
    description: data.description || "",
  });

 useEffect(() => {
  const fetchEmployeeDetails = async () => {
    if (!finalId) return;
    try {
      const data = await getEmployeeById(finalId);
      console.log("Fetched employee data:", data);
      if (data?.employee) {
        form.reset(formatEmployeeData(data.employee));
      } else {
        toast.error("Employee not found.");
      }
    } catch (error) {
      toast.error("Failed to fetch employee details.");
    }
  };

  fetchEmployeeDetails();
}, [finalId]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with values:", values);
    try {
      let response;
      if (id) {
        response = await updateEmployee(id, values as EmployeeParams);
        if (response.success) {
          toast.success("Employee updated successfully!");
        } else {
          toast.error("Failed to update employee.");
        }
      } else {
        response = await createEmployee(values as EmployeeParams);
        if (response.employee) {
          toast.success("Employee created successfully!");
        } else {
          toast.error("Failed to create employee.");
        }
      }
      router.replace("/dashboard/employees");
      onClose?.();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  }

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

  return (
    <>
    <Button className="w-24" variant="outline" onClick={() => router.back()}>
        ← Back
      </Button>
      <br />
    <h3 className="text-lg font-semibold">
      {action === "edit" || id ? "Update Employess" : "Add Employess"}
    </h3>
    
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full mx-auto py-4"
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="john Doe" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Mobile</FormLabel>
                  <FormControl>
                    <PhoneInput placeholder="1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john123@web.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Gender</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Male" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel required>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        isDOB={true}
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="center"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Center</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a center" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {centers.map((center) => (
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

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="anniversary_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Anniversary Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
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
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Role</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    {" "}
                    {/* Use value, not defaultValue */}
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        { value: "Center Manager", label: "Center Manager" },
                        { value: "Reception", label: "Reception" },
                        { value: "Trainer", label: "Trainer" },
                        { value: "Accountant", label: "Accountant" },
                        { value: "Housekeeping", label: "Housekeeping" },
                      ].map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
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
        <FormField
          control={form.control}
          name="address.addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 1</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address.addressLine2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 2</FormLabel>
              <FormControl>
                <Input placeholder="Apt 101" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <FormField
              control={form.control}
              name="address.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Country</FormLabel>
                  <FormControl>
                    <LocationSelector
                      onCountryChange={(country) => {
                        setCountryName(country?.name || "");
                        form.setValue("address.state", country?.name || ""); // Set country directly as a string
                      }}
                      onStateChange={(state) => {
                        setStateName(state?.name || "");
                        form.setValue("address.city", state?.name || ""); // Set state separately
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    If your country has states, it will appear after selecting
                    the country.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="address.pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pincode</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="12345" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" className="w-full sm:w-auto float-end">
          Submit
        </Button>
      </form>
    </Form>
    </>
  );
}
