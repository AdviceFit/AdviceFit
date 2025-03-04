"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getSubscriptionById,
  updateSubscription,
} from "../../actions/subscriptions.action";

const formSchema = z.object({
  _id: z.string().optional(),
  package: z.string().min(2).max(50),
  promoCoupon: z.string().optional(),
  offerAmount: z.coerce
    .number()
    .min(0, { message: "Offer Amount must be a positive number" }),
  paymentDate: z.coerce.date(),
  startDate: z.coerce.date(),
  paidAmount: z.coerce
    .number()
    .min(0, { message: "Paid Amount must be a positive number" }),
  paymentMode: z.string().min(2).max(50),
  paymentDueDate: z.coerce.date(),
  comments: z.string().optional(),
});

export default function EditSubscription({
  id,
  onClose,
}: {
  id?: string;
  onClose?: () => void;
}) {
  const router = useRouter();
  const formatSubscriptionData = (data: any): z.infer<typeof formSchema> => ({
    _id: data._id || "",
    package: data?.package || "",
    promoCoupon: data?.promoCoupon || "",
    offerAmount: data?.offerAmount,
    paymentDate: data?.paymentDate
      ? new Date(data?.paymentDate?.toString())
      : new Date(),
    startDate: data?.startDate || "",
    paidAmount: data?.paidAmount,
    paymentMode: data?.paymentMode || "",
    paymentDueDate: data?.paymentDueDate || "",
    comments: data?.comments || "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // package: columnData?.subscriptionDetails?.package || "",
      // promoCoupon: columnData?.subscriptionDetails?.promoCoupon || "",
      // offerAmount: columnData?.subscriptionDetails?.offerAmount,
      // paymentDate: columnData?.subscriptionDetails?.paymentDate
      //   ? new Date(columnData?.subscriptionDetails?.paymentDate?.toString())
      //   : new Date(),
      // startDate: columnData?.subscriptionDetails?.startDate || "",
      // paidAmount: columnData?.subscriptionDetails?.paidAmount,
      // paymentMode: columnData?.subscriptionDetails?.paymentMode || "",
      // paymentDueDate: columnData?.subscriptionDetails?.paymentDueDate || "",
      // comments: columnData?.subscriptionDetails?.comments || "",
    },
  });

  useEffect(() => {
    async function fetchSubscriptionDetails() {
      if (!id) return;

      try {
        const subscriptionData = await getSubscriptionById(id);
        if (subscriptionData?.subscription?.subscriptionDetails) {
          form.reset(
            formatSubscriptionData(
              subscriptionData.subscription.subscriptionDetails
            )
          );
        } else {
          toast.error("subscription not found.");
        }
      } catch (error) {
        toast.error("Failed to fetch subscription details.");
      }
    }

    fetchSubscriptionDetails();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let response;
      if (id) {
        response = await updateSubscription(id, values as SubscriptionsParams);
        if (response.subscription) {
          toast.success("Subscription updated successfully!");
        } else {
          toast.error("Failed to update subscription.");
        }
      }
      onClose?.();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      router.replace("/dashboard/subscriptions");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl"
      >
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 items-end">
          <div>
            <FormField
              control={form.control}
              name="package"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Package</FormLabel>
                  <FormControl>
                    <Input placeholder="Package" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="promoCoupon"
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
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 items-end">
          <div>
            <FormField
              control={form.control}
              name="offerAmount"
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
              name="paymentDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
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
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 items-end">
          <div>
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
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
              name="paidAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paid Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Paid Amount" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 items-end">
          <div>
            <FormField
              control={form.control}
              name="paymentMode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Mode</FormLabel>
                  <FormControl>
                    <Input placeholder="Payment Mode" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="paymentDueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
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
        <div>
          <FormField
            control={form.control}
            name="comments"
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
        <div className="flex justify-end mt-4">
          <Button type="submit" className="w-full sm:w-auto">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
