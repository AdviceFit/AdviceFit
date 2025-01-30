"use client"

import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  cn
} from "@/lib/utils"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"


import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Check,
  ChevronsUpDown
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  format
} from "date-fns"


import {
  Calendar as CalendarIcon
} from "lucide-react"
import { PhoneInput } from "@/components/ui/phone-input"
import { Calendar } from "@/components/ui/calendar"
import { DatePickerDemo } from "@/components/ui/DatePickerDemo"
import { SmartDatetimeInput } from "@/components/ui/smart-date-time-input"
import { getCenters } from "../../actions/centers.action"
import { useEffect, useState } from "react"
import LocationSelector from "@/components/ui/location-input"
import { useRouter } from "next/navigation"
import { createVisitor } from "../../actions/visitors.action"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  // mobile: z.number().refine((value) => /^\d{10}$/.test(value.toString()), {
  //     message: "Enter a valid 10-digit mobile number",
  // }),
  mobile: z.string().min(1).max(15),
  visiting_date: z.string().min(1, "Visiting date is required").optional(),
  // tentative_visiting_date: z.string().min(1, "Tentative Visiting date is required"),
  tentative_visiting_date: z.coerce.date().optional(),
  email: z.string().email("Enter a valid email address").optional(),
  visiting_center: z.string().min(1, "Center is required"),
  gender: z.enum(["Male", "Female", "Other"], { required_error: "Gender is required" }),
  source: z.string().optional(),
  occupation: z.string().optional(),
  // dob: z.string().optional(),
  dob: z.coerce.date().optional(),
  health_conditions: z.string().optional(),
  marital_status: z.enum(["Single", "Married"], { required_error: "Marital status is required" }),
  remarks: z.string().optional(),
  enquire_mode: z.enum(["Talking", "WalKing", "Any"], { required_error: "Select Atlist One Enquiry  Mode" }),
  address: z
    .object({
      addressLine1: z.string().optional(),
      addressLine2: z.string().optional(),
      state: z.string().optional(),
      city: z.string().optional(),
      pincode: z
        .string()
        .regex(/^\d{6}$/, "Pincode must be a valid 6-digit number").optional(),
    })
    .optional(),
});


export default function AddAndEditVisitors() {
  const [centers, setCenters] = useState<{ _id: string; name: string }[]>([]);
  const router = useRouter()
  const [countryName, setCountryName] = useState<string>('');
  const [stateName, setStateName] = useState<string>('');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "visiting_date": new Date().toISOString().slice(0, 10),
      "marital_status": "Single",
      "enquire_mode": "Talking",
      "gender": "Male",
      "visiting_center": "Gold's Gym",
      "source": "Banner",
      "occupation": "Student",
      "remarks": "Medium"

    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    try {
      const response = await createVisitor(values as VisitorParams);
      if (response.visitor) {
        toast.success("Visitor added successfully!");
        router.replace("/dashboard/visitors")
      } else {
        toast.error("Failed to submit the form. Please try again");
      }
    } catch (error) {
      toast.error("Failed to submit the form. Please try again.");
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

        <div className="grid grid-cols-12 gap-4">

          <div className="col-span-6">

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john Doe"

                      type="text"
                      {...field} />
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
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Mobile</FormLabel>
                  <FormControl className="w-full">

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
              name="visiting_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Visiting Date</FormLabel>
                  <DatePickerDemo />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">

            <FormField
              control={form.control}
              name="tentative_visiting_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tentative Visiting Date</FormLabel>
                  <FormControl>
                    <SmartDatetimeInput
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="YYYY-MM-DD"
                    />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john123@web.com"
                      type="email"
                      {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="visiting_center"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visiting Center</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" role="combobox" className={cn("w-full justify-between", !field.value && "text-muted-foreground")}>
                          {field.value ? centers.find((center) => center._id === field.value)?.name : "Select a center"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search centers..." />
                        <CommandList>
                          <CommandEmpty>No centers found.</CommandEmpty>
                          <CommandGroup>
                            {centers.map((center) => (
                              <CommandItem key={center._id} value={center.name} onSelect={() => form.setValue("visiting_center", center._id)}>
                                <Check className={cn("mr-2 h-4 w-4", center._id === field.value ? "opacity-100" : "opacity-0")} />
                                {center.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Male" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Male">Male </SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">

          <div className="col-span-6">

            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occupation</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Student" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        "Civil",
                        "Architect",
                        "Businessman",
                        "Student",
                        "Advocate",
                        "Engineer",
                        "Doctor",
                        "Teacher",
                        "Software Developer",
                        "Social Worker",
                        "Veterinarian",
                        "Web Developer",
                        "Accountant",
                        "Lawyer",
                        "Artist",
                        "Designer",
                        "Writer",
                        "Journalist",
                        "Consultant",
                        "Manager",
                        "Entrepreneur",
                        "Scientist",
                        "Researcher",
                        "Homemaker",
                        "Retired",
                        "Unemployed",
                        "Self-Employed",
                        "Government Employee",
                        "Private Sector Employee",
                        "Non-Profit Professional",
                        "Academician",
                        "Administrator",
                        "Analyst",
                        "Banker",
                        "Chef",
                        "Dentist",
                        "Economist",
                        "Editor",
                        "Environmental Specialist",
                        "Financial Advisor",
                        "Graphic Designer",
                        "Human Resources Specialist",
                        "Insurance Agent",
                        "Marketing Specialist",
                        "Mechanical Engineer",
                        "Nurse",
                        "Pharmacist",
                        "Physician",
                        "Professor",
                        "Psychologist",
                        "Real Estate Agent",
                        "Sales Representative",
                        "Other"
                      ].map((occ) => (
                        <SelectItem value={occ}>{occ}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">

            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Banner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["Walk-In", "Search Engine", "Social Media", "Referral", "Website", "Banner", "Ads", "Newspapers"].map(src => (
                        <SelectItem key={src} value={src}>{src}</SelectItem>
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

          <div className="col-span-4">

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
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

        </div>

        <div className="grid grid-cols-12 gap-4">

          <div className="col-span-4">

            <FormField
              control={form.control}
              name="marital_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marital Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Single" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["Single", "Married"].map(src => (
                        <SelectItem key={src} value={src}>{src}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-4">

            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Medium" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["High", "Medium", "Low"].map(src => (
                        <SelectItem key={src} value={src}>{src}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-4">

            <FormField
              control={form.control}
              name="enquire_mode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enquire Mode</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="WalKing" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["Talking", "WalKing", "Any"].map(src => (
                        <SelectItem key={src} value={src}>{src}</SelectItem>
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
                <Input
                  placeholder="123 Main St"

                  type="text"
                  {...field} />
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
                <Input
                  placeholder="Apt 101"

                  type="text"
                  {...field} />
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
                        setCountryName(country?.name || '');
                        form.setValue('address.state', country?.name || ''); // Set country directly as a string
                      }}
                      onStateChange={(state) => {
                        setStateName(state?.name || '');
                        form.setValue('address.city', state?.name || ''); // Set state separately
                      }}
                    />
                  </FormControl>
                  <FormDescription>If your country has states, it will appear after selecting the country.</FormDescription>
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
                    <Input
                      type="number"
                      placeholder="12345"
                      {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
          <div className="w-full flex ">
            <Button type="submit">Submit</Button>
          </div>
      </form>
    </Form>
  )
}