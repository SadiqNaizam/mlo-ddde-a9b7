import React from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';

interface DishCardProps {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
}

const DishCard: React.FC<DishCardProps> = ({ id, imageUrl, title, description, price }) => {
  console.log('DishCard loaded for:', title);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent event bubbling, in case the card is ever wrapped in a link
    e.preventDefault();
    e.stopPropagation();
    
    console.log(`Adding dish ${id} (${title}) to cart.`);
    toast.success(`${title} has been added to your cart!`);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.6, 0.05, -0.01, 0.9] 
      } 
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ 
        y: -10, 
        boxShadow: '0px 20px 40px -10px rgba(0, 255, 150, 0.1)',
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      }}
      className="group cursor-pointer"
    >
      <Card className="h-full w-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 text-white flex flex-col transition-all duration-300 group-hover:border-emerald-500/30 overflow-hidden">
        <CardHeader className="p-0 relative">
          <div className="overflow-hidden">
             <img 
              src={imageUrl || 'https://via.placeholder.com/400x300'} 
              alt={title} 
              className="w-full h-48 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" 
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow space-y-2">
          <CardTitle className="text-lg font-bold text-zinc-100">{title}</CardTitle>
          <CardDescription className="text-sm text-zinc-400 line-clamp-2 h-10">{description}</CardDescription>
        </CardContent>
        <CardFooter className="p-4 pt-2 flex justify-between items-center">
          <span className="text-xl font-semibold text-emerald-400">${price.toFixed(2)}</span>
          <Button 
            onClick={handleAddToCart}
            aria-label={`Add ${title} to cart`}
            className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 ease-in-out bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default DishCard;