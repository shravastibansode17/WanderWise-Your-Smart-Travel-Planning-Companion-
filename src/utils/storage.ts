import { TripPlan, ChecklistItem } from '../types';
import { DEFAULT_CHECKLIST_ITEMS } from '../data/checklistTemplates';

const KEYS = {
  FAVORITES: 'wanderwise_favorites_v1',
  ACTIVE_TRIP: 'wanderwise_active_trip_v1',
  CHECKLIST: 'wanderwise_checklist_v1',
};

export const storage = {
  getFavorites(): string[] {
    try {
      const data = localStorage.getItem(KEYS.FAVORITES);
      return data ? JSON.parse(data) : ['goa', 'manali', 'bali'];
    } catch {
      return ['goa', 'manali', 'bali'];
    }
  },

  saveFavorites(favorites: string[]) {
    try {
      localStorage.setItem(KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites', e);
    }
  },

  getActiveTrip(): TripPlan | null {
    try {
      const data = localStorage.getItem(KEYS.ACTIVE_TRIP);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveActiveTrip(trip: TripPlan | null) {
    try {
      if (trip) {
        localStorage.setItem(KEYS.ACTIVE_TRIP, JSON.stringify(trip));
      } else {
        localStorage.removeItem(KEYS.ACTIVE_TRIP);
      }
    } catch (e) {
      console.error('Failed to save active trip', e);
    }
  },

  getChecklist(): ChecklistItem[] {
    try {
      const data = localStorage.getItem(KEYS.CHECKLIST);
      return data ? JSON.parse(data) : DEFAULT_CHECKLIST_ITEMS;
    } catch {
      return DEFAULT_CHECKLIST_ITEMS;
    }
  },

  saveChecklist(items: ChecklistItem[]) {
    try {
      localStorage.setItem(KEYS.CHECKLIST, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save checklist', e);
    }
  },
};
