import { jsPDF } from 'jspdf';
import { TripPlan, Destination } from '../types';

/**
 * Helper to compute the total estimated budget for a trip plan
 */
export function calculateTripTotalBudget(trip: TripPlan, destination: Destination): number {
  const selectedTransport =
    destination.travelOptions.find((t) => t.id === trip.selectedTransportId) ||
    destination.travelOptions[0];
  const selectedStay =
    destination.stayOptions.find((s) => s.id === trip.selectedStayId) ||
    destination.stayOptions[0];

  const transportCost = selectedTransport ? selectedTransport.estimatedFare * 2 : 3000;
  const stayCost = (selectedStay ? selectedStay.pricePerNight : 2500) * (trip.selectedStayNights || Math.max(1, trip.durationDays - 1));
  const activitiesCost = trip.itineraryDays.reduce(
    (sum, d) => sum + d.activities.reduce((aSum, a) => aSum + (a.estimatedCost || 0), 0),
    0
  );
  const foodTotal = (trip.foodBudgetPerDay || 1200) * trip.durationDays;
  const localTravelTotal = (trip.localTravelBudgetPerDay || 500) * trip.durationDays;
  const miscTotal = trip.miscellaneousBudget || 1500;

  return transportCost + stayCost + activitiesCost + foodTotal + localTravelTotal + miscTotal;
}

/**
 * Robust, client-side PDF & Print generator for WanderWise Travel Itineraries.
 * Works seamlessly on mobile devices (iOS Safari, Android Chrome) and desktops.
 */
