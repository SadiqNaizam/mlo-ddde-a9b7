import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const initialCartItems: CartItem[] = [
  {
    id: 'dish-1',
    name: 'Spicy Ramen',
    price: 18.99,
    quantity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dish-2',
    name: 'Avocado Toast Deluxe',
    price: 14.50,
    quantity: 2,
    imageUrl: 'https://images.unsplash.com/photo-1484723050470-6b6n3FE842e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dish-3',
    name: 'Grilled Salmon',
    price: 24.00,
    quantity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop'
  }
];

const CartPage = () => {
  console.log('CartPage loaded');
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const navigate = useNavigate();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const taxes = subtotal * 0.08; // 8% tax
  const total = subtotal + taxes;

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white">
      <Header />
      <main className="flex-grow container py-8 md:py-16">
        <h1 className="text-4xl font-bold tracking-tight mb-8 font-serif">Your Cart</h1>
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty.</h2>
            <p className="text-zinc-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
              <Link to="/menu">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
            <div className="lg:col-span-2">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800 hover:bg-zinc-900">
                    <TableHead className="text-white">Product</TableHead>
                    <TableHead className="text-white">Quantity</TableHead>
                    <TableHead className="text-right text-white">Unit Price</TableHead>
                    <TableHead className="text-right text-white">Total</TableHead>
                    <TableHead className="w-[50px] text-white">
                      <span className="sr-only">Remove</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id} className="border-zinc-800 hover:bg-zinc-900">
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" className="h-8 w-8 bg-zinc-800 border-zinc-700 hover:bg-zinc-700" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input readOnly value={item.quantity} className="w-12 h-8 text-center bg-zinc-900 border-zinc-700" />
                          <Button variant="outline" size="icon" className="h-8 w-8 bg-zinc-800 border-zinc-700 hover:bg-zinc-700" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-medium">${(item.price * item.quantity).toFixed(2)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)} className="text-zinc-400 hover:text-red-500 hover:bg-red-500/10">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove {item.name}</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <aside className="lg:col-span-1">
              <Card className="bg-zinc-900 border-zinc-800 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-zinc-300">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Taxes & Fees</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  <hr className="border-zinc-700" />
                  <div className="flex justify-between font-bold text-lg text-white">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    size="lg" 
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-base"
                    onClick={() => navigate('/checkout')}
                  >
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;