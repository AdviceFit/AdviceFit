"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  intializeOrder,
  verifyOrder,
} from "@/features/dashboard/actions/payment.action";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { X } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Dropdown from "./Dropdown";

type Props = {
  isPaymentCompleted: boolean;
  setIsPaymentCompleted: React.Dispatch<React.SetStateAction<boolean>>;
};

const PaymentButton = (props: Props) => {
  const [openState, setOpenState] = React.useState(false);

  const handleClose = () => {
    setOpenState(false);
  };

  // Function to dynamically load the Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const formSchema = z.object({
    amount: z
      .number()
      .min(10, { message: "Amount must be at least 10" })
      .max(100, { message: "Amount must be at least 100" }),
    media: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      media: "sms",
    },
  });

  const handleClick = async () => {
    // Ensure Razorpay script is loaded before proceeding
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Failed to load Razorpay script. Please try again later.");
      return;
    }

    try {
      const payload = {
        amount: 100,
        currency: "INR",
      };
      const response = await intializeOrder(payload);

      // Configure Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_CLIENT_ID ?? "",
        amount: response.order.amount,
        currency: response.order.currency,
        name: "Test Razorpay Payment",
        order_id: response.order.id,
        handler: async function (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
          console.log(response);
          await verifyOrder({
            signature: response.razorpay_signature,
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            status: "success",
          });
        },
        theme: { color: "#F37254" },
      };

      if (typeof window !== "undefined") {
        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      }
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <Dialog open={openState} onOpenChange={handleClose}>
        <Button
          variant="default"
          className="relative w-28"
          onClick={() => setOpenState(true)}
        >
          Add Credits
        </Button>
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
          className="sm:max-w-[720px] h-2/5 overflow-y-auto py-0"
          customClose={true}
        >
          <DialogHeader className=" bg-white pt-4 pb-2 flex flex-row justify-between">
            <DialogTitle>Create Payment</DialogTitle>
            <X className="h-4 w-4 hover:cursor-pointer" onClick={handleClose} />
          </DialogHeader>

          <Form {...form}>
            <form className="space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Amount</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter the amount"
                        onChange={(e) =>
                          form.setValue("amount", parseInt(e.target.value))
                        }
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Dropdown
                label="Media Type"
                required
                fieldName={"media"}
                form={form}
                options={[
                  { label: "Whatsapp", value: "whatsapp" },
                  { label: "SMS", value: "sms" },
                ]}
              />

              <Button
                type="button"
                onClick={form.handleSubmit(handleClick)}
                className="float-end"
              >
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentButton;
