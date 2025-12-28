# Mixo Ads Campaign Monitor

A high-performance, production-ready campaign monitoring dashboard built for the Mixo Ads ecosystem. This application provides real-time insights, performance auditing, and AI-driven strategic recommendations for advertising campaigns across multiple platforms.

## Key Features

### 1. Performance Overview
- **Dynamic KPI Stat Cards**: Real-time tracking of Total Spend, Impressions, Avg. CPC, and calculated Avg. CPA with trend indicators
- **Loading States**: Skeleton loaders with animated pulse effects for all stat cards during data fetching
- **ROI Benchmark Chart**: Dual-axis bar chart comparing Investment (Spend) vs. Returns (Conversions)
  - **Dynamic Scaling**: Automatically limits display to top 10 campaigns on desktop and top 3 on mobile
  - **Maximized Mode**: Full-screen audit view with horizontal panning/scrolling for mobile devices
  - **Gesture Support**: Drag-to-close functionality on mobile for native-app experience
  - **Interactive Bars**: Click on any bar to instantly view detailed campaign analytics
  - **Horizontal Scrolling**: Swipe gesture indicator for mobile users in maximized view
  - **Custom Tooltips**: Rich tooltips displaying campaign ID, investment, and returns
- **Real-time Data**: Live data fetched from backend API with automatic synchronization

  <img width="2555" height="1317" alt="image" src="https://github.com/user-attachments/assets/82e504db-e3cc-40d7-b6a2-2d677e090ddb" />


### 2. Campaign Management
- **Advanced Campaign Table**:
  - **Live Search**: Real-time filtering by campaign name or advertising platform
  - **External Search Integration**: Header search bar synchronized with table filtering
  - **Status Filtering**: Custom dropdown to segment campaigns by Active, Paused, Completed, or All
  - **Smart Sorting**: Multi-column sorting with weighted logic (Active campaigns prioritized)
    - Sortable columns: Name, Status, Budget, Platforms, Date
    - Three-state sorting: Ascending, Descending, None
    - Visual indicators for active sort column
  - **Data Portability**: One-click CSV export functionality for external reporting
  - **Row Hover Effects**: Smooth transitions with color changes on hover
  - **Empty States**: Graceful handling with informative messages when no campaigns match filters
- **Platform Iconography**: 
  - Native brand icons for Meta (using meta.png), Google, LinkedIn, and TikTok
  - Facebook-specific icon for legacy campaigns
  - SVG icons with proper colors matching brand guidelines
  - Hover scale effects on platform icons
 
    <img width="1698" height="880" alt="image" src="https://github.com/user-attachments/assets/b9691f02-871f-4b4c-a7a2-5caf4f295449" />


### 3. AI-Powered Intelligence (Gemini API)
- **AI Advisor Sidebar**:
  - Actionable, real-time feedback synthesized from account-wide metrics
  - **Loading Animations**: Rotating status messages with pulsing indicator
    - Mixo Engine v2 running indicator
    - Creative Auditor analyzing status
    - Budget Allocator processing indicator
  - **Success Feedback**: "Insights ready!" message with checkmark animation
  - **Staggered Animations**: Insights appear with fade-in and slide-up effects
  - **Color-coded Insights**: Different colored badges for different insight types
  - **Timestamp**: "Just now" timestamp for each insight
- **Strategic Audit Reports**: Professional PDF generation using Gemini .
  - Executive summaries with AI-generated strategic insights
  - Budget analysis and performance metrics
  - Structured table of full 14-campaign pool sorted by ROI
  - ROI scoring with color-coded indicators (green for high-performing campaigns)
  - Modern PDF layout with header branding and date stamp
  - Automatic page breaks for long reports
  - Text wrapping for executive summaries
- **Background Processing**: Loading states during report generation
  
     <img width="496" height="430" alt="Films   TV 28-12-2025 19_31_05" src="https://github.com/user-attachments/assets/ed209365-9eac-4df6-ae92-bc80365c79fe" />

### 4. Campaign Detail View
- **Modal Interface**: 
  - Slide-in animation from right
  - Click outside or press Escape to close
  - Tooltip on close button showing keyboard shortcut
- **Campaign Information**:
  - Campaign name and ID badge
  - Status indicator with color-coded dot
  - Created date with full formatting
  - Platform icons with hover effects
- **Performance Metrics**:
  - Grid of metric cards: Spend, Impressions, Clicks, Conversions
  - Loading states with spinner and "Synthesizing insights" message
- **Efficiency Benchmarking**:
  - Radar Chart visualization comparing campaign vs account averages
  - Normalized metrics: CTR, Conversion Rate, CPC Efficiency, Conversion Volume, Quality Score
  - Custom styling for dark mode with proper stroke colors
  - Animated chart rendering

<img width="2201" height="1316" alt="image" src="https://github.com/user-attachments/assets/93528613-60b5-4d14-bd6b-bd2939bfac01" />


### 5. User Interface & Experience
- **Dark Mode**:
  - Full dark theme implementation across all components
  - Toggle button in header with sun/moon icons
  - Persistent theme preference stored in localStorage
  - System preference detection on first load
  - Premium dark backgrounds with near-black shades
  - Optimized chart colors for dark mode visibility
  - Reduced opacity (10%) for bar chart hover highlights
  - Enhanced radar chart visibility in dark mode
