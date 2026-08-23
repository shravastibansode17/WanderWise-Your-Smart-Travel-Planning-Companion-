import React, { useEffect, useState } from 'react';
import { analytics } from '../utils/analytics';
import { AnalyticsEvent } from '../types';
import { Activity, Trash2, X, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

interface AnalyticsMonitorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnalyticsMonitor: React.FC<AnalyticsMonitorProps> = ({ isOpen, onClose }) => {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    setEvents(analytics.getEvents());
    const unsubscribe = analytics.subscribe(() => {
      setEvents(analytics.getEvents());
    });
    return unsubscribe;
  }, []);

  if (!isOpen) return null;

  return (
    <div
      id="analytics-monitor-drawer"
      className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
          <div>
            <h3 className="font-heading font-semibold text-sm">Google Analytics 4 Live Monitor</h3>
            <p className="text-[11px] text-slate-400">Verifying custom event telemetry in real-time</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => analytics.clear()}
            title="Clear events"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info bar */}
      <div className="px-4 py-2.5 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between text-xs text-emerald-800">
        <span className="flex items-center gap-1.5 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          GA4 Tag (G-GH1193N4D9) Active
        </span>
        <span className="bg-emerald-200/80 px-2 py-0.5 rounded-full text-[11px] font-semibold">
          {events.length} tracked events
        </span>
      </div>

      {/* Events List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
        {events.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            <Activity className="w-8 h-8 mx-auto mb-2 text-slate-300 opacity-60" />
            <p>No events logged yet.</p>
            <p className="text-xs text-slate-400 mt-1">Perform any interaction to see events fire.</p>
          </div>
        ) : (
          events.map((evt) => {
            const isExpanded = expandedId === evt.id;
            return (
              <div
                key={evt.id}
                className="border border-slate-200/90 rounded-lg p-3 bg-slate-50/50 hover:bg-slate-50 transition text-xs"
              >
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : evt.id)}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span className="font-mono font-semibold text-teal-900">{evt.eventName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                    <span>{evt.timestamp}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-2.5 pt-2 border-t border-slate-200/80 font-mono text-[11px] text-slate-700 overflow-x-auto bg-white p-2 rounded border">
                    <pre>{JSON.stringify(evt.params, null, 2)}</pre>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer info */}
      <div className="p-3 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500 text-center">
        GA4 interactions comply with Google Tag specifications and privacy standards.
      </div>
    </div>
  );
};
