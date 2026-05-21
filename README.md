# Space Googles 🚀

An interstellar, real-time dashboard built for space enthusiasts, powered by Next.js 13 (App Router), Tailwind CSS, and a fleet of public APIs. Space Googles allows users to track the International Space Station live, monitor Mars weather, get upcoming launch schedules, and read the latest cosmic news headlines.

## 🌟 Features

- **Live ISS Tracking:** Real-time latitude, longitude, and velocity tracking mapped visually.
- **Mars Weather Dashboard:** Data pulled directly from the InSight Lander detailing the current Sol, temperature, pressure, and season.
- **Near Earth Object (NEO) Radar:** Alerts for hazardous asteroids and close approaches based on NASA's database.
- **Solar Flare Monitor:** Real-time space weather updates and flare classifications.
- **EPIC Earth View:** The latest stunning captures of our planet from the DSCOVR satellite at the L1 Lagrange point.
- **Launch Schedule:** Aggregated upcoming global rocket launches.
- **Interstellar News Feed:** The latest curated space exploration headlines.
- **Monetization Built-In:** Fully optimized for Google AdSense with native In-Feed and In-Article ad units seamlessly integrated via a highly reusable custom `AdUnit` React component.

## 📡 Core APIs

The application aggregates data from several public space APIs:
* [NASA API Portal](https://api.nasa.gov/) (APOD, EPIC, Mars Weather, NEO, DONKI)
* [The Space Devs API](https://thespacedevs.com/llapi) (Launch Schedules & Astronauts)
* [SpaceX API](https://docs.spacexdata.com/#e001c501-9c09-4703-9e29-f91fbbf8db7c)
* [Spaceflight News API](https://api.spaceflightnewsapi.net/v4/articles)
* [Open-Notify](http://api.open-notify.org/) (ISS Location & Humans in Space)

## 🏗 Architecture & Tech Stack

This project strictly adheres to a layered frontend architecture designed for scale and maintainability:

* **Framework:** Next.js 13 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS + Custom `glassmorphism` utility classes
* **Icons:** `react-icons`
* **Maps:** `@react-google-maps/api`
* **Analytics:** Vercel Analytics (`@vercel/analytics`)

### Layered Separation of Concerns

* **UI (`components/`, `app/**/components/`):** Strictly presentational layer components. Route-specific components live inside their respective route folders to maintain Next.js App Router boundary conventions.
* **Orchestration (`hooks/`):** Application logic and state management (e.g., `usePlanet`).
* **Execution (`api/`, `utils/`):** Purely deterministic operations, data fetching (`fetchWithTimeout`), and reusable utilities (`classNames`).

## 🚀 Getting Started

### Prerequisites
* Node.js (v18 or higher recommended)
* pnpm or npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables. Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_NASA_API_KEY=your_nasa_api_key_here
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```
   *(Note: The NASA API falls back to a rate-limited `DEMO_KEY` if not provided, but a personal key is highly recommended for production).*

4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💸 Monetization Setup (Google AdSense)

The application is heavily optimized for Google AdSense, utilizing both standard display banners and native placements.

**Core Setup:**
* `public/ads.txt`: Contains the AdSense publisher authorization.
* `src/app/layout.tsx`: Contains the globally injected `<Script>` tag and the required `google-adsense-account` metadata block.

**Reusable Ad Component:**
The `src/app/components/AdUnit.tsx` is a highly scalable client component that handles Google's async script pushing. It supports standard responsive banners, as well as native `fluid` In-Feed and In-Article layouts.

**Current Placements:**
* **Homepage:** Horizontal Banner (below hero) & Square Sidebar Ad (Missions section).
* **News Feed:** Horizontal Banner (below featured news) & Native In-Feed Ads (dynamically injected every 5 articles).
* **Planets:** Native In-Article Ad (sandwiched natively between content paragraphs).

## 🛡️ Production & Deployment Guidelines

* **Vercel Fluid Compute:** This project is configured to run efficiently on Vercel's edge network.
* **Caching (ISR):** Data fetching functions aggressively utilize Next.js Incremental Static Regeneration (ISR). Most dynamic pages revalidate every 300 seconds (5 minutes) to ensure fast TTFB while preventing API rate limiting from external space agencies.
* **Image Optimization:** We utilize a custom `SafeImage` wrapper around the `next/image` component that gracefully falls back to local assets if remote space API images 404 or fail to load.

## 📜 License

This project is private and intended for production deployment by the owner.
