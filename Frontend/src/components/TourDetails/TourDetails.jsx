import React from "react";
import TourGallery from "./TourGallery";
import BookingForm from "./BookingForm";

export default function TourDetails({ tour, onBooked }) {
  if (!tour) return null;

  // normalize images (backend uses `image` array with relative paths)
  const images =
    tour.image?.map((p) =>
      p.startsWith("http") ? p : `http://localhost:3000/${p}`
    ) || [];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold">{tour.title}</h1>
        <p className="text-muted-foreground mt-2">
          {tour.location} • {tour.duration} Days • ⭐ {tour.rating}
        </p>
      </div>

      <TourGallery images={images} />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-semibold">About this tour</h2>
          <p className="text-base leading-relaxed">{tour.description}</p>

          {tour.highlights?.length ? (
            <div>
              <h3 className="text-lg font-medium mt-4">Highlights</h3>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                {tour.highlights.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <aside className="bg-card p-6 rounded-lg shadow-sm">
          <div className="mb-4">
            <div className="text-sm text-muted-foreground">Price</div>
            <div className="text-2xl font-bold">
              ₹{Number(tour.price).toLocaleString("en-IN")}
            </div>
            <div className="text-sm text-muted-foreground">Per person</div>
          </div>

          <BookingForm
            tourId={tour._id || tour.id}
            tourTitle={tour.title}
            pricePerPerson={tour.price}
            onBooked={onBooked}
            availableDates={tour.availableDates}
          />
        </aside>
      </div>
    </div>
  );
}
