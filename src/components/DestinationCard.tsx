import React from 'react';
import { Destination } from '../types';
import { Heart, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { analytics } from '../utils/analytics';

interface DestinationCardProps {
  destination: Destination;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onExplore: (destination: Destination) => void;
  onPlanTripDirect?: (destination: Destination) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  isFavorite,
  onToggleFavorite,
  onExplore,
  onPlanTripDirect,
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(destination.id);
    analytics.track('favorite_destination', {
      destination_id: destination.id,
      destination_name: destination.name,
      action: isFavorite ? 'removed' : 'added',
    });
  };

  const handleCardClick = () => {
    onExplore(destination);
    analytics.track('destination_view', {
      destination_id: destination.id,
      destination_name: destination.name,
      country: destination.country,
    });
  };

  return (
    <div
      id={`destination-card-${destination.id}`}
      onClick={handleCardClick}
      className="group relative bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer select-none"
    >
      {/* Image Container with Zoom */}
      <div className="relative w-full h-56 sm:h-60 overflow-hidden bg-slate-100">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Gradient Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

        {/* Category & International Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-1.5 z-10">
          <span className="px-3 py-1 rounded-full bg-[#004D40]/90 backdrop-blur-md text-white text-[10px] font-bold tracking-wide shadow-xs border border-white/10 uppercase">
            {destination.category}
          </span>
          {destination.isInternational && (
            <span className="px-2.5 py-1 rounded-full bg-[#0277BD] text-white text-[10px] font-bold tracking-wide shadow-xs uppercase">
              International
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          id={`btn-fav-${destination.id}`}
          onClick={handleFavoriteClick}
          className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md hover:bg-white flex items-center justify-center text-slate-700 shadow-md hover:scale-110 active:scale-95 transition cursor-pointer"
          title={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-label="Toggle wishlist"
        >
          <Heart
            className={`w-4.5 h-4.5 transition-colors ${
              isFavorite
                ? 'fill-[#FF6E40] text-[#FF6E40] scale-110'
                : 'text-slate-600 hover:text-[#FF6E40]'
            }`}
          />
        </button>

        {/* Bottom Image Overlay: Name & Location */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white z-10">
          <div className="flex items-center gap-1 text-[11px] text-teal-200 font-medium drop-shadow-xs">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-[#FF6E40]" />
            <span>{destination.location}, {destination.country}</span>
          </div>
          <h3 className="font-heading font-extrabold text-xl text-white drop-shadow-sm tracking-tight">
            {destination.name}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
        {/* Short description */}
        <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
          {destination.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {destination.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold text-gray-600 uppercase"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Card Footer: Price Estimate & CTA */}
        <div className="pt-3.5 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Est. Budget</span>
            <span className="font-heading font-extrabold text-[#004D40] text-sm sm:text-base">
              ₹{destination.estimatedBudgetMin.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              id={`btn-explore-${destination.id}`}
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              className="px-4 py-2 rounded-xl bg-[#004D40] hover:bg-[#00382e] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
