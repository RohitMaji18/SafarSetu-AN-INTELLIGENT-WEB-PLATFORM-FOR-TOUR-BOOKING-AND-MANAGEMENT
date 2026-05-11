import React, { useEffect, useState } from "react";
import { HeroSection } from "../components/landing/HeroSection";
import { FeaturesSection } from "../components/landing/FeaturesSection";
import { TopToursSection } from "../components/landing/TopToursSection";
import { TestimonialsSection } from "../components/landing/TestimonialsSection";
import { CallToActionSection } from "../components/landing/CallToActionSection";
import AIPlanner from "../components/landing/AIPlanner";
import { getAllReviews } from "../services/api";

const Home = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getAllReviews();
        // Backend structure match: response.data.data.reviews
        setReviews(response.data.data.reviews || response.data.reviews || []);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-secondary selection:text-white">
      
      {/* 1. Main Entrance: The First Impression */}
      <HeroSection />

      {/* 2. AI Planner Overlap: 
          -MT-20 makes it look integrated into the Hero 
          relative z-20 ensures it stays on top */}
      <div className="relative z-20 -mt-10 md:-mt-32 px-6 max-w-7xl mx-auto w-full">
        <AIPlanner />
      </div>

      {/* 3. Value Proposition: Features Grid */}
      <section className="py-24">
        <FeaturesSection />
      </section>

      {/* 4. Trending Destinations: 
          Subtle shift to a very light sand/orange tint to separate sections */}
      <section className="bg-secondary/[0.03] py-24 border-y border-border">
        <TopToursSection />
      </section>

      {/* 5. Social Proof: Real traveler feedback */}
      <section className="py-24">
        <TestimonialsSection reviews={reviews} />
      </section>

      {/* 6. Final Conversion: The "Call to Action" */}
      <section className="pb-32 px-6">
        <CallToActionSection />
      </section>

    </div>
  );
};

export default Home;