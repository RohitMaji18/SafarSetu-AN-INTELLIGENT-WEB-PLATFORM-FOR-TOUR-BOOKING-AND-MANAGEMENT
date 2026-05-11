import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllTours } from "../../services/api";
import { CurrencyContext } from "../../context/CurrencyContext";
import { ArrowUpRight, Star, Zap } from "lucide-react";

export const TopToursSection = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { formatPrice } = useContext(CurrencyContext);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const response = await getAllTours();
        const toursData =
          response.data.tours ||
          response.data.data?.tours ||
          response.data ||
          [];
        setTours(toursData);
      } catch (err) {
        setError("Could not fetch tours.");
      }
      setLoading(false);
    };
    fetchTours();
  }, []);

  let content;
  if (loading) {
    content = <p className="text-center font-black uppercase tracking-widest text-primary animate-pulse py-20">Finding the best trips for you...</p>;
  } else if (error) {
    content = <p className="text-center text-secondary font-bold py-20">{error}</p>;
  } else {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {tours.slice(0, 3).map((tour) => (
          /* Card: Simple with white background and soft shadows */
          <Card key={tour._id} className="overflow-hidden group border border-border bg-white rounded-[2rem] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
            
            {/* Image Area - Proper & Clear */}
            <div className="relative overflow-hidden h-64">
              <img
                src={`${import.meta.env.VITE_API_BASE_URL?.replace('/api/v1', '') || 'http://localhost:3000'}/${tour.image[2] || tour.image[0]}`}
                alt={tour.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Badge using Vibrant Orange */}
              <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
                <Star size={10} fill="white" /> Best Seller
              </div>
            </div>
            
            <CardHeader className="space-y-2 pt-6">
              <CardTitle className="text-2xl font-black uppercase italic tracking-tighter text-foreground leading-none">
                {tour.title}
              </CardTitle>
              <CardDescription className="text-xs font-bold text-foreground/50 uppercase tracking-widest">
                {tour.highlights[0] || "Special Adventure"}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex justify-between items-center mt-4 pt-6 border-t border-border/50">
                <div className="flex flex-col">
                    <span className="text-[9px] font-black text-foreground/40 uppercase tracking-widest mb-1">Total Price</span>
                    {/* Vibrant Orange Price */}
                    <p className="text-2xl font-black text-secondary">
                      {formatPrice(tour.price)}
                    </p>
                </div>
                {/* Simple Action Button */}
                <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-xl font-bold uppercase text-[10px] tracking-widest px-6 h-12 shadow-lg transition-all">
                  <Link to={`/tours/${tour._id}`} className="flex items-center gap-2">
                    Book Now <ArrowUpRight size={16} />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Professional Blur Background */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
              <Zap size={14} />
              <span>Handpicked For You</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase italic tracking-tighter leading-none">
                Popular <span className="text-secondary">Tours</span>
            </h2>
        </div>

        {content}
        
        {/* Simple Footer Link */}
        <div className="mt-16 text-center">
          <Link to="/tours" className="text-sm font-black uppercase tracking-widest text-foreground/40 hover:text-secondary transition-colors inline-flex items-center gap-2">
             View All Adventures <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};