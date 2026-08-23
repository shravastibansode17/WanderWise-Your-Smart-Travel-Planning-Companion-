import React, { useState } from 'react';
import { TripPlan, Destination } from '../types';
import { DESTINATIONS } from '../data/destinationsData';
import {
  Wallet,
  Plane,
  Building,
  Utensils,
  Ticket,
  Car,
  ShoppingBag,
  Sparkles,
  TrendingDown,
  AlertCircle,
  RotateCcw,
  CheckCircle2,
  Sliders,
  DollarSign,
} from 'lucide-react';
import { DisclaimerBanner } from './DisclaimerBanner';
import { analytics } from '../utils/analytics';

interface BudgetPlannerViewProps {
  trip: TripPlan | null;
  onUpdateTrip: (trip: TripPlan) => void;
  onStartNewTrip: () => void;
  onNavigateToItinerary: () => void;
  onNavigateToTravelOptions: () => void;
}

export const BudgetPlannerView: React.FC<BudgetPlannerViewProps> = ({
  trip,
  onUpdateTrip,
  onStartNewTrip,
  onNavigateToItinerary,
  onNavigateToTravelOptions,
}) => {
  const destination = trip
    ? DESTINATIONS.find((d) => d.id === trip.destinationId) || DESTINATIONS[0]
    : DESTINATIONS[0];

  // Default / fallback trip plan if none created yet
  const effectiveTrip: TripPlan = trip || {
    id: 'sample-trip',
    destinationId: 'goa',
    destinationName: 'Goa',
    durationDays: 4,
    travelStyle: 'Relaxed',
    interests: ['Beaches', 'Food', 'Nightlife'],
    budgetTier: '₹20,000–₹40,000',
    budgetCap: 35000,
    selectedTransportId: 'goa-train-1',
    selectedStayId: 'goa-stay-1',
    selectedStayNights: 3,
    itineraryDays: [],
    foodBudgetPerDay: 1200,
    localTravelBudgetPerDay: 600,
    miscellaneousBudget: 1500,
    matchScore: 94,
    matchReason: 'Illustrative budget calculation for Goa',
    createdAt: new Date().toISOString(),
  };

  const selectedTransport = destination.travelOptions.find(
    (t) => t.id === effectiveTrip.selectedTransportId
  ) || destination.travelOptions[0];

  const selectedStay = destination.stayOptions.find(
    (s) => s.id === effectiveTrip.selectedStayId
  ) || destination.stayOptions[0];

  // Calculate Costs
  const transportCost = selectedTransport ? selectedTransport.estimatedFare * 2 : 3000; // Round trip estimate
  const stayCost = (selectedStay ? selectedStay.pricePerNight : 2500) * effectiveTrip.selectedStayNights;

  // Activities sum from itinerary if present, otherwise sum from destination highlights
  const activitiesCost =
    effectiveTrip.itineraryDays && effectiveTrip.itineraryDays.length > 0
      ? effectiveTrip.itineraryDays.reduce(
          (sum, d) => sum + d.activities.reduce((aSum, a) => aSum + a.estimatedCost, 0),
          0
        )
      : 3500;

  const foodTotal = effectiveTrip.foodBudgetPerDay * effectiveTrip.durationDays;
  const localTravelTotal = effectiveTrip.localTravelBudgetPerDay * effectiveTrip.durationDays;
  const miscTotal = effectiveTrip.miscellaneousBudget;

  const totalEstimatedCost =
    transportCost + stayCost + activitiesCost + foodTotal + localTravelTotal + miscTotal;

  const budgetCap = effectiveTrip.budgetCap || 35000;
  const isWithinBudget = totalEstimatedCost <= budgetCap;
  const budgetDiff = Math.abs(budgetCap - totalEstimatedCost);

  // Categories config for visualization
  const categories = [
    {
      id: 'transport',
      name: 'Travel & Transit',
      amount: transportCost,
      icon: <Plane className="w-4 h-4 text-sky-600" />,
      color: 'bg-sky-500',
      bgLight: 'bg-sky-50',
      textColor: 'text-sky-900',
      sub: selectedTransport ? `${selectedTransport.providerOrName} (${selectedTransport.label})` : 'Round trip',
    },
    {
      id: 'stay',
      name: 'Accommodation',
      amount: stayCost,
      icon: <Building className="w-4 h-4 text-emerald-600" />,
      color: 'bg-emerald-500',
      bgLight: 'bg-emerald-50',
      textColor: 'text-emerald-900',
      sub: `${effectiveTrip.selectedStayNights} nights at ₹${selectedStay?.pricePerNight.toLocaleString('en-IN') || '2,500'}/night`,
    },
    {
      id: 'food',
      name: 'Food & Dining',
      amount: foodTotal,
      icon: <Utensils className="w-4 h-4 text-orange-600" />,
      color: 'bg-orange-500',
      bgLight: 'bg-orange-50',
      textColor: 'text-orange-900',
      sub: `₹${effectiveTrip.foodBudgetPerDay}/day for ${effectiveTrip.durationDays} days`,
    },
    {
      id: 'activities',
      name: 'Activities & Entry Fees',
      amount: activitiesCost,
      icon: <Ticket className="w-4 h-4 text-purple-600" />,
      color: 'bg-purple-500',
      bgLight: 'bg-purple-50',
      textColor: 'text-purple-900',
      sub: 'All planned excursions & monuments',
    },
    {
      id: 'localTravel',
      name: 'Local Transport',
      amount: localTravelTotal,
      icon: <Car className="w-4 h-4 text-teal-600" />,
      color: 'bg-teal-500',
      bgLight: 'bg-teal-50',
      textColor: 'text-teal-900',
      sub: `Cabs, autos, rentals (₹${effectiveTrip.localTravelBudgetPerDay}/day)`,
    },
    {
      id: 'misc',
      name: 'Buffer & Miscellaneous',
      amount: miscTotal,
      icon: <ShoppingBag className="w-4 h-4 text-amber-600" />,
      color: 'bg-amber-500',
      bgLight: 'bg-amber-50',
      textColor: 'text-amber-900',
      sub: 'Souvenirs, snacks, unexpected costs',
    },
  ];

  const handleUpdateParam = (key: keyof TripPlan, val: any) => {
    if (trip) {
      const updated = { ...trip, [key]: val };
      onUpdateTrip(updated);
      analytics.track('budget_adjusted', { param: key, value: val });
    }
  };

  return (
    <div id="budget-planner-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 12. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#004D40] mb-1">
            <Wallet className="w-4 h-4" />
            <span>Financial Intelligence</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Know Before You Go
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Plan your spending and keep your {effectiveTrip.destinationName} trip stress-free.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateToItinerary}
            className="px-5 py-2.5 rounded-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold shadow-xs transition cursor-pointer"
          >
            ← View Schedule
          </button>
          <button
            onClick={onNavigateToTravelOptions}
            className="px-5 py-2.5 rounded-full bg-[#004D40] hover:bg-[#00382e] text-white text-xs font-bold shadow-sm transition cursor-pointer"
          >
            Compare Routes
          </button>
        </div>
      </div>

      {/* 12 & 18. Hero Budget Overview Card */}
      <div className="bg-[#00251a] rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-teal-300 font-extrabold">
              Total Estimated Trip Cost
            </span>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="font-heading font-extrabold text-4xl sm:text-5xl text-white">
                ₹{totalEstimatedCost.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-white/70">
                per person ({effectiveTrip.durationDays} Days / {effectiveTrip.selectedStayNights} Nights)
              </span>
            </div>
          </div>

          {/* Budget Health Pill */}
          <div
            className={`p-4 rounded-2xl border ${
              isWithinBudget
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
            } max-w-sm`}
          >
            <div className="flex items-center gap-2 font-heading font-bold text-sm">
              {isWithinBudget ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-400" />
              )}
              <span>
                {isWithinBudget
                  ? `Under Budget by ₹${budgetDiff.toLocaleString('en-IN')}`
                  : `₹${budgetDiff.toLocaleString('en-IN')} above ideal target`}
              </span>
            </div>
            <p className="text-xs text-white/70 mt-1">
              Target Tier: {effectiveTrip.budgetTier} (Cap ₹{budgetCap.toLocaleString('en-IN')})
            </p>
          </div>
        </div>

        {/* Multi-Segment Stacked Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-white/10 rounded-full h-3.5 flex overflow-hidden p-0.5">
            {categories.map((cat) => {
              const pct = (cat.amount / totalEstimatedCost) * 100;
              return (
                <div
                  key={cat.id}
                  className={`${cat.color} h-full transition-all duration-500`}
                  style={{ width: `${pct}%` }}
                  title={`${cat.name}: ₹${cat.amount.toLocaleString('en-IN')} (${pct.toFixed(0)}%)`}
                />
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-white/70 pt-1">
            {categories.map((cat) => (
              <div key={cat.id} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                <span className="text-white font-medium">{cat.name}</span>
                <span className="text-white/60">
                  ({Math.round((cat.amount / totalEstimatedCost) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 19. Smart Budget Insights (PRD 19) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#E8F5E9] border border-[#004D40]/10 space-y-1.5">
          <div className="flex items-center gap-2 text-[#004D40] font-heading font-extrabold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#004D40]" />
            <span>Accommodation Insight</span>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed">
            Stay currently accounts for{' '}
            <strong>{Math.round((stayCost / totalEstimatedCost) * 100)}%</strong> of your total cost.
            Choosing a boutique stay over luxury saves ~₹3,000/night.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-sky-50 border border-sky-100 space-y-1.5">
          <div className="flex items-center gap-2 text-sky-900 font-heading font-extrabold text-xs uppercase tracking-wider">
            <TrendingDown className="w-4 h-4 text-sky-600" />
            <span>Transit Optimization</span>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed">
            Switching from premium flights to Vande Bharat / Express Trains could save approx{' '}
            <strong>₹2,000 – ₹3,500</strong> on your transit budget.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-100 space-y-1.5">
          <div className="flex items-center gap-2 text-amber-900 font-heading font-extrabold text-xs uppercase tracking-wider">
            <Wallet className="w-4 h-4 text-amber-600" />
            <span>Buffer Protection</span>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed">
            You have a <strong>₹{miscTotal.toLocaleString('en-IN')}</strong> safety buffer
            reserved for spontaneous cafe treats, auto rides, and souvenirs.
          </p>
        </div>
      </div>

      {/* Interactive Category Breakdown Cards & Fine-Tuning Sliders */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-extrabold text-xl text-gray-900">
            Category Breakdown & Interactive Estimator
          </h2>
          <span className="text-xs text-gray-400">Adjust sliders to customize your estimate</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl ${cat.bgLight}`}>{cat.icon}</div>
                    <h3 className="font-heading font-bold text-sm text-gray-900">{cat.name}</h3>
                  </div>
                  <span className="font-heading font-extrabold text-base text-gray-900">
                    ₹{cat.amount.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{cat.sub}</p>
              </div>

              {/* Slider for adjustable categories */}
              {cat.id === 'food' && (
                <div className="pt-2 border-t border-gray-100 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-gray-500">
                    <span>Daily Food Allowance</span>
                    <span className="font-bold text-gray-800">
                      ₹{effectiveTrip.foodBudgetPerDay}/day
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="4000"
                    step="100"
                    value={effectiveTrip.foodBudgetPerDay}
                    onChange={(e) => handleUpdateParam('foodBudgetPerDay', Number(e.target.value))}
                    className="w-full accent-[#FF6E40] cursor-pointer"
                  />
                </div>
              )}

              {cat.id === 'localTravel' && (
                <div className="pt-2 border-t border-gray-100 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-gray-500">
                    <span>Daily Local Travel</span>
                    <span className="font-bold text-gray-800">
                      ₹{effectiveTrip.localTravelBudgetPerDay}/day
                    </span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="2500"
                    step="50"
                    value={effectiveTrip.localTravelBudgetPerDay}
                    onChange={(e) =>
                      handleUpdateParam('localTravelBudgetPerDay', Number(e.target.value))
                    }
                    className="w-full accent-[#004D40] cursor-pointer"
                  />
                </div>
              )}

              {cat.id === 'misc' && (
                <div className="pt-2 border-t border-gray-100 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-gray-500">
                    <span>Emergency / Misc Buffer</span>
                    <span className="font-bold text-gray-800">
                      ₹{effectiveTrip.miscellaneousBudget}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="250"
                    value={effectiveTrip.miscellaneousBudget}
                    onChange={(e) =>
                      handleUpdateParam('miscellaneousBudget', Number(e.target.value))
                    }
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mandatory Disclaimer */}
      <DisclaimerBanner />
    </div>
  );
};
