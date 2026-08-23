import React, { useState } from 'react';
import { Destination, Activity, StayOption } from '../types';
import {
  X,
  Heart,
  Calendar,
  Clock,
  Wallet,
  Compass,
  Check,
  Plus,
  ArrowRight,
  Plane,
  Train,
  Bus,
  Car,
  Star,
  Sparkles,
  Info,
  MapPin,
} from 'lucide-react';
import { DisclaimerBanner } from './DisclaimerBanner';
import { analytics } from '../utils/analytics';

interface DestinationDetailModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onPlanTripHere: (destination: Destination) => void;
  onViewTravelOptions: (destination: Destination) => void;
  onAddActivityToTrip?: (destination: Destination, activity: Activity) => void;
  onSelectStayForTrip?: (destination: Destination, stay: StayOption) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onPlanTripHere,
  onViewTravelOptions,
  onAddActivityToTrip,
  onSelectStayForTrip,
}) => {
  const [addedActivityIds, setAddedActivityIds] = useState<string[]>([]);
  const [addedStayId, setAddedStayId] = useState<string | null>(null);

  if (!isOpen || !destination) return null;

  const handleAddActivity = (activity: Activity) => {
    if (addedActivityIds.includes(activity.id)) {
      setAddedActivityIds(addedActivityIds.filter((id) => id !== activity.id));
    } else {
      setAddedActivityIds([...addedActivityIds, activity.id]);
    }
    if (onAddActivityToTrip) {
      onAddActivityToTrip(destination, activity);
    }
    analytics.track('activity_added', {
      destination: destination.name,
      activity_name: activity.name,
      estimated_cost: activity.estimatedCost,
    });
  };

  const handleSelectStay = (stay: StayOption) => {
    setAddedStayId(stay.id);
    if (onSelectStayForTrip) {
      onSelectStayForTrip(destination, stay);
    }
    analytics.track('stay_selected', {
      destination: destination.name,
      stay_name: stay.name,
      price_per_night: stay.pricePerNight,
    });
  };

  return (
    <div
      id="destination-detail-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="destination-detail-modal-content"
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-slate-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="btn-close-dest-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition shadow-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner Section */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-900">
          <img
            src={destination.heroImage}
            alt={destination.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Badges & Wishlist */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-teal-600/90 text-white text-xs font-semibold shadow-md">
              {destination.category}
            </span>
            {destination.isInternational && (
              <span className="px-2.5 py-1 rounded-full bg-sky-600/90 text-white text-xs font-semibold shadow-md">
                International
              </span>
            )}
            <button
              onClick={() => onToggleFavorite(destination.id)}
              className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-800 text-xs font-semibold flex items-center gap-1.5 shadow-md hover:bg-white transition cursor-pointer"
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
                }`}
              />
              <span>{isFavorite ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
            </button>
          </div>

          {/* Title & Metadata Overlay */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex items-center gap-2 text-teal-300 text-sm font-medium">
              <MapPin className="w-4 h-4" />
              <span>{destination.location}, {destination.country}</span>
              <span>•</span>
              <span>{destination.travelStyles.join(' • ')}</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              {destination.name}
            </h1>
            <p className="text-slate-200 text-sm sm:text-base max-w-2xl leading-relaxed">
              {destination.fullDescription}
            </p>
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          {/* Quick Information Grid (PRD 5) */}
          <div>
            <h3 className="font-heading font-extrabold text-lg text-gray-900 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-[#004D40]" />
              <span>📌 Quick Information</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="p-4 rounded-2xl bg-[#E8F5E9]/50 border border-[#004D40]/10">
                <div className="flex items-center gap-1.5 text-[#004D40] text-xs font-bold mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Best Time</span>
                </div>
                <div className="font-heading font-extrabold text-gray-900 text-sm sm:text-base">
                  {destination.bestTime}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100">
                <div className="flex items-center gap-1.5 text-sky-700 text-xs font-bold mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Recommended</span>
                </div>
                <div className="font-heading font-extrabold text-gray-900 text-sm sm:text-base">
                  {destination.recommendedDurationDays} Days
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold mb-1">
                  <Wallet className="w-3.5 h-3.5" />
                  <span>Estimated Budget</span>
                </div>
                <div className="font-heading font-extrabold text-gray-900 text-sm sm:text-base">
                  ₹{(destination.estimatedBudgetMin / 1000).toFixed(0)}K – ₹{(destination.estimatedBudgetMax / 1000).toFixed(0)}K
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100">
                <div className="flex items-center gap-1.5 text-purple-700 text-xs font-bold mb-1">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Travel Style</span>
                </div>
                <div className="font-heading font-extrabold text-gray-900 text-xs sm:text-sm truncate">
                  {destination.travelStyles.slice(0, 2).join(' / ')}
                </div>
              </div>
            </div>
          </div>

          {/* Things To Do Section (PRD 5 & 10) */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-extrabold text-lg text-gray-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FF6E40]" />
                <span>Popular Things To Do in {destination.name}</span>
              </h3>
              <span className="text-xs text-gray-500 font-medium">
                {destination.popularActivities.length} curated highlights
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {destination.popularActivities.map((act) => {
                const isAdded = addedActivityIds.includes(act.id);
                return (
                  <div
                    key={act.id}
                    className="p-3.5 rounded-2xl border border-gray-100 bg-white hover:border-[#004D40]/30 hover:shadow-md transition flex gap-3.5 items-center"
                  >
                    <img
                      src={act.image}
                      alt={act.name}
                      className="w-20 h-20 rounded-xl object-cover shrink-0 shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#E8F5E9] text-[#004D40] text-[10px] font-bold">
                          {act.category}
                        </span>
                        {act.rating && (
                          <span className="text-[11px] font-bold text-amber-600 flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            {act.rating}
                          </span>
                        )}
                      </div>
                      <h4 className="font-heading font-bold text-sm text-gray-900 truncate mt-1">
                        {act.name}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                        {act.description}
                      </p>
                      <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-gray-100">
                        <span className="font-bold text-xs text-gray-800">
                          {act.estimatedCost === 0 ? 'Free Entry' : `₹${act.estimatedCost.toLocaleString('en-IN')} est.`}
                        </span>
                        <button
                          onClick={() => handleAddActivity(act)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                            isAdded
                              ? 'bg-[#2E7D32] text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-[#004D40] hover:text-white'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3 h-3" />
                              <span>Add to Itinerary</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* How Can You Get There (PRD 5 & 11) */}
          <div className="p-6 rounded-3xl bg-[#00251a] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF6E40]">
                <Plane className="w-4 h-4" />
                <Train className="w-4 h-4" />
                <Bus className="w-4 h-4" />
                <Car className="w-4 h-4" />
                <span>Transport & Routes</span>
              </div>
              <h4 className="font-heading font-extrabold text-lg text-white">
                How Can You Get to {destination.name}?
              </h4>
              <p className="text-xs text-white/70 max-w-lg">
                Compare flight routes, Vande Bharat / Superfast trains, sleeper coaches, and scenic driving distance estimates.
              </p>
            </div>
            <button
              onClick={() => {
                onViewTravelOptions(destination);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-[#FF6E40] hover:bg-[#F4511E] text-white font-bold text-xs sm:text-sm transition flex items-center gap-2 shrink-0 shadow-md cursor-pointer"
            >
              <span>Compare Travel Options</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Where Can You Stay (PRD 5 & 13) */}
          <div>
            <h3 className="font-heading font-extrabold text-lg text-gray-900 mb-4 flex items-center gap-2">
              <span>🏨 Where Can You Stay in {destination.name}?</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {destination.stayOptions.map((stay) => {
                const isSelected = addedStayId === stay.id;
                return (
                  <div
                    key={stay.id}
                    className="p-4 rounded-3xl border border-gray-100 bg-white hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-28 rounded-2xl overflow-hidden mb-2.5">
                        <img
                          src={stay.image}
                          alt={stay.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] uppercase font-bold tracking-wider">
                          {stay.category}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-gray-500 text-[11px] truncate max-w-[130px]">
                          {stay.location}
                        </span>
                        <span className="font-bold text-amber-600 flex items-center gap-0.5 text-xs">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {stay.rating}
                        </span>
                      </div>
                      <h4 className="font-heading font-bold text-sm text-gray-900 line-clamp-1">
                        {stay.name}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                        {stay.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="font-heading font-extrabold text-gray-900 text-sm">
                          ₹{stay.pricePerNight.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-gray-400 block -mt-0.5 font-medium">/night est.</span>
                      </div>
                      <button
                        onClick={() => handleSelectStay(stay)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                          isSelected
                            ? 'bg-[#2E7D32] text-white'
                            : 'bg-gray-100 hover:bg-[#004D40] hover:text-white text-gray-700'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Add to Trip'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Destination Travel Tips */}
          {destination.travelTips && destination.travelTips.length > 0 && (
            <div className="p-5 rounded-3xl bg-amber-50/60 border border-amber-200/70 space-y-2">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Local Insider Tips for {destination.name}</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-amber-950/90 list-disc list-inside">
                {destination.travelTips.map((tip, idx) => (
                  <li key={idx} className="leading-relaxed">{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Mandatory Disclaimer */}
          <DisclaimerBanner compact />

          {/* Modal Bottom Sticky CTA */}
          <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-heading font-bold text-base text-gray-900">
                Ready to plan your {destination.name} adventure?
              </h4>
              <p className="text-xs text-gray-500">
                Customize duration, travel mode, budget, and get an instant day-by-day plan.
              </p>
            </div>
            <button
              id="btn-plan-this-dest-cta"
              onClick={() => {
                onPlanTripHere(destination);
                onClose();
              }}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#FF6E40] hover:bg-[#F4511E] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Plan My {destination.name} Trip</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
