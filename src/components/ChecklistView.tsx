import React, { useState } from 'react';
import { ChecklistItem } from '../types';
import { DEFAULT_CHECKLIST_ITEMS } from '../data/checklistTemplates';
import {
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  RotateCcw,
  FileText,
  Shirt,
  Zap,
  HeartPulse,
  Sparkles,
  Luggage,
} from 'lucide-react';
import { analytics } from '../utils/analytics';
import confetti from 'canvas-confetti';

interface ChecklistViewProps {
  items: ChecklistItem[];
  onUpdateItems: (items: ChecklistItem[]) => void;
}

export const ChecklistView: React.FC<ChecklistViewProps> = ({ items, onUpdateItems }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [newItemText, setNewItemText] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<'Documents' | 'Clothing' | 'Essentials' | 'Personal'>('Essentials');

  const categories = ['All', 'Documents', 'Clothing', 'Essentials', 'Personal'];

  const completedCount = items.filter((i) => i.completed).length;
  const totalCount = items.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleToggle = (id: string) => {
    const updated = items.map((item) => {
      if (item.id === id) {
        const nextState = !item.completed;
        if (nextState && completedCount + 1 === totalCount) {
          try {
            confetti({
              particleCount: 100,
              spread: 80,
              origin: { y: 0.6 },
            });
          } catch (e) {}
        }
        return { ...item, completed: nextState };
      }
      return item;
    });

    onUpdateItems(updated);
    analytics.track('checklist_item_toggled', { item_id: id });
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem: ChecklistItem = {
      id: `custom-check-${Date.now()}`,
      text: newItemText.trim(),
      category: newItemCategory,
      completed: false,
    };

    onUpdateItems([...items, newItem]);
    setNewItemText('');
    analytics.track('checklist_item_added', { text: newItem.text, category: newItem.category });
  };

  const handleDeleteItem = (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    onUpdateItems(updated);
    analytics.track('checklist_item_deleted', { item_id: id });
  };

  const handleReset = () => {
    onUpdateItems(DEFAULT_CHECKLIST_ITEMS);
    analytics.track('checklist_reset', {});
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Documents':
        return <FileText className="w-4 h-4 text-sky-600" />;
      case 'Clothing':
        return <Shirt className="w-4 h-4 text-orange-600" />;
      case 'Essentials':
        return <Zap className="w-4 h-4 text-amber-600" />;
      case 'Personal':
        return <HeartPulse className="w-4 h-4 text-rose-600" />;
      default:
        return <Luggage className="w-4 h-4 text-teal-600" />;
    }
  };

  const filteredItems =
    activeCategory === 'All'
      ? items
      : items.filter((i) => i.category === activeCategory);

  return (
    <div id="checklist-page" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* 13. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#004D40] mb-1">
            <Luggage className="w-4 h-4" />
            <span>Travel Readiness</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Pack Smart. Travel Easy.
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Never forget crucial documents, chargers, emergency meds, or gear.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-5 py-2.5 rounded-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold flex items-center gap-1.5 shadow-xs transition cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
          <span>Reset to Default</span>
        </button>
      </div>

      {/* 20. Progress Banner (PRD 20: 6 / 15 items packed & 40% Ready) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#00251a] text-white shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-white/10 text-teal-300">
              <Luggage className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-white">Packing Progress</h3>
              <p className="text-xs text-white/70">
                {completedCount} of {totalCount} items packed
              </p>
            </div>
          </div>
          <span className="font-heading font-extrabold text-2xl sm:text-3xl text-[#FF6E40]">
            {progressPct}% Ready
          </span>
        </div>

        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden p-0.5">
          <div
            className="bg-gradient-to-r from-teal-400 via-emerald-400 to-[#FF6E40] h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat;
          const catCount =
            cat === 'All'
              ? items.length
              : items.filter((i) => i.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                isSelected
                  ? 'bg-[#004D40] text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>{cat}</span>
              <span className="ml-1.5 opacity-70">({catCount})</span>
            </button>
          );
        })}
      </div>

      {/* Add Custom Item Form */}
      <form
        onSubmit={handleAddItem}
        className="p-4 sm:p-5 rounded-3xl bg-white border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-3 items-center"
      >
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Add custom packing item (e.g. Scuba goggles, Drone, Power bank)..."
          className="flex-1 w-full bg-gray-50 px-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#004D40]"
        />

        <select
          value={newItemCategory}
          onChange={(e) => setNewItemCategory(e.target.value as any)}
          className="w-full sm:w-auto bg-gray-50 px-4 py-2.5 rounded-full border border-gray-200 text-xs font-bold text-gray-700 focus:outline-none cursor-pointer"
        >
          <option value="Documents">Documents</option>
          <option value="Clothing">Clothing</option>
          <option value="Essentials">Essentials</option>
          <option value="Personal">Personal</option>
        </select>

        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#004D40] hover:bg-[#00382e] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Item</span>
        </button>
      </form>

      {/* Checklist Items List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm divide-y divide-gray-100 overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">
            No items found in this category.
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className={`p-4.5 transition flex items-center justify-between gap-4 ${
                item.completed ? 'bg-gray-50/50' : 'hover:bg-gray-50/80'
              }`}
            >
              <div
                className="flex items-center gap-3.5 flex-1 cursor-pointer select-none"
                onClick={() => handleToggle(item.id)}
              >
                <button
                  type="button"
                  className="text-gray-400 hover:text-emerald-600 transition shrink-0 cursor-pointer"
                >
                  {item.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300 hover:text-[#004D40]" />
                  )}
                </button>

                <span
                  className={`text-sm ${
                    item.completed ? 'text-gray-400 line-through' : 'text-gray-900 font-medium'
                  }`}
                >
                  {item.text}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[11px] font-bold text-[#004D40] bg-[#E8F5E9] px-2.5 py-1 rounded-full">
                  {getCategoryIcon(item.category)}
                  <span>{item.category}</span>
                </span>

                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-1 text-gray-300 hover:text-rose-600 transition cursor-pointer"
                  title="Delete item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
