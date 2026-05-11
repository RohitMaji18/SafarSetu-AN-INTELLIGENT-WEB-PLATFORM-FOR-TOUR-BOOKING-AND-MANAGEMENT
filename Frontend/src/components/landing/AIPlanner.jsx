import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sparkles, MapPin, Compass, ArrowRight, Loader2, Bot } from "lucide-react";
import { toast } from "sonner";
import { getAIRecommendation } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const AIPlanner = () => {
    const [pref, setPref] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth();

    // User ka pehla naam dikhane ke liye logic
    const displayName = user?.name ? user.name.split(" ")[0] : "Traveler";

    const handleSuggest = async () => {
        if (!pref.trim()) return toast.error("Please tell us what you like first!");
        
        setLoading(true);
        setResult(null);
        try {
            const response = await getAIRecommendation({ userPreference: pref });
            if (response.data) {
                setResult(response.data);
                toast.success("We found a great trip for you!");
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        /* Pure Clean Background with Professional Blur */
        <section className="relative py-24 bg-background overflow-hidden border-t border-border/40">
            {/* Multi-layered Professional Blur Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-gradient-to-b from-secondary/10 via-secondary/5 to-transparent blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-20 left-0 w-[600px] h-[600px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative max-w-6xl mx-auto px-6 text-center">
                
                {/* Header Area */}
                <div className="mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 rounded-full text-secondary text-[10px] font-black uppercase tracking-widest mb-6">
                        <Sparkles size={14} />
                        <span>Smart AI Assistant</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase italic leading-none">
                        Where To Next, <span className="text-secondary">{displayName}?</span>
                    </h2>
                    <p className="text-foreground/60 mt-6 max-w-xl mx-auto text-lg font-medium leading-relaxed">
                        Just tell our AI your vibe (like 'peaceful' or 'mountain hiking') and we will find the best match for you.
                    </p>
                </div>

                {/* Search Bar - Clean & Easy */}
                <div className="max-w-3xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-4 p-2 bg-white border border-border shadow-xl rounded-2xl transition-all focus-within:border-secondary/50">
                        <div className="flex-1 flex items-center px-4">
                            <Bot className="text-secondary/40 mr-3" size={24} />
                            <Input 
                                placeholder="Example: I want a peaceful beach trip..." 
                                className="bg-transparent border-none text-foreground focus-visible:ring-0 h-14 text-lg placeholder:text-foreground/30"
                                value={pref}
                                onChange={(e) => setPref(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSuggest()}
                            />
                        </div>
                        {/* Primary Button with your Vibrant Orange */}
                        <Button 
                            onClick={handleSuggest} 
                            disabled={loading}
                            className="h-14 px-10 bg-secondary hover:bg-secondary/90 text-white rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg shadow-secondary/20"
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Discover Now"}
                        </Button>
                    </div>
                </div>

                {/* Result Display - Simple Card */}
                {result && (
                    <div className="mt-20 animate-in fade-in slide-in-from-bottom-5 duration-500 text-left">
                        <Card className="bg-white border-border shadow-2xl rounded-[2rem] overflow-hidden">
                            <div className="p-8 md:p-12">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-2 text-secondary font-black text-[10px] uppercase tracking-widest">
                                            <MapPin size={16} /> Best Trip Found
                                        </div>
                                        <h3 className="text-4xl md:text-5xl font-black text-foreground uppercase italic leading-tight">
                                            {result.recommendedTourName || "No matching tour found"}
                                        </h3>
                                        
                                        <div className="bg-secondary/5 border-l-4 border-secondary p-6 rounded-r-2xl">
                                            <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase mb-1">
                                                <Compass size={14} /> AI Recommendation
                                            </div>
                                            <p className="text-foreground/70 text-sm leading-relaxed italic">
                                                "{result.reason || result.message || "We could not find a matching tour."}"
                                            </p>
                                        </div>
                                    </div>

                                    {result.recommendedTourId && (
                                      <Button 
                                          className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white rounded-xl px-10 h-16 font-bold uppercase transition-all shadow-xl"
                                          onClick={() => navigate(`/tours/${result.recommendedTourId}`)}
                                      >
                                          View Details <ArrowRight size={20} className="ml-2" />
                                      </Button>
                                    )}
                                </div>

                                {/* Plan Preview - Clean List */}

                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AIPlanner;