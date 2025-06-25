import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CreditCard, Truck } from 'lucide-react';

// Define the validation schema using Zod
const checkoutFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  address: z.string().min(5, { message: "Address is too short." }),
  city: z.string().min(2, { message: "City is required." }),
  postalCode: z.string().min(4, { message: "Postal code is required." }),
  
  cardName: z.string().min(2, { message: "Name on card is required." }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: "Please enter a valid 16-digit card number." }),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Please use MM/YY format." }),
  cardCvc: z.string().regex(/^\d{3,4}$/, { message: "Please enter a valid CVC." }),
});

// Placeholder data for the order summary
const orderSummary = {
  items: [
    { id: '1', name: 'Truffle Risotto', price: 28.00, quantity: 1 },
    { id: '2', name: 'Seared Scallops', price: 35.50, quantity: 1 },
  ],
  shipping: 5.00,
};

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');

  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
      cardName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
    },
  });

  const subtotal = orderSummary.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + orderSummary.shipping;

  function onSubmit(values: z.infer<typeof checkoutFormSchema>) {
    console.log('Form Submitted:', values);
    toast.success("Order Placed!", {
      description: "Thank you for your purchase. A confirmation has been sent to your email.",
    });
    // Here you would typically handle payment processing and order creation
    form.reset();
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <Header />
      <main className="flex-grow container py-12 px-4">
        <h1 className="text-4xl font-bold font-serif mb-8 text-center">Checkout</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left side: Form Fields */}
            <div className="lg:col-span-2 space-y-8">
              {/* Delivery Information */}
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Truck className="mr-3 h-6 w-6 text-emerald-400" />
                    Delivery Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} className="bg-zinc-800 border-zinc-700 focus:border-emerald-500" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="you@example.com" {...field} className="bg-zinc-800 border-zinc-700 focus:border-emerald-500" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem><FormLabel>Street Address</FormLabel><FormControl><Input placeholder="123 Gastronomy Lane" {...field} className="bg-zinc-800 border-zinc-700 focus:border-emerald-500" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="New York" {...field} className="bg-zinc-800 border-zinc-700 focus:border-emerald-500" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="postalCode" render={({ field }) => (
                      <FormItem><FormLabel>Postal Code</FormLabel><FormControl><Input placeholder="10001" {...field} className="bg-zinc-800 border-zinc-700 focus:border-emerald-500" /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Details */}
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <CreditCard className="mr-3 h-6 w-6 text-emerald-400" />
                    Payment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField control={form.control} name="cardName" render={({ field }) => (
                    <FormItem><FormLabel>Name on Card</FormLabel><FormControl><Input placeholder="John Doe" {...field} className="bg-zinc-800 border-zinc-700 focus:border-emerald-500" /></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={form.control} name="cardNumber" render={({ field }) => (
                    <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="•••• •••• •••• ••••" {...field} className="bg-zinc-800 border-zinc-700 focus:border-emerald-500" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="cardExpiry" render={({ field }) => (
                      <FormItem><FormLabel>Expiry (MM/YY)</FormLabel><FormControl><Input placeholder="MM/YY" {...field} className="bg-zinc-800 border-zinc-700 focus:border-emerald-500" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="cardCvc" render={({ field }) => (
                      <FormItem><FormLabel>CVC</FormLabel><FormControl><Input placeholder="123" {...field} className="bg-zinc-800 border-zinc-700 focus:border-emerald-500" /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right side: Order Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-zinc-900/50 border-zinc-800 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {orderSummary.items.map(item => (
                      <li key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} x{item.quantity}</span>
                        <span className="text-zinc-300">${item.price.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <Separator className="bg-zinc-700" />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Shipping</span>
                      <span>${orderSummary.shipping.toFixed(2)}</span>
                    </div>
                  </div>
                  <Separator className="bg-zinc-700" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-emerald-400">${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" size="lg" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
                    Place Order
                  </Button>
                </CardFooter>
              </Card>
            </div>

          </form>
        </Form>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;