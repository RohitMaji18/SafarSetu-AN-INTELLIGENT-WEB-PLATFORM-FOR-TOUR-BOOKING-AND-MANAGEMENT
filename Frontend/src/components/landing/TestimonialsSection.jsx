import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

export const TestimonialsSection = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">
        What Our Travelers Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="p-6">
          <CardContent className="flex flex-col items-center text-center">
            <Quote className="h-8 w-8 text-primary mb-4" />
            <p className="italic text-muted-foreground">
              "The 'Backwaters Bliss' tour was a dream. Floating on the
              houseboat was so peaceful. Travlystiq made everything easy."
            </p>
            <div className="flex items-center mt-6">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src="https://i.pravatar.cc/150?img=5"
                  alt="Priya S."
                />
                <AvatarFallback>PS</AvatarFallback>
              </Avatar>
              <div className="ml-4 text-left">
                <p className="font-semibold">Priya S.</p>
                <p className="text-sm text-muted-foreground">
                  Traveled October 2025
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="p-6">
          <CardContent className="flex flex-col items-center text-center">
            <Quote className="h-8 w-8 text-primary mb-4" />
            <p className="italic text-muted-foreground">
              "I wasn't sure what to expect from the 'Sands of the Thar' desert
              night, but it was magical. The cultural performances were
              incredible!"
            </p>
            <div className="flex items-center mt-6">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src="https://i.pravatar.cc/150?img=12"
                  alt="Rohan K."
                />
                <AvatarFallback>RK</AvatarFallback>
              </Avatar>
              <div className="ml-4 text-left">
                <p className="font-semibold">Rohan K.</p>
                <p className="text-sm text-muted-foreground">
                  Traveled September 2025
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);
