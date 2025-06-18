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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getUserInfo } from "../actions/auth.action";
import axios from "axios";
import { BASE_URL } from "@/constants/constant";
import Link from "next/link";

// Zod schema
const formSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function LoginForm() {
  const router = useRouter();
  const [role, setRole] = useState<"Member" | "Admin">("Member");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // onSubmit handler
 async function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    const dataToSend = { ...values, role };

    // 1. Login user
    const loginRes = await axios.post(`${BASE_URL}/api/users/login`, dataToSend, {
      withCredentials: true,
    });

    const { token } = loginRes.data;

    if (!token) {
      toast.error("Token not received. Login failed.");
      return;
    }

    // ✅ 2. Save token in localStorage and print it
    const tokenassess = localStorage.setItem("token", token);
    console.log("Login token saved to localStorage:", tokenassess);

    // 3. Get user info
    const responseOfMe = await getUserInfo();

    if (responseOfMe?.user) {
      localStorage.setItem("user", JSON.stringify(responseOfMe.user));
      toast.success("Login successful!");

      const userRole = responseOfMe.user.role.name;

      if (userRole === "Admin") {
        router.push("/dashboard");
      } else if (userRole === "Member") {
        router.push("/personal-details");
      } else {
        toast.error("Unknown role, cannot redirect");
      }
    } else {
      toast.error("User info not found.");
    }
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
    toast.error("Login failed. Check credentials.");
  }
}


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-3xl mx-auto">
        <div className="flex mt-4">
          <Button
            type="button"
            onClick={() => setRole("Member")}
            className={`bg-white text-black w-1/2 shadow-none rounded-none ${
              role === "Member" ? "border-b-2 border-black" : "border-b text-gray-500"
            }`}
          >
            Member
          </Button>
          <Button
            type="button"
            onClick={() => setRole("Admin")}
            className={`bg-white text-black w-1/2 shadow-none rounded-none ${
              role === "Admin" ? "border-b-2 border-black" : "border-b text-gray-500"
            }`}
          >
            Partner
          </Button>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="johndoe@example.com" {...field} value={field.value || ""} />
              </FormControl>
              <FormDescription>Enter your email to sign in.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Enter password" {...field} value={field.value || ""} />
              </FormControl>
              <FormDescription>Enter your password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          Submit
        </Button>

        <div className="text-center mt-2">
          <p className="text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link href={`/sign-up?role=${role}`} className="text-black hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
