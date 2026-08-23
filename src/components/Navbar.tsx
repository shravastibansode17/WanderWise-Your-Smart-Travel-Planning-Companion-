import React, { useState } from 'react';
import { Compass, Heart, Menu, X, Sparkles, Activity } from 'lucide-react';
import { analytics } from '../utils/analytics';

export type NavPage =
  | 'home'
  | 'explore'
  | 'planner'
  | 'travel-options'
  | 'itinerary'
  | 'budget'
  | 'checklist'
  | 'tips'
  | 'favorites';

interface NavbarProps {
  activePage: NavPage;
  onNavigate: (page: NavPage) => void;
  favoritesCount: number;
  onOpenAnalytics: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  favoritesCount,
  onOpenAnalytics,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: NavPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    analytics.track('navigation_click', { target_page: page });
  };

  const navLinks: { id: NavPage; label: string; icon?: React.ReactNode }[] = [
    { id: 'home', label: 'Home' },
    { id: 'explore', label: 'Explore' },
    { id: 'planner', label: 'Plan My Trip' },
    { id: 'travel-options', label: 'Travel Options' },
    { id: 'itinerary', label: 'My Itinerary' },
    { id: 'budget', label: 'Budget' },
    { id: 'checklist', label: 'Checklist' },
    { id: 'tips', label: 'Travel Tips' },
  ];

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-40 w-full bg-[#004D40] border-b border-[#00382e] text-white shadow-md transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          id="nav-logo"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shadow-sm group-hover:scale-105 transition duration-200">
            <Compass className="w-5 h-5 text-white transition-transform group-hover:rotate-45 duration-300" />
          </div>
          <div>
            <span className="font-heading font-extrabold text-xl tracking-tight text-white uppercase">
              WanderWise
            </span>
            <span className="hidden sm:block text-[9px] uppercase font-bold tracking-widest text-teal-200/90 -mt-0.5">
              Smart Travel Planning
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav-links" className="hidden xl:flex items-center gap-5 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`py-1 transition-all cursor-pointer ${
                  isActive
                    ? 'border-b-2 border-white text-white font-bold pb-0.5'
                    : 'text-white/80 hover:text-white hover:opacity-100'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          {/* Favorites Wishlist Icon Link */}
          <button
            id="nav-link-favorites"
            onClick={() => handleNavClick('favorites')}
            className={`relative p-1.5 rounded-lg text-white/80 hover:text-white transition cursor-pointer ${
              activePage === 'favorites' ? 'text-white' : ''
            }`}
            title="Your Travel Wishlist"
            aria-label="Wishlist"
          >
            <Heart
              className={`w-5 h-5 ${
                favoritesCount > 0
                  ? 'fill-[#FF6E40] text-[#FF6E40]'
                  : 'text-white hover:text-[#FF6E40]'
              }`}
            />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-[#FF6E40] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {favoritesCount}
              </span>
            )}
          </button>
        </nav>

        {/* Action Buttons: Analytics Monitor & Plan My Trip CTA */}
        <div className="flex items-center gap-3">
          {/* GA4 Live Telemetry Button */}
          <button
            id="btn-analytics-monitor-toggle"
            onClick={onOpenAnalytics}
            title="Inspect Google Analytics 4 Events"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-teal-100 hover:text-white border border-white/20 text-xs transition cursor-pointer font-medium"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
            <span className="font-mono text-[11px]">GA4 Activity</span>
          </button>

          {/* Prominent Primary CTA Button */}
          <button
            id="btn-nav-plan-my-trip"
            onClick={() => handleNavClick('planner')}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FF6E40] hover:bg-[#F4511E] text-white text-xs md:text-sm font-bold shadow-sm transition-all cursor-pointer select-none"
          >
            <Sparkles className="w-4 h-4" />
            <span>✨ PLAN MY TRIP</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-menu"
          className="xl:hidden bg-[#00382e] border-b border-[#00251a] px-4 pt-2 pb-6 space-y-1.5 animate-in slide-in-from-top-2 duration-150 shadow-xl text-white"
        >
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-[#004D40] text-white font-bold border-l-4 border-[#FF6E40]'
                    : 'text-white/80 hover:bg-[#004D40] hover:text-white'
                }`}
              >
                <span>{link.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => handleNavClick('favorites')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
              activePage === 'favorites'
                ? 'bg-[#004D40] text-white font-bold'
                : 'text-white/80 hover:bg-[#004D40] hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#FF6E40] fill-[#FF6E40]" />
              Favorites / Wishlist
            </span>
            <span className="bg-[#FF6E40] text-white px-2 py-0.5 rounded-full text-xs font-bold">
              {favoritesCount} saved
            </span>
          </button>

          <div className="pt-3 border-t border-[#00251a] space-y-2">
            <button
              onClick={() => handleNavClick('planner')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#FF6E40] hover:bg-[#F4511E] text-white text-sm font-bold shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              ✨ PLAN MY TRIP
            </button>
            <button
              onClick={() => {
                onOpenAnalytics();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/10 text-white text-xs border border-white/20 font-medium"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-300" />
              View GA4 Live Telemetry Log
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
