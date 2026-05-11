import React, { useContext, useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTour, getTourWeather, getTourReviews, getAIRecommendation, postTourReview } from "../services/api";
import TourDetails from "../components/TourDetails/TourDetails";
import TourMap from "../components/TourDetails/TourMap";
import BookingForm from "../components/TourDetails/BookingForm";
import { CurrencyContext } from "../context/CurrencyContext";
import AuthContext from "../context/AuthContext";
import { toast } from "sonner";
import { 
  CloudSun, Star, Activity, MapPin, 
  Calendar, Users, Info, Loader2 
} from "lucide-react";

export default function TourPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { formatPrice } = useContext(CurrencyContext);
  
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [aiItinerary, setAiItinerary] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  const tourRating = useMemo(() => {
    if (!reviews?.length) return tour?.rating || 4.9;
    const total = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    return total / reviews.length;
  }, [reviews, tour?.rating]);

  // Main Fetch Logic
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getTour(id)
      .then((res) => {
        const data = res.data?.data?.tour || res.data?.tour || res.data;
        setTour(data);
        setReviews(data?.reviews || []);
      })
      .catch(() => toast.error("Unable to load tour details."))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!tour) return;
    
    getTourWeather(tour._id || tour.id)
      .then((res) => setWeather(res.data.data?.weather || res.data.weather || res.data))
      .catch(() => console.warn("Weather offline"));

    getTourReviews(tour._id || tour.id)
      .then((res) => setReviews(res.data.data?.reviews || res.data.reviews || []))
      .catch(() => console.warn("Reviews offline"));
  }, [tour]);

  const handleBooked = () => toast.success("Booking confirmed! Get ready for your trip.");

  const handleGenerateItinerary = async () => {
    if (!user) { navigate("/login"); return; }
    setAiLoading(true);
    try {
      const response = await getAIRecommendation({
        userPreference: `Generate a fixed itinerary for the tour titled '${tour.title}', using the tour's exact duration of ${tour.duration} days. Do not create a custom duration or user-specific modifications.`,
        tourId: tour._id || tour.id,
        tourDuration: tour.duration
      });
      setAiItinerary(response.data);
      toast.success("AI Itinerary Generated.");
    } catch (err) {
      toast.error("AI Assistant is currently busy.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmitReview = useCallback(async ({ rating, comment, photo }) => {
    if (!user) {
      toast.error("Log in to leave a review.");
      navigate("/login");
      return;
    }
    try {
      await postTourReview(tour._id || tour.id, { rating, comment, photo });
      const refreshed = await getTourReviews(tour._id || tour.id);
      setReviews(refreshed.data.data?.reviews || refreshed.data.reviews || []);
      toast.success("Review submitted successfully.");
    } catch (err) {
      console.error(err);
    }
  }, [tour, user, navigate]);

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-background text-primary">
      <Loader2 className="h-10 w-10 animate-spin mb-4" />
      <p className="font-black uppercase tracking-[0.3em] text-xs">Loading Experience...</p>
    </div>
  );

  if (!tour) return (
    <div className="h-screen flex items-center justify-center bg-background text-foreground font-bold">
      Tour not found.
    </div>
  );

  return (
    <div className="bg-background min-h-screen pb-20">
      
      {/* Hero Section Component */}
      <TourDetails
        tour={tour}
        tourRating={tourRating}
        weather={weather}
        reviews={reviews}
        aiItinerary={aiItinerary}
        onGenerateItinerary={handleGenerateItinerary}
        aiLoading={aiLoading}
        user={user}
        onReviewSubmit={handleSubmitReview}
      />

      <div className="max-w-7xl mx-auto px-6 space-y-16 mt-16">

        {/* 2. STATS & WEATHER GRID */}
        <section className="grid gap-8 lg:grid-cols-2">
          {/* Weather Card */}
          <div className="bg-white border border-border p-8 rounded-[2.5rem] shadow-sm text-left">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 text-left">Current Weather</p>
                <h3 className="text-5xl font-black text-foreground mt-2">{weather?.temp ?? "--"}°C</h3>
                <p className="text-xs font-bold text-secondary uppercase tracking-widest mt-1">{weather?.description || "Update Pending"}</p>
              </div>
              <div className="p-5 bg-primary/10 rounded-2xl text-primary">
                <CloudSun size={40} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-background rounded-2xl border border-border">
                <p className="text-[9px] font-black text-foreground/40 uppercase">Humidity</p>
                <p className="text-xl font-black text-foreground mt-1">{weather?.humidity ?? "--"}%</p>
              </div>
              <div className="p-4 bg-background rounded-2xl border border-border">
                <p className="text-[9px] font-black text-foreground/40 uppercase">Wind</p>
                <p className="text-xl font-black text-foreground mt-1">{weather?.windSpeed ?? "--"} km/h</p>
              </div>
            </div>
          </div>

          {/* Experience Stats Card */}
          <div className="bg-white border border-border p-8 rounded-[2.5rem] shadow-sm text-left">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-secondary/10 rounded-xl text-secondary">
                <Activity size={24} />
              </div>
              <h3 className="text-xl font-black uppercase italic text-foreground">Experience Stats</h3>
            </div>
            <div className="space-y-6">
              {Object.entries(tour.experienceStats || { Adventure: 8, Nature: 9, Culture: 7, Relaxation: 5 }).map(([key, val]) => (
                <div key={key}>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-foreground/60 mb-2">
                    <span>{key}</span>
                    <span>{val}/10</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-secondary transition-all" style={{ width: `${val * 10}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. LOCATION & MAP (Fixed: Clean Layout as per image_b3c927.png) */}
        <section className="bg-white border border-border p-10 rounded-[3rem] shadow-sm overflow-hidden text-left">
          <div className="flex justify-between items-center mb-10 px-2">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40">The Location</p>
              <h2 className="text-4xl font-black uppercase italic text-foreground mt-1 tracking-tighter">Journey Map</h2>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full text-primary font-bold text-xs uppercase tracking-widest border border-primary/20">
              <MapPin size={16} /> {tour.location}
            </div>
          </div>
          
          {/* Map wrapper with fixed padding for better focus */}
          <div className="rounded-[2.5rem] overflow-hidden border border-border shadow-inner">
            <TourMap locationName={tour.location} />
          </div>
        </section>

        {/* 4. BOOKING SECTION */}
        <section className="bg-[#1A1C1E] p-10 md:p-16 rounded-[3rem] text-white shadow-2xl relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 blur-[100px] pointer-events-none" />
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-secondary text-[10px] font-black uppercase tracking-widest">
                <Calendar size={14} /> Secure Your Slot
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase italic leading-[0.9] tracking-tighter">
                Reserve <br /> 
                <span className="text-secondary">Your Trip.</span>
              </h2>
              <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-md">
                Pick your dates, choose your group size, and let us handle the rest. Simple, transparent, and secure.
              </p>
              <div className="flex gap-10 border-t border-white/5 pt-8">
                <div>
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Per Person</p>
                  <p className="text-3xl font-black text-white tracking-tighter">{formatPrice(tour.price)}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Max Capacity</p>
                  <p className="text-3xl font-black text-white tracking-tighter">{tour.groupSize} Pax</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] text-foreground shadow-2xl">
              <BookingForm
                tourId={tour._id || tour.id}
                tourTitle={tour.title}
                pricePerPerson={tour.price}
                onBooked={handleBooked}
                availableDates={tour.availableDates}
                groupSize={tour.groupSize}
                duration={tour.duration}
              />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}