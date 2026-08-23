import { Destination } from '../types';

export function matchCategory(dest: Destination, category: string): boolean {
  if (!category || category === 'All') return true;

  const catLower = category.toLowerCase().trim();

  // International filter
  if (catLower === 'international') {
    return dest.isInternational;
  }

  // Budget filter
  if (catLower === 'budget' || catLower === 'budget friendly') {
    return dest.estimatedBudgetMin <= 15000;
  }

  // Beaches / Beach
  if (catLower.includes('beach')) {
    return (
      dest.category === 'Beach' ||
      dest.tags.some((t) => /beach|coastal|island|sea|ocean|snorkeling|sand|shack|surf|scuba/i.test(t)) ||
      /beach|island|coastal|arabian sea|indian ocean|bay|seashore|sand|lagoon/i.test(
        `${dest.name} ${dest.shortDescription} ${dest.location} ${dest.tags.join(' ')}`
      )
    );
  }

  // Mountains
  if (catLower.includes('mountain')) {
    return (
      dest.category === 'Mountains' ||
      dest.tags.some((t) => /mountain|himalaya|snow|valley|peak|trek|alp|hill|ghat/i.test(t)) ||
      /mountain|himalayan|himalayas|snow|peak|valley|altitude|hill station|alps/i.test(
        `${dest.name} ${dest.shortDescription} ${dest.location} ${dest.tags.join(' ')}`
      )
    );
  }

  // Heritage / Culture
  if (catLower.includes('heritage') || catLower.includes('culture')) {
    return (
      dest.category === 'Culture' ||
      dest.tags.some((t) => /heritage|history|palace|temple|monument|fort|ancient|museum|historic|culture|tradition/i.test(t)) ||
      /heritage|palace|fort|temple|monument|ancient|history|royal|dynasty|unesco|historic/i.test(
        `${dest.name} ${dest.shortDescription} ${dest.location} ${dest.tags.join(' ')}`
      )
    );
  }

  // Nature / Wildlife
  if (catLower.includes('nature') || catLower.includes('wildlife')) {
    return (
      dest.category === 'Nature' ||
      dest.tags.some((t) => /nature|wildlife|forest|lake|waterfall|garden|greenery|eco|jungle|backwaters/i.test(t)) ||
      /nature|waterfall|forest|lake|garden|jungle|greenery|wildlife|eco|backwaters|flora|fauna/i.test(
        `${dest.name} ${dest.shortDescription} ${dest.location} ${dest.tags.join(' ')}`
      )
    );
  }

  // City & Modern / City / Modern
  if (catLower.includes('city') || catLower.includes('modern')) {
    return (
      dest.tags.some((t) => /city|modern|futuristic|skyline|skyscraper|shopping|nightlife|urban|metro|architecture|cuisine/i.test(t)) ||
      /city|skyscrapers|modern|futuristic|shopping|nightlife|skyline|urban|capital|metropolis/i.test(
        `${dest.name} ${dest.shortDescription} ${dest.location} ${dest.tags.join(' ')}`
      ) ||
      ['dubai', 'singapore', 'mumbai', 'paris', 'bangkok', 'tokyo', 'switzerland'].includes(dest.id)
    );
  }

  // Adventure
  if (catLower.includes('adventure')) {
    return (
      dest.category === 'Adventure' ||
      dest.travelStyles.includes('Adventure') ||
      dest.tags.some((t) => /adventure|rafting|trekking|paragliding|safari|scuba|diving|sports/i.test(t))
    );
  }

  return dest.category.toLowerCase() === catLower || dest.tags.some((t) => t.toLowerCase() === catLower);
}

export function matchDuration(dest: Destination, durationFilter: string): boolean {
  if (!durationFilter || durationFilter === 'All') return true;

  if (durationFilter === '1-3') {
    return dest.recommendedDurationDays <= 3;
  }
  if (durationFilter === '4-5') {
    return dest.recommendedDurationDays >= 4 && dest.recommendedDurationDays <= 5;
  }
  if (durationFilter === '6+' || durationFilter === '6-8' || durationFilter === 'long') {
    return dest.recommendedDurationDays >= 6;
  }
  return true;
}

export function matchBudget(dest: Destination, budgetFilter: string): boolean {
  if (!budgetFilter || budgetFilter === 'All') return true;

  if (budgetFilter === 'under-15k') {
    return dest.estimatedBudgetMin <= 15000;
  }
  if (budgetFilter === '15k-30k') {
    return dest.estimatedBudgetMin >= 10000 && dest.estimatedBudgetMin <= 30000;
  }
  if (budgetFilter === '30k-60k') {
    return dest.estimatedBudgetMin >= 25000 && dest.estimatedBudgetMin <= 60000;
  }
  if (budgetFilter === 'above-60k') {
    return dest.estimatedBudgetMin >= 50000;
  }
  return true;
}
