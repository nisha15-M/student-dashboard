import axios from "axios";

/**
 * INTENTIONALLY INVALID BASE URL
 * ---------------------------------------------------------------
 * This points at a backend that doesn't exist yet. Every request
 * made with this client will fail, which is on purpose for this
 * assignment: it lets us prove that the UI keeps working by
 * falling back to mock data (see src/hooks/useApiResource.js).
 *
 * When a real backend is ready, just change this one line to the
 * real API base URL. Nothing else in the app needs to change,
 * because every page already renders whatever `data` it receives,
 * whether that data came from the real API or the mock fallback.
 */
const BASE_URL = "https://api.student-dashboard-does-not-exist.invalid/v1";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export default apiClient;
