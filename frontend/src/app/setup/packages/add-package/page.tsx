"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/constants/constant";

const packageSchema = z.object({
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

export type Package = z.infer<typeof packageSchema>;

interface Center {
    _id: string;
    name: string;
}
type CreatePackageProps = {
    mode: "add" | "edit";
    initialData?: Package;
};

const CreatePackage: React.FC<CreatePackageProps> = ({ mode, initialData }) => {
    const router = useRouter();
    const [centers, setCenters] = useState<Center[]>([]);
    const form = useForm<z.infer<typeof packageSchema>>({
        resolver: zodResolver(packageSchema),
        defaultValues: initialData || {
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
    })

    const onSubmit = async (values: z.infer<typeof packageSchema>) => {

        try {
            const endpoint =
                mode === "edit"
                    ? `${BASE_URL}/packages/${initialData?._id}`
                    : `${BASE_URL}/packages`;

            const method = mode === "edit" ? "PUT" : "POST";

            const response = await fetch(endpoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(
                    `Failed to ${mode === "edit" ? "update" : "add"} the package`
                );
            }

            toast.success(`Package ${mode === "edit" ? "updated" : "added"} successfully!`);
            router.push("/setup/packages");
            form.reset();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "An unexpected error occurred");
        }
    };

    // Fetch centers from API on component mount
    useEffect(() => {
        const fetchCenters = async () => {
            try {
                const response = await fetch(`${BASE_URL}/center`, {
                    method: "GET",
                    credentials: "include",
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch centers");
                }
                const data = await response.json();
                setCenters(data.data);
            } catch (error) {
                toast.error(
                    error instanceof Error ? error.message : "Failed to fetch centers"
                );
            }
        };

        fetchCenters();
    }, []);


    useEffect(() => {
        if (initialData) {
            // Set the center to its ID instead of the name
            form.setValue("center", (initialData?.center as unknown as Center)._id);
            // Populate other fields from initialData
            form.setValue("packageName", initialData.packageName);
            form.setValue("price", initialData.price);
            form.setValue("productType", initialData.productType);
            form.setValue("noOfDays", initialData.noOfDays);
            form.setValue("packageTiming", initialData.packageTiming);
            form.setValue("trainingType", initialData.trainingType);
            form.setValue("packageType", initialData.packageType);
            // form.setValue("cafeSubscription", initialData.cafeSubscription || false);
            form.setValue("showAtAdviceFit", initialData.showAtAdviceFit || false);
        }
    }, [initialData, form]);


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
                            <FormControl>
                                <select className="w-full p-2 border rounded" {...field}>
                                    <option value="">Select Center</option>
                                    {centers.map((center) => (
                                        <option key={center._id} value={center._id}>
                                            {center.name}
                                        </option>
                                    ))}
                                </select>
                            </FormControl>
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
                            <FormControl>
                                <select className="w-full p-2 border rounded" {...field}>
                                    <option value="">Select Product Type</option>
                                    <option value="General">General</option>
                                    <option value="Gift">Gift</option>
                                    <option value="Registration">Registration</option>
                                    <option value="Session">Session</option>
                                </select>
                            </FormControl>
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

                {/* Cafe Subscription */}
                {/* <FormField
                    control={form.control}
                    name="cafeSubscription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cafe Subscription</FormLabel>
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
                /> */}

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


                <Button type="submit" className="w-full">
                    {mode === "edit" ? "Update Package" : "Add Package"}
                </Button>
            </form>
        </Form>
    );
}


export default CreatePackage;