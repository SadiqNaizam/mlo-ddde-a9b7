import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import DishCard from '../components/DishCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Placeholder data for dishes, categorized for the tabs
const dishes = [
  // Appetizers
  {
    id: 'app1',
    category: 'appetizers',
    imageUrl: 'https://images.unsplash.com/photo-1541592106381-b58e7c1361ea?q=80&w=1974&auto=format&fit=crop',
    title: 'Sizzling Garlic Prawns',
    description: 'Juicy prawns sautéed in garlic-infused olive oil with a hint of chili and fresh parsley.',
    price: 18.50,
  },
  {
    id: 'app2',
    category: 'appetizers',
    imageUrl: 'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?q=80&w=2070&auto=format&fit=crop',
    title: 'Burrata & Prosciutto',
    description: 'Creamy burrata served with thinly sliced prosciutto, ripe tomatoes, and a balsamic glaze.',
    price: 16.00,
  },
  {
    id: 'app3',
    category: 'appetizers',
    imageUrl: 'https://images.unsplash.com/photo-1625944022213-91a51493035c?q=80&w=1964&auto=format&fit=crop',
    title: 'Tuna Tartare Towers',
    description: 'Fresh Ahi tuna, avocado, and mango, stacked and drizzled with a wasabi-soy dressing.',
    price: 22.00,
  },
  
  // Main Courses
  {
    id: 'main1',
    category: 'main-courses',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop',
    title: 'Pan-Seared Salmon',
    description: 'Crispy-skin salmon served on a bed of asparagus risotto with a lemon-dill sauce.',
    price: 32.00,
  },
  {
    id: 'main2',
    category: 'main-courses',
    imageUrl: 'https://images.unsplash.com/photo-1565299715629-8f00d3d41579?q=80&w=1974&auto=format&fit=crop',
    title: 'Filet Mignon',
    description: 'A 8oz center-cut filet, perfectly grilled, served with truffle mashed potatoes and red wine reduction.',
    price: 48.00,
  },
  {
    id: 'main3',
    category: 'main-courses',
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e326e22e3924?q=80&w=2080&auto=format&fit=crop',
    title: 'Lobster Ravioli',
    description: 'Handmade ravioli filled with rich lobster meat, tossed in a creamy saffron and cherry tomato sauce.',
    price: 35.00,
  },
   {
    id: 'main4',
    category: 'main-courses',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop',
    title: 'Elevate Burger',
    description: 'Wagyu beef patty, aged cheddar, truffle aioli, and caramelized onions on a brioche bun.',
    price: 25.00,
  },

  // Desserts
  {
    id: 'des1',
    category: 'desserts',
    imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1964&auto=format&fit=crop',
    title: 'Molten Chocolate Lava Cake',
    description: 'A rich, decadent chocolate cake with a gooey, molten center, served with vanilla bean ice cream.',
    price: 14.00,
  },
  {
    id: 'des2',
    category: 'desserts',
    imageUrl: 'https://images.unsplash.com/photo-1567197992922-54483a99ac52?q=80&w=1935&auto=format&fit=crop',
    title: 'Deconstructed Tiramisu',
    description: 'Espresso-soaked ladyfingers, mascarpone cream, and cocoa powder presented in a modern style.',
    price: 15.00,
  },

  // Drinks
  {
    id: 'drk1',
    category: 'drinks',
    imageUrl: 'https://images.unsplash.com/photo-1550422979-4a040b2b80a6?q=80&w=1974&auto=format&fit=crop',
    title: 'Smoked Old Fashioned',
    description: 'Bourbon, bitters, and a hint of orange, smoked with applewood chips for a complex finish.',
    price: 18.00,
  },
  {
    id: 'drk2',
    category: 'drinks',
    imageUrl: 'https://images.unsplash.com/photo-1609345265449-74cf3c89547b?q=80&w=1974&auto=format&fit=crop',
    title: 'Passionfruit Spritz',
    description: 'A refreshing mix of prosecco, passionfruit liqueur, and a splash of soda.',
    price: 16.00,
  },
];

const categories = ['appetizers', 'main-courses', 'desserts', 'drinks'];

const MenuPage = () => {
  console.log('MenuPage loaded');

  return (
    <div className="bg-zinc-950 min-h-screen text-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-serif">Our Menu</h1>
            <p className="mt-4 text-lg text-zinc-400">Crafted with passion, served with elegance.</p>
          </div>

          <Tabs defaultValue="appetizers" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-zinc-800 mb-8">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize data-[state=active]:bg-zinc-700 data-[state=active]:text-white">
                  {category.replace('-', ' ')}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {dishes
                    .filter((dish) => dish.category === category)
                    .map((dish) => (
                      <DishCard
                        key={dish.id}
                        id={dish.id}
                        imageUrl={dish.imageUrl}
                        title={dish.title}
                        description={dish.description}
                        price={dish.price}
                      />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MenuPage;