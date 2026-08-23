import React, { useState } from 'react';
import { TRAVEL_TIPS } from '../data/travelTipsData';
import { TravelTip } from '../types';
import {
  Compass,
  Search,
  TrendingDown,
  Utensils,
  Luggage,
  Zap,
  ShieldCheck,
  MapPin,
  Users,
  Clock,
  Leaf,
  Camera,
  HeartHandshake,
  Sparkles,
} from 'lucide-react';
import { analytics } from '../utils/analytics';

export const TravelTipsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Budget Travel',
    'Packing',
    'Safety',
    'Solo Travel',
    'Group Travel',
    'First-Time Travel',
    'Sustainable Travel',
    'Photography',
  ];

  const getTipIcon = (iconName?: string) => {
    switch (iconName) {
      case 'TrendingDown':
        return <TrendingDown className="w-5 h-5 text-emerald-600" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-orange-600" />;
      case 'Luggage':
        return <Luggage className="w-5 h-5 text-sky-600" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-rose-600" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5 text-teal-600" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-purple-600" />;
      case 'Users':
        return <Users className="w-5 h-5 text-blue-600" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-indigo-600" />;
      case 'Leaf':
        return <Leaf className="w-5 h-5 text-emerald-600" />;
      case 'Camera':
        return <Camera className="w-5 h-5 text-violet-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-teal-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-teal-600" />;
    }
  };

  const filteredTips = TRAVEL_TIPS.filter((tip) => {
    const matchesCat =
      selectedCategory === 'All' || tip.category === selectedCategory;
    const matchesSearch =
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.detail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div id="travel-tips-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#004D40] mb-1">
            <Sparkles className="w-4 h-4 text-[#FF6E40]" />
            <span>Curated Traveler Wisdom</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            WanderWise Travel Intelligence
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Practical packing secrets, budget hacks, solo-travel confidence, and safety guidelines.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search packing, budget, safety..."
            className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#004D40] shadow-xs"
          />
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                analytics.track('travel_tips_filter', { category: cat });
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                isSelected
                  ? 'bg-[#004D40] text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Tips Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTips.map((tip) => (
          <div
            key={tip.id}
            className="p-6 rounded-3xl bg-white border border-gray-100 hover:border-[#004D40]/30 hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
                  {getTipIcon(tip.iconName)}
                </div>
                <span className="px-3 py-1 rounded-full bg-[#E8F5E9] text-[#004D40] text-[10px] font-bold uppercase tracking-wider">
                  {tip.tag}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  {tip.category}
                </span>
                <h3 className="font-heading font-bold text-base text-gray-900 mt-0.5">
                  {tip.title}
                </h3>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {tip.detail}
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
              <span className="font-medium">WanderWise Verified</span>
              <span className="text-[#004D40] font-bold">• High Impact</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
