"use client";

import React, { useMemo } from "react";
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
import { toast } from "sonner";
import { RAZORPAY_KEY, RAZORPAY_URL } from "@/constants/constant";
import LogoIcon from "../../../public/favicon-32x32.png";

type Props = {
  setIsPaymentCompleted: React.Dispatch<React.SetStateAction<boolean>>;
};

const PaymentButton = ({ setIsPaymentCompleted }: Props) => {
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
      script.src = RAZORPAY_URL!;
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
      .min(100, { message: "Amount must be at least 100" })
      .max(10000, { message: "Amount must be at most 10000" }),
    media: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      media: "sms",
    },
  });

  const handleClick = async (payload: z.infer<typeof formSchema>) => {
    // Ensure Razorpay script is loaded before proceeding
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Failed to load Razorpay script. Please try again later.");
      return;
    }

    try {
      const response = await intializeOrder(payload);
      if (response.error) {
        toast.error(response.error);
        return;
      }

      // Configure Razorpay checkout
      const options = {
        key: RAZORPAY_KEY,
        amount: response.order?.amount,
        currency: response.order.currency,
        name: "Advice Fit",
        order_id: response.order.id,
        image: LogoIcon,
        description: "Advice Fit",
        partial_payment: false,
        handler: async function (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
          const res = await verifyOrder({
            signature: response.razorpay_signature,
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            mediaType: payload?.media,
            status: "success",
          });
          toast.success(res.message);
          setIsPaymentCompleted((prev: boolean) => !prev);
        },
        theme: {
          color: "dark",
        },
        modal: {
          backdropclose: false,
          ondismiss: function () {
            toast.error("Payment process was cancelled.");
          },
        },
      };

      if (typeof window !== "undefined") {
        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      }
    } catch (error) {
      toast.error("Somehting went wrong. Please try again.");
    } finally {
      handleClose();
    }
  };

  const totalCredits = useMemo(() => {
    // The Credits would be half of the amount
    return Math.round(form.watch("amount") / 2);
  }, [form.watch("amount")]);

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
          className="sm:max-w-[720px] min-h-[420px] h-2/5 overflow-y-auto py-0"
          customClose={true}
        >
          <DialogHeader className=" bg-white pt-4 pb-2 flex flex-row justify-between">
            <DialogTitle>Buy Credits</DialogTitle>
            <X className="h-4 w-4 hover:cursor-pointer" onClick={handleClose} />
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            Choose the desired number of credits, complete the secure payment
            process, and instantly boost your balance. Credits can be used for
            WhatsApp messages, SMS, and other supported features.
          </p>

          <p className="text-sm font-bold">
            Credits to be added :{" "}
            {Number.isNaN(totalCredits) ? 0 : totalCredits}
          </p>

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
                        onChange={(e) => {
                          form.setValue(
                            "amount",
                            Number.isNaN(parseInt(e.target.value))
                              ? 0
                              : parseInt(e.target.value)
                          );
                        }}
                        type="string"
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
