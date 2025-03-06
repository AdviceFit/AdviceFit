'use client'
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getCenters } from "../../actions/centers.action";
import { toast } from "sonner";

const formSchema = z.object({
    center: z.string().min(1, "Center is required"),
    to: z.array(z.string()).min(1, "Select at least one recipient"),
    message: z.string().optional(),
});

const recipientOptions = ["Employees", "Visitor", "Members", "Live Members", "Non Live Members"];

const SendEmailForm = () => {
    const [centers, setCenters] = useState<CenterParams[]>([]);
    const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
    const [isCenterSelected, setIsCenterSelected] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { center: "", to: [] as string[], message: "" },
    });

    useEffect(() => {
        async function fetchCenters() {
            try {
                const data = await getCenters();
                setCenters(data.centers);
            } catch (error) {
                toast.error("Failed to load centers.");
            }
        }
        fetchCenters();
    }, []);

    const toggleRecipient = (recipient: string) => {
        setSelectedRecipients((prev) =>
            prev.includes(recipient) ? prev.filter((r) => r !== recipient) : [...prev, recipient]
        );
        form.setValue("to", selectedRecipients);
    };

    const onSubmit = (values: any) => {
        console.log("Form Submitted:", values);
        toast.success("Email Sent Successfully!");
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-auto py-10 w-full">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        {/* Center Selection */}
                        <FormField
                            control={form.control}
                            name="center"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Visiting Center</FormLabel>
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            setIsCenterSelected(true);
                                        }}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a center" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {centers.map((center) => (
                                                <SelectItem key={center._id} value={center._id}>
                                                    {center.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* Recipient Selection */}
                    <div className="col-span-6">
                        {isCenterSelected && (
                            <FormField
                                control={form.control}
                                name="to"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>To</FormLabel>
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
                                                        onClick={() => toggleRecipient(recipient)}
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
                        )}
                    </div>
                    </div>
                    {/* Email Body */}
                    <div className="col-span-12">
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter your email message..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                {/* Submit Button */}
                <Button type="submit" className="w-24">
                    Send Email
                </Button>
            </form>
        </Form>
    )
};

export default SendEmailForm;
