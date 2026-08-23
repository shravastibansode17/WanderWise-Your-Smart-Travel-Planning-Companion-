import { ChecklistItem } from '../types';

export const DEFAULT_CHECKLIST_ITEMS: ChecklistItem[] = [
  // Documents
  { id: 'doc-1', text: 'Government Photo ID / Aadhaar / Passport', category: 'Documents', completed: true },
  { id: 'doc-2', text: 'Train / Flight / Bus e-Tickets & Boarding Passes', category: 'Documents', completed: true },
  { id: 'doc-3', text: 'Hotel / Resort Booking Confirmations & Addresses', category: 'Documents', completed: false },
  { id: 'doc-4', text: 'Travel Insurance & Emergency Contact Card', category: 'Documents', completed: false },
  { id: 'doc-5', text: 'Driving License / International Permit', category: 'Documents', completed: false },

  // Clothing
  { id: 'cloth-1', text: 'Weather-appropriate Outfits (3–5 pairs)', category: 'Clothing', completed: true },
  { id: 'cloth-2', text: 'Comfortable Walking Shoes & Flip-Flops', category: 'Clothing', completed: true },
  { id: 'cloth-3', text: 'Light Jacket / Windcheater / Layered Fleece', category: 'Clothing', completed: false },
  { id: 'cloth-4', text: 'Swimwear / Quick-dry Activewear', category: 'Clothing', completed: false },
  { id: 'cloth-5', text: 'Sun Hat / Cap & UV Sunglasses', category: 'Clothing', completed: true },

  // Essentials
  { id: 'ess-1', text: 'High-speed Phone Charger & USB-C Cable', category: 'Essentials', completed: true },
  { id: 'ess-2', text: '10,000+ mAh Portable Power Bank', category: 'Essentials', completed: true },
  { id: 'ess-3', text: 'Universal Plug Adapter (for international)', category: 'Essentials', completed: false },
  { id: 'ess-4', text: 'Reusable Insulated Water Bottle', category: 'Essentials', completed: false },
  { id: 'ess-5', text: 'Mini Flashlight / Headlamp & Padlock', category: 'Essentials', completed: false },

  // Personal
  { id: 'pers-1', text: 'Prescribed Medications & First Aid Kit (Band-aids, Paracetamol, ORS)', category: 'Personal', completed: true },
  { id: 'pers-2', text: 'SPF 50+ Sunscreen & Aloe Vera Lotion', category: 'Personal', completed: false },
  { id: 'pers-3', text: 'Travel-size Toothbrush, Paste & Mini Toiletries', category: 'Personal', completed: false },
  { id: 'pers-4', text: 'Hand Sanitizer & Disinfectant Wipes', category: 'Personal', completed: false },
  { id: 'pers-5', text: 'Insect Repellent Spray / Patch', category: 'Personal', completed: false },
];
