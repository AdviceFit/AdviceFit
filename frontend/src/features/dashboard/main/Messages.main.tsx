"use client";

import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea"; // Importing the Textarea component

const formSchema = z.object({
  center: z.string().min(1, "Center is required"),
  to: z.array(z.string()).min(1, "Select at least one recipient"),
  messageServiceType: z.enum(["SMS", "Whatsapp"], {
    required_error: "Message Service Type is required",
  }),
  messageType: z.enum(["Transactional", "Promotional"], {
    required_error: "Message Type is required",
  }),
  messageTemplate: z.enum(
    [
      "WOMENS_DAY",
      "DISCOUNT_OFFER_ALERT",
      "GANESH_CHATURTHI_DISCOUNT_OFFER",
      "GANDHI_JAYANTI_DISCOUNT_OFFER",
      "DUSSEHRA_DISCOUNT_OFFER",
    ],
    { required_error: "Message Template is required" }
  ),
  message: z.string().optional(), // New field for the disabled textarea
});

const MessagesMain = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      center: "",
      to: [],
      messageServiceType: "SMS",
      messageType: "Transactional",
      messageTemplate: "WOMENS_DAY",
      message: "", // Default value for message
    },
  });

  const centers = ["Center A", "Center B", "Center C", "Center D"];
  const recipientOptions = [
    "Employees",
    "Visitor",
    "Members",
    "Live Members",
    "Non Live Members",
  ];
  const messageServiceTypes = ["SMS", "Whatsapp"];
  const messageTypes = ["Transactional", "Promotional"];
  const messageTemplates = [
    "WOMENS_DAY",
    "DISCOUNT_OFFER_ALERT",
    "GANESH_CHATURTHI_DISCOUNT_OFFER",
    "GANDHI_JAYANTI_DISCOUNT_OFFER",
    "DUSSEHRA_DISCOUNT_OFFER",
  ];

  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);

  const toggleRecipient = (value: string) => {
    const updatedRecipients = selectedRecipients.includes(value)
      ? selectedRecipients.filter((item) => item !== value)
      : [...selectedRecipients, value];

    setSelectedRecipients(updatedRecipients);
    form.setValue("to", updatedRecipients);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Send Bulk Message</h1>
        <div>
          <h5 className="text-sm font-medium">WhatsApp Credit (0)</h5>
          <h5 className="text-sm font-medium">SMS Credit (0)</h5>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="space-y-6 mt-6"
        >
          <div className="grid grid-cols-3 gap-6">
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
                        <SelectValue placeholder="Select Center" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {centers.map((center) => (
                        <SelectItem key={center} value={center}>
                          {center}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* To (Multi-select) */}
            <FormField
              control={form.control}
              name="to"
              render={() => (
                <FormItem>
                  <FormLabel>To</FormLabel>
                  <Select>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue>
                          <div
                            className="truncate max-w-[200px]"
                            title={selectedRecipients.join(", ")}
                          >
                            {selectedRecipients.length > 0
                              ? selectedRecipients.join(", ")
                              : "Select Recipients"}
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-64">
                      {recipientOptions.map((recipient) => (
                        <div
                          key={recipient}
                          className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-100 rounded"
                          onClick={() => toggleRecipient(recipient)} // ✅ Clicking text also selects/unselects
                        >
                          <Checkbox
                            checked={selectedRecipients.includes(recipient)}
                            onCheckedChange={() => toggleRecipient(recipient)}
                          />
                          <span>{recipient}</span>
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message Service Type */}
            <FormField
              control={form.control}
              name="messageServiceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message Service Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Message Service Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {messageServiceTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message Type */}
            <FormField
              control={form.control}
              name="messageType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Message Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {messageTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message Template */}
            <FormField
              control={form.control}
              name="messageTemplate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message Template</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Message Template" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {messageTemplates.map((template) => (
                        <SelectItem key={template} value={template}>
                          {template}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Message Field (Full Row, Disabled) */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Message will be shown here..."
                    disabled
                    className="w-full h-20 bg-gray-100 cursor-not-allowed resize-y"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md"
            >
              Send Message
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MessagesMain;
