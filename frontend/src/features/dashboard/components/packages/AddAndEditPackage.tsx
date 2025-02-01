"use client"

import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
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
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCenters } from "../../actions/centers.action"

import { toast } from "sonner"

import { createPackage } from "../../actions/packages.action"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  _id: z.string().optional(),
  packageName: z.string().min(1, "Package name is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  center: z.string().min(1, "Center is required"),
  productType: z.enum(["General", "Gift", "Registration", "Session"], { required_error: "Product type is required" }),
  noOfDays: z.number().min(1, "Number of days must be greater than 0"),
  packageTiming: z.enum(["Normal Hours", "Sunny Hours"], { required_error: "Package timing is required" }),
  trainingType: z.enum(["General", "Personal"], { required_error: "Training type is required" }),
  packageType: z.enum(["Main", "Add On"], { required_error: "Package type is required" }),
  // cafeSubscription: z.boolean().optional(),
  showAtAdviceFit: z.boolean().optional(),
});

export default function AddAndEditPackage() {
  const [centers, setCenters] = useState<{ _id: string; name: string }[]>([]);
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      packageName: "",
      price: 0,
      center: "",
      productType: "General",
      noOfDays: 0,
      packageTiming: "Normal Hours",
      trainingType: "General",
      packageType: "Main",
      // cafeSubscription: false,
      showAtAdviceFit: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await createPackage(values as PackageParams);
      if (response.package) {
        toast.success("Packages added successfully!");
        router.replace("/dashboard/Packagess")
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
        <div className="grid grid-cols-2 gap-4">
          {/* Package Name */}
          <FormField
            control={form.control}
            name="packageName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Package Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Package Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Price" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Center */}
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


        {/* Product Type */}
        <FormField
          control={form.control}
          name="productType"
          render={({ field }) => (
            <FormItem>
            <FormLabel>Product Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {[
                  { value: "General", label: "General" },
                  { value: "Gift", label: "Gift" },
                  { value: "Trainer", label: "Trainer" },
                  { value: "Registration", label: "Registration" },
                  { value: "Session", label: "Session" },
                ].map((product) => (
                  <SelectItem key={product.value} value={product.value}>
                    {product.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
          )}
        />

        {/* Number of Days */}
        <FormField
          control={form.control}
          name="noOfDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Days</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Number of Days" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Package Timing */}
        <FormField
          control={form.control}
          name="packageTiming"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package Timing</FormLabel>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="Normal Hours"
                    checked={field.value === "Normal Hours"}
                    onChange={() => field.onChange("Normal Hours")}
                    className="mr-2"
                  />
                  Normal Hours
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="Sunny Hours"
                    checked={field.value === "Sunny Hours"}
                    onChange={() => field.onChange("Sunny Hours")}
                    className="mr-2"
                  />
                  Sunny Hours
                </label>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Training Type */}
        <FormField
          control={form.control}
          name="trainingType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Training Type</FormLabel>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="General"
                    checked={field.value === "General"}
                    onChange={() => field.onChange("General")}
                    className="mr-2"
                  />
                  General
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="Personal"
                    checked={field.value === "Personal"}
                    onChange={() => field.onChange("Personal")}
                    className="mr-2"
                  />
                  Personal
                </label>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Package Type */}
        <FormField
          control={form.control}
          name="packageType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package Type</FormLabel>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="Main"
                    checked={field.value === "Main"}
                    onChange={() => field.onChange("Main")}
                    className="mr-2"
                  />
                  Main
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="Add On"
                    checked={field.value === "Add On"}
                    onChange={() => field.onChange("Add On")}
                    className="mr-2"
                  />
                  Add On
                </label>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Show at AdviceFit Platform */}
        <FormField
          control={form.control}
          name="showAtAdviceFit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Show at AdviceFit Platform</FormLabel>
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="mr-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full sm:w-auto">Submit</Button>

      </form>
    </Form>
  )
}
