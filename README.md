# Gas Metering Station — Version 1

A professional, browser-based learning interface for exploring a simplified gas metering station process arrangement. The application presents a gas inlet splitting into two parallel metering runs, recombining at a common header, and flowing to a power plant.

> **Training use only:** This static diagram is a configuration reference and is not suitable for operational decision-making.

## Run locally

Prerequisites: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build:

```bash
npm run build
```

Run the automated interface checks with:

```bash
npm test
```

## Version 1 includes

- A static, responsive SVG-enhanced process diagram for tablet and desktop screens.
- Gas Inlet → parallel Run A / Run B → Common Header → Power Plant process flow.
- SSV, PCV Monitor, PCV Active, and PSV equipment in both runs.
- The eight supplied pressures, consistently described as **Configured Pressure Values**.
- Clickable equipment cards and an accessible detail panel showing the equipment name, run, configured pressure, engineering status, and a simple description.
- A learning glossary and explicit engineering-boundary notices.

Version 1 intentionally does **not** simulate pressure or implement PCV takeover, SSV trips, PSV relief calculations, automatic valve control, or operator scoring.

## Unconfirmed engineering information

- **PSV topology:** The PSV is displayed in the currently supplied process sequence, but its topology is **awaiting engineering confirmation**.
- **Functional intent:** No configured pressure has been assigned control, trip, or relief behavior.
- **Cause and effect:** Valve actions, control interactions, set-point relationships, and operating sequences remain undefined.

These topics must be confirmed by the appropriate engineering authority before behavioral simulation is added in a future version.
