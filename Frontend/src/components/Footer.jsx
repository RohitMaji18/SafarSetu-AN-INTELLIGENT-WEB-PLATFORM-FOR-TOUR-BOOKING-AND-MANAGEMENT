import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, Facebook, Linkedin, Twitter, 
  Mail, MapPin, Phone, Globe, ShieldCheck, Zap, ArrowRight 
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#1A1C1E] text-white border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-8 py-16">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* 1. Brand Section */}
          <div className="md:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 bg-secondary rounded-lg">
                <Zap size={20} fill="white" className="text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight uppercase italic">
               Tourmate
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Helping you find and book the best trips easily. Smart travel planning for everyone, powered by AI.
            </p>
            {/* Social Icons - Simple Style */}
            <div className="flex gap-4">
              {[Instagram, Facebook, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="text-gray-500 hover:text-white transition-colors">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Simple Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-secondary mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/tours" className="hover:text-white transition-colors">Find Tours</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/profile" className="hover:text-white transition-colors">My Account</Link></li>
            </ul>
          </div>

          {/* 3. Support Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-secondary mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/faq" className="hover:text-white transition-colors">Get Help</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
            </ul>
          </div>

          {/* 4. Contact Box - Clean Card */}
          <div className="md:col-span-4 bg-white/5 border border-white/10 p-6 rounded-xl">
            <h4 className="text-xs font-bold uppercase tracking-widest text-secondary mb-6">Contact Us</h4>
            <div className="space-y-5 text-sm">
              <a href="mailto:hello@support.com" className="flex items-center gap-3 text-gray-300 hover:text-secondary transition-colors group">
                <Mail size={16} className="text-secondary group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline">hello@support.com</span>
              </a>
              <a href="tel:+911800123456" className="flex items-center gap-3 text-gray-300 hover:text-secondary transition-colors group">
                <Phone size={16} className="text-secondary group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline">+91 1800 123 456</span>
              </a>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin size={16} className="text-secondary" />
                <span>NIT Agartala, Tripura</span>
              </div>
            </div>

            {/* CTA Button - Contact Page */}
            <Link to="/#contact" className="mt-8 inline-block w-full">
              <button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold text-xs uppercase tracking-widest py-3 rounded-lg transition-all flex items-center justify-center gap-2">
                <span>Send Message</span>
                <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>

        {/* 5. Simple Bottom Bar */}
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            © {currentYear} TOUR BOOKING &
TRAVEL MANAGEMENT SYSTEM // All Rights Reserved
          </p>
          
          <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-500">
             <div className="flex items-center gap-2">
               <ShieldCheck size={14} className="text-green-600" /> 
               <span>Safe & Secure</span>
             </div>
             <div className="flex items-center gap-2 border-x border-white/10 px-6">
               <Globe size={14} />
               <span>English (IN)</span>
             </div>
             <p className="text-accent font-black">MCA Final Project</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;