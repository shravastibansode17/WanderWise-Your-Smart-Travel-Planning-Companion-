import { DESTINATIONS } from '../data/destinationsData';
import { getDailyActivitiesForDestination } from '../data/destinationDailyActivities';
import { Destination, ItineraryItem, DayItinerary, TripPlan, TravelInterest, TravelStyle } from '../types';

export function generatePersonalizedTrip(
  destinationId: string,
  durationDays: number,
  travelStyle: TravelStyle,
  interests: TravelInterest[],
  budgetTier: string
): TripPlan {
  const dest = DESTINATIONS.find((d) => d.id === destinationId) || DESTINATIONS[0];

  // Calculate Match Score based on style, interests, and category overlap
  let matchScore = 86;
  if (dest.travelStyles.includes(travelStyle)) matchScore += 6;
  if (interests.some((interest) => dest.tags.some((tag) => tag.toLowerCase().includes(interest.toLowerCase())))) {
    matchScore += 5;
  }
  matchScore = Math.min(98, matchScore);

  // Generate Match Reason
  const matchedInterests = interests.filter((i) =>
    dest.tags.some((t) => t.toLowerCase().includes(i.toLowerCase()) || dest.shortDescription.toLowerCase().includes(i.toLowerCase()))
  );
  const interestPhrases = matchedInterests.length > 0
    ? matchedInterests.slice(0, 3).join(', ')
    : dest.tags.slice(0, 3).join(', ');

  const matchReason = `${dest.name} matches your interest in ${interestPhrases.toLowerCase()} and ${travelStyle.toLowerCase()} travel while fitting comfortably within your estimated ${budgetTier} budget.`;

  // Select Recommended Transport
  let defaultTransport = dest.travelOptions[0];
  if (budgetTier === 'Under ₹10,000' || travelStyle === 'Budget') {
    defaultTransport = dest.travelOptions.find((t) => t.type === 'train' || t.type === 'bus') || dest.travelOptions[0];
  } else if (travelStyle === 'Luxury') {
    defaultTransport = dest.travelOptions.find((t) => t.type === 'flight') || dest.travelOptions[0];
  }

  // Select Recommended Stay
  let stayCategory: 'budget' | 'mid-range' | 'premium' | 'luxury' = 'mid-range';
  if (budgetTier === 'Under ₹10,000' || travelStyle === 'Budget') stayCategory = 'budget';
  else if (budgetTier === '₹40,000–₹75,000' || travelStyle === 'Luxury' || budgetTier === '₹75,000+') stayCategory = 'premium';

  let defaultStay = dest.stayOptions.find((s) => s.category === stayCategory) || dest.stayOptions[0];

  // Build Day-by-Day Itinerary with Distinct, Non-Repeating Activities for Each Day
  const totalDays = Math.max(1, durationDays);
  const dailyBlueprints = getDailyActivitiesForDestination(dest.id, dest.name, totalDays);

  const itineraryDays: DayItinerary[] = dailyBlueprints.map((dayBlueprint, index) => {
    const dayNum = index + 1;
    const activities: ItineraryItem[] = dayBlueprint.activities.map((act, actIdx) => {
      // Cost multiplier based on budget tier and travel style
      let cost = act.estimatedCost;
      if (travelStyle === 'Budget') {
        cost = Math.round(cost * 0.75);
      } else if (travelStyle === 'Luxury') {
        cost = Math.round(cost * 1.5);
      }

      return {
        id: `day-${dayNum}-act-${act.timeSlot}-${actIdx + 1}`,
        title: act.title,
        category: act.category,
        timeSlot: act.timeSlot,
        estimatedCost: cost,
        completed: false,
        location: act.location,
      };
    });

    return {
      dayNumber: dayNum,
      theme: dayBlueprint.theme,
      activities,
    };
  });

  // Calculate default food & local travel daily budgets
  let foodPerDay = 1200;
  let localTravelPerDay = 600;
  let misc = 800;

  if (travelStyle === 'Budget') {
    foodPerDay = 700;
    localTravelPerDay = 350;
    misc = 400;
  } else if (travelStyle === 'Luxury') {
    foodPerDay = 3200;
    localTravelPerDay = 1800;
    misc = 2500;
  }

  return {
    id: `trip-${Date.now()}`,
    destinationId: dest.id,
    destinationName: dest.name,
    durationDays: totalDays,
    travelStyle,
    interests,
    budgetTier,
    budgetCap: getBudgetCapNumber(budgetTier),
    selectedTransportId: defaultTransport?.id,
    selectedStayId: defaultStay?.id,
    selectedStayNights: Math.max(1, totalDays - 1),
    itineraryDays,
    foodBudgetPerDay: foodPerDay,
    localTravelBudgetPerDay: localTravelPerDay,
    miscellaneousBudget: misc,
    matchScore,
    matchReason,
    createdAt: new Date().toISOString(),
  };
}

function getBudgetCapNumber(budgetTier: string): number {
  switch (budgetTier) {
    case 'Under ₹10,000':
      return 10000;
    case '₹10,000–₹20,000':
      return 20000;
    case '₹20,000–₹40,000':
      return 40000;
    case '₹40,000–₹75,000':
      return 75000;
    case '₹75,000+':
      return 120000;
    default:
      return 35000;
  }
}
