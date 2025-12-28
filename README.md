# Mixo Ads Campaign Monitor

A high-performance, production-ready campaign monitoring dashboard built for the Mixo Ads ecosystem. This application provides real-time insights, performance auditing, and AI-driven strategic recommendations for advertising campaigns across multiple platforms.

## 🚀 Key Features

### 1. Performance Overview
- **Dynamic KPI Stat Cards**: Real-time tracking of Total Spend, Impressions, Avg. CPC, and calculated Avg. CPA with trend indicators.
- **ROI Benchmark Chart**: A dual-axis bar chart comparing Investment (Spend) vs. Returns (Conversions).
  - **Dynamic Scaling**: Automatically limits display to top 10 campaigns on desktop and top 3 on mobile for clarity.
  - **Maximized Mode**: A full-screen audit view with horizontal panning/scrolling for mobile devices.
  - **Gesture Support**: "Drag-to-close" functionality on mobile for a native-app feel.

### 2. Campaign Management
- **Advanced Campaign Table**:
  - **Live Search**: Filter by campaign name or advertising platform.
  - **Status Filtering**: Segment campaigns by Active, Paused, or Completed states.
  - **Smart Sorting**: Weighted sorting logic (e.g., Active campaigns prioritized) across multiple keys (Budget, Name, Date).
  - **Data Portability**: One-click "Export CSV" functionality for external reporting.
- **Platform Iconography**: Native brand icons for Meta, Google, LinkedIn, and TikTok.

### 3. AI-Powered Intelligence (Gemini API)
- **AI Advisor Sidebar**: Actionable, real-time feedback synthesized from account-wide metrics to improve spend efficiency and platform rebalancing.
- **Strategic Audit Reports**: Generates a professional PDF report using Gemini 3 Pro.
  - Includes executive summaries, budget analysis, and a structured table of the full 14-campaign pool.
  - ROI scoring and ranking integrated directly into the PDF layout.
- **Optimization Agents**: Simulated status monitoring for Mixo's background optimization engines.

### 4. Granular Insights
- **Campaign Detail View**: Deep-dive analytics for specific campaigns.
- **Efficiency Benchmarking**: A Radar Chart visualization comparing individual campaign performance (CTR, CPC Efficiency, Conversion Rate) against account-wide averages.

## 🛠 Tech Stack
- **Framework**: React 19 (ESM based)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts (Bar & Radar)
- **Icons**: Lucide React
- **AI**: Google Gemini SDK (@google/genai)
- **PDF Generation**: jsPDF
- **Build/Deploy**: Fully responsive, cross-browser compatible ESM deployment.

## 📱 Mobile Experience
The app is optimized for mobile-first utility:
- **Responsive Drawers**: Both left navigation and right AI panels collapse into touch-friendly drawers.
- **Mobile Chart Limits**: Default views are constrained to prevent "data squeezing," using scrollable containers instead.
- **Native Gestures**: The maximized chart modal supports vertical dragging to dismiss and horizontal panning to explore data.

## ⚙️ Architecture & Data
- **Resilient API Layer**: Custom `ApiService` with built-in retry logic and exponential backoff to handle rate limits (429) and network flakiness.
- **ROI Calculation**: Custom frontend logic to determine "Returns per Dollar" (ROI) and rank campaigns across the dashboard and PDF reports.
- **Performance**: Heavy use of `React.useMemo` for search/filter operations to ensure 60fps interaction even with large data pools.

## 🛠 Development
The project uses an ESM-only architecture with an import map in `index.html`. No build step is required for standard browser execution.

1. Open `index.html` in any modern browser.
2. Ensure `process.env.API_KEY` is available in the environment for Gemini AI features.
