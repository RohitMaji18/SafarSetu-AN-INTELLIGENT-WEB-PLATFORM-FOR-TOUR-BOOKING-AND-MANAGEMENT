import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative h-[85vh] flex items-center justify-center text-center overflow-hidden">
      
      {/* 1. BACKGROUND IMAGE - Professional Blur Effect */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 z-10" />
        {/* Professional Blur Decorative Element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-secondary/5 blur-[120px] pointer-events-none" /> 
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2070&q=80"
          alt="Travel Nature Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. SIMPLE CONTENT */}
      <div className="relative z-20 max-w-4xl px-6">
        
        {/* Simple Badge - Using your new Vibrant Orange */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary text-white rounded-full mb-8 shadow-lg">
          <Zap size={14} fill="white" />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Smart AI Travel Assistant
          </span>
        </div>

        {/* Heading - Clean & Bold with Vibrant Orange */}
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase italic leading-[0.9] mb-8">
          Incredible Trips <br /> 
          <span className="text-secondary">Made Simple.</span>
        </h1>

        {/* Easy English Paragraph */}
        <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto font-medium mb-12 leading-relaxed">
          Discover the world's most beautiful places and book your dream tour easily. 
          We help you plan everything in just a few clicks.
        </p>

        {/* Clean Buttons - Using Primary Blue */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl px-12 h-16 text-lg transition-all shadow-xl">
            <Link to="/tours" className="flex items-center gap-2">
              Explore All Tours <ArrowRight size={22} />
            </Link>
          </Button>
          
          <Link to="/about" className="text-white/80 hover:text-white font-bold uppercase tracking-widest text-xs border-b border-white/30 pb-1 transition-all">
            How It Works
          </Link>
        </div>

        {/* Bottom Stats - Very Simple */}
        <div className="mt-20 flex justify-center gap-16">
           <div className="text-center">
              <p className="text-2xl font-black text-white">500+</p>
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Tours</p>
           </div>
           <div className="text-center">
              <p className="text-2xl font-black text-white">12K+</p>
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Travelers</p>
           </div>
           <div className="text-center">
              <p className="text-2xl font-black text-secondary">99%</p>
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Accuracy</p>
           </div>
        </div>

      </div>
    </section>
  );
};