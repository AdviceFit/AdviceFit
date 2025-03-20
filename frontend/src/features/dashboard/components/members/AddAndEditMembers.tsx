"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
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
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import LocationSelector from "@/components/ui/location-input";
import {
  addMembers,
  editMember,
  getAllMembers,
} from "../../actions/members.action";
import {
  MEMBERS_SOURCES,
  OCCUPATIONS,
  PAYMENT_METHODS,
  TOAST_MESSAGES,
} from "@/constants/constant";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getPackages } from "../../actions/packages.action";

const AddAndEditMembers = ({
  setOpenState,
  centers = [],
  columnData,
  setMemberState,
}: {
  setOpenState: Dispatch<SetStateAction<boolean>>;
  centers: CenterParams[];
  columnData?: Record<string, any>;
  setMemberState?: any;
}) => {
  const [stateName, setStateName] = useState<string>("");
  const [packages, setPackages] = useState<PackageParams[] | null>(null);
  const [showSubscription, setShowSubscription] = useState(false);
  const [loader, setLoader] = useState(false);

  const defaultValues = {
    joining_date: columnData?.joining_date
      ? new Date(columnData.joining_date.toString())
      : new Date(),
    dob: columnData?.dob ? new Date(columnData.dob.toString()) : new Date(),
    marital_status: columnData?.marital_status || "",
    gender: columnData?.gender || "",
    name: columnData?.name || "",
    mobile: columnData?.mobile || "",
    gym_member_code: columnData?.gym_member_code || "",
    email: columnData?.email || "",
    center: columnData?.center?._id || "",
    source: columnData?.source || "",
    occupation: columnData?.occupation || "",
    health_conditions: columnData?.health_conditions || "",
    addressLine1: columnData?.address?.addressLine1 || "",
    addressLine2: columnData?.address?.addressLine2 || "",
    address: [columnData?.address?.country, columnData?.address?.state] as any,
    city: columnData?.address?.city || "",
    pincode: columnData?.address?.pincode || "",
    package: columnData?.subscriptionDetails?.package || "",
    promoCoupon: columnData?.subscriptionDetails?.promoCoupon || "",
    offerAmount: columnData?.subscriptionDetails?.offerAmount,
    paymentDate: columnData?.subscriptionDetails?.paymentDate
      ? new Date(columnData?.subscriptionDetails?.paymentDate?.toString())
      : new Date(),
    startDate: columnData?.subscriptionDetails?.startDate || new Date(),
    paidAmount: columnData?.subscriptionDetails?.paidAmount,
    paymentMode: columnData?.subscriptionDetails?.paymentMode || "",
    paymentDueDate:
      columnData?.subscriptionDetails?.paymentDueDate || new Date(),
    comments: columnData?.subscriptionDetails?.comments || "",
    subscription : !showSubscription ? {
      package: columnData?.subscriptionDetails?.package || "",
      promoCoupon: columnData?.subscriptionDetails?.promoCoupon || "",
      offerAmount: columnData?.subscriptionDetails?.offerAmount,
      paymentDate: columnData?.subscriptionDetails?.paymentDate
        ? new Date(columnData?.subscriptionDetails?.paymentDate?.toString())
        : new Date(),
      startDate: columnData?.subscriptionDetails?.startDate || new Date(),
      paidAmount: columnData?.subscriptionDetails?.paidAmount,
      paymentMode: columnData?.subscriptionDetails?.paymentMode || "",
      paymentDueDate:
        columnData?.subscriptionDetails?.paymentDueDate || new Date(),
      comments: columnData?.subscriptionDetails?.comments || "",
    } : undefined
  };

  const formSchema = z.object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" })
      .max(50, { message: "Name must be at most 50 characters" }),
    mobile: z.coerce
      .number()
      .refine((value) => /^\d{10}$/.test(value.toString()), {
        message: "Mobile number must be 10 digits",
      }),
    gym_member_code: z.string().optional(),
    joining_date: z.coerce.date({ required_error: "Joining date is required" }),
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .refine((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), {
        message: "Invalid email format",
      }),
    center: z.string().nonempty({ message: "Center is required" }),
    source: z.string().optional(),
    occupation: z.string().optional(),
    dob: z.coerce.date({ required_error: "Date of birth is required" }),
    health_conditions: z
      .string()
      .min(2, { message: "Health condition must be at least 2 characters" })
      .max(50, { message: "Health condition must be at most 50 characters" }),
    addressLine1: z
      .string()
      .nonempty({ message: "Address Line 1 is required" }),
    addressLine2: z.string().optional(),
    address: z.tuple([
      z.string().nonempty({ message: "First value is required" }),
      z.string().optional(),
    ]),
    city: z.string().nonempty({ message: "City is required" }),
    pincode: z.coerce.number({ required_error: "Pincode is required" }),
    gender: z.enum(["Male", "Female", "Other"], {
      message: "Gender must be Male, Female, or Other",
    }),
    marital_status: z.enum(["Single", "Married", "Divorced", "Widowed"], {
      message: "Marital Status must be Single, Married, or Divorce , Widowed",
    }),
    subscription: !showSubscription
      ? z.undefined()
      : z.object({
          package: z.string().nonempty({ message: "Package is required" }),
          promoCoupon: z.string().optional(),
          offerAmount: z.coerce
            .number()
            .min(0, { message: "Offer Amount must be positive" }),
          paymentDate: z.coerce.date().optional(),
          startDate: z.coerce.date().optional(),
          paidAmount: z.coerce
            .number()
            .min(0, { message: "Paid Amount must be positive" }),
          paymentMode: z.enum(
            ["Cash", "Card", "Cheque", "Paytm", "Bank Transfer", "UPI"],
            {
              message: "Marital Status must be valid  method",
            }
          ),
          paymentDueDate: z.coerce.date().optional(),
          comments: z.string().optional(),
        }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const packagesHandle = async (centerId: string) => {
    const response = await getPackages(centerId);
    if (response?.packages) {
      setPackages(response.packages);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoader(true);
      const formattedPayload = {
        ...values,
        address: {
          addressLine1: values.addressLine1 || "",
          addressLine2: values.addressLine2 || "",
          country: values.address[0],
          state: values.address[1],
          city: values.city || "",
          pincode: values.pincode || "",
        },
      };

      if (columnData) {
        const response = await editMember(columnData._id, formattedPayload);
        if (response.error) {
          toast.error(response.error);
          return;
        }
        toast.success(TOAST_MESSAGES.memberUpdated);
      } else {
        const response = await addMembers(formattedPayload);
        console.log(response);
        if (response?.error) {
          toast.error(response.error);
          return;
        }
        toast.success(TOAST_MESSAGES.memberAdded);
      }
      const { members } = await getAllMembers();
      setMemberState((prev: any) => ({ ...prev, members }));
      setOpenState(false);
    } finally {
      setLoader(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full mx-auto pt-4 pb-4"
      >
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 py-1 items-start">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John doe" type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile</FormLabel>
                <FormControl>
                  <Input placeholder="0000000000" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 items-start py-1">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    {...field}
                    onValueChange={(value) => field.onChange(value)}
                    defaultValue="Male"
                    className="flex flex-row gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Male" id="r1" />
                      <Label htmlFor="r1">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Female" id="r2" />
                      <Label htmlFor="r2">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Other" id="r3" />
                      <Label htmlFor="r3">Other</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="marital_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marital Status</FormLabel>
                <FormControl>
                  <RadioGroup
                    {...field}
                    onValueChange={(value) => field.onChange(value)}
                    defaultValue="Single"
                    className="flex flex-row gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Single" id="marital_status_r1" />
                      <Label htmlFor="marital_status_r1">Single</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Married" id="marital_status_r2" />
                      <Label htmlFor="marital_status_r2">Married</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Divorced" id="marital_status_r3" />
                      <Label htmlFor="marital_status_r3">Divorced</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Widowed" id="marital_status_r4" />
                      <Label htmlFor="marital_status_r4">Widowed</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 items-start py-1">
          <div>
            <FormField
              control={form.control}
              name="gym_member_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gym member code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="GYM Member Code .."
                      type="text"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="joining_date"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Joining Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            " pl-3 text-left font-normal",
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
                      {/* <DatePicker selected={field.value} setSelected={field.onChange} /> */}
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 items-start py-1">
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="center"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Center</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? centers
                                .map((c) => ({ label: c.name, value: c._id }))
                                .find((center) => center.value === field.value)
                                ?.label
                            : "Select Center"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Search center..." />
                        <CommandList>
                          <CommandEmpty>No Center found.</CommandEmpty>
                          <CommandGroup>
                            {centers &&
                              centers
                                .map((c) => ({ label: c.name, value: c._id }))
                                .map((center) => (
                                  <CommandItem
                                    value={center.label}
                                    key={center.value}
                                    onSelect={() => {
                                      field.onChange(center.value);
                                      form.setValue("center", center.value);
                                      packagesHandle(center.value);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        center.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {center.label}
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

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 items-start py-1">
          <div>
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Source</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? MEMBERS_SOURCES.find(
                                (source) => source.value === field.value
                              )?.label
                            : "Select language"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Search Member..." />
                        <CommandList>
                          <CommandEmpty>No Members found.</CommandEmpty>
                          <CommandGroup>
                            {MEMBERS_SOURCES.map((source, idx) => (
                              <CommandItem
                                value={source.label}
                                key={idx + 1}
                                onSelect={() => {
                                  form.setValue("source", source.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    source.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {source.label}
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

          <div>
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Occupation</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? OCCUPATIONS.find(
                                (occupation) => occupation.value === field.value
                              )?.label
                            : "Select language"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Search Occupation..." />
                        <CommandList>
                          <CommandEmpty>No Occupation found.</CommandEmpty>
                          <CommandGroup>
                            {OCCUPATIONS.map((occupation, idx) => (
                              <CommandItem
                                value={occupation.label}
                                key={idx + 1}
                                onSelect={() => {
                                  form.setValue("occupation", occupation.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    occupation.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {occupation.label}
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

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 items-start py-1">
          <div>
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
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
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="health_conditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Health condition</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your health condition"
                      type="text"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* <FormField
          control={form.control}
          name="member_id_proof"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Member ID proof</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? languages.find(
                            (language) => language.value === field.value
                          )?.label
                        : "Select language"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {languages.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue("member_id_proof", language.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                language.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {language.label}
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
        /> */}

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 items-start py-1">
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address line 1</FormLabel>
                <FormControl>
                  <Input placeholder="Address line 1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="addressLine2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address line 2</FormLabel>
                <FormControl>
                  <Input placeholder="Address line 2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Country</FormLabel>
              <FormControl>
                <LocationSelector
                  formState={form.formState.isSubmitted}
                  value={field.value}
                  onCountryChange={(country) => {
                    field.onChange([country?.name || "", stateName || ""]);
                    form.setValue(field.name, [
                      country?.name || "",
                      stateName || "",
                    ]);
                  }}
                  onStateChange={(state) => {
                    setStateName(state?.name || "");
                    form.setValue(field.name, [
                      form.getValues(field.name)[0] || "",
                      state?.name || "",
                    ]);
                  }}
                />
              </FormControl>
              <FormDescription>
                If your country has states, it will be appear after selecting
                country
              </FormDescription>
            </FormItem>
          )}
        />

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 items-start py-1">
          <div>
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Delhi" type="" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pincode</FormLabel>
                  <FormControl>
                    <Input placeholder="000000" type="number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {!columnData && (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="subscription"
              checked={showSubscription}
              onChange={(e) => setShowSubscription(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="subscription" className="text-sm font-medium">
              Add Subscription Details
            </label>
          </div>
        )}
        {showSubscription && (
          <>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 items-start py-1">
              <div>
                <FormField
                  control={form.control}
                  name="subscription.package"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel className="mt-[6px]">Package</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? (packages ?? [])
                                    .map((c) => ({
                                      label: c.packageName,
                                      value: c._id,
                                    }))
                                    .find(
                                      (packageData) =>
                                        packageData.value === field.value
                                    )?.label
                                : "Select Package"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Command>
                            <CommandInput placeholder="Search package..." />
                            <CommandList>
                              <CommandEmpty>No packages found.</CommandEmpty>
                              <CommandGroup>
                                {packages &&
                                  packages
                                    .map((c) => ({
                                      label: c.packageName,
                                      value: c._id,
                                    }))
                                    .map((packageData) => (
                                      <CommandItem
                                        value={packageData.label}
                                        key={packageData.value}
                                        onSelect={() => {
                                          field.onChange(packageData.value);
                                          form.setValue(
                                            "subscription.package",
                                            packageData.value
                                          );
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            packageData.value === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {packageData.label}
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

              <div>
                <FormField
                  control={form.control}
                  name="subscription.promoCoupon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Promo / Coupon</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Promo / Coupon"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 items-start py-1">
              <div>
                <FormField
                  control={form.control}
                  name="subscription.offerAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Offer Amount</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Offer Amount"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="subscription.paymentDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Payment Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
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
                            selected={new Date(field.value?.toString() ?? "")}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 items-start py-1">
              <div>
                <FormField
                  control={form.control}
                  name="subscription.startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
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
                            selected={new Date(field.value?.toString() ?? "")}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="subscription.paidAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Paid Amount</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Paid Amount"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 items-start py-1">
              <div>
                <FormField
                  control={form.control}
                  name="subscription.paymentMode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Mode</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Payment Mode" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PAYMENT_METHODS.map((method, idx) => (
                            <SelectItem key={idx + 1} value={method}>
                              {method}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="subscription.paymentDueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Payment Due Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
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
                            selected={new Date(field.value?.toString() ?? "")}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div>
              <FormField
                control={form.control}
                name="subscription.comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comments</FormLabel>
                    <FormControl>
                      <Input placeholder="Comments" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}
        <Button type="submit" className="w-full sm:w-auto">
          {loader ? "Loading ..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default AddAndEditMembers;
