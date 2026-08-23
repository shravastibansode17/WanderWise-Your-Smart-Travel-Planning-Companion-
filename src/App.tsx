/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DESTINATIONS } from './data/destinationsData';
import { Destination, TripPlan, ChecklistItem, TravelOption, Activity, StayOption } from './types';
import { storage } from './utils/storage';
import { analytics } from './utils/analytics';

// Layout Components
import { Navbar, NavPage } from './components/Navbar';
import { Footer } from './components/Footer';
import { AnalyticsMonitor } from './components/AnalyticsMonitor';
import { DestinationDetailModal } from './components/DestinationDetailModal';

// View Components
import { HomeView } from './components/HomeView';
import { ExploreView } from './components/ExploreView';
import { TripPlannerWizard } from './components/TripPlannerWizard';
import { TravelOptionsView } from './components/TravelOptionsView';
import { MyItineraryView } from './components/MyItineraryView';
import { BudgetPlannerView } from './components/BudgetPlannerView';
import { ChecklistView } from './components/ChecklistView';
import { TravelTipsView } from './components/TravelTipsView';
import { FavoritesView } from './components/FavoritesView';

export default function App() {
  // Navigation State
  const [activePage, setActivePage] = useState<NavPage>('home');

  // Persistence States
  const [favorites, setFavorites] = useState<string[]>(() => storage.getFavorites());
  const [activeTrip, setActiveTrip] = useState<TripPlan | null>(() => storage.getActiveTrip());
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(() =>
    storage.getChecklist()
  );

  // Selected Destination & Modal State
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [plannerPresetDestinationId, setPlannerPresetDestinationId] = useState<string>('goa');

  // GA4 Live Inspector Drawer
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState<boolean>(false);

  // Sync to storage on updates
  useEffect(() => {
    storage.saveFavorites(favorites);
  }, [favorites]);

  useEffect(() => {
    storage.saveActiveTrip(activeTrip);
  }, [activeTrip]);

  useEffect(() => {
    storage.saveChecklist(checklistItems);
  }, [checklistItems]);

  // Track initial page view and tab switches
  useEffect(() => {
    const pageTitle = `WanderWise — ${activePage.charAt(0).toUpperCase() + activePage.slice(1)}`;
    document.title = `${pageTitle} | Smart Travel Planning Companion`;
    analytics.track('page_view', {
      page: activePage,
      page_title: pageTitle,
      page_path: `/${activePage}`,
      page_location: window.location.href,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // Handlers
  const handleToggleFavorite = (destinationId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(destinationId)
        ? prev.filter((id) => id !== destinationId)
        : [...prev, destinationId];
      return next;
    });
  };

  const handleOpenDestinationDetail = (dest: Destination) => {
    setSelectedDestination(dest);
    setIsDetailModalOpen(true);
  };

  const handlePlanTripForDestination = (dest: Destination) => {
    setPlannerPresetDestinationId(dest.id);
    setActivePage('planner');
  };

  const handleTripGenerated = (trip: TripPlan) => {
    setActiveTrip(trip);
    setActivePage('itinerary');
  };

  const handleSelectTransportOption = (destinationId: string, option: TravelOption) => {
    if (activeTrip && activeTrip.destinationId === destinationId) {
      const updated = {
        ...activeTrip,
        selectedTransportId: option.id,
      };
      setActiveTrip(updated);
    }
  };

  const handleAddActivityFromDetail = (dest: Destination, activity: Activity) => {
    if (activeTrip && activeTrip.destinationId === dest.id) {
      // Add to Day 1 or current first day
      const updatedDays = activeTrip.itineraryDays.map((day, idx) => {
        if (idx === 0) {
          const exists = day.activities.some((a) => a.activityId === activity.id);
          if (exists) {
            return {
              ...day,
              activities: day.activities.filter((a) => a.activityId !== activity.id),
            };
          } else {
            return {
              ...day,
              activities: [
                ...day.activities,
                {
                  id: `act-${Date.now()}`,
                  activityId: activity.id,
                  title: activity.name,
                  category: activity.category,
                  timeSlot: activity.timeSlotDefault,
                  estimatedCost: activity.estimatedCost,
                  completed: false,
                  location: activity.location,
                },
              ],
            };
          }
        }
        return day;
      });
      setActiveTrip({ ...activeTrip, itineraryDays: updatedDays });
    }
  };

  const handleSelectStayFromDetail = (dest: Destination, stay: StayOption) => {
    if (activeTrip && activeTrip.destinationId === dest.id) {
      setActiveTrip({
        ...activeTrip,
        selectedStayId: stay.id,
      });
    }
  };

  const currentDestinationIdForTravel = activeTrip ? activeTrip.destinationId : 'goa';

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F4] text-[#212121] font-sans antialiased selection:bg-[#004D40] selection:text-white">
      {/* 1. Main Navigation */}
      <Navbar
        activePage={activePage}
        onNavigate={(page) => setActivePage(page)}
        favoritesCount={favorites.length}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
      />

      {/* Main Page View Content */}
      <main className="flex-1 w-full">
        {activePage === 'home' && (
          <HomeView
            onPlanTripCTA={() => setActivePage('planner')}
            onExploreDestinationsCTA={() => setActivePage('explore')}
            onSelectDestination={handleOpenDestinationDetail}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onDirectSearchSelect={(dest) => {
              handleOpenDestinationDetail(dest);
            }}
          />
        )}

        {activePage === 'explore' && (
          <ExploreView
            onSelectDestination={handleOpenDestinationDetail}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {activePage === 'planner' && (
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <TripPlannerWizard
              initialDestinationId={plannerPresetDestinationId}
              onTripGenerated={handleTripGenerated}
              onNavigateToExplore={() => setActivePage('explore')}
            />
          </div>
        )}

        {activePage === 'travel-options' && (
          <TravelOptionsView
            selectedDestinationId={currentDestinationIdForTravel}
            onDestinationChange={(id) => {
              if (activeTrip) {
                const dest = DESTINATIONS.find((d) => d.id === id);
                if (dest) {
                  setActiveTrip({
                    ...activeTrip,
                    destinationId: dest.id,
                    destinationName: dest.name,
                    selectedTransportId: dest.travelOptions[0]?.id,
                  });
                }
              }
            }}
            onSelectTransportForTrip={handleSelectTransportOption}
            currentSelectedTransportId={activeTrip?.selectedTransportId}
          />
        )}

        {activePage === 'itinerary' && (
          <MyItineraryView
            trip={activeTrip}
            onUpdateTrip={(updated) => setActiveTrip(updated)}
            onStartNewTrip={() => setActivePage('planner')}
            onNavigateToExplore={() => setActivePage('explore')}
            onNavigateToBudget={() => setActivePage('budget')}
          />
        )}

        {activePage === 'budget' && (
          <BudgetPlannerView
            trip={activeTrip}
            onUpdateTrip={(updated) => setActiveTrip(updated)}
            onStartNewTrip={() => setActivePage('planner')}
            onNavigateToItinerary={() => setActivePage('itinerary')}
            onNavigateToTravelOptions={() => setActivePage('travel-options')}
          />
        )}

        {activePage === 'checklist' && (
          <ChecklistView
            items={checklistItems}
            onUpdateItems={(items) => setChecklistItems(items)}
          />
        )}

        {activePage === 'tips' && <TravelTipsView />}

        {activePage === 'favorites' && (
          <FavoritesView
            favoriteIds={favorites}
            onToggleFavorite={handleToggleFavorite}
            onExplore={handleOpenDestinationDetail}
            onPlanTripDirect={(dest) => {
              setPlannerPresetDestinationId(dest.id);
              setActivePage('planner');
            }}
            onNavigateToExplore={() => setActivePage('explore')}
          />
        )}
      </main>

      {/* Destination Detail Modal */}
      <DestinationDetailModal
        destination={selectedDestination}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        isFavorite={selectedDestination ? favorites.includes(selectedDestination.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onPlanTripHere={handlePlanTripForDestination}
        onViewTravelOptions={(dest) => {
          if (activeTrip) {
            setActiveTrip({
              ...activeTrip,
              destinationId: dest.id,
              destinationName: dest.name,
            });
          }
          setActivePage('travel-options');
        }}
        onAddActivityToTrip={handleAddActivityFromDetail}
        onSelectStayForTrip={handleSelectStayFromDetail}
      />

      {/* Google Analytics 4 Real-time Inspector */}
      <AnalyticsMonitor
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />

      {/* Footer */}
      <Footer onNavigate={(page) => setActivePage(page)} />
    </div>
  );
}
