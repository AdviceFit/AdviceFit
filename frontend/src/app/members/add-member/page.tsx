"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

// Define the interface
interface NewMember {
    _id?: string
    name: string;
    mobile: number;
    gym_member_code?: string;
    joining_date: string;
    email: string;
    center: string;
    gender: string;
    source?: string;
    occupation?: string;
    dob?: string;
    health_conditions?: string;
    marital_status: string;
    member_id_proof?: string;
}
const CreateMember: React.FC<{
    mode: "add" | "edit"; // Mode to determine form behavior
    initialData?: NewMember; // Optional data for editing
}> = ({ mode, initialData }) => {
      const router = useRouter();
    const currentDate = new Date().toISOString().slice(0, 10);
    // const memberId=initialData ? initialData._id :''
    // Normalize dates to YYYY-MM-DD
    const normalizeDate = (date?: string) =>
        date ? new Date(date).toISOString().slice(0, 10) : "";

    const [formData, setFormData] = useState<NewMember>({
        name: "",
        mobile: 0,
        gym_member_code: "",
        joining_date: currentDate,
        email: "",
        center: "",
        gender: "",
        source: "",
        occupation: "",
        dob: "",
        health_conditions: "",
        marital_status: "",
        member_id_proof: "",
        ...initialData,
        ...(initialData?.joining_date && { joining_date: normalizeDate(initialData.joining_date) }),
        ...(initialData?.dob && { dob: normalizeDate(initialData.dob) }),
    });

    useEffect(() => {
        if (initialData) {
            setFormData((prev) => ({
                ...prev,
                ...initialData,
                joining_date: normalizeDate(initialData.joining_date),
                dob: normalizeDate(initialData.dob),
            }));
        }
    }, [initialData]);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "mobile" ? parseInt(value) || 0 : value,
        }));
    };

    const memberSchema = z.object({
        // _id: z.string().optional(), // Optional
        name: z.string().min(1, "Name is required"), // Required
        mobile: z
            .number()
            .refine((value) => /^\d{10}$/.test(value.toString()), {
                message: "Enter a valid 10-digit mobile number",
            }), // Required
        gym_member_code: z.string().optional(), // Optional
        joining_date: z.string().min(1, "Joining date is required"), // Required
        email: z.string().email("Enter a valid email address").optional(), // Optional
        center: z.string().min(1, "Center is required"), // Required
        gender: z.enum(["Male", "Female", "Other"], { required_error: "Gender is required" }), // Required
        source: z.string().optional(), // Optional
        occupation: z.string().optional(), // Optional
        dob: z.string().optional(), // Optional
        health_conditions: z.string().optional(), // Optional
        marital_status: z.enum(["Single", "Married"], { required_error: "Marital status is required" }), // Required
        member_id_proof: z.string().optional(), // Optional
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const validatedData = memberSchema.parse(formData);

            const token = localStorage.getItem("authToken");
            if (!token) {
                throw new Error("Authentication token is missing");
            }

            const endpoint =
                mode === "edit"
                    //@ts-ignore
                    ? `http://localhost:5000/members/${initialData?._id}` // Use ID for editing
                    : "http://localhost:5000/members";

            const method = mode === "edit" ? "PUT" : "POST";

            const response = await fetch(endpoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(validatedData),
            });

            if (!response.ok) {
                throw new Error(`Failed to ${mode === "edit" ? "update" : "add"} member`);
            }
            await response.json();
            toast.success("Member Added Successfully!"); 
            router.push(`/members`);
            // Reset form if adding
            if (mode === "add") {
                setFormData({
                    name: "",
                    mobile: 0,
                    gym_member_code: "",
                    joining_date: currentDate,
                    email: "",
                    center: "",
                    gender: "",
                    source: "",
                    occupation: "",
                    dob: "",
                    health_conditions: "",
                    marital_status: "",
                    member_id_proof: "",
                });
            }
        } catch (err) {
            if (err instanceof z.ZodError) {
                const fieldErrors: Record<string, string> = {};
                err.errors.forEach((error) => {
                    if (error.path[0]) {
                        fieldErrors[error.path[0] as string] = error.message;
                    }
                });
                setErrors(fieldErrors);
            } else {
                alert(err instanceof Error ? err.message : "An error occurred");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded shadow-sm">
            <h2 className="text-lg font-semibold">{mode === "edit" ? "Update Member" : "Add New Member"}</h2>
            <div className="grid grid-cols-2 gap-4">
                {/* Name */}
                <div>
                    <label className="block font-medium">
                        Name<span className="text-red-500"> *</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                {/* Mobile */}
                <div>
                    <label className="block font-medium">
                        Mobile<span className="text-red-500"> *</span>
                    </label>
                    <input
                        type="number"
                        name="mobile"
                        placeholder="Mobile"
                        value={formData.mobile || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                </div>

                {/* Gym Member Code */}
                <div>
                    <label className="block font-medium">Gym Member Code</label>
                    <input
                        type="text"
                        name="gym_member_code"
                        placeholder="Gym Member Code"
                        value={formData.gym_member_code}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Joining Date */}
                <div>
                    <label className="block font-medium">
                        Joining Date<span className="text-red-500"> *</span>
                    </label>
                    <input
                        type="date"
                        name="joining_date"
                        value={formData.joining_date}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    {errors.joining_date && (
                        <p className="text-red-500 text-sm">{errors.joining_date}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                {/* Center */}
                <div>
                    <label className="block font-medium">
                        Center<span className="text-red-500"> *</span>
                    </label>
                    <select
                        name="center"
                        value={formData.center}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select Center</option>
                        <option value="Gold's Gym">Gold's Gym</option>
                        <option value="Anytime Fitness">Anytime Fitness</option>
                        <option value="Snap Fitness">Snap Fitness</option>
                        <option value="Planet Fitness">Planet Fitness</option>
                        <option value="CrossFit India">CrossFit India</option>
                    </select>
                    {errors.center && <p className="text-red-500 text-sm">{errors.center}</p>}
                </div>

                {/* Gender */}
                <div className="col-span-2">
                    <label className="block font-medium">
                        Gender<span className="text-red-500"> *</span>
                    </label>
                    <div className="flex space-x-6">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={formData.gender === "Male"}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Male
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={formData.gender === "Female"}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Female
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="Other"
                                checked={formData.gender === "Other"}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Other
                        </label>
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
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select Source</option>
                        <option value="Walk-In">Walk-In</option>
                        <option value="Search Engine">Search Engine</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Referral">Referral</option>
                        <option value="Website">Website</option>
                        <option value="Banner">Banner</option>
                        <option value="Ads">Ads</option>
                        <option value="Newspapers">Newspapers</option>
                    </select>
                </div>

                {/* Occupation */}
                <div>
                    <label className="block font-medium">Occupation</label>
                    <select
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select Occupation</option>
                        <option value="I.T/Com/Cs">I.T/Com/Cs</option>
                        <option value="Civil">Civil</option>
                        <option value="Architect">Architect</option>
                        <option value="Businessman">Businessman</option>
                        <option value="Advocate">Advocate</option>
                        <option value="Other">Other</option>
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
                        className="w-full p-2 border rounded"
                    />
                    {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
                </div>

                {/* Health Conditions */}
                <div>
                    <label className="block font-medium">Health Conditions</label>
                    <input
                        type="text"
                        name="health_conditions"
                        placeholder="Health Conditions"
                        value={formData.health_conditions}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Marital Status */}
                <div className="col-span-2">
                    <label className="block font-medium">
                        Marital Status<span className="text-red-500"> *</span>
                    </label>
                    <div className="flex space-x-6">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="marital_status"
                                value="Single"
                                checked={formData.marital_status === "Single"}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Single
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="marital_status"
                                value="Married"
                                checked={formData.marital_status === "Married"}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Married
                        </label>
                    </div>
                </div>

                {/* Member ID Proof */}
                <div>
                    <label className="block font-medium">Member ID Proof</label>
                    <select
                        name="member_id_proof"
                        value={formData.member_id_proof}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select Member ID Proof</option>
                        <option value="Passport">Passport</option>
                        <option value="Driver's License">Driver's License</option>
                        <option value="National ID">National ID</option>
                        <option value="None">None</option>
                    </select>
                </div>
            </div>

            <Button
                type="submit"
                className="mt-6"
            >
                SAVE
            </Button>
        </form>
    );
};

export default CreateMember;