export function generateItineraryPdf(trip: TripPlan, destination: Destination): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const totalEstimatedCost = calculateTripTotalBudget(trip, destination);
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let currentY = margin;

  const addNewPageIfNeeded = (requiredHeight: number) => {
    if (currentY + requiredHeight > pageHeight - 18) {
      doc.addPage();
      currentY = margin;
      drawHeaderFooter();
    }
  };

  const drawHeaderFooter = () => {
    // Top mini bar
    doc.setFillColor(0, 77, 64); // #004D40
    doc.rect(0, 0, pageWidth, 4, 'F');

    // Bottom footer
    const pageNum = doc.getNumberOfPages();
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 140);
    doc.text(
      `WanderWise Travel Planner • ${trip.destinationName} • Page ${pageNum}`,
      margin,
      pageHeight - 8
    );
    doc.text(
      `Generated on ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`,
      pageWidth - margin,
      pageHeight - 8,
      { align: 'right' }
    );
  };

  // 1. BRAND & HEADER BANNER
  doc.setFillColor(0, 37, 26); // #00251A
  doc.roundedRect(margin, currentY, contentWidth, 38, 4, 4, 'F');

  // Badge
  doc.setFillColor(255, 110, 64); // #FF6E40
  doc.roundedRect(margin + 6, currentY + 6, 36, 6, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text('WANDERWISE PLAN', margin + 8, currentY + 10.2);

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text(trip.destinationName, margin + 6, currentY + 22);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(178, 223, 219);
  doc.text(
    `${destination.location}, ${destination.country} • ${trip.durationDays} Days • ${trip.travelStyle} Style`,
    margin + 6,
    currentY + 28
  );

  // Total Budget Badge on right
  doc.setFillColor(0, 77, 64);
  doc.roundedRect(pageWidth - margin - 50, currentY + 8, 44, 22, 3, 3, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(200, 230, 201);
  doc.text('ESTIMATED BUDGET', pageWidth - margin - 46, currentY + 14);
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text(`₹${totalEstimatedCost.toLocaleString('en-IN')}`, pageWidth - margin - 46, currentY + 23);

  currentY += 44;

  // 2. TRIP OVERVIEW SUMMARY CARDS
  addNewPageIfNeeded(24);
  doc.setFillColor(245, 247, 248);
  doc.roundedRect(margin, currentY, contentWidth, 20, 3, 3, 'F');

  const colW = contentWidth / 4;

  // Col 1: Duration
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(120, 120, 120);
  doc.text('DURATION', margin + 4, currentY + 6);
  doc.setFontSize(10);
  doc.setTextColor(33, 33, 33);
  doc.text(`${trip.durationDays} Days / ${trip.durationDays - 1} Nights`, margin + 4, currentY + 13);

  // Col 2: Style
  doc.setFontSize(7);
  doc.setTextColor(120, 120, 120);
  doc.text('TRAVEL STYLE', margin + colW + 4, currentY + 6);
  doc.setFontSize(10);
  doc.setTextColor(0, 77, 64);
  doc.text(trip.travelStyle, margin + colW + 4, currentY + 13);

  // Col 3: Budget Tier
  doc.setFontSize(7);
  doc.setTextColor(120, 120, 120);
  doc.text('BUDGET TIER', margin + colW * 2 + 4, currentY + 6);
  doc.setFontSize(10);
  doc.setTextColor(33, 33, 33);
  doc.text(trip.budgetTier, margin + colW * 2 + 4, currentY + 13);

  // Col 4: Match Score
  doc.setFontSize(7);
  doc.setTextColor(120, 120, 120);
  doc.text('AI MATCH SCORE', margin + colW * 3 + 4, currentY + 6);
  doc.setFontSize(10);
  doc.setTextColor(255, 110, 64);
  doc.text(`${trip.matchScore}% Match`, margin + colW * 3 + 4, currentY + 13);

  currentY += 25;

  // 3. TRANSPORT & STAY SUMMARY
  const selectedTransport = destination.travelOptions.find((t) => t.id === trip.selectedTransportId) || destination.travelOptions[0];
  const selectedStay = destination.stayOptions.find((s) => s.id === trip.selectedStayId) || destination.stayOptions[0];

  addNewPageIfNeeded(30);
  doc.setFillColor(232, 245, 233); // #E8F5E9
  doc.roundedRect(margin, currentY, (contentWidth - 4) / 2, 24, 3, 3, 'F');
  doc.setFillColor(239, 246, 255); // Blue light
  doc.roundedRect(margin + (contentWidth - 4) / 2 + 4, currentY, (contentWidth - 4) / 2, 24, 3, 3, 'F');

  // Transport card
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(46, 125, 50);
  doc.text(`SELECTED TRANSIT (${selectedTransport ? selectedTransport.type.toUpperCase() : 'TRAVEL'})`, margin + 4, currentY + 6);
  doc.setFontSize(9);
  doc.setTextColor(33, 33, 33);
  doc.text(selectedTransport ? selectedTransport.providerOrName.slice(0, 38) : 'Recommended Express Route', margin + 4, currentY + 12);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 100, 100);
  doc.text(
    selectedTransport ? `${selectedTransport.route} • ₹${selectedTransport.estimatedFare.toLocaleString('en-IN')}` : '',
    margin + 4,
    currentY + 18
  );

  // Stay card
  const stayX = margin + (contentWidth - 4) / 2 + 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(2, 119, 189);
  doc.text(`ACCOMMODATION (${selectedStay ? selectedStay.category.toUpperCase() : 'STAY'})`, stayX + 4, currentY + 6);
  doc.setFontSize(9);
  doc.setTextColor(33, 33, 33);
  doc.text(selectedStay ? selectedStay.name.slice(0, 38) : 'Selected Hotel / Resort', stayX + 4, currentY + 12);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 100, 100);
  doc.text(
    selectedStay ? `${selectedStay.location} • ₹${selectedStay.pricePerNight.toLocaleString('en-IN')}/night` : '',
    stayX + 4,
    currentY + 18
  );

  currentY += 29;

  // 4. DAY BY DAY ITINERARY SECTION
  addNewPageIfNeeded(16);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(0, 77, 64);
  doc.text('Day-by-Day Trip Schedule', margin, currentY);
  currentY += 6;

  trip.itineraryDays.forEach((day) => {
    addNewPageIfNeeded(20 + day.activities.length * 10);

    // Day Header Pill
    doc.setFillColor(0, 77, 64);
    doc.roundedRect(margin, currentY, 22, 6, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(`DAY ${day.dayNumber}`, margin + 3.5, currentY + 4.2);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(33, 33, 33);
    doc.text(day.theme, margin + 26, currentY + 4.5);

    currentY += 9;

    // Day Container
    const dayHeight = Math.max(16, day.activities.length * 12 + 4);
    doc.setFillColor(250, 250, 250);
    doc.setDrawColor(230, 230, 230);
    doc.roundedRect(margin, currentY, contentWidth, dayHeight, 2, 2, 'FD');

    let actY = currentY + 5;
    day.activities.forEach((act) => {
      // Time Slot badge
      const slotColor =
        act.timeSlot === 'morning'
          ? [255, 179, 0] // Amber
          : act.timeSlot === 'afternoon'
          ? [255, 110, 64] // Orange
          : [92, 107, 192]; // Indigo

      doc.setFillColor(slotColor[0], slotColor[1], slotColor[2]);
      doc.roundedRect(margin + 4, actY - 3, 18, 4.5, 1, 1, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(255, 255, 255);
      doc.text(act.timeSlot.toUpperCase(), margin + 5.5, actY);

      // Activity Title & Category
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(33, 33, 33);
      const titleText = act.title.length > 55 ? act.title.slice(0, 52) + '...' : act.title;
      doc.text(titleText, margin + 25, actY);

      // Category Pill
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(120, 120, 120);
      doc.text(`[${act.category}]`, margin + 25 + doc.getTextWidth(titleText) + 2, actY);

      // Estimated Cost on Right
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(0, 77, 64);
      const costText = act.estimatedCost > 0 ? `₹${act.estimatedCost.toLocaleString('en-IN')}` : 'Free';
      doc.text(costText, pageWidth - margin - 5, actY, { align: 'right' });

      actY += 10;
    });

    currentY += dayHeight + 6;
  });

  // 5. ESSENTIAL TRAVEL TIPS & GUIDELINES
  if (destination.travelTips && destination.travelTips.length > 0) {
    addNewPageIfNeeded(35);
    doc.setFillColor(255, 248, 225); // Warm amber
    doc.setDrawColor(255, 213, 79);
    doc.roundedRect(margin, currentY, contentWidth, 6 + destination.travelTips.length * 6, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(180, 83, 9);
    doc.text('TRAVEL TIPS & LOCAL INSIGHTS', margin + 4, currentY + 5);

    let tipY = currentY + 11;
    destination.travelTips.forEach((tip) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(70, 70, 70);
      const splitTip = doc.splitTextToSize(`• ${tip}`, contentWidth - 10);
      doc.text(splitTip, margin + 4, tipY);
      tipY += splitTip.length * 5;
    });

    currentY = tipY + 4;
  }

  // 6. DISCLAIMER & VERIFICATION
  addNewPageIfNeeded(18);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(140, 140, 140);
  const disclaimer =
    'Disclaimer: WanderWise is an itinerary planning tool. Timings, fares, activity rates, and hotel prices are dynamic estimates for reference only. Please verify real-time schedules and bookings before departure.';
  const splitDisc = doc.splitTextToSize(disclaimer, contentWidth);
  doc.text(splitDisc, margin, currentY + 4);

  // Draw header/footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    drawHeaderFooter();
  }

  // Save the PDF file - triggers native browser/phone download
  const cleanDestName = trip.destinationName.replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`WanderWise_${cleanDestName}_Itinerary.pdf`);
}

