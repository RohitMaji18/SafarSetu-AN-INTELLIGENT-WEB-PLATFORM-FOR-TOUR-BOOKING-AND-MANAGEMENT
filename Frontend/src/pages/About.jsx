import React from "react";
import { ShieldCheck, Target, Users, Zap, Compass, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Global Tours", value: "12+" },
    { label: "Happy Travelers", value: "1k+" },
    { label: "Expert Guides", value: "50+" },
    { label: "Partner Agencies", value: "20+" },
  ];

  const values = [
    {
      icon: <ShieldCheck className="text-secondary" size={30} />,
      title: "Secure Travel",
      desc: "Your safety is our priority with verified operators and 24/7 travel tracking support.",
    },
    {
      icon: <Target className="text-secondary" size={30} />,
      title: "Curated Luxury",
      desc: "Every itinerary is hand-picked to ensure a premium, hassle-free experience.",
    },
    {
      icon: <Users className="text-secondary" size={30} />,
      title: "Community First",
      desc: "Building a network of explorers who share a passion for the unknown and authentic.",
    },
  ];

  return (
    <div className="bg-background min-h-screen pb-20 text-left">
      {/* 1. HERO SECTION */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/5 via-transparent to-transparent -z-10" />
        
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-secondary">
            <Compass size={14} /> Established 2025
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground uppercase leading-none">
            Beyond <span className="text-secondary italic">Boundaries.</span>
          </h1>
          <p className="text-lg md:text-2xl text-foreground/50 font-medium italic max-w-3xl mx-auto leading-relaxed">
            "Explore India's most hidden treasures, powered by intelligence and luxury."
          </p>
        </div>
      </section>

      {/* 2. STATS GRID - Clean & Floating */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 mb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="bg-white border border-border p-10 rounded-[3rem] shadow-sm text-center transition-all hover:border-secondary/20"
            >
              <div className="text-5xl font-black text-foreground mb-2 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-[10px] font-black text-secondary uppercase tracking-[0.3em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. THE STORY SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center border-t border-border">
        <div className="relative group">
          <div className="absolute -inset-4 bg-secondary/10 rounded-[4.5rem] blur-2xl group-hover:bg-secondary/20 transition-all" />
          <img 
            src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2070" 
            alt="Adventure" 
            className="relative rounded-[4rem] object-cover h-[550px] w-full shadow-2xl"
          />
        </div>
        <div className="space-y-8">
          <h2 className="text-5xl font-black tracking-tight uppercase italic leading-none text-foreground">
            Our Visionary <br />
            <span className="text-secondary not-italic">Approach.</span>
          </h2>
          <p className="text-lg text-foreground/60 leading-relaxed font-medium italic">
            Founded by <span className="text-foreground font-black border-b-2 border-secondary">Rohit Maji</span>, this platform was born out of a desire to bridge the gap between complex travel planning and authentic experiences. We believe technology should empower exploration, not replace it.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-4 p-6 bg-white border border-border rounded-3xl">
                <div className="h-10 w-10 bg-secondary/10 flex items-center justify-center rounded-xl text-secondary">
                  <Globe size={20} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground">Global Operations</span>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white border border-border rounded-3xl">
                <div className="h-10 w-10 bg-secondary/10 flex items-center justify-center rounded-xl text-secondary">
                  <Zap size={20} fill="currentColor" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground">AI-Powered Tech</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE VALUES */}
      <section className="bg-secondary/[0.03] py-24 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-left mb-16 space-y-4">
            <p className="text-secondary font-black uppercase tracking-[0.4em] text-[10px]">What we stand for</p>
            <h2 className="text-5xl font-black uppercase italic tracking-tighter text-foreground">Core <span className="text-secondary">Values.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white p-12 rounded-[3.5rem] border border-border space-y-6 hover:shadow-2xl hover:border-secondary/20 transition-all group">
                <div className="p-4 bg-secondary/10 w-fit rounded-2xl group-hover:scale-110 transition-transform">
                  {v.icon}
                </div>
                <h3 className="text-2xl font-black uppercase italic tracking-tight text-foreground">{v.title}</h3>
                <p className="text-foreground/50 font-medium leading-relaxed italic">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-6 pt-32">
        <div className="bg-foreground p-16 md:p-24 rounded-[4rem] text-white text-center relative overflow-hidden shadow-2xl">
          {/* Subtle Orange Glow in Dark CTA */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-[100px] -mr-20 -mt-20" />
          
          <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-10 leading-none">
            Start Your <br /> <span className="text-secondary">Next Story.</span>
          </h2>
          <button 
            onClick={() => navigate("/tours")}
            className="bg-secondary text-white px-12 py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-secondary/90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-secondary/20"
          >
            Explore All Tours
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;