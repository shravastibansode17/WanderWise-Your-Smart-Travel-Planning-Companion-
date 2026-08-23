import React, { useState } from 'react';
import { TripPlan, DayItinerary, ItineraryItem, Destination } from '../types';
import { DESTINATIONS } from '../data/destinationsData';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Edit2,
  Sparkles,
  Plane,
  Building,
  RotateCcw,
  Printer,
  ChevronRight,
  Sun,
  Sunset,
  Sunrise,
  Check,
  X,
  Download,
  FileText,
  Smartphone,
  Share2,
  Copy,
} from 'lucide-react';
import { analytics } from '../utils/analytics';
import { generateItineraryPdf, downloadOfflineHtmlItinerary, openPrintDialog } from '../utils/pdfGenerator';
import confetti from 'canvas-confetti';

interface MyItineraryViewProps {
  trip: TripPlan | null;
  onUpdateTrip: (updatedTrip: TripPlan) => void;
  onStartNewTrip: () => void;
  onNavigateToExplore: () => void;
  onNavigateToBudget: () => void;
}

export const MyItineraryView: React.FC<MyItineraryViewProps> = ({
  trip,
  onUpdateTrip,
  onStartNewTrip,
  onNavigateToExplore,
  onNavigateToBudget,
}) => {
  const [selectedDayNum, setSelectedDayNum] = useState<number>(1);
  const [editingItem, setEditingItem] = useState<{ dayNum: number; item: ItineraryItem } | null>(null);
  const [isAddCustomOpen, setIsAddCustomOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [newActivityTitle, setNewActivityTitle] = useState('');
  const [newActivityCost, setNewActivityCost] = useState('500');
  const [newActivitySlot, setNewActivitySlot] = useState<'morning' | 'afternoon' | 'evening'>('afternoon');
  const [newActivityCategory, setNewActivityCategory] = useState('Sightseeing');

  if (!trip) {
    return (
      <div id="itinerary-empty-state" className="max-w-3xl mx-auto my-16 px-4 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-[#E8F5E9] border border-[#004D40]/10 flex items-center justify-center mx-auto text-[#004D40] shadow-sm">
          <Calendar className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900">
            No Active Itinerary Found
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            You haven’t planned a trip yet. Use our Smart Trip Planner or explore destinations to build your personalized travel schedule.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onStartNewTrip}
            className="px-7 py-3 rounded-full bg-[#FF6E40] hover:bg-[#F4511E] text-white font-bold text-sm shadow-md cursor-pointer transition hover:-translate-y-0.5"
          >
            ✨ Start Planning My Trip
          </button>
          <button
            onClick={onNavigateToExplore}
            className="px-6 py-3 rounded-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-sm cursor-pointer transition"
          >
            Explore Destinations
          </button>
        </div>
      </div>
    );
  }

  const destination =
    DESTINATIONS.find((d) => d.id === trip.destinationId) || DESTINATIONS[0];

  const selectedTransport = destination.travelOptions.find(
    (t) => t.id === trip.selectedTransportId
  );
  const selectedStay = destination.stayOptions.find(
    (s) => s.id === trip.selectedStayId
  );

  // Calculate Itinerary Completion Stats
  const allItems = trip.itineraryDays.flatMap((d) => d.activities);
  const completedCount = allItems.filter((i) => i.completed).length;
  const totalCount = allItems.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const currentDay =
    trip.itineraryDays.find((d) => d.dayNumber === selectedDayNum) ||
    trip.itineraryDays[0] || {
      dayNumber: 1,
      theme: 'Arrival & City Exploration',
      activities: [],
    };

  const handleToggleComplete = (dayNum: number, itemId: string) => {
    const updatedDays = trip.itineraryDays.map((day) => {
      if (day.dayNumber !== dayNum) return day;
      return {
        ...day,
        activities: day.activities.map((act) => {
          if (act.id === itemId) {
            const nextCompleted = !act.completed;
            if (nextCompleted && completedCount + 1 === totalCount) {
              try {
                confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
              } catch (e) {}
            }
            return { ...act, completed: nextCompleted };
          }
          return act;
        }),
      };
    });

    const updatedTrip = { ...trip, itineraryDays: updatedDays };
    onUpdateTrip(updatedTrip);
    analytics.track('activity_completed', { item_id: itemId, day: dayNum });
  };

  const handleRemoveActivity = (dayNum: number, itemId: string) => {
    const updatedDays = trip.itineraryDays.map((day) => {
      if (day.dayNumber !== dayNum) return day;
      return {
        ...day,
        activities: day.activities.filter((act) => act.id !== itemId),
      };
    });

    const updatedTrip = { ...trip, itineraryDays: updatedDays };
    onUpdateTrip(updatedTrip);
    analytics.track('activity_removed', { item_id: itemId, day: dayNum });
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;
    const { dayNum, item } = editingItem;

    const updatedDays = trip.itineraryDays.map((day) => {
      if (day.dayNumber !== dayNum) return day;
      return {
        ...day,
        activities: day.activities.map((act) => (act.id === item.id ? item : act)),
      };
    });

    onUpdateTrip({ ...trip, itineraryDays: updatedDays });
    setEditingItem(null);
  };

  const handleAddCustomActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivityTitle.trim()) return;

    const newItem: ItineraryItem = {
      id: `custom-act-${Date.now()}`,
      title: newActivityTitle.trim(),
      category: newActivityCategory,
      timeSlot: newActivitySlot,
      estimatedCost: Number(newActivityCost) || 0,
      completed: false,
    };

    const updatedDays = trip.itineraryDays.map((day) => {
      if (day.dayNumber !== selectedDayNum) return day;
      return {
        ...day,
        activities: [...day.activities, newItem],
      };
    });

    onUpdateTrip({ ...trip, itineraryDays: updatedDays });
    setNewActivityTitle('');
    setIsAddCustomOpen(false);
    analytics.track('custom_activity_added', {
      title: newItem.title,
      cost: newItem.estimatedCost,
      day: selectedDayNum,
    });
  };

  const handleDownloadPdf = () => {
    try {
      setDownloadStatus('Generating WanderWise PDF itinerary...');
      generateItineraryPdf(trip, destination);
      analytics.track('itinerary_pdf_downloaded', { destination: trip.destinationName });
      setTimeout(() => {
        setDownloadStatus('✓ PDF saved to your downloads!');
        setTimeout(() => setDownloadStatus(null), 3500);
      }, 800);
    } catch (err) {
      console.error('PDF generation error:', err);
      // fallback to print
      openPrintDialog(trip, destination);
      setDownloadStatus(null);
    }
  };

  const handleDownloadOfflinePass = () => {
    try {
      setDownloadStatus('Generating Offline Mobile Pass...');
      downloadOfflineHtmlItinerary(trip, destination);
      analytics.track('itinerary_offline_pass_downloaded', { destination: trip.destinationName });
      setTimeout(() => {
        setDownloadStatus('✓ Offline Travel Pass saved! Works without internet.');
        setTimeout(() => setDownloadStatus(null), 3500);
      }, 800);
    } catch (err) {
      console.error('Offline pass error:', err);
      setDownloadStatus(null);
    }
  };

  const handlePrint = () => {
    analytics.track('itinerary_printed', { destination: trip.destinationName });
    openPrintDialog(trip, destination);
  };

  const handleCopySummary = () => {
    const summaryText = `🌴 ${trip.destinationName} Travel Plan (${trip.durationDays} Days)\nStyle: ${trip.travelStyle} | Budget: ₹${trip.totalEstimatedBudget.toLocaleString('en-IN')}\n\n` +
      trip.itineraryDays.map(d => `Day ${d.dayNumber}: ${d.theme}\n` + d.activities.map(a => `• [${a.timeSlot.toUpperCase()}] ${a.title} (${a.estimatedCost > 0 ? '₹' + a.estimatedCost : 'Free'})`).join('\n')).join('\n\n') +
      `\n\nPlanned on WanderWise - Your Smart Travel Planning Companion`;

    navigator.clipboard.writeText(summaryText);
    setCopySuccess(true);
    analytics.track('itinerary_text_copied', { destination: trip.destinationName });
    setTimeout(() => setCopySuccess(false), 3000);
  };

  const getSlotIcon = (slot: 'morning' | 'afternoon' | 'evening') => {
    switch (slot) {
      case 'morning':
        return <Sunrise className="w-4 h-4 text-amber-500" />;
      case 'afternoon':
        return <Sun className="w-4 h-4 text-orange-500" />;
      case 'evening':
        return <Sunset className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div id="my-itinerary-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Download Status Toast Notification */}
      {downloadStatus && (
        <div className="fixed top-20 right-4 z-50 bg-[#00251A] text-white px-5 py-3 rounded-2xl shadow-2xl border border-teal-500/30 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="w-7 h-7 rounded-full bg-[#004D40] flex items-center justify-center text-teal-300 text-sm font-bold">
            <Download className="w-4 h-4 animate-bounce" />
          </div>
          <span className="text-xs sm:text-sm font-medium">{downloadStatus}</span>
        </div>
      )}

      {/* 11. Header & Trip Overview Banner (PRD 11 & 17) */}
      <div className="relative rounded-3xl overflow-hidden bg-[#00251a] text-white shadow-xl">
        <div className="relative p-6 sm:p-8 z-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-300">
                <Sparkles className="w-4 h-4 text-[#FF6E40]" />
                <span>Your Personalized Digital Travel Planner</span>
              </div>
              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mt-1">
                {trip.destinationName}
              </h1>
              <p className="text-white/70 text-sm mt-1">
                {trip.durationDays} Days • {trip.travelStyle} • {trip.budgetTier} Budget
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                id="btn-download-itinerary-pdf"
                onClick={handleDownloadPdf}
                className="px-4 py-2.5 rounded-full bg-[#FF6E40] hover:bg-[#F4511E] text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition cursor-pointer hover:-translate-y-0.5"
                title="Download PDF directly to Phone or PC"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>

              <button
                id="btn-export-itinerary-menu"
                onClick={() => setIsExportModalOpen(true)}
                className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 border border-white/20 transition cursor-pointer"
                title="Export or Print Options"
              >
                <Share2 className="w-4 h-4" />
                <span>Export / Print</span>
              </button>

              <button
                onClick={onStartNewTrip}
                className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 border border-white/20 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>New Trip</span>
              </button>

              <button
                onClick={onNavigateToBudget}
                className="px-4 py-2.5 rounded-full bg-[#004D40] hover:bg-[#00382e] text-white text-xs font-bold border border-teal-500/30 shadow-xs transition cursor-pointer"
              >
                View Budget
              </button>
            </div>
          </div>

          {/* Overview Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-1.5 text-white/60 text-xs mb-0.5">
                <Plane className="w-3.5 h-3.5 text-teal-300" />
                <span className="font-bold">Transit</span>
              </div>
              <span className="font-heading font-extrabold text-white text-xs sm:text-sm truncate block">
                {selectedTransport ? selectedTransport.providerOrName : 'Flight / Train'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-1.5 text-white/60 text-xs mb-0.5">
                <Building className="w-3.5 h-3.5 text-emerald-300" />
                <span className="font-bold">Stay</span>
              </div>
              <span className="font-heading font-extrabold text-white text-xs sm:text-sm truncate block">
                {selectedStay ? selectedStay.name : 'Resort / Boutique'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-1.5 text-white/60 text-xs mb-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6E40]" />
                <span className="font-bold">Activities</span>
              </div>
              <span className="font-heading font-extrabold text-white text-xs sm:text-sm block">
                {completedCount} / {totalCount} Completed
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-1.5 text-white/60 text-xs mb-0.5">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                <span className="font-bold">Trip Progress</span>
              </div>
              <span className="font-heading font-extrabold text-teal-200 text-xs sm:text-sm block">
                {completionPercentage}% Ready
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 16. Day Selector Tabs (PRD 16: Day 1 ✓ → Day 2 → Day 3...) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {trip.itineraryDays.map((day) => {
          const isDaySelected = selectedDayNum === day.dayNumber;
          const dayCompleted =
            day.activities.length > 0 && day.activities.every((a) => a.completed);

          return (
            <button
              key={day.dayNumber}
              onClick={() => setSelectedDayNum(day.dayNumber)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-heading font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                isDaySelected
                  ? 'bg-[#004D40] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>Day {day.dayNumber}</span>
              {dayCompleted ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-100" />
              ) : (
                <span className="text-[11px] opacity-70">
                  ({day.activities.filter((a) => a.completed).length}/{day.activities.length})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Day Schedule Content Area */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Day Title & Theme */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#004D40] font-extrabold">
              Day {currentDay.dayNumber} Schedule
            </span>
            <h2 className="font-heading font-extrabold text-2xl text-gray-900">
              {currentDay.theme}
            </h2>
          </div>

          <button
            onClick={() => setIsAddCustomOpen(true)}
            className="px-4 py-2 rounded-full bg-[#E8F5E9] hover:bg-[#004D40] text-[#004D40] hover:text-white border border-[#2E7D32]/20 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Activity</span>
          </button>
        </div>

        {/* Activities List */}
        <div className="space-y-4">
          {currentDay.activities.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>No activities scheduled for Day {currentDay.dayNumber}.</p>
              <button
                onClick={() => setIsAddCustomOpen(true)}
                className="mt-3 text-xs font-bold text-[#004D40] hover:underline"
              >
                + Add an activity now
              </button>
            </div>
          ) : (
            currentDay.activities.map((act) => {
              return (
                <div
                  key={act.id}
                  className={`p-4.5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    act.completed
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : 'bg-gray-50/50 border-gray-100 hover:bg-white hover:border-[#004D40]/30'
                  }`}
                >
                  <div className="flex items-start gap-3.5 flex-1">
                    {/* Completion Checkbox Button */}
                    <button
                      onClick={() => handleToggleComplete(currentDay.dayNumber, act.id)}
                      className="mt-0.5 text-gray-400 hover:text-emerald-600 transition cursor-pointer shrink-0"
                      title={act.completed ? 'Mark incomplete' : 'Mark complete'}
                    >
                      {act.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300 hover:text-[#004D40]" />
                      )}
                    </button>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gray-500 bg-white px-2.5 py-0.5 rounded-full border border-gray-200">
                          {getSlotIcon(act.timeSlot)}
                          <span>{act.timeSlot}</span>
                        </span>
                        <span className="text-xs font-bold text-[#004D40] bg-[#E8F5E9] px-2.5 py-0.5 rounded-full">
                          {act.category}
                        </span>
                      </div>

                      <h3
                        className={`font-heading font-bold text-base ${
                          act.completed ? 'text-gray-400 line-through' : 'text-gray-900'
                        }`}
                      >
                        {act.title}
                      </h3>

                      {act.location && (
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span>{act.location}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right side: Estimated Cost & Controls */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100">
                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 block">Est. Cost</span>
                      <span className="font-heading font-extrabold text-gray-900 text-sm">
                        {act.estimatedCost === 0 ? 'Free' : `₹${act.estimatedCost.toLocaleString('en-IN')}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          setEditingItem({ dayNum: currentDay.dayNumber, item: { ...act } })
                        }
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition cursor-pointer"
                        title="Edit Activity"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRemoveActivity(currentDay.dayNumber, act.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                        title="Remove Activity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Edit Activity Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-slate-900">Edit Activity</h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Activity Title</label>
                <input
                  type="text"
                  value={editingItem.item.title}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, title: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Time Slot</label>
                  <select
                    value={editingItem.item.timeSlot}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        item: {
                          ...editingItem.item,
                          timeSlot: e.target.value as 'morning' | 'afternoon' | 'evening',
                        },
                      })
                    }
                    className="w-full p-2 rounded-xl border border-slate-200 text-sm"
                  >
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Estimated Cost (₹)</label>
                  <input
                    type="number"
                    value={editingItem.item.estimatedCost}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        item: { ...editingItem.item, estimatedCost: Number(e.target.value) || 0 },
                      })
                    }
                    className="w-full p-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded-full border border-gray-200 text-gray-600 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-5 py-2 rounded-full bg-[#004D40] text-white text-xs font-bold hover:bg-[#00382e]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Activity Drawer/Modal */}
      {isAddCustomOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleAddCustomActivity}
            className="bg-white rounded-3xl p-6 w-full max-w-md border border-gray-100 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-gray-900">
                Add Activity for Day {selectedDayNum}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddCustomOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Activity Name</label>
                <input
                  type="text"
                  required
                  value={newActivityTitle}
                  onChange={(e) => setNewActivityTitle(e.target.value)}
                  placeholder="e.g. Scuba diving, Sunset beach cafe, Fort walk"
                  className="w-full p-2.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#004D40] text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Time Slot</label>
                  <select
                    value={newActivitySlot}
                    onChange={(e) =>
                      setNewActivitySlot(e.target.value as 'morning' | 'afternoon' | 'evening')
                    }
                    className="w-full p-2 rounded-xl border border-gray-200 text-sm"
                  >
                    <option value="morning">Morning (08:00 – 12:00)</option>
                    <option value="afternoon">Afternoon (12:00 – 17:00)</option>
                    <option value="evening">Evening (17:00 – 21:00)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Category</label>
                  <select
                    value={newActivityCategory}
                    onChange={(e) => setNewActivityCategory(e.target.value)}
                    className="w-full p-2 rounded-xl border border-gray-200 text-sm"
                  >
                    <option value="Sightseeing">Sightseeing</option>
                    <option value="Food & Dining">Food & Dining</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Culture">Culture</option>
                    <option value="Relaxation">Relaxation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Estimated Cost (₹)</label>
                <input
                  type="number"
                  value={newActivityCost}
                  onChange={(e) => setNewActivityCost(e.target.value)}
                  placeholder="0 for free activities"
                  className="w-full p-2.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#004D40] text-sm"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddCustomOpen(false)}
                className="px-4 py-2 rounded-full border border-gray-200 text-gray-600 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-[#004D40] hover:bg-[#00382e] text-white text-xs font-bold"
              >
                Add Activity
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Export / Print & Mobile Download Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg border border-gray-100 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF6E40] block mb-1">
                  OFFLINE ACCESS & PRINTING
                </span>
                <h3 className="font-heading font-extrabold text-xl text-gray-900">
                  Save or Download Your Plan
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Choose how you want to take your {trip.destinationName} itinerary on the go.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Option 1: PDF Download */}
              <div
                onClick={() => {
                  handleDownloadPdf();
                  setIsExportModalOpen(false);
                }}
                className="p-4 rounded-2xl border-2 border-[#004D40]/20 bg-[#E8F5E9]/30 hover:bg-[#E8F5E9]/60 hover:border-[#004D40] transition cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#004D40] text-white flex items-center justify-center shadow-xs">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-sm text-gray-900 flex items-center gap-2">
                      <span>Download PDF (.pdf)</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#004D40] text-white text-[9px] font-bold">
                        RECOMMENDED
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Standard multi-page PDF with day schedules, transit, stays & tips. Saves to phone or PC.
                    </p>
                  </div>
                </div>
                <Download className="w-5 h-5 text-[#004D40] group-hover:translate-y-0.5 transition" />
              </div>

              {/* Option 2: Print Dialog / Save as PDF */}
              <div
                onClick={() => {
                  handlePrint();
                  setIsExportModalOpen(false);
                }}
                className="p-4 rounded-2xl border border-gray-200 hover:border-[#004D40]/40 hover:bg-gray-50 transition cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-700 border border-sky-100 flex items-center justify-center">
                    <Printer className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-sm text-gray-900">
                      Print / Browser Print Dialog
                    </div>
                    <p className="text-xs text-gray-500">
                      Opens clean print layout to print directly or use system "Save as PDF".
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition" />
              </div>

              {/* Option 3: Offline Mobile HTML Pass */}
              <div
                onClick={() => {
                  handleDownloadOfflinePass();
                  setIsExportModalOpen(false);
                }}
                className="p-4 rounded-2xl border border-gray-200 hover:border-[#004D40]/40 hover:bg-gray-50 transition cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-sm text-gray-900">
                      Offline Mobile Pass (.html)
                    </div>
                    <p className="text-xs text-gray-500">
                      Interactive standalone file with checkboxes that opens in phone browser with zero internet.
                    </p>
                  </div>
                </div>
                <Download className="w-5 h-5 text-amber-700 group-hover:translate-y-0.5 transition" />
              </div>

              {/* Option 4: Copy to Clipboard */}
              <div
                onClick={handleCopySummary}
                className="p-4 rounded-2xl border border-gray-200 hover:border-[#004D40]/40 hover:bg-gray-50 transition cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 border border-purple-100 flex items-center justify-center">
                    <Copy className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-sm text-gray-900">
                      {copySuccess ? '✓ Copied to Clipboard!' : 'Copy Itinerary Text'}
                    </div>
                    <p className="text-xs text-gray-500">
                      Formatted day-by-day text ready to paste into WhatsApp, Notes, or Email.
                    </p>
                  </div>
                </div>
                <Share2 className="w-4 h-4 text-purple-700" />
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="px-6 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
