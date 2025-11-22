import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Wallet, LifeBuoy } from "lucide-react";

export const FeaturesSection = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">
        Why Book With Travlystiq?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="text-center">
          <CardHeader>
            <MapPin className="h-10 w-10 mx-auto text-primary" />
            <CardTitle className="mt-4">Curated Destinations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We hand-pick only the highest quality tours and destinations.
            </p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <Wallet className="h-10 w-10 mx-auto text-primary" />
            <CardTitle className="mt-4">Best Price Guarantee</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Find a lower price? We'll match it. Book stress-free.
            </p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <LifeBuoy className="h-10 w-10 mx-auto text-primary" />
            <CardTitle className="mt-4">24/7 Expert Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our team is always here to help, from booking to your return.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);
