import { AnalyticsEvent } from '../types';

export const GA_MEASUREMENT_ID = 'G-GH1193N4D9';

type EventListener = (event: AnalyticsEvent) => void;

class AnalyticsManager {
  private events: AnalyticsEvent[] = [];
  private listeners: EventListener[] = [];
  private maxHistory = 50;

  constructor() {
    // Check if gtag is defined on window, initialize if needed
    if (typeof window !== 'undefined') {
      (window as any).dataLayer = (window as any).dataLayer || [];
    }
  }

  public track(eventName: string, params: Record<string, any> = {}) {
    const event: AnalyticsEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      eventName,
      params: {
        ...params,
        timestamp: new Date().toISOString(),
      },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };

    this.events.unshift(event);
    if (this.events.length > this.maxHistory) {
      this.events = this.events.slice(0, this.maxHistory);
    }

    // Google Tag Manager / gtag.js dispatch
    if (typeof window !== 'undefined' && (window as any).gtag) {
      try {
        if (eventName === 'page_view') {
          (window as any).gtag('event', 'page_view', {
            page_title: params.page_title || document.title,
            page_location: params.page_location || window.location.href,
            page_path: params.page_path || window.location.pathname,
            send_to: GA_MEASUREMENT_ID,
            ...params,
          });
        } else {
          (window as any).gtag('event', eventName, {
            send_to: GA_MEASUREMENT_ID,
            ...params,
          });
        }
      } catch (err) {
        console.debug('gtag call:', err);
      }
    }

    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: eventName,
        ...params,
      });
    }

    // Log to console for audit
    console.log(`%c[GA4 Tracked (${GA_MEASUREMENT_ID})] %c${eventName}`, 'color: #0E4B5B; font-weight: bold;', 'color: #FF6B35; font-weight: 600;', params);

    // Notify listeners
    this.listeners.forEach((listener) => listener(event));
  }

  public getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  public subscribe(listener: EventListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public clear() {
    this.events = [];
    this.listeners.forEach((listener) => listener({
      id: 'cleared',
      eventName: 'events_cleared',
      params: {},
      timestamp: new Date().toLocaleTimeString(),
    }));
  }
}

export const analytics = new AnalyticsManager();
