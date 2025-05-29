# Event Horizon App

Event Horizon is responsive and accessible cross-platform events management application built with React, TypeScript, and Bootstrap.

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
```.

A terminal message with a link to the local server (e.g. "Local: http://localhost:5173/") will open a live preview of the app.

---

## Project Structure

```
src/
  api/                   # API calls (fetchEvents, fetchAttendeesByEventId, etc.)
  components/            # Reusable UI components (Header, EventCard, Modal, etc.)
  contexts/              # React Contexts (UserContext)
  pages/                 # Top-level pages (Login, Register, EventList, EventDetail)
  types/                 # TypeScript type definitions (Event, User)
  utils/                 # Utility functions (e.g., formattedDateTime)
  main.tsx              # App entry point
```

## Acknowledgements

- [React](https://react.dev/)
- [Bootstrap](https://getbootstrap.com/)
- [TypeScript](https://www.typescriptlang.org/)
