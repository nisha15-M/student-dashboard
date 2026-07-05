# Student Dashboard — React + Axios Practice

A small React app with six pages (Dashboard, Student List, Student Profile,
Courses, Attendance, Notifications). Every page calls an **intentionally
invalid API URL** with Axios inside a `try/catch`; since the call always
fails, the `catch` block loads predefined mock JSON data and the UI renders
that instead — so the app keeps working even though there's no real backend
yet.

## How the fallback pattern works

- `src/api/apiClient.js` — a single Axios instance pointed at a fake base
  URL (`https://api.student-dashboard-does-not-exist.invalid/v1`).
- `src/hooks/useApiResource.js` — one reusable hook used by every page:
  ```js
  try {
    const response = await apiClient.get(endpoint); // always fails right now
    setData(response.data);
    setSource("api");
  } catch (err) {
    setData(mockData);   // predefined JSON fallback
    setSource("mock");
  }
  ```
- `src/mockData/*.json` — the predefined fallback data, one file per feature
  (students, student profiles, courses, attendance, notifications, dashboard
  summary).
- Every page shows a loading state while the request is in flight, then
  renders `data` — it never checks *where* the data came from to decide
  *how* to render it. That's what makes it safe to swap in a real backend
  later: **just change `BASE_URL` in `src/api/apiClient.js`** and, once the
  real endpoints return the same shape of JSON as the mock files, nothing
  else in the app needs to change.
- A small pill in the top-right of every page (green "Live API data" or
  amber "Mock data (API unreachable)") makes it visible which source is
  currently powering the page.

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview   # optional, serves the production build locally
```

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. Go to https://vercel.com/new and import the repository.
3. Framework preset: **Vite**. Build command `npm run build`, output
   directory `dist` (Vercel detects these automatically for a Vite app).
4. Click **Deploy**.

## Project structure

```
src/
  api/apiClient.js        Axios instance (intentionally invalid base URL)
  hooks/useApiResource.js Reusable try/catch + mock-fallback hook
  mockData/                Predefined JSON fallback data
  components/              Shared UI: Layout, PageHeader, DataSourcePill, Loader
  pages/                   Dashboard, StudentList, StudentProfile, Courses,
                            Attendance, Notifications
```
