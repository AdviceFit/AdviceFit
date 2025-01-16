"use client"

import {
  useState
} from "react"
import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import {
  PasswordInput
} from "@/components/ui/password-input"
import {
  Textarea
} from "@/components/ui/textarea"
import LocationSelector from "@/components/ui/location-input"

const formSchema = z.object({
  gym_name: z.string().min(2).max(50),
  gym_owner_name: z.string().min(2).max(50),
  email: z.string(),
  number: z.number(),
  password: z.string(),
  describe: z.string(),
  country: z.string(),
  city: z.string().min(2).max(50),
  pincode: z.string().min(6).max(8),
  state: z.string() 
});

const SignUpPage = () => {
  const [countryName, setCountryName] = useState<string>('');
  const [stateName, setStateName] = useState<string>('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gym_name: '',
      gym_owner_name: '',
      email: '',
      number: undefined,
      password: '',
      describe: '',
      country: '', 
      city: '',
      pincode: '',
      state: '' 
    },
  });

async function onSubmit(values: z.infer<typeof formSchema>) {
  const payload = {
    gym_name: values.gym_name,
    gym_owner_name: values.gym_owner_name,
    number: values.number,
    email: values.email,
    describe: values.describe,
    country: values.country,
    state: values.state,
    city: values.city,
    pincode: values.pincode,
    password: values.password,
  };

  try {
    const response = await fetch('http://localhost:5000/api/users/signup', {     
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    toast.success('Signup successful!');

  } catch (error) {
    console.error('Form submission error', error);
    toast.error('Failed to submit the form. Please try again.');
  }
}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="gym_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gym Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Fit Gym" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Name of your gym</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="gym_owner_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Who is the owner</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@example.com" type="email" {...field} />
                  </FormControl>
                  <FormDescription>Email to contact</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0000000000"
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Your contact number</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="" {...field} />
              </FormControl>
              <FormDescription>Enter your password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="describe"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="type here ..." className="resize-none" {...field} />
              </FormControl>
              <FormDescription>Brief description of your gym.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Country</FormLabel>
              <FormControl>
                <LocationSelector
                  onCountryChange={(country) => {
                    setCountryName(country?.name || '');
                    form.setValue('country', country?.name || ''); // Set country directly as a string
                  }}
                  onStateChange={(state) => {
                    setStateName(state?.name || '');
                    form.setValue('state', state?.name || ''); // Set state separately
                  }}
                />
              </FormControl>
              <FormDescription>If your country has states, it will appear after selecting the country.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="xyz" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Headquarters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pincode</FormLabel>
                  <FormControl>
                    <Input placeholder="111111" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Your Pincode</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default SignUpPage;
