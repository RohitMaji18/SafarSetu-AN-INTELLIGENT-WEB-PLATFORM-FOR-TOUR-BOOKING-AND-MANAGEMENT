import React, { useState, useEffect } from "react";
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

export const TopToursSection = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(tours);

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
  console.log(tours);

  let content;
  if (loading) {
    content = <p className="text-center">Loading popular tours...</p>;
  } else if (error) {
    content = <p className="text-center text-destructive">{error}</p>;
  } else {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tours.slice(0, 3).map((tour) => (
          <Card key={tour._id} className="overflow-hidden">
            <img
              src={`http://localhost:3000/${tour.image[2]}`}
              alt={tour.title}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle>{tour.title}</CardTitle>
              <CardDescription>{tour.highlights[0]}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <p className="text-xl font-bold text-primary">
                  ₹{tour.price.toLocaleString("en-IN")}
                </p>
                <Button asChild>
                  <Link to={`/tours/${tour._id}`}>Book Now</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-card border-y">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Most Popular Tours
        </h2>
        {content}
      </div>
    </section>
  );
};
