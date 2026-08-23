export type TravelMode = 'flight' | 'train' | 'bus' | 'road';

export type TravelStyle =
  | 'Relaxed'
  | 'Adventure'
  | 'Cultural'
  | 'Food & Lifestyle'
  | 'Nature'
  | 'Budget'
  | 'Luxury';

export type StayCategory = 'budget' | 'mid-range' | 'premium' | 'luxury';

export type TravelInterest =
  | 'Beaches'
  | 'Food'
  | 'Shopping'
  | 'Photography'
  | 'History'
  | 'Nature'
  | 'Nightlife'
  | 'Adventure'
  | 'Art & Culture';

export interface Activity {
  id: string;
  name: string;
  category: string;
  estimatedCost: number;
  durationHours: number;
  description: string;
  image: string;
  timeSlotDefault: 'morning' | 'afternoon' | 'evening';
  location?: string;
  rating?: number;
}

export interface TravelOption {
  id: string;
  type: TravelMode;
  providerOrName: string;
  route: string;
  duration: string;
  departureArrival: string;
  estimatedFare: number;
  label: 'Fastest' | 'Best Value' | 'Budget Friendly' | 'Most Flexible' | 'Eco Friendly';
  busType?: string;
  distanceKm?: number;
  tollEstimate?: number;
  fuelEstimate?: number;
  highlights: string[];
}

export interface StayOption {
  id: string;
  name: string;
  category: StayCategory;
  rating: number;
  location: string;
  description: string;
  pricePerNight: number;
  image: string;
  amenities: string[];
  recommendedNights?: number;
}

export interface Destination {
  id: string;
  name: string;
  location: string;
  country: string;
  isInternational: boolean;
  category: 'Beach' | 'Mountains' | 'Nature' | 'Culture' | 'Adventure' | 'Food';
  heroImage: string;
  gallery: string[];
  shortDescription: string;
  fullDescription: string;
  bestTime: string;
  recommendedDurationDays: number;
  estimatedBudgetMin: number;
  estimatedBudgetMax: number;
  travelStyles: TravelStyle[];
  tags: string[];
  popularActivities: Activity[];
  travelOptions: TravelOption[];
  stayOptions: StayOption[];
  travelTips: string[];
}

export interface ItineraryItem {
  id: string;
  activityId?: string;
  title: string;
  category: string;
  timeSlot: 'morning' | 'afternoon' | 'evening';
  estimatedCost: number;
  completed: boolean;
  notes?: string;
  location?: string;
}

export interface DayItinerary {
  dayNumber: number;
  theme: string;
  activities: ItineraryItem[];
}

export interface TripPlan {
  id: string;
  destinationId: string;
  destinationName: string;
  durationDays: number;
  travelStyle: TravelStyle;
  interests: TravelInterest[];
  budgetTier: string;
  budgetCap: number;
  selectedTransportId?: string;
  selectedStayId?: string;
  selectedStayNights: number;
  itineraryDays: DayItinerary[];
  foodBudgetPerDay: number;
  localTravelBudgetPerDay: number;
  miscellaneousBudget: number;
  matchScore?: number;
  matchReason?: string;
  createdAt: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  category: 'Documents' | 'Clothing' | 'Essentials' | 'Personal';
  completed: boolean;
  isCustom?: boolean;
}

export interface TravelTip {
  id: string;
  category:
    | 'Packing'
    | 'Budget Travel'
    | 'Safety'
    | 'Solo Travel'
    | 'Group Travel'
    | 'First-Time Travel'
    | 'Sustainable Travel'
    | 'Photography';
  title: string;
  summary: string;
  detail: string;
  iconName: string;
  tag: string;
}

export interface AnalyticsEvent {
  id: string;
  eventName: string;
  params: Record<string, any>;
  timestamp: string;
}
