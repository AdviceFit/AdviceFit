"use client";

import React, { useEffect, useState } from "react";
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
import { getCenters } from "../actions/centers.action";
import { getTemplates } from "../actions/template.action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PaymentButton from "@/components/shared/PaymentButton";
import { getUserInfo } from "@/features/auth/actions/auth.action";

const formSchema = z.object({
  center: z.string().min(1, "Center is required"),
  to: z.array(z.string()).min(1, "Select at least one recipient"),
  messageServiceType: z.enum(["SMS", "Whatsapp"], {
    required_error: "Message Service Type is required",
  }),
  messageType: z.enum(["Transactional", "Promotional"], {
    required_error: "Message Type is required",
  }),
  messageTemplate: z.string(),
  message: z.string().optional(),
  variables: z.array(
    z.object({
      fieldName: z.string().nonempty("Field name is required"),
      value: z.string().optional(),
    })
  ),
});

const MessagesMain = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      center: "",
      to: [],
      messageServiceType: "SMS",
      messageType: "Transactional",
      messageTemplate: "",
      message: "",
      variables: [],
    },
  });

  const [user, setUser] = useState<any>(null);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
  const [centers, setCenters] = useState<{ label: string; value: string }[]>(
    []
  );

  const [templates, setTemplates] = useState<TemplateDataParams[]>([]);

  const fetchCenters = async () => {
    const response = await getCenters();
    setCenters(
      response.centers.map((center) => ({
        label: center.name,
        value: center._id,
      }))
    );
  };

  const fetchTemplates = async () => {
    const response = await getTemplates();
    setTemplates(response.templates);
  };

  useEffect(() => {
    fetchCenters();
    fetchTemplates();
  }, []);

  const handleUserInfo = async () => {
    const responseOfMe = await getUserInfo();
    if (responseOfMe.user) {
      setUser(responseOfMe.user);
      localStorage.setItem("user", JSON.stringify(responseOfMe.user));
    }
  };

  useEffect(() => {
    handleUserInfo();
  }, [isPaymentCompleted]);

  const recipientOptions = [
    "Employees",
    "Visitor",
    "Members",
    "Live Members",
    "Non Live Members",
  ];
  const messageServiceTypes = ["SMS", "Whatsapp"];

  const messageTypes = [
    { value: "transactional", label: "Transactional", type: ["SMS"] },
    { value: "promotional", label: "Promotional", type: ["SMS", "Whatsapp"] },
  ];

  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);

  const toggleRecipient = (value: string) => {
    const updatedRecipients = selectedRecipients.includes(value)
      ? selectedRecipients.filter((item) => item !== value)
      : [...selectedRecipients, value];

    setSelectedRecipients(updatedRecipients);
    form.setValue("to", updatedRecipients as never[]);
  };

  const [originalMessage, setOriginalMessage] = React.useState(""); // Store the original message
  const [variablesMap, setVariablesMap] = React.useState({}); // Track variable updates

  React.useEffect(() => {
    // Initialize the original message and variables when the template changes
    const selectedTemplate = templates.find(
      (template) => template.title === form.watch("messageTemplate")
    );
    if (selectedTemplate) {
      setOriginalMessage(selectedTemplate.description); // Save the original template message
      const initialVariablesMap = selectedTemplate.variables.reduce(
        (map, variable) => ({ ...map, [variable]: variable }), // Default to the variable as its value
        {}
      );
      setVariablesMap(initialVariablesMap); // Set the initial variables map
      form.setValue("message", selectedTemplate.description); // Set the initial form message
    }
  }, [form.watch("messageTemplate")]);

  const handleVariableChange = (variable: string, newValue: string) => {
    // Update the variable map with the new value
    const updatedVariablesMap = { ...variablesMap, [variable]: newValue };
    setVariablesMap(updatedVariablesMap);

    // Generate the updated message by replacing all placeholders in the original message
    const updatedMessage = Object.entries(updatedVariablesMap).reduce(
      (message, [key, value]) =>
        message.replace(
          new RegExp(key.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"),
          value as string
        ),
      originalMessage
    );

    form.setValue("message", updatedMessage);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Send Bulk Message</h1>
        <div className="flex gap-2 flex-col">
          <h5 className="text-sm font-medium">
            WhatsApp Credit ({user?.credits?.whatsapp ?? 0})
          </h5>
          <h5 className="text-sm font-medium">
            SMS Credit ({user?.credits?.sms ?? 0})
          </h5>
          <PaymentButton isPaymentCompleted={isPaymentCompleted} setIsPaymentCompleted={setIsPaymentCompleted} />
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
                  <FormLabel required>Center</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Center" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {centers.map((center, idx) => (
                        <SelectItem key={idx + 1} value={center.value}>
                          {center.label}
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
                  <FormLabel required>To</FormLabel>
                  <Select>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            selectedRecipients.length > 0
                              ? selectedRecipients.join(", ")
                              : "Select Recipients"
                          }
                        />
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
                  <FormLabel required>Message Service Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Message Service Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {messageServiceTypes.map((type, idx) => (
                        <SelectItem key={idx + 1} value={type}>
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
                  <FormLabel required>Message Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Message Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {messageTypes
                        .filter((msgType) =>
                          msgType.type.includes(
                            form.getValues("messageServiceType")
                          )
                        )
                        .map((type, idx) => (
                          <SelectItem key={idx + 1} value={type.label}>
                            {type.label}
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
                  <FormLabel required>Message Template</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue(
                        "message",
                        templates.find((template) => template.title == value)
                          ?.description as string
                      );
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Message Template" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {templates
                        .filter((template) => {
                          return (
                            template.type == form.watch("messageType") &&
                            template.services.includes(
                              form.watch("messageServiceType") as any
                            )
                          );
                        })
                        .map((template, idx) => (
                          <SelectItem key={idx + 1} value={template.title}>
                            {template.title}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row gap-4 py-4">
            {templates
              .find(
                (template) => template.title == form.watch("messageTemplate")
              )
              ?.variables.map((variable, idx) => (
                <div key={idx + 1} className="flex flex-col gap-2">
                  <Label htmlFor={`variable${idx + 1}`} className="text-sm">
                    Variable {idx + 1}
                  </Label>
                  <Input
                    placeholder="Variable"
                    defaultValue={variable}
                    name={`variable${idx + 1}`}
                    onChange={(e) =>
                      handleVariableChange(variable, e.target.value)
                    }
                    type="text"
                  />
                </div>
              ))}
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
                    value={field.value}
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
