import React from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { NavPage } from './Navbar';

interface FooterProps {
  onNavigate: (page: NavPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="main-footer" className="bg-[#00251a] border-t border-[#00382e] text-white/70 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#004D40] border border-white/20 flex items-center justify-center text-white shadow-sm">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-heading font-extrabold text-xl text-white tracking-tight">WANDERWISE</span>
            </div>
            <p className="text-white/70 text-xs md:text-sm max-w-md leading-relaxed">
              Your Smart Travel Planning Companion. Discover inspiring destinations, compare flights, trains, buses, and road trips, build personalized itineraries, and manage your travel budget.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-300 font-medium">
              <Sparkles className="w-4 h-4 text-[#FF6E40]" />
              <span>Where will your next adventure take you?</span>
            </div>
          </div>

          {/* Quick Links Col 1 */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white mb-3">
              Discover & Plan
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explore')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Explore Destinations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('planner')}
                  className="hover:text-white transition cursor-pointer font-bold text-[#FF6E40]"
                >
                  ✨ Plan My Trip Wizard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('travel-options')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Travel & Route Comparison
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links Col 2 */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white mb-3">
              Tools & Prep
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('itinerary')}
                  className="hover:text-white transition cursor-pointer"
                >
                  My Itinerary
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('budget')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Smart Budget Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('checklist')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Packing Checklist
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tips')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Travel Tips
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="pt-6 pb-4 text-[11px] text-white/50 leading-relaxed text-center md:text-left">
          <strong>Planning Notice:</strong> Prices, fares, schedules, and accommodation availability shown on WanderWise are illustrative estimates for planning purposes only. Actual prices and availability may vary. WanderWise does not process bookings or payments.
        </div>

        {/* Bottom copyright */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 border-t border-white/10">
          <p>© 2026 WanderWise. Built for smarter travel planning.</p>
          <p className="mt-2 sm:mt-0 text-[11px] text-white/50">
            Discover • Compare • Plan • Explore
          </p>
        </div>
      </div>
    </footer>
  );
};
