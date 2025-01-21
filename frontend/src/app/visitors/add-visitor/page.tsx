"use client";
import React, { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";



export interface Address {
    addressLine1?: string;
    addressLine2?: string;
    state?: string;
    city?: string;
    pincode?: string;
}
export interface NewVisitor {
    _id?: string;
    name: string;
    mobile: number;
    visiting_date: string;
    tentative_visiting_date: string;
    email?: string;
    visiting_center: string;
    gender: string;
    source?: string;
    occupation?: string;
    dob?: string;
    health_conditions: string;
    marital_status?: string;
    remarks: string;
    enquire_mode: string;
    address?: Address;
}

const CreateVisitor: React.FC<{
    mode: "add" | "edit";
    initialData: NewVisitor;
}> = ({ mode, initialData }) => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const normalizeDate = (date?: string) =>
        date ? new Date(date).toISOString().slice(0, 10) : "";
    const router = useRouter();


    const [formData, setFormData] = useState<NewVisitor>({
        ...initialData,
        visiting_date: initialData?.visiting_date ? normalizeDate(initialData.visiting_date) : currentDate,
        ...(initialData?.tentative_visiting_date && { tentative_visiting_date: normalizeDate(initialData.tentative_visiting_date) }),
        ...(initialData?.dob && { dob: normalizeDate(initialData.dob) }),
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name.includes("address.")) {
            const [_, key] = name.split(".");

            setFormData((prev) => ({
                ...prev,
                address: { ...prev.address, [key]: value },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: name === "mobile" ? parseInt(value) || 0 : value,
            }));
        }
    };

    const visitorSchema = z.object({
        name: z.string().min(1, "Name is required"),
        mobile: z.number().refine((value) => /^\d{10}$/.test(value.toString()), {
            message: "Enter a valid 10-digit mobile number",
        }),
        visiting_date: z.string().min(1, "Visiting date is required"),
        tentative_visiting_date: z.string().min(1, "Tentative Visiting date is required"),
        email: z.string().email("Enter a valid email address").optional(),
        visiting_center: z.string().min(1, "Center is required"),
        gender: z.enum(["Male", "Female", "Other"], { required_error: "Gender is required" }),
        source: z.string().optional(),
        occupation: z.string().optional(),
        dob: z.string().optional(),
        health_conditions: z.string().optional(),
        marital_status: z.enum(["Single", "Married"], { required_error: "Marital status is required" }),
        remarks: z.string().optional(),
        enquire_mode: z.string().optional(),
        address: z
                    .object({
                        addressLine1: z.string().optional(),
                        addressLine2: z.string().optional(),
                        state: z.string().optional(),
                        city: z.string().optional(),
                        pincode: z
                            .string()
                            .regex(/^\d{6}$/, "Pincode must be a valid 6-digit number"),
                    })
                    .optional(),
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const validatedData = visitorSchema.parse(formData);
            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("Authentication token is missing");

            const endpoint =
                mode === "edit"
                    ? `http://localhost:5000/visitors/${initialData?._id}`
                    : "http://localhost:5000/visitors";

            const method = mode === "edit" ? "PUT" : "POST";

            const response = await fetch(endpoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(validatedData),
            });

            if (!response.ok) throw new Error(`Failed to ${mode === "edit" ? "update" : "add"} visitor`);

            toast.success("Visitor Added Successfully!");
            router.push(`/visitors`);
            if (mode === "add") {
                setFormData({
                    name: "",
                    mobile: 0,
                    visiting_date: currentDate,
                    tentative_visiting_date: "",
                    email: "",
                    visiting_center: "",
                    gender: "",
                    source: "",
                    occupation: "",
                    dob: "",
                    health_conditions: "",
                    marital_status: "",
                    remarks: "",
                    enquire_mode: "",
                    address: {
                        addressLine1: "",
                        addressLine2: "",
                        state: "",
                        city: "",
                        pincode: "",
                    },
                });
            };

        } catch (err) {
            if (err instanceof z.ZodError) {
                const fieldErrors: Record<string, string> = {}; // Define fieldErrors with explicit type
                err.errors.forEach((error) => {
                    if (error.path[0]) {
                        fieldErrors[error.path[0] as string] = error.message; // Cast to string
                    }
                });
                setErrors(fieldErrors);
            } else {
                alert(err instanceof Error ? err.message : "An error occurred");
            }
        }

    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 p-6 border rounded shadow-md bg-gray-50">
            <h2 className="text-xl font-bold text-center mb-4">{mode === "edit" ? "Update Visitor" : "Add New Visitor"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                    <label className="block font-medium">Name<span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'} transition duration-200`}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                {/* Mobile */}
                <div>
                    <label className="block font-medium">Mobile<span className="text-red-500">*</span></label>
                    <input
                        type="number"
                        name="mobile"
                        placeholder="Enter Mobile Number"
                        value={formData.mobile || ""}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded ${errors.mobile ? 'border-red-500' : 'border-gray-300'} transition duration-200`}
                    />
                    {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                </div>

                {/* Visiting Date */}
                <div>
                    <label className="block font-medium">Visiting Date<span className="text-red-500">*</span></label>
                    <input
                        type="date"
                        name="visiting_date"
                        value={formData.visiting_date}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded ${errors.visiting_date ? 'border-red-500' : 'border-gray-300'} transition duration-200`}
                    />
                    {errors.visiting_date && (
                        <p className="text-red-500 text-sm">{errors.visiting_date}</p>
                    )}
                </div>

                {/* Tentative Visiting Date */}
                <div>
                    <label className="block font-medium">Tentative Visiting Date<span className="text-red-500">*</span></label>
                    <input
                        type="date"
                        name="tentative_visiting_date"
                        value={formData.tentative_visiting_date}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded ${errors.tentative_visiting_date ? 'border-red-500' : 'border-gray-300'} transition duration-200`}
                    />
                    {errors.tentative_visiting_date && (
                        <p className="text-red-500 text-sm">{errors.tentative_visiting_date}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'} transition duration-200`}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                {/* Visiting Center */}
                <div>
                    <label className="block font-medium">Visiting Center<span className="text-red-500">*</span></label>
                    <select
                        name="visiting_center"
                        value={formData.visiting_center}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded ${errors.visiting_center ? 'border-red-500' : 'border-gray-300'} transition duration-200`}
                    >
                        <option value="">Select Center</option>
                        {["Gold's Gym", "Anytime Fitness", "Snap Fitness", "Planet Fitness", "CrossFit India"].map(center => (
                            <option key={center} value={center}>{center}</option>
                        ))}
                    </select>
                    {errors.visiting_center && <p className="text-red-500 text-sm">{errors.visiting_center}</p>}
                </div>

                {/* Gender */}
                <div className="col-span-full">
                    <label className="block font-medium">Gender<span className="text-red-500">*</span></label>
                    <div className="flex space-x-4">
                        {["Male", "Female", "Other"].map(gender => (
                            <label key={gender} className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value={gender}
                                    checked={formData.gender === gender}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                {gender}
                            </label>
                        ))}
                    </div>
                    {errors.gender && (
                        <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                    )}
                </div>

                {/* Source */}
                <div>
                    <label className="block font-medium">Source</label>
                    <select
                        name="source"
                        value={formData.source}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded ${errors.source ? 'border-red-500' : 'border-gray-300'} transition duration-200`}
                    >
                        <option value="">Select Source</option>
                        {["Walk-In", "Search Engine", "Social Media", "Referral", "Website", "Banner", "Ads", "Newspapers"].map(src => (
                            <option key={src} value={src}>{src}</option>
                        ))}
                    </select>
                </div>

                {/* Occupation */}
                <div>
                    <label className="block font-medium">Occupation</label>
                    <select
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded ${errors.occupation ? 'border-red-500' : 'border-gray-300'} transition duration-200`}
                    >
                        <option value="">Select Occupation</option>
                        {["I.T/Com/Cs", "Civil", "Architect", "Businessman", "Advocate", "Other"].map(occ => (
                            <option key={occ} value={occ}>{occ}</option>
                        ))}
                    </select>
                </div>

                {/* Date of Birth */}
                <div>
                    <label className="block font-medium">DOB (dd/mm/yy)</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded ${errors.dob ? 'border-red-500' : 'border-gray-300'} transition duration-200`}
                    />
                    {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
                </div>

                {/* Health Conditions */}
                <div>
                    <label className="block font-medium">Health Conditions</label>
                    <input
                        type="text"
                        name="health_conditions"
                        placeholder="Health Conditions (if any)"
                        value={formData.health_conditions}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded ${errors.health_conditions ? 'border-red-500' : 'border-gray-300'} transition duration-200`}
                    />
                </div>

                {/* Marital Status */}
                <div className='col-span-full'>
                    <label className='block font-medium'>Marital Status<span className='text-red-500'> *</span></label>
                    {["Single", "Married"].map(status => (
                        <label key={status} className='flex items-center'>
                            <input
                                type='radio'
                                name='marital_status'
                                value={status}
                                checked={formData.marital_status === status}
                                onChange={handleChange}
                                className='mr-2'
                            />
                            {status}
                        </label>
                    ))}
                    {errors.marital_status && (
                        <p className='text-red-500 text-sm'>{errors.marital_status}</p>
                    )}
                </div>

                {/* Remarks */}
                <div className='col-span-full'>
                    <label className='block font-medium'>Remarks<span className='text-red-500'> *</span></label>
                    {["High", "Medium", "Low"].map(status => (
                        <label key={status} className='flex items-center'>
                            <input
                                type='radio'
                                name='remarks'
                                value={status}
                                checked={formData.remarks === status}
                                onChange={handleChange}
                                className='mr-2'
                            />
                            {status}
                        </label>
                    ))}
                    {errors.remarks && (
                        <p className='text-red-500 text-sm'>{errors.remarks}</p>
                    )}
                </div>

                {/* Enquire Mode */}
                <div className='col-span-full'>
                    <label className='block font-medium'>Enquiry Mode<span className='text-red-500'> *</span></label>
                    {["Talking", "Walking", "Any"].map(status => (
                        <label key={status} className='flex items-center'>
                            <input
                                type='radio'
                                name='enquire_mode'
                                value={status}
                                checked={formData.enquire_mode === status}
                                onChange={handleChange}
                                className='mr-2'
                            />
                            {status}
                        </label>
                    ))}
                    {errors.enquire_mode && (
                        <p className='text-red-500 text-sm'>{errors.enquire_mode}</p>
                    )}
                </div>
                <div className="">
                    <label className="block font-medium">
                        Address Line 1
                    </label>
                    <input
                        type="text"
                        name="address.addressLine1"
                        placeholder="Address Line 1"
                        value={formData.address?.addressLine1 || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block font-medium">Address Line 2</label>
                    <input
                        type="text"
                        name="address.addressLine2"
                        placeholder="Address Line 2"
                        value={formData.address?.addressLine2 || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="flex  space-x-5">
                    <div className="w-full">
                        <label className=" font-medium">
                            State
                        </label>
                        <input
                            type="text"
                            name="address.state"
                            placeholder="State"
                            value={formData.address?.state || ""}
                            pattern="[A-Za-z\s]*"
                            title="State must contain only letters"
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />

                    </div>
                    <div className="w-full">
                        <label className=" font-medium">
                            City
                        </label>
                        <input
                            type="text"
                            name="address.city"
                            placeholder="City"
                            value={formData.address?.city || ""}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
                <div>
                    <label className="block font-medium">
                        Pincode
                    </label>
                    <input
                        type="text"
                        name="address.pincode"
                        placeholder="Pincode"
                        value={formData.address?.pincode || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
            </div>
            {/* Submit Button */}
            <Button
                type="submit"
                className="mt-6"
            >
                SAVE
            </Button>
        </form>

    );
};

export default CreateVisitor;

