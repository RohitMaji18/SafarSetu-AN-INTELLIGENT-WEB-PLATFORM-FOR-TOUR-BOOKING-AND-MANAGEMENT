import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, ArrowRight, Zap, Headphones, MapPin } from "lucide-react";
import { toast } from "sonner";

export const CallToActionSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Thank you! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-background relative overflow-hidden">
      
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-[#1A1C1E] rounded-[3rem] p-8 md:p-16 shadow-2xl overflow-hidden relative group border border-white/5">
          
          {/* Subtle Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] group-hover:bg-secondary/20 transition-all duration-1000" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Side: Contact Info (5 Cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-secondary text-[10px] font-black uppercase tracking-[0.3em]">
                <Headphones size={14} />
                Support is Online
              </div>
              
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white uppercase italic leading-[0.85]">
                Get In <br />
                <span className="text-secondary">Touch.</span>
              </h2>
              
              <p className="text-gray-400 font-medium text-lg leading-relaxed max-w-lg">
                Have questions about our tours? Need help planning your trip? Our team is here to help you 24/7.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/10 rounded-lg flex-shrink-0">
                    <Mail size={20} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Email</p>
                    <a href="mailto:hello@travlystiq.com" className="text-white font-bold hover:text-secondary transition-colors">
                      hello@support.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/10 rounded-lg flex-shrink-0">
                    <Phone size={20} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Call Us</p>
                    <a href="tel:+911800123456" className="text-white font-bold hover:text-secondary transition-colors">
                      +91 1800 123 456
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/10 rounded-lg flex-shrink-0">
                    <MapPin size={20} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Location</p>
                    <p className="text-white font-bold">
                      NIT Agartala, Tripura
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Contact Form (7 Cols) */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-xl relative group overflow-hidden space-y-6">
                {/* Gradient Blur Background */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-1000 pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-1000 pointer-events-none" />
                
                <div className="relative z-10">
                  <h4 className="text-xl font-black text-white uppercase italic mb-1">Send us a Message</h4>
                  <p className="text-gray-400 text-sm mb-6">Fill in your details and we'll get back to you shortly.</p>
                </div>

                {/* Name Field */}
                <div className="relative z-10">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Full Name</label>
                  <Input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="h-12 bg-white/10 border border-white/20 rounded-xl px-4 text-white placeholder:text-gray-500 focus:border-secondary transition-all outline-none"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="relative z-10">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Email Address</label>
                  <Input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="h-12 bg-white/10 border border-white/20 rounded-xl px-4 text-white placeholder:text-gray-500 focus:border-secondary transition-all outline-none"
                    required
                  />
                </div>

                {/* Phone Field */}
                <div className="relative z-10">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Phone Number</label>
                  <Input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="h-12 bg-white/10 border border-white/20 rounded-xl px-4 text-white placeholder:text-gray-500 focus:border-secondary transition-all outline-none"
                  />
                </div>

                {/* Message Field */}
                <div className="relative z-10">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your travel plans..."
                    className="w-full h-24 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:border-secondary transition-all outline-none resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="relative z-10">
                  <Button 
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 bg-secondary hover:bg-secondary/90 text-white font-black uppercase tracking-widest rounded-xl shadow-lg shadow-secondary/30 transition-all duration-300 hover:shadow-secondary/50"
                  >
                    {loading ? "Sending..." : "Send Message"} <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>

                <p className="text-[10px] text-gray-500 text-center font-bold uppercase tracking-widest">
                  We'll respond within 24 hours.
                </p>
              </form>
            </div>

          </div>

          {/* Footer info inside the card */}
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Global Support</span>
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Secure Payments</span>
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">AI Verified</span>
            </div>
            <p className="text-[10px] font-black text-secondary uppercase tracking-widest">Verified Travel Partner 2026</p>
          </div>

        </div>
      </div>
    </section>
  );
};