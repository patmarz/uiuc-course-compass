# UIUC Course Compass — v1.1.0 (Prototype)

Plain HTML/CSS/JS PWA prototype that lets students:
- Sign in locally
- Choose major (seeded: GIES Accountancy, BS)
- Mark taken courses
- See remaining requirements with average GPA chips and professor lists
- Build a simple conflict-checked weekly schedule

## Run locally
1. Unzip and open the folder in a terminal.
2. Serve the directory (recommended for service worker):
   ```bash
   python -m http.server 8000
   ```
3. Open http://localhost:8000 in your browser.

> Note: All data is local and sample-only. Replace seeds in `app.js` with real sources later.
