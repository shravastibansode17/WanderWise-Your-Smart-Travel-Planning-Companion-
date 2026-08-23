import React, { useState } from 'react';
import { DESTINATIONS } from '../data/destinationsData';
import { Destination } from '../types';
import { DestinationCard } from './DestinationCard';
import { DisclaimerBanner } from './DisclaimerBanner';
import {
  Search,
  Sparkles,
  Compass,
  MapPin,
  Plane,
  Train,
  Calendar,
  Wallet,
  Luggage,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { analytics } from '../utils/analytics';
import { matchCategory } from '../utils/filterUtils';

interface HomeViewProps {
  onPlanTripCTA: () => void;
  onExploreDestinationsCTA: () => void;
  onSelectDestination: (dest: Destination) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onDirectSearchSelect: (dest: Destination) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onPlanTripCTA,
  onExploreDestinationsCTA,
  onSelectDestination,
  favorites,
  onToggleFavorite,
  onDirectSearchSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  const categories = [
    'All',
    'Beaches',
    'Mountains',
    'Heritage',
    'Nature',
    'City & Modern',
    'International',
    'Adventure',
  ];

  const quickFilterChips = [
    { label: '🏖️ Beaches', category: 'Beaches' },
    { label: '🏔️ Mountains', category: 'Mountains' },
    { label: '🏛️ Heritage', category: 'Heritage' },
    { label: '🌊 Nature', category: 'Nature' },
    { label: '🏙️ City & Modern', category: 'City & Modern' },
    { label: '🌐 International', category: 'International' },
    { label: '🧗 Adventure', category: 'Adventure' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    analytics.track('home_search', { query: searchQuery });
    const match = DESTINATIONS.find((d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (match) {
      onDirectSearchSelect(match);
    } else {
      onExploreDestinationsCTA();
    }
  };

  const getFilteredDestinations = () => {
    let list = [...DESTINATIONS];

    if (activeCategoryFilter !== 'All') {
      list = list.filter((d) => matchCategory(d, activeCategoryFilter));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return list;
  };

  const filteredList = getFilteredDestinations();

  return (
    <div id="home-view-container" className="space-y-12 pb-12">
      {/* 2. 🏠 HERO & SPOTLIGHT SECTION (Professional Polish) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Hero Banner */}
          <section className="flex-1 lg:flex-[1.8] relative rounded-3xl overflow-hidden shadow-xl bg-[#00251a] min-h-[460px] sm:min-h-[520px] flex flex-col justify-end p-6 sm:p-10 text-white">
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1400&auto=format&fit=crop"
              alt="Travel Destinations"
              className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-65 contrast-105 scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />

            <div className="relative z-20 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-teal-200 text-xs font-bold tracking-wide backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6E40]" />
                <span>WanderWise • Your Smart Travel Planning Companion</span>
              </div>

              <div>
                <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                  Your Smart Travel <br />
                  <span className="bg-gradient-to-r from-teal-200 via-white to-amber-200 bg-clip-text text-transparent">
                    Planning Companion
                  </span>
                </h1>
                <p className="text-white/80 text-sm sm:text-base max-w-xl mt-2 leading-relaxed">
                  Discover destinations, compare multi-modal travel options, build tailored day-by-day itineraries, and estimate trip budgets with AI-powered precision.
                </p>
              </div>

              {/* Search Form */}
              <form
                onSubmit={handleSearchSubmit}
                className="flex bg-white/15 backdrop-blur-md p-1.5 sm:p-2 rounded-2xl border border-white/25 max-w-lg shadow-lg"
              >
                <div className="flex items-center gap-2.5 flex-1 px-3">
                  <Search className="w-4 h-4 text-white/70 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Where to next? (e.g. Goa, Manali, Bali, Paris)"
                    className="bg-transparent border-none text-white placeholder-white/60 text-xs sm:text-sm font-medium w-full outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#0277BD] hover:bg-[#01579B] text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Filter Vibes */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-white/70 font-semibold mr-1">Popular Vibes:</span>
                {quickFilterChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveCategoryFilter(chip.category || 'All');
                      analytics.track('quick_chip_click', { label: chip.label });
                    }}
                    className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white text-[11px] font-medium transition cursor-pointer"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  id="hero-btn-plan-trip"
                  onClick={onPlanTripCTA}
                  className="px-6 py-3 rounded-full bg-[#FF6E40] hover:bg-[#F4511E] text-white font-heading font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>✨ PLAN MY TRIP</span>
                </button>

                <button
                  id="hero-btn-explore"
                  onClick={onExploreDestinationsCTA}
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-heading font-bold text-xs sm:text-sm backdrop-blur-md transition cursor-pointer flex items-center gap-2"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explore Destinations</span>
                </button>
              </div>
            </div>
          </section>

          {/* Right Side Spotlight Cards */}
          <section className="flex-1 lg:max-w-md flex flex-col gap-5">
            {/* AI Match Spotlight Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading font-bold text-base text-gray-800 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#FF6E40]" />
                    <span>Your WanderWise Match</span>
                  </h3>
                  <span className="bg-[#E8F5E9] text-[#2E7D32] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    AI RECOMMENDED
                  </span>
                </div>

                <div className="flex items-center gap-4 my-4">
                  <div className="w-18 h-18 rounded-full border-4 border-[#FF6E40] flex items-center justify-center shrink-0">
                    <span className="text-xl font-extrabold text-[#FF6E40]">92%</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold text-[#004D40] tracking-tight">GOA, INDIA</h4>
                    <p className="text-[11px] text-gray-500 uppercase tracking-widest font-medium">
                      Perfect for 4-Day Coastal Escape
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 my-3">
                  <span className="px-2.5 py-1 bg-gray-100 rounded-full text-[10px] font-bold text-gray-600">🏖️ BEACHES</span>
                  <span className="px-2.5 py-1 bg-gray-100 rounded-full text-[10px] font-bold text-gray-600">🍜 FOOD</span>
                  <span className="px-2.5 py-1 bg-gray-100 rounded-full text-[10px] font-bold text-gray-600">🌅 SUNSETS</span>
                  <span className="px-2.5 py-1 bg-gray-100 rounded-full text-[10px] font-bold text-gray-600">🎉 NIGHTLIFE</span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  Matches your interest in coastal relaxation and cultural walks while keeping estimated transport & stay ₹3,500 under initial budget cap.
                </p>
              </div>

              <button
                onClick={onPlanTripCTA}
                className="w-full py-3.5 bg-[#004D40] hover:bg-[#00382e] text-white rounded-2xl font-heading font-bold text-sm shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Build My Customized Trip</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mini Budget Preview Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-sm text-gray-800">Smart Budget Allocation</h3>
                <span className="text-xs font-bold text-[#004D40]">₹37,150 Est.</span>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold w-20 text-gray-400">STAY</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#004D40] w-[65%]" />
                  </div>
                  <span className="text-xs font-bold text-gray-700 w-16 text-right">₹24,000</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold w-20 text-gray-400">TRANSPORT</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0277BD] w-[20%]" />
                  </div>
                  <span className="text-xs font-bold text-gray-700 w-16 text-right">₹3,500</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold w-20 text-gray-400">FOOD & ACTS</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF6E40] w-[15%]" />
                  </div>
                  <span className="text-xs font-bold text-gray-700 w-16 text-right">₹9,650</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Features Strip: Why WanderWise */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
          <div className="p-4 rounded-3xl bg-white border border-gray-100 shadow-xs flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#004D40]/10 text-[#004D40]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-gray-900">Smart Discovery</h4>
              <p className="text-[11px] text-gray-500">14+ curated spots</p>
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-white border border-gray-100 shadow-xs flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#0277BD]/10 text-[#0277BD]">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-gray-900">Multi-Modal Transit</h4>
              <p className="text-[11px] text-gray-500">Flight, rail, bus & car</p>
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-white border border-gray-100 shadow-xs flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-gray-900">Day-by-Day Plan</h4>
              <p className="text-[11px] text-gray-500">Morning to evening</p>
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-white border border-gray-100 shadow-xs flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#2E7D32]/10 text-[#2E7D32]">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-gray-900">Smart Budget</h4>
              <p className="text-[11px] text-gray-500">Categorized estimates</p>
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-white border border-gray-100 shadow-xs col-span-2 md:col-span-1 flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#FF6E40]/10 text-[#FF6E40]">
              <Luggage className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-gray-900">Pack Smart</h4>
              <p className="text-[11px] text-gray-500">Interactive checklist</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 🌟 TRENDING DESTINATIONS SECTION */}
      <section id="trending-destinations-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200/80 pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#004D40]">
              <TrendingUp className="w-4 h-4 text-[#FF6E40]" />
              <span>Curated Escapes</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 tracking-tight mt-1">
              Trending Destinations
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm">
              Handpicked getaways with verified multi-modal routes, authentic stays, and estimated budget guides.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => {
              const isSelected = activeCategoryFilter === cat;
              const count = DESTINATIONS.filter((d) => matchCategory(d, cat)).length;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategoryFilter(cat);
                    analytics.track('category_filter_click', { category: cat });
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#004D40] text-white shadow-xs'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Destination Cards Grid */}
        {filteredList.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">
            No destinations found matching your filter criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredList.slice(0, 8).map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                isFavorite={favorites.includes(dest.id)}
                onToggleFavorite={onToggleFavorite}
                onExplore={onSelectDestination}
              />
            ))}
          </div>
        )}

        {filteredList.length > 8 && (
          <div className="text-center pt-4">
            <button
              onClick={onExploreDestinationsCTA}
              className="px-6 py-3 rounded-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-bold text-xs sm:text-sm shadow-xs transition cursor-pointer"
            >
              View All {DESTINATIONS.length} Destinations →
            </button>
          </div>
        )}
      </section>

      {/* 4. 🚀 HOW WANDERWISE WORKS */}
      <section id="how-it-works-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#00251a] text-white space-y-10 shadow-lg">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-teal-300 font-extrabold">
              Simple 5-Step Process
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
              How WanderWise Works
            </h2>
            <p className="text-white/70 text-xs sm:text-sm">
              We eliminate chaotic browser tabs by combining discovery, multi-modal routes, day-by-day scheduling, and budget tracking into one unified platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <span className="w-7 h-7 rounded-full bg-[#FF6E40] text-white text-xs font-black flex items-center justify-center">
                1
              </span>
              <h4 className="font-heading font-bold text-base text-white">Choose Spot</h4>
              <p className="text-xs text-white/70">
                Explore beach getaways, hill stations, heritage gems, and international hubs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <span className="w-7 h-7 rounded-full bg-[#FF6E40] text-white text-xs font-black flex items-center justify-center">
                2
              </span>
              <h4 className="font-heading font-bold text-base text-white">Compare Routes</h4>
              <p className="text-xs text-white/70">
                Evaluate flights, trains, sleeper buses, and road trips by time, cost, and comfort.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <span className="w-7 h-7 rounded-full bg-[#FF6E40] text-white text-xs font-black flex items-center justify-center">
                3
              </span>
              <h4 className="font-heading font-bold text-base text-white">Build Itinerary</h4>
              <p className="text-xs text-white/70">
                Generate optimized morning, afternoon, and evening activity slots in seconds.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <span className="w-7 h-7 rounded-full bg-[#FF6E40] text-white text-xs font-black flex items-center justify-center">
                4
              </span>
              <h4 className="font-heading font-bold text-base text-white">Track Budget</h4>
              <p className="text-xs text-white/70">
                Get full visibility into transport, stay, food, local travel, and buffer reserves.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <span className="w-7 h-7 rounded-full bg-[#FF6E40] text-white text-xs font-black flex items-center justify-center">
                5
              </span>
              <h4 className="font-heading font-bold text-base text-white">Pack & Go</h4>
              <p className="text-xs text-white/70">
                Tick off documents, gear, electronics, and medicine with smart checklists.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mandatory Disclaimer */}
      <DisclaimerBanner />
    </div>
  );
};
