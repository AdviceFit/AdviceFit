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
import { PasswordInput } from "@/components/ui/password-input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Define the schema for validation
const formSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"), // Minimum length for password
});

export default function MyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [isLinkValid, setIsLinkValid] = useState<boolean | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function validateLink() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/validate-member-pass/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Link is expired or invalid");
      }

      const data = await response.json();
      if (data.isMemberPassLinkValid) {
        setIsLinkValid(true);
      } else {
        setIsLinkValid(false);
      }
    } catch (error) {
      console.error("Error validating the link:", error);
      setIsLinkValid(false);
    }
  }

  useEffect(() => {
    if (!id) {
      setIsLinkValid(false);
      return;
    }

    validateLink();
  }, [id]);

  // Update onSubmit function to handle API call
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/set-member-password/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(values), // Send password as JSON
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if(data){
      toast.success(data.message);
      router.push("/sign-in");
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  if (isLinkValid === null) {
    return <p>Loading...</p>;
  }

  if (!isLinkValid) {
    return (
      <div>
        <p>
          Link is invalid or password is already set. Please contact the
          administrator for more queries and then try again.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-3xl mx-auto"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="password"
                  {...field}
                  value={field.value || ""} // Ensure fallback to empty string
                />
              </FormControl>
              <FormDescription>Enter your password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
