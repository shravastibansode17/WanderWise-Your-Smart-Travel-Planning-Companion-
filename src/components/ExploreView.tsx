import React, { useState } from 'react';
import { DESTINATIONS } from '../data/destinationsData';
import { Destination } from '../types';
import { DestinationCard } from './DestinationCard';
import { DisclaimerBanner } from './DisclaimerBanner';
import { Search, Compass, Filter, RotateCcw, Sparkles } from 'lucide-react';
import { analytics } from '../utils/analytics';
import { matchCategory, matchDuration, matchBudget } from '../utils/filterUtils';

interface ExploreViewProps {
  onSelectDestination: (dest: Destination) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  onSelectDestination,
  favorites,
  onToggleFavorite,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBudgetRange, setSelectedBudgetRange] = useState<string>('All');
  const [selectedDuration, setSelectedDuration] = useState<string>('All');

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

  const budgetRanges = [
    { label: 'All Budgets', value: 'All' },
    { label: 'Under ₹15,000', value: 'under-15k' },
    { label: '₹15,000 – ₹30,000', value: '15k-30k' },
    { label: '₹30,000 – ₹60,000', value: '30k-60k' },
    { label: '₹60,000+', value: 'above-60k' },
  ];

  const durationOptions = [
    { label: 'All Durations', value: 'All' },
    { label: 'Weekend (1–3 Days)', value: '1-3' },
    { label: 'Short Break (4–5 Days)', value: '4-5' },
    { label: 'Long Trip (6+ Days)', value: '6+' },
  ];

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedBudgetRange('All');
    setSelectedDuration('All');
  };

  const filteredDestinations = DESTINATIONS.filter((dest) => {
    // Search
    const matchesSearch =
      !searchQuery.trim() ||
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    // Category with robust multi-keyword matching
    const matchesCat = matchCategory(dest, selectedCategory);

    // Budget with tier matching
    const matchesBudg = matchBudget(dest, selectedBudgetRange);

    // Duration matching
    const matchesDur = matchDuration(dest, selectedDuration);

    return matchesSearch && matchesCat && matchesBudg && matchesDur;
  });

  return (
    <div id="explore-destinations-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#004D40] mb-1">
            <Compass className="w-4 h-4 text-[#FF6E40]" />
            <span>Curated Travel Directory</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Explore Destinations
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Browse {DESTINATIONS.length} handpicked beach retreats, mountain escapes, cultural towns, and global hubs.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              analytics.track('explore_search', { query: e.target.value });
            }}
            placeholder="Search by destination or vibe..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#004D40] shadow-xs"
          />
        </div>
      </div>

      {/* Filter Bar Controls (PRD 8) */}
      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs space-y-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = DESTINATIONS.filter((d) => matchCategory(d, cat)).length;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  analytics.track('explore_category_filter', { category: cat });
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#004D40] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200/70'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Secondary Dropdowns & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-3">
            {/* Budget Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <span className="font-bold text-gray-700">Budget:</span>
              <select
                value={selectedBudgetRange}
                onChange={(e) => setSelectedBudgetRange(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none cursor-pointer"
              >
                {budgetRanges.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <span className="font-bold text-gray-700">Duration:</span>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none cursor-pointer"
              >
                {durationOptions.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 font-medium">
              Showing {filteredDestinations.length} of {DESTINATIONS.length} spots
            </span>
            <button
              onClick={handleResetFilters}
              className="text-xs text-gray-500 hover:text-[#004D40] font-bold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Destination Cards */}
      {filteredDestinations.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-gray-100 shadow-xs space-y-3">
          <Compass className="w-10 h-10 mx-auto text-gray-300" />
          <h3 className="font-heading font-bold text-lg text-gray-800">
            No destinations found
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
            Try adjusting your search query, budget range, or duration filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-full bg-[#004D40] text-white text-xs font-bold shadow-xs cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => (
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

      {/* Mandatory Disclaimer */}
      <DisclaimerBanner />
    </div>
  );
};

