import React, { useState } from 'react';
import { DESTINATIONS } from '../data/destinationsData';
import { Destination, TravelMode, TravelOption } from '../types';
import {
  Plane,
  Train,
  Bus,
  Car,
  Clock,
  Zap,
  Tag,
  Compass,
  Check,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { DisclaimerBanner } from './DisclaimerBanner';
import { analytics } from '../utils/analytics';

interface TravelOptionsViewProps {
  selectedDestinationId: string;
  onDestinationChange: (id: string) => void;
  onSelectTransportForTrip: (destinationId: string, option: TravelOption) => void;
  currentSelectedTransportId?: string;
}

export const TravelOptionsView: React.FC<TravelOptionsViewProps> = ({
  selectedDestinationId,
  onDestinationChange,
  onSelectTransportForTrip,
  currentSelectedTransportId,
}) => {
  const [activeTab, setActiveTab] = useState<TravelMode | 'all'>('all');

  const destination =
    DESTINATIONS.find((d) => d.id === selectedDestinationId) || DESTINATIONS[0];

  const travelOptions = destination.travelOptions;

  const handleSelectOption = (option: TravelOption) => {
    onSelectTransportForTrip(destination.id, option);
    analytics.track('transport_selected', {
      destination: destination.name,
      provider: option.providerOrName,
      type: option.type,
      estimated_fare: option.estimatedFare,
    });
  };

  const getFilteredOptions = () => {
    if (activeTab === 'all') return travelOptions;
    return travelOptions.filter((opt) => opt.type === activeTab);
  };

  // Extract smart comparison champions
  const flightOpt = travelOptions.find((t) => t.type === 'flight');
  const trainOpt = travelOptions.find((t) => t.type === 'train');
  const busOpt = travelOptions.find((t) => t.type === 'bus');
  const roadOpt = travelOptions.find((t) => t.type === 'road');

  return (
    <div id="travel-options-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#004D40] mb-1">
            <Compass className="w-4 h-4" />
            <span>Transit & Route Intelligence</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Choose Your Way to Wander
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Compare different ways to reach your destination based on time, budget, and flexibility.
          </p>
        </div>

        {/* Destination Switcher Dropdown */}
        <div className="flex items-center gap-2.5 bg-white p-2.5 px-4 rounded-full border border-gray-200 shadow-xs">
          <MapPin className="w-4 h-4 text-[#004D40] shrink-0" />
          <span className="text-xs font-bold text-gray-500">Destination:</span>
          <select
            value={selectedDestinationId}
            onChange={(e) => {
              onDestinationChange(e.target.value);
              analytics.track('transport_view', { destination_id: e.target.value });
            }}
            className="bg-transparent font-heading font-bold text-gray-900 text-sm focus:outline-none cursor-pointer pr-2"
          >
            {DESTINATIONS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.country})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 8. ⭐ SMART COMPARISON MATRIX (PRD 8) */}
      <div className="bg-[#00251a] rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-[#FF6E40] text-xs font-extrabold tracking-wider uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Smart Comparison Matrix</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl text-white mt-1">
              Which option is right for you to reach {destination.name}?
            </h2>
          </div>
          <span className="text-xs text-white/60">Illustrative route comparison</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* FASTEST */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-sky-500 text-white text-[10px] font-extrabold uppercase tracking-wider">
                  ⚡ FASTEST
                </span>
                <Plane className="w-5 h-5 text-sky-300" />
              </div>
              <h3 className="font-heading font-extrabold text-lg text-white mt-2">Flight</h3>
              <p className="text-xs text-white/70">
                {flightOpt ? flightOpt.duration : '1h – 2h air travel'}
              </p>
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="font-heading font-extrabold text-base text-white">
                {flightOpt ? `₹${flightOpt.estimatedFare.toLocaleString('en-IN')}` : 'Varies'}
              </span>
              <span className="text-[11px] text-white/50">est. fare</span>
            </div>
          </div>

          {/* BEST VALUE */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-extrabold uppercase tracking-wider">
                  💎 BEST VALUE
                </span>
                <Train className="w-5 h-5 text-emerald-300" />
              </div>
              <h3 className="font-heading font-extrabold text-lg text-white mt-2">Train / Rail</h3>
              <p className="text-xs text-white/70">
                {trainOpt ? trainOpt.duration : '3h – 8h express rail'}
              </p>
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="font-heading font-extrabold text-base text-white">
                {trainOpt ? `₹${trainOpt.estimatedFare.toLocaleString('en-IN')}` : 'Varies'}
              </span>
              <span className="text-[11px] text-white/50">est. fare</span>
            </div>
          </div>

          {/* LOWEST COST */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#FF6E40] text-white text-[10px] font-extrabold uppercase tracking-wider">
                  🏷️ LOWEST COST
                </span>
                <Bus className="w-5 h-5 text-[#FF6E40]" />
              </div>
              <h3 className="font-heading font-extrabold text-lg text-white mt-2">Bus Coach</h3>
              <p className="text-xs text-white/70">
                {busOpt ? busOpt.duration : '4h – 11h overnight sleeper'}
              </p>
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="font-heading font-extrabold text-base text-white">
                {busOpt ? `₹${busOpt.estimatedFare.toLocaleString('en-IN')}` : 'Varies'}
              </span>
              <span className="text-[11px] text-white/50">est. fare</span>
            </div>
          </div>

          {/* MOST FLEXIBLE */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-gray-950 text-[10px] font-extrabold uppercase tracking-wider">
                  🛣️ MOST FLEXIBLE
                </span>
                <Car className="w-5 h-5 text-amber-300" />
              </div>
              <h3 className="font-heading font-extrabold text-lg text-white mt-2">Road Trip</h3>
              <p className="text-xs text-white/70">
                {roadOpt ? `${roadOpt.distanceKm || 350} km (${roadOpt.duration})` : 'Scenic highway drive'}
              </p>
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="font-heading font-extrabold text-base text-white">
                {roadOpt ? `₹${roadOpt.estimatedFare.toLocaleString('en-IN')}` : 'Varies'}
              </span>
              <span className="text-[11px] text-white/50">fuel + tolls</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'all'
              ? 'bg-[#004D40] text-white shadow-sm'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          All Routes ({travelOptions.length})
        </button>
        <button
          onClick={() => setActiveTab('flight')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'flight'
              ? 'bg-[#004D40] text-white shadow-sm'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <Plane className="w-3.5 h-3.5" />
          Flights ({travelOptions.filter(o => o.type === 'flight').length})
        </button>
        <button
          onClick={() => setActiveTab('train')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'train'
              ? 'bg-[#004D40] text-white shadow-sm'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <Train className="w-3.5 h-3.5" />
          Trains ({travelOptions.filter(o => o.type === 'train').length})
        </button>
        <button
          onClick={() => setActiveTab('bus')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'bus'
              ? 'bg-[#004D40] text-white shadow-sm'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <Bus className="w-3.5 h-3.5" />
          Buses & Shuttles ({travelOptions.filter(o => o.type === 'bus').length})
        </button>
        <button
          onClick={() => setActiveTab('road')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'road'
              ? 'bg-[#004D40] text-white shadow-sm'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <Car className="w-3.5 h-3.5" />
          Road Trips ({travelOptions.filter(o => o.type === 'road').length})
        </button>
      </div>

      {/* Detailed Travel Option Cards */}
      {getFilteredOptions().length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-8 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-[#004D40]/10 text-[#004D40] flex items-center justify-center mx-auto">
            {activeTab === 'train' && <Train className="w-6 h-6" />}
            {activeTab === 'bus' && <Bus className="w-6 h-6" />}
            {activeTab === 'road' && <Car className="w-6 h-6" />}
            {activeTab === 'flight' && <Plane className="w-6 h-6" />}
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="font-heading font-bold text-lg text-gray-900 capitalize">
              Multi-Modal Connection Guide for {destination.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              Direct {activeTab} routes to this destination connect seamlessly via the nearest central transit terminal and onward local express transport.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-left max-w-lg mx-auto space-y-2 text-xs">
            <div className="font-bold text-gray-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF6E40]" />
              <span>Recommended Route:</span>
            </div>
            <p className="text-gray-600">
              Travel via the main gateway city airport or junction terminal, then take an express private cab or dedicated ferry/shuttle connection.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('all')}
            className="px-5 py-2.5 rounded-full bg-[#004D40] text-white text-xs font-bold shadow-xs cursor-pointer"
          >
            View All Verified Routes for {destination.name}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {getFilteredOptions().map((opt) => {
            const isSelected = currentSelectedTransportId === opt.id;

            const getModeIcon = () => {
              switch (opt.type) {
                case 'flight':
                  return <Plane className="w-5 h-5 text-sky-600" />;
                case 'train':
                  return <Train className="w-5 h-5 text-emerald-600" />;
                case 'bus':
                  return <Bus className="w-5 h-5 text-amber-600" />;
                case 'road':
                  return <Car className="w-5 h-5 text-purple-600" />;
              }
            };

            return (
              <div
                key={opt.id}
                className={`bg-white rounded-3xl border p-6 transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#004D40] ring-2 ring-[#004D40] shadow-md bg-[#E8F5E9]/20'
                    : 'border-gray-100 hover:border-[#004D40]/30 hover:shadow-md'
                }`}
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">{getModeIcon()}</div>
                      <div>
                        <h3 className="font-heading font-bold text-base text-gray-900">
                          {opt.providerOrName}
                        </h3>
                        <p className="text-xs text-gray-500">{opt.route}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#004D40] text-white text-[10px] font-bold uppercase tracking-wider">
                      {opt.label}
                    </span>
                  </div>

                  {/* Timing & Metrics */}
                  <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <Clock className="w-3.5 h-3.5 text-[#004D40]" />
                      <span>Duration: <strong>{opt.duration}</strong></span>
                    </div>
                    <span className="text-gray-500 truncate max-w-[170px]">{opt.departureArrival}</span>
                  </div>

                  {/* Road details if applicable */}
                  {opt.type === 'road' && (opt.fuelEstimate || opt.tollEstimate) && (
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 font-medium">
                        ⛽ Fuel: ₹{opt.fuelEstimate?.toLocaleString('en-IN')}
                      </div>
                      <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 font-medium">
                        🛣️ Tolls: ₹{opt.tollEstimate?.toLocaleString('en-IN')}
                      </div>
                    </div>
                  )}

                  {/* Highlights */}
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    {opt.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#004D40]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Price & Select Action */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 block">Estimated fare</span>
                    <span className="font-heading font-extrabold text-gray-900 text-lg">
                      ₹{opt.estimatedFare.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => handleSelectOption(opt)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#2E7D32] text-white shadow-xs'
                        : 'bg-[#004D40] hover:bg-[#00382e] text-white shadow-sm'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Selected for Trip</span>
                      </>
                    ) : (
                      <span>Select for Trip</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mandatory Disclaimer */}
      <DisclaimerBanner />
    </div>
  );
};
