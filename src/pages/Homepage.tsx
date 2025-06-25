import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ParallaxHeroSection from '@/components/ParallaxHeroSection';
import DishCard from '@/components/DishCard';

// Shadcn/UI Components
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Placeholder data for featured dishes
const featuredDishes = [
  {
    id: 'dish-1',
    imageUrl: 'https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=2059&auto=format&fit=crop',
    title: 'Seared Scallops & Risotto',
    description: 'Delicate seared scallops served on a bed of creamy saffron risotto, finished with a lemon-butter sauce.',
    price: 28.50,
  },
  {
    id: 'dish-2',
    imageUrl: 'https://images.unsplash.com/photo-1605472074938-1257d188b7b4?q=80&w=1974&auto=format&fit=crop',
    title: 'Premium Wagyu Burger',
    description: 'A juicy 8oz Wagyu beef patty with truffle aioli, aged cheddar, and crispy onions on a brioche bun.',
    price: 24.00,
  },
  {
    id: 'dish-3',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop',
    title: 'Spicy Tuna on Crispy Rice',
    description: 'A perfect bite of spicy tuna tartare with a hint of jalapeño and eel sauce, served on crispy fried rice.',
    price: 18.00,
  },
];


const Homepage = () => {
  console.log('Homepage loaded');

  return (
    <div className="bg-zinc-950 text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ParallaxHeroSection />

        <section id="featured-dishes" className="py-20 sm:py-24 bg-zinc-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-serif">
                A Taste of What's to Come
              </h2>
              <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
                Discover our chef's curated selections, crafted with passion and the finest ingredients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDishes.map((dish) => (
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

            <div className="text-center mt-16">
              <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-full px-8 py-6 text-lg transition-transform duration-300 hover:scale-105">
                <Link to="/menu"> {/* Path from App.tsx */}
                  Explore The Full Menu
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;