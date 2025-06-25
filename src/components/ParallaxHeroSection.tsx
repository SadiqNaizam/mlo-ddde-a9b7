import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const ParallaxHeroSection: React.FC = () => {
  console.log('ParallaxHeroSection loaded');

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax effect for the background image
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Parallax and fade effect for the foreground content
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div
      ref={ref}
      className="w-full h-screen overflow-hidden relative grid place-items-center"
      aria-labelledby="hero-title"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop')`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          y: backgroundY,
        }}
        role="img"
        aria-label="A gourmet dish prepared by a chef"
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 z-10 bg-black/60" />

      <motion.div
        className="relative z-20 flex flex-col items-center text-center text-white p-4"
        style={{
          y: textY,
          opacity: textOpacity,
        }}
      >
        <h1 id="hero-title" className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-shadow-lg font-serif">
          Elevate Eats
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl mb-8 text-neutral-200">
          A Culinary Experience, Delivered to Your Doorstep.
        </p>
        <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-full px-8 py-6 text-lg transition-transform duration-300 hover:scale-105">
          <Link to="/menu">
            View Menu
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default ParallaxHeroSection;