import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Pencil, Trash2 } from 'lucide-react';

// Placeholder Data
const pastOrders = [
  {
    id: "EE-84635",
    date: "2024-05-20",
    status: "Delivered",
    total: 58.90,
  },
  {
    id: "EE-82194",
    date: "2024-05-12",
    status: "Delivered",
    total: 32.50,
  },
  {
    id: "EE-79812",
    date: "2024-04-28",
    status: "Delivered",
    total: 75.15,
  },
];

const savedAddresses = [
    {
        id: 'addr1',
        type: 'Home',
        line1: '123 Pixel Lane',
        city: 'Digital City',
        zip: '98765'
    },
    {
        id: 'addr2',
        type: 'Work',
        line1: '456 Byte Avenue, Suite 200',
        city: 'Digital City',
        zip: '98766'
    }
];

const AccountPage = () => {
  console.log('AccountPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 font-serif">My Account</h1>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto bg-zinc-800 border-zinc-700">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6">
            <Card className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 text-white">
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
                <CardDescription className="text-zinc-400">
                  Manage your personal information and password.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Alex Ryder" className="bg-zinc-800 border-zinc-700 text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="alex.ryder@example.com" className="bg-zinc-800 border-zinc-700 text-white" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" className="bg-zinc-800 border-zinc-700 text-white" />
                </div>
                <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Order History Tab */}
          <TabsContent value="orders" className="mt-6">
            <Card className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 text-white">
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription className="text-zinc-400">
                  View your past orders and their details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption className="text-zinc-400">A list of your recent orders.</TableCaption>
                  <TableHeader>
                    <TableRow className="border-zinc-700 hover:bg-zinc-800/50">
                      <TableHead className="text-white">Order ID</TableHead>
                      <TableHead className="text-white">Date</TableHead>
                      <TableHead className="text-white">Status</TableHead>
                      <TableHead className="text-right text-white">Total</TableHead>
                      <TableHead className="text-center text-white">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastOrders.map((order) => (
                      <TableRow key={order.id} className="border-zinc-800 hover:bg-zinc-800/50">
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                           <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-400">
                             {order.status}
                           </span>
                        </TableCell>
                        <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                        <TableCell className="text-center">
                          <Button variant="link" className="text-amber-500 hover:text-amber-400">View Invoice</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved Addresses Tab */}
          <TabsContent value="addresses" className="mt-6">
             <Card className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 text-white">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Saved Addresses</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Manage your delivery addresses.
                        </CardDescription>
                    </div>
                    <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">Add New Address</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {savedAddresses.map((address) => (
                        <div key={address.id} className="p-4 rounded-lg border border-zinc-800 bg-zinc-900 flex justify-between items-start">
                            <div>
                                <p className="font-semibold text-zinc-100">{address.type}</p>
                                <p className="text-zinc-400">{address.line1}</p>
                                <p className="text-zinc-400">{address.city}, {address.zip}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="icon">
                                    <Pencil className="h-4 w-4 text-zinc-400 hover:text-amber-500" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4 text-zinc-400 hover:text-red-500" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AccountPage;