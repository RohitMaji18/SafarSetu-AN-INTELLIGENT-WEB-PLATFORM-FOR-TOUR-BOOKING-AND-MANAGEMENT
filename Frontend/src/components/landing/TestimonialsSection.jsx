import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star, Zap } from "lucide-react";

export const TestimonialsSection = ({ reviews = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsPerView = 3;

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (reviews.length <= reviewsPerView) return; // No need to slide if we have 3 or fewer reviews

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % (reviews.length - reviewsPerView + 1)
      );
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [reviews.length]);

  // Date format helper: "2024-03-16" -> "March 2024"
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  // Name Initials helper: "Rohit Kumar" -> "RK"
  const getInitials = (name) => {
    return name
      ? name.split(" ").map(n => n[0]).join("").toUpperCase()
      : "U";
  };

  // Get the current visible reviews
  const visibleReviews = reviews.slice(currentIndex, currentIndex + reviewsPerView);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Professional Blur Background Effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/8 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Area */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            <Zap size={12} fill="currentColor" />
            <span>Verified Feedbacks</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase italic tracking-tighter leading-none">
            Traveler <span className="text-secondary">Stories</span>
          </h2>
        </div>

        {/* Dynamic Mapping - Auto-sliding Reviews */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / reviewsPerView)}%)` }}
          >
            {reviews.length > 0 ? (
              reviews.map((item, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-full md:w-1/3 px-4"
                  style={{ minWidth: `${100 / reviewsPerView}%` }}
                >
                  <Card className="border border-border bg-white rounded-[2rem] p-8 shadow-xl shadow-foreground/5 transition-all duration-300 hover:border-secondary/30 group h-full">
                    <CardContent className="p-0 flex flex-col h-full">
                      
                      {/* Rating: Using your 'rating' field */}
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={i < item.rating ? "text-secondary fill-secondary" : "text-border"} 
                          />
                        ))}
                      </div>

                      <Quote className="h-8 w-8 text-secondary/20 group-hover:text-secondary transition-colors mb-4" />
                      
                      {/* Comment: Using your 'comment' field */}
                      <p className="text-foreground/70 font-medium italic leading-relaxed text-lg flex-grow">
                        "{item.comment}"
                      </p>
                      
                      <div className="flex items-center mt-10 pt-6 border-t border-border/50">
                        <Avatar className="h-12 w-12 border-2 border-secondary/20 group-hover:border-secondary transition-all">
                          {/* Photo: Using your 'photo' field */}
                          {item.photo ? (
                            <AvatarImage src={item.photo} alt={item.name} />
                          ) : (
                            <AvatarFallback className="bg-secondary text-white font-black text-xs">
                              {getInitials(item.name)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        
                        <div className="ml-4">
                          {/* Name: Using your 'name' field */}
                          <p className="font-black uppercase italic text-foreground tracking-tight leading-none">
                            {item.name}
                          </p>
                          {/* Date: Using your 'createdAt' field */}
                          <p className="text-[9px] font-bold text-foreground/40 uppercase tracking-widest mt-1">
                            {formatDate(item.createdAt)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))
            ) : (
              <div className="w-full text-center text-foreground/30 font-bold uppercase py-10">
                No reviews available yet.
              </div>
            )}
          </div>
        </div>

        {/* Progress Indicators */}
        {reviews.length > reviewsPerView && (
          <div className="flex justify-center mt-12 space-x-2">
            {Array.from({ length: reviews.length - reviewsPerView + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentIndex 
                    ? 'bg-secondary scale-125' 
                    : 'bg-secondary/30 hover:bg-secondary/50'
                }`}
                aria-label={`Go to review set ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};