/**
 * Generates and downloads a clean, self-contained Offline HTML Travel Pass
 * that can be opened directly on phones (iOS/Android) without internet.
 */
export function downloadOfflineHtmlItinerary(trip: TripPlan, destination: Destination): void {
  const selectedTransport = destination.travelOptions.find((t) => t.id === trip.selectedTransportId);
  const selectedStay = destination.stayOptions.find((s) => s.id === trip.selectedStayId);

  const daysHtml = trip.itineraryDays
    .map(
      (day) => `
    <div class="day-card">
      <div class="day-header">
        <span class="day-badge">DAY ${day.dayNumber}</span>
        <h3>${day.theme}</h3>
      </div>
      <div class="activities-list">
        ${day.activities
          .map(
            (act) => `
          <div class="act-item ${act.completed ? 'completed' : ''}">
            <input type="checkbox" ${act.completed ? 'checked' : ''} onchange="this.parentElement.classList.toggle('completed')">
            <div class="act-details">
              <div class="act-title">
                <span class="slot-badge ${act.timeSlot}">${act.timeSlot.toUpperCase()}</span>
                <strong>${act.title}</strong>
                <span class="category-tag">${act.category}</span>
              </div>
            </div>
            <div class="act-cost">${act.estimatedCost > 0 ? `₹${act.estimatedCost.toLocaleString('en-IN')}` : 'Free'}</div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  `
    )
    .join('');

  const tipsHtml =
    destination.travelTips && destination.travelTips.length > 0
      ? `
    <div class="tips-card">
      <h4>💡 Local Travel Tips & Guidelines</h4>
      <ul>
        ${destination.travelTips.map((t) => `<li>${t}</li>`).join('')}
      </ul>
    </div>
  `
      : '';

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${trip.destinationName} - WanderWise Travel Plan</title>
  <style>
    :root {
      --primary: #004D40;
      --accent: #FF6E40;
      --bg: #F8FAFC;
      --card-bg: #FFFFFF;
      --text: #1E293B;
      --text-muted: #64748B;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    body { background-color: var(--bg); color: var(--text); padding: 16px; max-width: 760px; margin: 0 auto; line-height: 1.5; }
    header { background: linear-gradient(135deg, #00251A, #004D40); color: white; padding: 24px; border-radius: 20px; margin-bottom: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .badge { display: inline-block; background: var(--accent); color: white; font-size: 10px; font-weight: bold; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
    h1 { font-size: 28px; margin-bottom: 4px; font-weight: 800; }
    .subtitle { color: #80CBC4; font-size: 13px; margin-bottom: 16px; }
    .meta-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; background: rgba(255,255,255,0.1); padding: 12px; border-radius: 12px; font-size: 12px; }
    .meta-item strong { display: block; font-size: 14px; color: #FFF; }
    .day-card { background: var(--card-bg); border-radius: 16px; padding: 16px; margin-bottom: 16px; border: 1px solid #E2E8F0; box-shadow: 0 2px 8px rgba(0,0,0,0.03); }
    .day-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #F1F5F9; }
    .day-badge { background: var(--primary); color: white; font-size: 11px; font-weight: bold; padding: 4px 8px; border-radius: 6px; }
    .day-header h3 { font-size: 15px; font-weight: 700; color: #0F172A; }
    .act-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px dashed #F1F5F9; gap: 10px; }
    .act-item:last-child { border-bottom: none; }
    .act-item.completed strong { text-decoration: line-through; color: #94A3B8; }
    .act-details { flex: 1; font-size: 13px; }
    .slot-badge { font-size: 9px; font-weight: bold; padding: 2px 6px; border-radius: 4px; color: white; margin-right: 6px; }
    .slot-badge.morning { background: #D97706; }
    .slot-badge.afternoon { background: #EA580C; }
    .slot-badge.evening { background: #4F46E5; }
    .category-tag { font-size: 10px; color: var(--text-muted); background: #F1F5F9; padding: 2px 6px; border-radius: 4px; margin-left: 6px; }
    .act-cost { font-weight: 700; font-size: 12px; color: var(--primary); white-space: nowrap; }
    .tips-card { background: #FEF3C7; border: 1px solid #FDE68A; padding: 16px; border-radius: 16px; margin-bottom: 20px; font-size: 12px; color: #92400E; }
    .tips-card h4 { font-size: 13px; font-weight: 700; margin-bottom: 8px; }
    .tips-card ul { padding-left: 18px; }
    .tips-card li { margin-bottom: 4px; }
    .btn-print { display: block; width: 100%; text-align: center; background: var(--primary); color: white; padding: 14px; border-radius: 12px; font-weight: bold; text-decoration: none; border: none; cursor: pointer; font-size: 14px; margin-top: 20px; }
    footer { text-align: center; font-size: 11px; color: var(--text-muted); margin-top: 20px; }
    @media print {
      body { background: white; padding: 0; }
      .btn-print { display: none; }
      .day-card { break-inside: avoid; border: 1px solid #CCC; }
    }
  </style>
</head>
<body>
  <header>
    <span class="badge">WanderWise Mobile Travel Pass</span>
    <h1>${trip.destinationName}</h1>
    <div class="subtitle">${destination.location}, ${destination.country} • ${trip.durationDays} Days • ${trip.travelStyle}</div>
    <div class="meta-grid">
      <div class="meta-item">
        <span>Estimated Total Budget</span>
        <strong>₹${calculateTripTotalBudget(trip, destination).toLocaleString('en-IN')}</strong>
      </div>
      <div class="meta-item">
        <span>Match Score</span>
        <strong>${trip.matchScore || 95}% Match</strong>
      </div>
      ${
        selectedTransport
          ? `<div class="meta-item"><span>Transport</span><strong>${selectedTransport.providerOrName}</strong></div>`
          : ''
      }
      ${
        selectedStay
          ? `<div class="meta-item"><span>Stay</span><strong>${selectedStay.name}</strong></div>`
          : ''
      }
    </div>
  </header>

  ${tipsHtml}

  <div class="schedule">
    ${daysHtml}
  </div>

  <button class="btn-print" onclick="window.print()">🖨️ Print / Save as PDF</button>

  <footer>
    <p>WanderWise Travel Planner • Offline Digital Itinerary</p>
    <p>Saved on ${new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
  </footer>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const cleanDestName = trip.destinationName.replace(/[^a-zA-Z0-9]/g, '_');
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `WanderWise_${cleanDestName}_OfflinePass.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Opens a print-friendly window and triggers browser print
 */
export function openPrintDialog(trip: TripPlan, destination: Destination): void {
  const totalCost = calculateTripTotalBudget(trip, destination);
  // Try direct popup print first for clean isolated printing
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    const selectedTransport = destination.travelOptions.find((t) => t.id === trip.selectedTransportId);
    const selectedStay = destination.stayOptions.find((s) => s.id === trip.selectedStayId);

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${trip.destinationName} - Travel Itinerary</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; padding: 20px; color: #111; max-width: 800px; margin: 0 auto; }
          .header { border-bottom: 2px solid #004D40; padding-bottom: 12px; margin-bottom: 16px; }
          .header h1 { color: #004D40; margin: 0 0 4px 0; font-size: 26px; }
          .meta { font-size: 13px; color: #555; margin-bottom: 8px; }
          .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; background: #f4f6f8; padding: 10px; border-radius: 8px; font-size: 12px; margin-bottom: 16px; }
          .day { margin-bottom: 16px; border: 1px solid #e0e0e0; border-radius: 8px; padding: 12px; break-inside: avoid; }
          .day-title { font-weight: bold; font-size: 14px; color: #004D40; margin-bottom: 8px; }
          .act { display: flex; justify-content: space-between; font-size: 12px; padding: 6px 0; border-bottom: 1px dashed #eee; }
          .act:last-child { border-bottom: none; }
          .badge { font-size: 10px; font-weight: bold; background: #eee; padding: 2px 6px; border-radius: 4px; }
          .footer { margin-top: 24px; font-size: 10px; color: #888; text-align: center; border-top: 1px solid #eee; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${trip.destinationName} Itinerary</h1>
          <div class="meta">${destination.location}, ${destination.country} • ${trip.durationDays} Days • ${trip.travelStyle} • Total Budget: ₹${totalCost.toLocaleString('en-IN')}</div>
        </div>
        <div class="summary">
          <div><strong>Duration:</strong> ${trip.durationDays} Days</div>
          <div><strong>Style:</strong> ${trip.travelStyle}</div>
          <div><strong>Budget:</strong> ${trip.budgetTier}</div>
          <div><strong>Match Score:</strong> ${trip.matchScore || 95}%</div>
        </div>
        ${trip.itineraryDays
          .map(
            (d) => `
          <div class="day">
            <div class="day-title">Day ${d.dayNumber}: ${d.theme}</div>
            ${d.activities
              .map(
                (a) => `
              <div class="act">
                <span>[${a.timeSlot.toUpperCase()}] <strong>${a.title}</strong> (${a.category})</span>
                <span>${a.estimatedCost > 0 ? `₹${a.estimatedCost.toLocaleString('en-IN')}` : 'Free'}</span>
              </div>
            `
              )
              .join('')}
          </div>
        `
          )
          .join('')}
        ${
          destination.travelTips
            ? `<div style="background:#fff8e1; padding:10px; border-radius:8px; font-size:11px; margin-top:12px;"><strong>Tips:</strong> ${destination.travelTips.join(' • ')}</div>`
            : ''
        }
        <div class="footer">WanderWise Smart Travel Planner • Printed ${new Date().toLocaleDateString()}</div>
        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  } else {
    // If popup was blocked (e.g. strict mobile browser iframe), fall back to standard window.print()
    window.print();
  }
}
