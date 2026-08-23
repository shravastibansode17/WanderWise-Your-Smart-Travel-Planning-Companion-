import React from 'react';
import { AlertCircle } from 'lucide-react';

interface DisclaimerBannerProps {
  compact?: boolean;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div
        id="disclaimer-banner-compact"
        className="flex items-start gap-2.5 px-4 py-3 rounded-2xl bg-amber-50 border border-amber-200/70 text-amber-900 text-xs leading-relaxed"
      >
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <span>
          <strong>Estimated Planning Information:</strong> Prices, fares, schedules, and availability shown on WanderWise are illustrative estimates for travel-planning purposes only. Actual prices and availability may vary. WanderWise does not process bookings or payments.
        </span>
      </div>
    );
  }

  return (
    <div
      id="disclaimer-banner-full"
      className="w-full max-w-7xl mx-auto my-6 px-5 py-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-950 text-xs md:text-sm flex items-start gap-3.5 shadow-xs"
    >
      <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
      <div className="flex-1">
        <span className="font-bold text-amber-900">Planning & Estimation Notice: </span>
        <span className="text-amber-800/90">
          Prices, fares, schedules, and availability shown on WanderWise are illustrative estimates for planning purposes only. Actual prices and availability may vary. WanderWise is a discovery and planning companion and does not process bookings or payments.
        </span>
      </div>
    </div>
  );
};
