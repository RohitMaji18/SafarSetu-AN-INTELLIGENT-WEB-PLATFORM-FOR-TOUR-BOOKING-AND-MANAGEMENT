import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Wallet, LifeBuoy, Zap } from "lucide-react";

export const FeaturesSection = () => (
  <section className="py-20 bg-background relative overflow-hidden border-b border-border/40">
    {/* Professional Multi-layered Blur Effects */}
    <div className="absolute top-0 left-0 w-96 h-96 bg-primary/8 blur-[100px] rounded-full -translate-x-32 -translate-y-32" />
    <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/5 blur-[100px] rounded-full translate-x-32 translate-y-32" />

    <div className="container mx-auto px-6 relative z-10">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
          <Zap size={14} />
          <span>The Travlystiq Edge</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase italic tracking-tighter">
          Why Book <span className="text-secondary">With Us?</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Feature 1: Destinations */}
        <Card className="text-center border-border bg-white hover:border-primary/30 transition-all duration-300 shadow-xl shadow-foreground/5 rounded-[2rem] p-4 group">
          <CardHeader>
            <div className="h-16 w-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
               <MapPin size={32} />
            </div>
            <CardTitle className="mt-6 text-xl font-black uppercase italic text-foreground">
              Best Places
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/60 font-medium leading-relaxed">
              We hand-pick only the most beautiful and high-quality tours for your next trip.
            </p>
          </CardContent>
        </Card>

        {/* Feature 2: Pricing (Using Vibrant Orange) */}
        <Card className="text-center border-border bg-white hover:border-secondary/30 transition-all duration-300 shadow-xl shadow-foreground/5 rounded-[2rem] p-4 group">
          <CardHeader>
            <div className="h-16 w-16 mx-auto bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500">
               <Wallet size={32} />
            </div>
            <CardTitle className="mt-6 text-xl font-black uppercase italic text-foreground">
              Fair Pricing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/60 font-medium leading-relaxed">
              Find a lower price elsewhere? We'll match it. No hidden fees, just honest deals.
            </p>
          </CardContent>
        </Card>

        {/* Feature 3: Support */}
        <Card className="text-center border-border bg-white hover:border-primary/30 transition-all duration-300 shadow-xl shadow-foreground/5 rounded-[2rem] p-4 group">
          <CardHeader>
            <div className="h-16 w-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
               <LifeBuoy size={32} />
            </div>
            <CardTitle className="mt-6 text-xl font-black uppercase italic text-foreground">
              24/7 Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/60 font-medium leading-relaxed">
              Our travel experts are always here to help you, from booking until you get home.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  </section>
);