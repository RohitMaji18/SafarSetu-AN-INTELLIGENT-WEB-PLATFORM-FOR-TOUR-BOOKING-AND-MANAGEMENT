import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Bed, MapPin, Compass, Timer, Activity, Filter, RefreshCcw, Sparkles } from "lucide-react";
import { getAllTours } from "../services/api";
import { CurrencyContext } from "../context/CurrencyContext";

function ToursPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [error, setError] = useState(null);
  
  const indianStates = [
    "Arunachal Pradesh", "Assam", "Goa", "Himachal Pradesh", "Jammu & Kashmir", 
    "Karnataka", "Kerala", "Ladakh", "Meghalaya", "Rajasthan", "Sikkim", 
    "Tamil Nadu", "Uttarakhand"
  ];

  const [filters, setFilters] = useState({
    state: "",
    difficulty: "",
    duration: "",
    priceMin: 0,
    priceMax: 50000,
  });

  const { formatPrice } = useContext(CurrencyContext);
  const baseImageUrl = import.meta.env.VITE_API_BASE_URL?.replace("/api/v1", "") || "http://localhost:3000";
  const debounceTimer = useRef(null);

  const fetchTours = useCallback(async () => {
    const hadTours = tours.length > 0;
    setError(null);
    if (hadTours) {
      setIsFiltering(true);
    } else {
      setLoading(true);
    }

    try {
      const params = {};
      if (filters.state) params.state = filters.state;
      if (filters.difficulty) params.difficulty = filters.difficulty;
      if (filters.duration) params.duration = filters.duration;
      if (filters.priceMin > 0) params.priceMin = filters.priceMin;
      if (filters.priceMax < 50000) params.priceMax = filters.priceMax;

      const response = await getAllTours(params);
      const toursData = response.data.tours || response.data.data?.tours || response.data || [];
      setTours(toursData);
    } catch (err) {
      setError("System override required. Failed to fetch data.");
    } finally {
      setLoading(false);
      setIsFiltering(false);
    }
  }, [filters, tours.length]);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchTours();
    }, 220);
    return () => clearTimeout(debounceTimer.current);
  }, [filters, fetchTours]);

  const resetFilters = () => {
    setFilters({ state: "", difficulty: "", duration: "", priceMin: 0, priceMax: 50000 });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-secondary selection:text-white">
      
      {/* Dynamic Aurora Header */}
      <div className="relative py-28 px-6 overflow-hidden border-b border-border/30 bg-white/80 backdrop-blur-sm">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/15 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[150px] rounded-full" />
        
        <div className="relative z-10 text-center space-y-6">
          {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
            <Sparkles size={12} /> Live Tour Database
          </div> */}
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">
            CHOOSE YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-secondary/80">Journey</span>
          </h1>
          <p className="max-w-2xl mx-auto text-foreground/70 font-medium tracking-[0.2em] uppercase text-[11px] leading-relaxed">
            Neural filtering active • {tours.length} verified destinations identified across the Indian sector
          </p>
        </div>
      </div>

      <section className="container mx-auto px-6 py-20 grid gap-12 lg:grid-cols-[320px_1fr]">
        
        {/* Glass Sidebar */}
        <aside className="space-y-8 sticky top-32 h-fit">
          <div className="p-8 rounded-[2.5rem] bg-white/80 border border-border/50 backdrop-blur-2xl shadow-[0_20px_50px_rgba(34,119,178,0.12)] space-y-10">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-primary">Filter Protocol</span>
              <button onClick={resetFilters} className="p-2 rounded-full bg-white/50 text-foreground hover:text-secondary transition-all hover:rotate-180">
                <RefreshCcw size={16} />
              </button>
            </div>

            {/* Region Select */}
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/50 flex items-center gap-2">
                <MapPin size={12} className="text-primary"/> Destination
              </label>
              <select
                className="w-full bg-background border border-border rounded-2xl px-5 py-4 text-sm focus:border-primary outline-none transition-all text-foreground hover:bg-white/50"
                value={filters.state}
                onChange={(e) => setFilters({...filters, state: e.target.value})}
              >
                <option value="">Global Coverage</option>
                {indianStates.map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
              </select>
            </div>

            {/* Difficulty Pills */}
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/50 flex items-center gap-2">
                <Activity size={12} className="text-primary"/> Intensity Level
              </label>
              <div className="grid grid-cols-1 gap-3">
                {['Easy', 'Moderate', 'Hard'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setFilters({...filters, difficulty: lvl})}
                    className={`py-3 px-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                      filters.difficulty === lvl ? 'bg-primary text-white border-primary shadow-[0_0_20px_rgba(34,119,178,0.25)]' : 'bg-background/80 border-border text-foreground hover:border-primary/50'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Module */}
            <div className="space-y-5">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-foreground/50">
                <span>Credit Cap</span>
                <span className="text-primary font-black italic">{formatPrice(filters.priceMax)}</span>
              </div>
              <input
                type="range" min="0" max="50000" step="1000"
                value={filters.priceMax}
                onChange={(e) => setFilters({...filters, priceMax: Number(e.target.value)})}
                className="w-full accent-primary h-[2px] bg-border/50 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div className="pt-8 border-t border-border/50 flex items-center justify-between">
                <div>
                    <p className="text-4xl font-black text-foreground leading-none tracking-tighter">{tours.length}</p>
                    <p className="text-[9px] text-foreground/50 uppercase font-black tracking-[0.2em] mt-2">Active Units</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                   <Compass size={24} className="text-primary animate-spin-slow" />
                </div>
            </div>
          </div>
        </aside>

        {/* Expedition Feed */}
        <main>
          {isFiltering && !loading && (
            <div className="mb-8 rounded-[2rem] border border-primary/20 bg-primary/10 p-4 text-sm font-black uppercase tracking-[0.25em] text-primary">
              Updating tour results... please wait.
            </div>
          )}

          {loading ? (
            <div className="grid lg:grid-cols-2 gap-10">
               {[1,2,3,4].map(i => <div key={i} className="h-[500px] bg-white/50 border border-border/30 rounded-[3.5rem] animate-pulse" />)}
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-2">
              {tours.map((tour) => (
                <Card key={tour._id} className="group relative overflow-hidden rounded-[3.5rem] border border-border/30 bg-white/80 backdrop-blur-md transition-all duration-500 hover:border-secondary/40 hover:-translate-y-2">
                  
                  {/* Image Container */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={`${baseImageUrl}/${(tour.image?.[2] || tour.image?.[0] || "").trim()}`}
                      alt={tour.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/30 to-transparent" />
                    
                    <div className="absolute top-8 left-8 px-5 py-2 rounded-full bg-secondary/10 backdrop-blur-xl border border-secondary/20 text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
                       {tour.state}
                    </div>
                  </div>

                  {/* Content Container */}
                  <CardContent className="p-10 space-y-8">
                    <div className="space-y-3">
                        <h3 className="text-3xl font-black tracking-tighter text-foreground group-hover:text-secondary transition-colors duration-300 uppercase">{tour.title}</h3>
                        <div className="flex items-center gap-6 text-[10px] font-black text-foreground/60 uppercase tracking-widest">
                            <span className="flex items-center gap-2"><Timer size={14} className="text-primary"/> {tour.duration} Days</span>
                            <span className="flex items-center gap-2"><Activity size={14} className="text-primary"/> {tour.difficulty}</span>
                            <span>{tour.groupSize} Pax</span>
                        </div>
                    </div>

                    <p className="text-sm text-foreground/70 line-clamp-2 leading-relaxed font-medium tracking-wide">
                      {tour.description}
                    </p>

                    <div className="flex items-center justify-between pt-8 border-t border-border/50">
                        <div className="space-y-1">
                            <p className="text-[9px] text-foreground/50 font-black uppercase tracking-[0.2em]">Acquisition Cost</p>
                            <p className="text-3xl font-black text-foreground italic tracking-tighter">{formatPrice(tour.price)}</p>
                        </div>
                        <Link to={`/tours/${tour._id}`}>
                          <Button className="rounded-full bg-primary hover:bg-primary/90 text-white font-black uppercase text-[11px] tracking-[0.2em] px-10 py-7 transition-all shadow-[0_10px_30px_rgba(var(--primary),0.2)]">
                            View Details
                          </Button>
                        </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </section>
    </div>
  );
}

export default ToursPage;