- **Responsive Navigation**:
  - Collapsible left sidebar for main navigation
  - Collapsible right panel for AI insights
  - Mobile-friendly drawer overlays with backdrop blur
  - Active state indicators for open panels
  - Smooth transitions and animations
- **Header Features**:
  - Breadcrumb navigation showing current section
  - Global search bar (desktop) with submit on enter
  - Theme toggle button
  - Notification bell with dropdown (empty state)
  - Panel toggle buttons for sidebar and AI panel
  - Click outside to close notifications
- **Notifications System**:
  - Dropdown panel with smooth animations
  - Empty state with icon and message
  - Click outside to dismiss
  - Keyboard support (Escape to close)
- **Keyboard Shortcuts**:
  - Escape key to close modals and maximize view
  - Enter to submit search
  - Full keyboard navigation support
- **Scroll to Section**: 
  - Search submission scrolls to Campaign Inventory table
  - Smooth scroll behavior for better UX
- **Visual Polish**:
  - Custom scrollbar hiding for cleaner appearance
  - Gradient borders and shadow effects
  - Rounded corners and modern card designs
  - Smooth transitions and micro-interactions
  - Loading skeletons matching content structure
 
    <img width="2553" height="1256" alt="image" src="https://github.com/user-attachments/assets/7861c320-bb2e-47a0-912d-9bba2123199b" />


### 6. Data & API Integration
- **Backend Integration**:
  - Real data from https://mixo-fe-backend-task.vercel.app/
  - Campaign list fetching
  - Global insights aggregation
  - Individual campaign insights
- **Resilient API Layer**:
  - Custom ApiService class with TypeScript generics
  - Automatic retry logic with exponential backoff
  - Rate limit handling (429 status code)
  - Network error recovery
  - Maximum 3 retry attempts with progressive delays
  - Proper error messages and logging
- **Data Processing**:
  - ROI calculation (Returns per Dollar)
  - Campaign ranking by efficiency
  - Top 14 campaign pool for performance analysis
  - Normalized metrics for radar chart visualization
  - Memoized filtering and sorting for performance
- **AI Integration**:
  - Google Gemini API for strategic insights
  - AI-generated advisor feedback
  - Detailed report generation with executive summaries
  - Contextual campaign analysis

### 7. Performance Optimizations
- **React Optimizations**:
  - Extensive use of React.useMemo for expensive computations
  - Memoized filtering, searching, and sorting operations
  - Optimized re-renders with proper dependency arrays
  - Custom hooks for data management and UI state
- **Data Fetching**:
  - Parallel API calls using Promise.all
  - Efficient loading states management
  - Error boundary handling
  - Retry button for failed requests
- **UI Performance**:
  - CSS transitions instead of JavaScript animations
  - Hardware-accelerated transforms
  - Debounced search input handling
  - Lazy loading for heavy components
  - 60fps interaction target

### 8. Accessibility & Polish
- **Semantic HTML**: Proper use of header, section, aside, and table elements
- **ARIA Labels**: Descriptive labels for icon-only buttons
- **Keyboard Navigation**: Full support for keyboard-only users
- **Focus States**: Visible focus indicators with ring styles
- **Error States**: Clear error messages with retry options
- **Loading States**: Informative loading messages and skeleton loaders
- **Empty States**: Helpful messages when no data is available
- **Responsive Text**: Font sizes and spacing optimized for all screen sizes
- **Touch Targets**: Properly sized buttons and clickable areas for mobile

## Tech Stack
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom dark mode configuration
- **Charts**: Recharts (Bar & Radar charts)
- **Icons**: Lucide React
- **AI**: Google Gemini SDK (@google/generative-ai)
- **PDF Generation**: jsPDF
- **State Management**: React Hooks (useState, useEffect, useMemo, useCallback, useRef)
- **Custom Hooks**: useDashboardData, useCampaignDetails, useTheme, useWindowWidth

## Mobile Experience

  <img width="624" height="1105" alt="image" src="https://github.com/user-attachments/assets/eeb80e70-7f48-481f-9712-560c30a48358" />


The app is optimized for mobile-first utility:
- **Responsive Drawers**: Navigation and AI panels collapse into touch-friendly drawers
- **Touch Gestures**: 
  - Vertical drag to dismiss maximized chart
  - Horizontal swipe to explore data in maximized view
  - Touch-optimized dropdown menus
- **Mobile Chart Limits**: Default views limited to top 3 campaigns on mobile
- **Adaptive Layouts**: Grid columns adjust based on screen size
- **Mobile-specific UI**:
  - Drag handle indicator for maximized modal
  - Swipe instruction text for horizontal scrolling
  - Condensed headers and spacing
  - Hidden labels with responsive visibility classes

## Architecture & Data Flow
- **Component Structure**:
  - Smart container components (App.tsx)
  - Presentational components (all components)
  - Custom hooks for business logic
  - Service layer for API calls
  - Utility functions for exports and reports
- **State Management**:
  - Local component state for UI interactions
  - Custom hooks for shared state logic
  - Context-free architecture for simplicity
- **Type Safety**: Full TypeScript coverage with custom type definitions
- **Error Handling**: Comprehensive try-catch blocks with user-friendly messages
- **Loading States**: Multi-level loading indicators for better UX

## Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables
Create a `.env.local` file:
```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

## Browser Support
- Modern browsers with ES2020+ support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
