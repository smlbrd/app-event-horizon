# Event Horizon App

## Overview

Event Horizon is a responsive, intuitive and accessible cross-platform events management application built with React, TypeScript, and Bootstrap.

The platform allows users to view a list of available events (previews including event title, start time, location and current attendance numbers), select an event to see further details and edit or delete the event (with permissions), RSVP to an event add event details to their Google Calendar.

Both Staff and User accounts are available on the platform. Users can create, edit and delete their own events. Staff can create events, and can edit and delete events created by any user.

Bootstrap's display breakpoints are used to create responsive interfaces across different display sizes, and accessibility features have been included (e.g. a keyboard-accessible skip-to-content component on pages displaying a header, modals and dropdowns are focused when opened, and can be closed with ESC key, aria-labels and semantic HTML tags)

### Test Account Details:

#### test staff account (create events, edit and delete any event)
```
user: teststaff@eventhorizon.com
pass: TestPassword123
```

#### test user account (create events, edit and delete your own events)
```
user: testuser@example.com
pass: TestPassword123
```

The web app is [hosted online here.](https://event-horizon-app.vercel.app/)
The backend API is [hosted online here.](https://event-horizon-api-nuzf.onrender.com/api/)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v22+ recommended)
- [npm](https://www.npmjs.com/)

### Installation

```bash
git clone https://github.com/your-username/event-horizon.git
cd event-horizon
npm install
```

### Running the App

```bash
npm run dev
```

A terminal message with a link to the local server (e.g. `Local: http://localhost:5173/`) will open a live preview of the app in your browser.

## Project Structure

```
src/
  api/                   # API calls (e.g. fetchEvents, fetchAttendeesByEventId)
  assets/                # Icons and assets (e.g. icons, splash gallery images)
  components/            # Reusable UI components (e.g. Header, EventCard, Modal)
  contexts/              # React Contexts (UserContext)
  pages/                 # Top-level pages (e.g. Login, Register, EventList, EventDetail)
  types/                 # TypeScript type definitions (Event, User)
  utils/                 # Utility functions (e.g., formattedDateTime)
  main.tsx               # App entry point
```

## Acknowledgements

- [React](https://react.dev/)
- [Bootstrap](https://getbootstrap.com/)
- [TypeScript](https://www.typescriptlang.org/)
