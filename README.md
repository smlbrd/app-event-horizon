# Event Horizon App

Event Horizon is responsive, intuitive and accessible cross-platform events management application built with React, TypeScript, and Bootstrap.

The platform allows users to view a list of available events (an preview including event title, start time, location and current attendance numbers), select an event to see further details, RSVP to an event and once confirmed, add the event's details to their Google Calendar.

Both Staff and User accounts are available. Users can create, edit and delete their own events. Staff can create events, and can edit and delete events created by any user.

Bootstrap's display breakpoints are used to create responsive interfaces across different display sizes, and accessibility features like a skip-to-content component on pages displaying a header, and keyboard navigation (across main pages and modals or dropdown menus) has been added alongside aria-labels and semantic HTML tags.

The following details can be used for testing:

```
## test staff account (create events, edit and delete any event)
user: teststaff@eventhorizon.com
pass: TestPassword123

## test user account (create events, edit and delete your own events)
user: testuser@example.com
pass: TestPassword123
```

The app is [hosted online here.](https://event-horizon-app.vercel.app/)

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

A terminal message with a link to the local server (e.g. `Local: http://localhost:5173/`) will open a live preview of the app.


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
