"use client";
import { toast } from "sonner";
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
import { PasswordInput } from "@/components/ui/password-input";
import { Textarea } from "@/components/ui/textarea";
import LocationSelector from "@/components/ui/location-input";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/constants/constant";
import Link from "next/link";

const formSchema = z.object({
  gym_name: z.string().min(2, "Gym name must be at least 2 characters").max(50, "Gym name must not exceed 50 characters"),
  gym_owner_name: z.string().min(2, "Owner name must be at least 2 characters").max(50, "Owner name must not exceed 50 characters"),
  email: z.string().email("Invalid email format"),
  number: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .regex(/^\+?[0-9]+$/, "Invalid phone number format"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  describe: z.string()
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description must not exceed 500 characters"),
  country: z.string(),
  city: z.string().min(2).max(50),
  pincode: z.string()
    .regex(/^[0-9]+$/, "Pincode must contain only numbers")
    .min(6, "Pincode must be at least 6 digits")
    .max(8, "Pincode must not exceed 8 digits"),
  state: z.string(),
});

const SignUpPage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gym_name: "",
      gym_owner_name: "",
      email: "",
      number: undefined,
      password: "",
      describe: "",
      country: "",
      city: "",
      pincode: "",
      state: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      gym_name: values.gym_name,
      gym_owner_name: values.gym_owner_name,
      number: values.number,
      email: values.email,
      describe: values.describe,
      country: values.country,
      state: values.state,
      city: values.city,
      pincode: values.pincode,
      password: values.password,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      toast.success("Signup successful!");
      router.push("/sign-in");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-3xl mx-auto"
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="gym_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Gym Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Fit Gym" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Name of your gym</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="gym_owner_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Owner Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Who is the owner</FormDescription>
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
                      placeholder="johndoe@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Email to contact</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0000000000"
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Your contact number</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="" {...field} />
              </FormControl>
              <FormDescription>Enter your password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="describe"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="type here ..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Brief description of your gym.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({}) => (
            <FormItem>
              <FormLabel required>Select Country</FormLabel>
              <FormControl>
                <LocationSelector
                  onCountryChange={(country) => {
                    form.setValue("country", country?.name || ""); // Set country directly as a string
                  }}
                  onStateChange={(state) => {
                    form.setValue("state", state?.name || ""); // Set state separately
                  }}
                />
              </FormControl>
              <FormDescription>
                If your country has states, it will appear after selecting the
                country.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>City</FormLabel>
                  <FormControl>
                    <Input placeholder="xyz" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Headquarters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Pincode</FormLabel>
                  <FormControl>
                    <Input placeholder="111111" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Your Pincode</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button className="w-full" type="submit">
          Submit
        </Button>

        <div className="text-center mt-2">
          <p className="text-sm text-gray-500">
            {"Already have an account?"}{" "}
            <Link href="/sign-in" className="text-black hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default SignUpPage;
