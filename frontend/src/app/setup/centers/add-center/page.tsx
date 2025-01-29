"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"
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
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

const centerSchema = z.object({
    _id: z.string().optional(),
    name: z.string().min(1, "Name is required"),
    centerCode: z
        .string()
        .regex(/^[a-zA-Z]/, "Center code should not start with a number")
        .min(1, "Center code is required"),
    centerEmail: z.string().email("A valid email address is required"),
    mobileNo: z.string().refine((value) => /^[+][1-9][0-9]{1,14}$/.test(value), {
        message: "Enter a valid international phone number (E.164 format)",
    }),
    workPhone: z.string().optional(),
    gstNumber: z.string().optional(),
    agency: z.string().optional(),
    biometricSerialNumber: z.string().optional(),
    address: z
        .object({
            addressLine1: z.string().optional(),
            addressLine2: z.string().optional(),
            state: z.string().optional(),
            city: z.string().optional(),
            pincode: z
                .string()
                .regex(/^[0-9]{6}$/, "Pincode must be a valid 6-digit number"),
        })
        .optional(),
    aboutUs: z.string().optional(),
    termsAndConditions: z.string().optional()
});

export type Center = z.infer<typeof centerSchema>;



type CreateCenterProps = {
    mode: "add" | "edit";
    initialData?: Center;
};


const CreateCenter: React.FC<CreateCenterProps> = ({ mode, initialData }) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof centerSchema>>({
        resolver: zodResolver(centerSchema),
        defaultValues: initialData || {
            name: "",
            centerCode: "",
            centerEmail: "",
            mobileNo: "",
            workPhone: "",
            gstNumber: "",
            agency: "",
            biometricSerialNumber: "",
            address: {
                addressLine1: "",
                addressLine2: "",
                state: "",
                city: "",
                pincode: "",
            },
            aboutUs: '',
            termsAndConditions: ''
        },
    });

    const onSubmit = async (values: z.infer<typeof centerSchema>) => {
        try {
            const endpoint =
                mode === "edit"
                    ? `http://localhost:5000/center/${initialData?._id}`
                    : "http://localhost:5000/center";

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
                    `Failed to ${mode === "edit" ? "update" : "add"} the center`
                );
            }

            toast.success(`Center ${mode === "edit" ? "updated" : "added"} successfully!`);
            router.push("/setup/centers");
            form.reset();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "An unexpected error occurred");
        }
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
                <div className="grid grid-cols-2 gap-4">
                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Center Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Center Code */}
                    <FormField
                        control={form.control}
                        name="centerCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Center Code</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Center Code" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="centerEmail"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Phone */}
                    <FormField
                        control={form.control}
                        name="mobileNo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <PhoneInput placeholder="Phone Number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Work Phone */}
                    <FormField
                        control={form.control}
                        name="workPhone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Work Phone</FormLabel>
                                <FormControl>
                                    <PhoneInput placeholder="Work Phone" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* GST Number */}
                    <FormField
                        control={form.control}
                        name="gstNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>GST Number</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="GST Number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>


                <div className="grid grid-cols-12 gap-4">

                    <div className="col-span-6">

                        <FormField
                            control={form.control}
                            name="agency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Agancy</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder=""

                                            type=""
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
                            name="biometricSerialNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Biometric Device Serial Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder=""

                                            type=""
                                            {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                </div>


                {/* Address */}
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="address.addressLine1"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address Line 1</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Address Line 1" {...field} />
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
                                    <Input type="text" placeholder="Address Line 2" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-3 gap-4">
                        <FormField
                            control={form.control}
                            name="address.state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="State" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address.city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="City" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address.pincode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pincode</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Pincode" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                    </div>

                    <FormField
                        control={form.control}
                        name="aboutUs"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>About Us</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Share the unique features and qualities of your gym"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Provide a brief description of what makes your gym special and why people should choose it.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="termsAndConditions"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Terms & Conditions</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="State the rules, policies, and guidelines of your gym"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Outline the terms, conditions, and policies that members must agree to before joining your gym.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>

                <Button type="submit" className="w-full">
                    Submit
                </Button>
            </form>
        </Form>
    );
}


export default CreateCenter;