import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import TourGallery from "./TourGallery";
import { CurrencyContext } from "../../context/CurrencyContext";
import { Button } from "@/components/ui/button";import { toast } from "sonner";import {
  CheckCircle2, Star, MapPin, Clock, Sparkles, 
  Users, ShieldCheck, Utensils, Plane, Bed, Car, Map
} from "lucide-react";

export default function TourDetails({ 
  tour, 
  tourRating, 
  weather, 
  aiItinerary, 
  reviews, 
  onGenerateItinerary, 
  aiLoading, 
  user, 
  onReviewSubmit 
}) {
  const navigate = useNavigate();
  const { formatPrice } = useContext(CurrencyContext);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  const backendBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace("/api/v1", "") || "http://localhost:3000";

  const sortedReviews = useMemo(
    () => [...(reviews || [])].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [reviews]
  );

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!onReviewSubmit || typeof onReviewSubmit !== 'function') {
      console.error('onReviewSubmit is not a function');
      toast.error("Review submission failed. Please try again.");
      return;
    }
    if (!reviewComment.trim()) {
      toast.error("Please write a comment before posting.");
      return;
    }
    setReviewSubmitting(true);
    try {
      await onReviewSubmit({ rating: reviewRating, comment: reviewComment.trim() });
      setReviewComment("");
      setReviewRating(5);
    } catch (err) {
      console.error("Review error:", err);
      toast.error("Failed to post review. Please try again.");
    } finally {
      setReviewSubmitting(false);
    }
  };

  const images = useMemo(() => {
    if (!tour?.image || tour.image.length === 0) return ["https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80"];
    return tour.image.map((p) => {
      const cleanPath = typeof p === "string" ? p.trim() : "";
      return cleanPath.startsWith("http") ? cleanPath : `${backendBaseUrl}/${cleanPath}`;
    });
  }, [tour, backendBaseUrl]);

  if (!tour) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 space-y-24">
      
      {/* 1. MAIN HEADER (Your Original Design with New Colors) */}
      <div className="relative overflow-hidden rounded-[3rem] border border-border bg-white p-10 shadow-2xl">
        <div className="absolute right-[-4rem] top-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute left-[-4rem] bottom-10 h-72 w-72 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col gap-10 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl space-y-8 text-left">
            <div className="inline-flex flex-wrap items-center gap-3 rounded-full border border-border bg-background px-4 py-2 text-[10px] font-black uppercase tracking-widest text-foreground/60 shadow-sm">
              <span>{reviews.length} Reviews</span>
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              <span>{tourRating?.toFixed(1) || "4.9"} Rating</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-foreground leading-[0.9]">
              {tour.title}
            </h1>

            <p className="max-w-2xl text-base leading-8 text-foreground/60 italic font-medium">
              "{tour.description}"
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-border bg-background px-4 py-2 text-[10px] font-black uppercase tracking-widest text-foreground/50">{tour.location}</span>
              <span className="rounded-full border border-border bg-background px-4 py-2 text-[10px] font-black uppercase tracking-widest text-foreground/50">{tour.duration} Days</span>
              <span className="rounded-full border border-border bg-background px-4 py-2 text-[10px] font-black uppercase tracking-widest text-foreground/50">{tour.groupSize} Pax</span>
              <span className="rounded-full border border-border bg-background px-4 py-2 text-[10px] font-black uppercase tracking-widest text-foreground/50">{tour.state}</span>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {(tour.highlights || []).slice(0, 4).map((item, index) => (
                <div key={index} className="rounded-2xl border border-border bg-background px-5 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/40 text-center">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-border bg-foreground p-8 shadow-2xl max-w-sm w-full text-left">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Starting From</p>
            <p className="text-5xl font-black text-white tracking-tight">{formatPrice(tour.price)}</p>
            <div className="mt-8 space-y-3 text-sm text-white/70 font-bold">
              <p className="flex items-center gap-3"><CheckCircle2 className="text-secondary" size={18} /> Verified local guide</p>
              <p className="flex items-center gap-3"><CheckCircle2 className="text-secondary" size={18} /> Flexible booking options</p>
              <p className="flex items-center gap-3"><CheckCircle2 className="text-secondary" size={18} /> Premium adventure support</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. INCLUSIONS GRID */}
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        {[
          { icon: <Utensils className="text-orange-500" />, title: "Meals", subtitle: tour.inclusions?.hasFood ? "Local cuisine included" : "Food not included" },
          { icon: <Bed className="text-blue-500" />, title: "Accommodation", subtitle: tour.inclusions?.hasStay ? "Comfortable stays" : "No stay included" },
          { icon: <ShieldCheck className="text-green-500" />, title: "Safety", subtitle: tour.inclusions?.hasInsurance ? "Insurance covered" : "Insurance not included" },
          { icon: <Plane className="text-purple-500" />, title: "Flights", subtitle: tour.inclusions?.hasFlights ? "Flights available" : "No flights included" },
        ].map((item, index) => (
          <div key={index} className="rounded-[2.5rem] border border-border bg-white p-8 shadow-sm text-left group hover:border-secondary/20 transition-all">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-background border border-border text-foreground group-hover:bg-secondary group-hover:text-white transition-all">{item.icon}</div>
            <h4 className="mt-6 text-xl font-black uppercase italic tracking-tighter text-foreground">{item.title}</h4>
            <p className="mt-3 text-xs font-bold uppercase text-foreground/40 tracking-widest leading-relaxed">{item.subtitle}</p>
          </div>
        ))}
      </div>

      {/* 3. GUIDE INFO (Fixed: Guide Name and Photo Restored) */}
      <div className="rounded-[3rem] border border-border bg-white p-8 shadow-xl text-left">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-secondary/20">
            <img
              src={tour.guide?.photo?.startsWith('http') ? tour.guide.photo : `${backendBaseUrl}/${tour.guide?.photo}`}
              alt={tour.guide?.name}
              className="h-full w-full object-cover"
              onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=" + tour.guide?.name }}
            />
          </div>
          <div>
            <p className="text-2xl font-black uppercase italic tracking-tighter text-foreground leading-none">{tour.guide?.name || "Local Guide"}</p>
            <p className="text-xs font-bold text-secondary uppercase tracking-widest mt-2">{tour.guide?.experience || "Expert local guide"}</p>
          </div>
        </div>

        <div className="mt-8 space-y-4 text-base font-medium text-foreground/60 leading-relaxed max-w-3xl">
          <p>Our expert guide brings deep local knowledge, safety-first planning, and seamless support throughout the journey.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-background border border-border p-4 text-[10px] font-black uppercase tracking-widest text-foreground/40">Customized route assistance</div>
            <div className="rounded-2xl bg-background border border-border p-4 text-[10px] font-black uppercase tracking-widest text-foreground/40">24/7 Travel-ready support</div>
          </div>
        </div>
      </div>

      {/* 4. AI ITINERARY (Clean Dark Section) */}
      <div className="rounded-[3rem] border border-white/5 bg-[#1A1C1E] p-10 shadow-2xl text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 blur-[100px] pointer-events-none" />
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-white/5 pb-10">
          <div>
            <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white">Tour <span className="text-secondary">Itinerary</span></h3>
            <p className="mt-3 text-sm text-gray-400">Generate an exact {tour.duration}-day itinerary using the tour's fixed schedule, not a custom trip length.</p>
          </div>
          {!aiItinerary && (
            <Button
              onClick={onGenerateItinerary}
              disabled={aiLoading}
              className="rounded-xl bg-secondary px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white hover:bg-secondary/90 transition shadow-lg shadow-secondary/20"
            >
              <Sparkles size={16} className="mr-2" />
              {aiLoading ? "Generating..." : "Create Itinerary"}
            </Button>
          )}
        </div>

        {aiItinerary ? (
          <div className="mt-10 grid gap-5">
            <p className="text-base text-gray-300 italic border-l-4 border-secondary pl-6">"{aiItinerary.reason}"</p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {aiItinerary.itinerary?.map((day) => (
                <div key={day.day} className="rounded-2xl border border-white/5 bg-white/5 p-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Day 0{day.day}</span>
                  <ul className="mt-4 space-y-2 text-xs font-medium text-gray-400">
                    {day.activities.map((activity, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-secondary">•</span> {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-white/5 bg-white/5 p-12 text-center text-xs font-black uppercase tracking-widest text-gray-600">
            Click above to unlock your personalized travel route.
          </div>
        )}
      </div>

      {/* 5. REVIEWS SECTION (Restored: Names, Ratings, Comments) */}
      <div className="rounded-[3rem] border border-border bg-white p-10 shadow-xl text-left">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-12">
          <div>
            <h3 className="text-4xl font-black uppercase italic tracking-tighter text-foreground">Traveler <span className="text-secondary">Reviews</span></h3>
            <p className="mt-2 text-xs font-bold text-foreground/40 uppercase tracking-widest">Real feedback from verified explorers.</p>
          </div>
          <div className="rounded-full border border-border bg-background px-6 py-2 text-[10px] font-black uppercase tracking-widest text-foreground/40">{reviews.length} Experiences</div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="grid gap-6 sm:grid-cols-2">
            {sortedReviews.length > 0 ? sortedReviews.map((rev) => (
              <div key={rev._id || rev.createdAt} className="rounded-[2.5rem] border border-border bg-background p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-white font-black uppercase italic">{rev.user?.name?.[0] || rev.name?.[0] || "U"}</div>
                  <div>
                    <p className="text-sm font-black uppercase italic text-foreground tracking-tight leading-none">{rev.user?.name || rev.name || "Explorer"}</p>
                    <div className="flex gap-0.5 mt-2">
                      {[...Array(5)].map((_, i) => <Star key={i} size={10} className={i < rev.rating ? "text-secondary fill-secondary" : "text-border"} />)}
                    </div>
                  </div>
                </div>
                <p className="text-sm font-medium italic text-foreground/70 leading-relaxed">"{rev.comment}"</p>
              </div>
            )) : (
              <div className="col-span-full py-12 text-center text-[10px] font-black uppercase tracking-widest text-foreground/20">No reviews yet. Share yours!</div>
            )}
          </div>

          {/* Form */}
          <div className="bg-background border border-border p-8 rounded-[2.5rem] shadow-sm h-fit sticky top-24">
            {user ? (
              <form onSubmit={handleReviewSubmit} className="space-y-6">
                <h4 className="text-xl font-black uppercase italic text-foreground leading-none mb-6">Share Your <span className="text-secondary">Story</span></h4>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 block mb-4">Select Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setReviewRating(star)} className="transition-transform active:scale-90">
                        <Star size={24} className={star <= reviewRating ? "text-secondary fill-secondary" : "text-border"} />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full rounded-2xl bg-white border border-border p-5 text-sm font-medium focus:border-secondary outline-none min-h-[150px]"
                  placeholder="How was your experience?"
                  required
                />
                <Button type="submit" disabled={reviewSubmitting} className="w-full bg-secondary text-white font-black py-6 rounded-xl uppercase tracking-widest shadow-lg shadow-secondary/20">
                  {reviewSubmitting ? "Submitting..." : "Post Review"}
                </Button>
              </form>
            ) : (
              <div className="text-center py-8">
                <p className="font-black text-foreground/40 uppercase text-[10px] tracking-widest mb-6 leading-relaxed">Login to share your experience with other travelers.</p>
                <Button onClick={() => navigate("/login")} className="w-full bg-primary text-white font-black py-6 rounded-xl uppercase tracking-widest">Login to Review</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 6. PHOTO GALLERY */}
      <section className="pb-20 border-t border-border pt-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-foreground leading-none">
            Tour <span className="text-secondary">Gallery</span>
          </h2>
        </div>
        <TourGallery images={images} />
      </section>
    </div>
  );
}