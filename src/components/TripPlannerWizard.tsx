import React, { useState, useEffect } from 'react';
import { DESTINATIONS } from '../data/destinationsData';
import { Destination, TravelInterest, TravelMode, TravelStyle, TripPlan } from '../types';
import { generatePersonalizedTrip } from '../utils/tripGenerator';
import { generateItineraryPdf, openPrintDialog } from '../utils/pdfGenerator';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Plane,
  Train,
  Bus,
  Car,
  Compass,
  MapPin,
  Clock,
  Wallet,
  Zap,
  TrendingUp,
  Search,
  RotateCcw,
  Download,
  Printer,
  FileText,
} from 'lucide-react';
import { analytics } from '../utils/analytics';
import confetti from 'canvas-confetti';

interface TripPlannerWizardProps {
  initialDestinationId?: string;
  onTripGenerated: (trip: TripPlan) => void;
  onNavigateToExplore: () => void;
}

export const TripPlannerWizard: React.FC<TripPlannerWizardProps> = ({
  initialDestinationId,
  onTripGenerated,
  onNavigateToExplore,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>(
    initialDestinationId || 'goa'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [durationDays, setDurationDays] = useState<number>(4);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('Relaxed');
  const [selectedInterests, setSelectedInterests] = useState<TravelInterest[]>([
    'Beaches',
    'Food',
    'Nightlife',
  ]);
  const [budgetTier, setBudgetTier] = useState<string>('₹20,000–₹40,000');
  const [selectedModes, setSelectedModes] = useState<TravelMode[]>(['flight', 'train']);

  // AI Thinking & Match Result States
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [thinkingPhase, setThinkingPhase] = useState(0);
  const [generatedMatch, setGeneratedMatch] = useState<TripPlan | null>(null);

  useEffect(() => {
    if (initialDestinationId) {
      setSelectedDestinationId(initialDestinationId);
    }
  }, [initialDestinationId]);

  useEffect(() => {
    analytics.track('trip_planner_start', { step: currentStep });
  }, []);

  const totalSteps = 6;

  const durationOptions = [
    { label: '1–2 Days', days: 2, sub: 'Quick Weekend Getaway' },
    { label: '3–4 Days', days: 4, sub: 'Perfect Short Break' },
    { label: '5–7 Days', days: 6, sub: 'Immersive Exploration' },
    { label: '8+ Days', days: 9, sub: 'Grand Long Vacation' },
  ];

  const travelStyleOptions: { style: TravelStyle; icon: string; desc: string }[] = [
    { style: 'Relaxed', icon: '🌿', desc: 'Slow-paced, scenic cafes, beaches, gentle vibes' },
    { style: 'Adventure', icon: '🏔️', desc: 'Trekking, sports, rafting, high thrills' },
    { style: 'Cultural', icon: '🏛️', desc: 'Monuments, heritage, history, guided walks' },
    { style: 'Food & Lifestyle', icon: '🍜', desc: 'Culinary tours, night markets, rooftop lounges' },
    { style: 'Nature', icon: '🌊', desc: 'Waterfalls, tea estates, mountains, lakes' },
    { style: 'Budget', icon: '💰', desc: 'Hostels, public transit, high-value choices' },
    { style: 'Luxury', icon: '✨', desc: 'Premium resorts, private rides, fine dining' },
  ];

  const interestOptions: { interest: TravelInterest; icon: string }[] = [
    { interest: 'Beaches', icon: '🏖️' },
    { interest: 'Food', icon: '🍜' },
    { interest: 'Shopping', icon: '🛍️' },
    { interest: 'Photography', icon: '📸' },
    { interest: 'History', icon: '🏛️' },
    { interest: 'Nature', icon: '🌿' },
    { interest: 'Nightlife', icon: '🎉' },
    { interest: 'Adventure', icon: '🏄' },
    { interest: 'Art & Culture', icon: '🎨' },
  ];

  const budgetOptions = [
    { tier: 'Under ₹10,000', icon: '💰', desc: 'Hostels, state buses & trains, street delicacies' },
    { tier: '₹10,000–₹20,000', icon: '🎒', desc: 'Boutique stays, mixed transport, fun activities' },
    { tier: '₹20,000–₹40,000', icon: '🏖️', desc: '3-star & 4-star hotels, flights, all excursions' },
    { tier: '₹40,000–₹75,000', icon: '💎', desc: 'Premium resorts, flights, gourmet meals' },
    { tier: '₹75,000+', icon: '👑', desc: '5-star luxury estates, private chauffeurs, VIP' },
  ];

  const transportOptions: { mode: TravelMode; icon: React.ReactNode; label: string; tag: string; desc: string }[] = [
    { mode: 'flight', icon: <Plane className="w-5 h-5 text-sky-500" />, label: 'Flight', tag: 'Fastest', desc: 'Direct airways, minimal transit fatigue' },
    { mode: 'train', icon: <Train className="w-5 h-5 text-emerald-500" />, label: 'Train', tag: 'Best Value', desc: 'Vande Bharat / Superfast scenic railways' },
    { mode: 'bus', icon: <Bus className="w-5 h-5 text-amber-500" />, label: 'Bus', tag: 'Affordable', desc: 'Overnight AC Multi-Axle sleeper coaches' },
    { mode: 'road', icon: <Car className="w-5 h-5 text-purple-500" />, label: 'Road Trip', tag: 'Most Flexible', desc: 'Self-drive / cab with stopover freedom' },
  ];

  const handleInterestToggle = (interest: TravelInterest) => {
    if (selectedInterests.includes(interest)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter((i) => i !== interest));
      }
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleModeToggle = (mode: TravelMode) => {
    if (selectedModes.includes(mode)) {
      if (selectedModes.length > 1) {
        setSelectedModes(selectedModes.filter((m) => m !== mode));
      }
    } else {
      setSelectedModes([...selectedModes, mode]);
    }
  };

  const filteredDestinations = DESTINATIONS.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedDestination =
    DESTINATIONS.find((d) => d.id === selectedDestinationId) || DESTINATIONS[0];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      analytics.track('planner_step_advance', { step: currentStep + 1 });
    } else {
      // Step 6 completed -> Start AI Thinking & Match Generation
      triggerAiTripGeneration();
    }
  };

  const triggerAiTripGeneration = () => {
    setIsAiThinking(true);
    setThinkingPhase(1);

    analytics.track('trip_created', {
      destination: selectedDestination.name,
      duration: durationDays,
      style: travelStyle,
      budget: budgetTier,
    });

    setTimeout(() => {
      setThinkingPhase(2);
    }, 1000);

    setTimeout(() => {
      setThinkingPhase(3);
    }, 2000);

    setTimeout(() => {
      const generated = generatePersonalizedTrip(
        selectedDestinationId,
        durationDays,
        travelStyle,
        selectedInterests,
        budgetTier
      );
      setGeneratedMatch(generated);
      setIsAiThinking(false);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore
      }
    }, 2800);
  };

  const handleConfirmTrip = () => {
    if (generatedMatch) {
      onTripGenerated(generatedMatch);
      analytics.track('itinerary_created', {
        destination: generatedMatch.destinationName,
        days: generatedMatch.durationDays,
      });
    }
  };

  // 1. AI THINKING SCREEN (PRD 22)
  if (isAiThinking) {
    return (
      <div
        id="planner-ai-thinking"
        className="min-h-[500px] flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-gray-100 shadow-xl text-center max-w-2xl mx-auto my-8 space-y-6 animate-in fade-in duration-300"
      >
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#004D40] to-[#FF6E40] flex items-center justify-center shadow-lg shadow-[#004D40]/25 animate-spin">
            <Sparkles className="w-10 h-10 text-white animate-pulse" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#00251a] text-[#FF6E40] p-1.5 rounded-full shadow-xs">
            <Zap className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-heading font-extrabold text-2xl text-gray-900">
            {thinkingPhase === 1 && 'WanderWise is thinking...'}
            {thinkingPhase === 2 && 'Finding destinations & matching travel styles...'}
            {thinkingPhase === 3 && 'Crafting your personalized day-by-day plan ✨'}
          </h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Analyzing {selectedDestination.name}, optimizing morning to evening activities, calculating transportation & stays...
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#004D40] animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-3 h-3 rounded-full bg-[#0277BD] animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-3 h-3 rounded-full bg-[#FF6E40] animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    );
  }

  // 2. SMART TRAVEL MATCH RESULT SCREEN (PRD 21 & 22)
  if (generatedMatch) {
    return (
      <div
        id="planner-travel-match-result"
        className="w-full max-w-3xl mx-auto my-8 bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
      >
        {/* Banner with Match Score */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#00251a]">
          <img
            src={selectedDestination.heroImage}
            alt={selectedDestination.name}
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* AI Match Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-extrabold flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6E40]" />
              <span>✨ YOUR WANDERWISE MATCH</span>
            </span>
            <span className="px-3 py-1.5 rounded-full bg-[#FF6E40] text-white text-xs font-bold shadow-md">
              {generatedMatch.matchScore}% Match
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
            <span className="text-xs uppercase tracking-widest text-teal-200 font-bold">
              Based on your preferences
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight text-white">
              {selectedDestination.name}
            </h2>
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {selectedInterests.map((interest, i) => (
                <span
                  key={i}
                  className="px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase"
                >
                  • {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Match Breakdown & Why We Recommend It */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="p-5 rounded-2xl bg-[#E8F5E9]/50 border border-[#2E7D32]/20 space-y-2">
            <h4 className="font-heading font-bold text-[#004D40] text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#FF6E40]" />
              <span>Why We Recommend It:</span>
            </h4>
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
              {generatedMatch.matchReason}
            </p>
          </div>

          {/* Quick Summary Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-center">
              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 block">Duration</span>
              <span className="font-heading font-extrabold text-gray-900 text-sm">
                {generatedMatch.durationDays} Days
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-center">
              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 block">Style</span>
              <span className="font-heading font-extrabold text-[#004D40] text-sm">
                {generatedMatch.travelStyle}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-center">
              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 block">Budget Cap</span>
              <span className="font-heading font-extrabold text-gray-900 text-sm">
                {generatedMatch.budgetTier}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-center">
              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 block">Planned Slots</span>
              <span className="font-heading font-extrabold text-[#0277BD] text-sm">
                {generatedMatch.itineraryDays.length * 3} Activities
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  setGeneratedMatch(null);
                  setCurrentStep(1);
                }}
                className="px-4 py-2.5 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
                <span>Modify</span>
              </button>

              <button
                onClick={() => {
                  if (generatedMatch) {
                    generateItineraryPdf(generatedMatch, selectedDestination);
                    analytics.track('itinerary_pdf_downloaded_from_match', { destination: selectedDestination.name });
                  }
                }}
                className="px-4 py-2.5 rounded-full bg-[#004D40] hover:bg-[#00382e] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
                title="Download PDF directly to Phone or Computer"
              >
                <Download className="w-3.5 h-3.5 text-teal-200" />
                <span>Download PDF</span>
              </button>

              <button
                onClick={() => {
                  if (generatedMatch) {
                    openPrintDialog(generatedMatch, selectedDestination);
                    analytics.track('itinerary_printed_from_match', { destination: selectedDestination.name });
                  }
                }}
                className="px-3.5 py-2.5 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                title="Print or Save Plan"
              >
                <Printer className="w-3.5 h-3.5 text-gray-500" />
                <span>Print</span>
              </button>
            </div>

            <button
              id="btn-build-personalized-trip"
              onClick={handleConfirmTrip}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#FF6E40] hover:bg-[#F4511E] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Build My {selectedDestination.name} Trip</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. STEP-BY-STEP 6-STAGE WIZARD FORM (PRD 6)
  return (
    <div
      id="trip-planner-wizard"
      className="w-full max-w-3xl mx-auto my-8 bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden"
    >
      {/* Wizard Header with Progress Bar */}
      <div className="p-6 sm:p-8 bg-[#00251a] text-white space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[#004D40] text-white border border-white/10">
              <Sparkles className="w-4 h-4 text-[#FF6E40]" />
            </span>
            <div>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                Plan Your Adventure
              </h2>
              <p className="text-white/70 text-xs">
                AI-driven travel discovery and customized trip generator
              </p>
            </div>
          </div>
          <span className="px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-teal-200 text-xs font-bold">
            Step {currentStep} of {totalSteps}
          </span>
        </div>

        {/* Progress Track */}
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#004D40] via-[#0277BD] to-[#FF6E40] h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content Body */}
      <div className="p-6 sm:p-8">
        {/* STEP 1: DESTINATION */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#004D40] font-bold">Step 1 of 6</span>
              <h3 className="font-heading font-extrabold text-2xl text-gray-900 mt-1">
                Where are you going?
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm">
                Choose from popular destinations or search for your dream spot.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Goa, Manali, Bali, Jaipur, Paris..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#004D40] text-sm"
              />
            </div>

            {/* Destination Grid Selection */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-72 overflow-y-auto pr-1">
              {filteredDestinations.map((dest) => {
                const isSelected = selectedDestinationId === dest.id;
                return (
                  <div
                    key={dest.id}
                    onClick={() => setSelectedDestinationId(dest.id)}
                    className={`relative rounded-2xl border p-2 cursor-pointer transition flex flex-col justify-between overflow-hidden ${
                      isSelected
                        ? 'border-[#004D40] bg-[#E8F5E9]/50 ring-2 ring-[#004D40]'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="relative h-20 rounded-xl overflow-hidden mb-2">
                      <img
                        src={dest.heroImage}
                        alt={dest.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#004D40] text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-gray-900">{dest.name}</h4>
                      <p className="text-[11px] text-gray-500">{dest.location}, {dest.country}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: DURATION */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#004D40] font-bold">Step 2 of 6</span>
              <h3 className="font-heading font-extrabold text-2xl text-gray-900 mt-1">
                How long are you staying?
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm">
                Select your ideal duration in {selectedDestination.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {durationOptions.map((opt) => {
                const isSelected = durationDays === opt.days;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setDurationDays(opt.days)}
                    className={`p-4.5 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-[#004D40] bg-[#E8F5E9]/50 ring-2 ring-[#004D40] shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Clock className={`w-4 h-4 ${isSelected ? 'text-[#004D40]' : 'text-gray-400'}`} />
                        <h4 className="font-heading font-bold text-base text-gray-900">{opt.label}</h4>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{opt.sub}</p>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-[#004D40] text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: TRAVEL STYLE */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#004D40] font-bold">Step 3 of 6</span>
              <h3 className="font-heading font-extrabold text-2xl text-gray-900 mt-1">
                What's your travel style?
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm">
                How do you envision experiencing this getaway?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {travelStyleOptions.map((opt) => {
                const isSelected = travelStyle === opt.style;
                return (
                  <button
                    key={opt.style}
                    type="button"
                    onClick={() => setTravelStyle(opt.style)}
                    className={`p-3.5 rounded-2xl border text-left transition flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-[#004D40] bg-[#E8F5E9]/50 ring-2 ring-[#004D40] shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <span className="text-2xl mt-0.5">{opt.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-heading font-bold text-sm text-gray-900">{opt.style}</h4>
                        {isSelected && <Check className="w-4 h-4 text-[#004D40]" />}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: INTERESTS (MULTI-SELECT) */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#004D40] font-bold">Step 4 of 6</span>
              <h3 className="font-heading font-extrabold text-2xl text-gray-900 mt-1">
                What are you interested in?
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm">
                Select everything you enjoy (multi-select).
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {interestOptions.map((opt) => {
                const isSelected = selectedInterests.includes(opt.interest);
                return (
                  <button
                    key={opt.interest}
                    type="button"
                    onClick={() => handleInterestToggle(opt.interest)}
                    className={`p-3.5 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-[#004D40] bg-[#E8F5E9]/60 ring-2 ring-[#004D40] shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{opt.icon}</span>
                      <span className="font-heading font-bold text-xs sm:text-sm text-gray-900">
                        {opt.interest}
                      </span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#004D40]" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: BUDGET RANGE */}
        {currentStep === 5 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#004D40] font-bold">Step 5 of 6</span>
              <h3 className="font-heading font-extrabold text-2xl text-gray-900 mt-1">
                What's your budget?
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm">
                Estimated overall budget per person for transport, stay & activities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {budgetOptions.map((opt) => {
                const isSelected = budgetTier === opt.tier;
                return (
                  <button
                    key={opt.tier}
                    type="button"
                    onClick={() => setBudgetTier(opt.tier)}
                    className={`p-3.5 rounded-2xl border text-left transition flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-[#004D40] bg-[#E8F5E9]/50 ring-2 ring-[#004D40] shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <span className="text-2xl mt-0.5">{opt.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-heading font-bold text-sm text-gray-900">{opt.tier}</h4>
                        {isSelected && <Check className="w-4 h-4 text-[#004D40]" />}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 6: TRAVEL MODES */}
        {currentStep === 6 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#004D40] font-bold">Step 6 of 6</span>
              <h3 className="font-heading font-extrabold text-2xl text-gray-900 mt-1">
                How would you like to travel?
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm">
                Select your preferred transit modes (choose multiple for smart side-by-side comparison).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {transportOptions.map((opt) => {
                const isSelected = selectedModes.includes(opt.mode);
                return (
                  <button
                    key={opt.mode}
                    type="button"
                    onClick={() => handleModeToggle(opt.mode)}
                    className={`p-4 rounded-2xl border text-left transition flex items-start gap-3.5 cursor-pointer ${
                      isSelected
                        ? 'border-[#004D40] bg-[#E8F5E9]/60 ring-2 ring-[#004D40] shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="p-2.5 rounded-xl bg-gray-100">{opt.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-heading font-bold text-sm text-gray-900">{opt.label}</span>
                        <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[10px] font-bold uppercase tracking-wider">
                          {opt.tag}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{opt.desc}</p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#004D40] mt-1" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-5 py-2.5 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onNavigateToExplore}
              className="text-xs text-[#004D40] hover:underline font-bold"
            >
              ← Explore all destinations first
            </button>
          )}

          <button
            id="btn-wizard-next"
            type="button"
            onClick={handleNext}
            className="px-7 py-3 rounded-full bg-[#FF6E40] hover:bg-[#F4511E] text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer transition hover:-translate-y-0.5"
          >
            <span>{currentStep === totalSteps ? 'Generate My Plan ✨' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
