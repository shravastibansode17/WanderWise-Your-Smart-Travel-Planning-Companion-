import React from 'react';
import { DESTINATIONS } from '../data/destinationsData';
import { Destination } from '../types';
import { Heart, MapPin, Sparkles, ArrowRight, Trash2 } from 'lucide-react';
import { analytics } from '../utils/analytics';

interface FavoritesViewProps {
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
  onExplore: (destination: Destination) => void;
  onPlanTripDirect: (destination: Destination) => void;
  onNavigateToExplore: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favoriteIds,
  onToggleFavorite,
  onExplore,
  onPlanTripDirect,
  onNavigateToExplore,
}) => {
  const favoriteDestinations = DESTINATIONS.filter((d) =>
    favoriteIds.includes(d.id)
  );

  return (
    <div id="favorites-wishlist-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 mb-1">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>Saved Wishlist</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Your Travel Wishlist
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Keep track of dream getaways and jump straight into planning when you are ready.
          </p>
        </div>

        <span className="px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold self-start sm:self-auto">
          {favoriteDestinations.length} Places Saved
        </span>
      </div>

      {/* Empty State (PRD 14) */}
      {favoriteDestinations.length === 0 ? (
        <div className="max-w-md mx-auto my-16 p-8 text-center bg-white rounded-3xl border border-gray-100 shadow-sm space-y-5">
          <div className="w-18 h-18 rounded-3xl bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto text-rose-500">
            <Heart className="w-9 h-9" />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-heading font-bold text-xl text-gray-900">
              Your travel wishlist is empty
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              Explore our curated destinations and tap the heart icon ♡ to save the places you love.
            </p>
          </div>
          <button
            onClick={onNavigateToExplore}
            className="px-7 py-3 rounded-full bg-[#FF6E40] hover:bg-[#F4511E] text-white text-xs sm:text-sm font-bold shadow-md transition cursor-pointer"
          >
            Explore Destinations
          </button>
        </div>
      ) : (
        /* Favorites Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00251a]/80 via-transparent to-transparent" />

                  {/* Remove Button */}
                  <button
                    onClick={() => onToggleFavorite(dest.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-rose-600 shadow-md transition cursor-pointer"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-1 text-[11px] text-teal-300 font-bold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{dest.location}, {dest.country}</span>
                    </div>
                    <h3 className="font-heading font-extrabold text-xl text-white">
                      {dest.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {dest.shortDescription}
                  </p>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 block">Estimated budget</span>
                      <span className="font-heading font-extrabold text-gray-900 text-sm">
                        From ₹{dest.estimatedBudgetMin.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#E8F5E9] text-[#004D40] font-bold text-[11px]">
                      {dest.recommendedDurationDays} Days rec.
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 flex items-center gap-2">
                <button
                  onClick={() => onExplore(dest)}
                  className="flex-1 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition text-center cursor-pointer"
                >
                  View Details
                </button>
                <button
                  onClick={() => onPlanTripDirect(dest)}
                  className="flex-1 py-2.5 rounded-full bg-[#FF6E40] hover:bg-[#F4511E] text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Plan Trip</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
