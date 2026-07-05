import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

/**
 * useApiResource
 * ---------------------------------------------------------------
 * One hook, used by every page in this app, that implements the
 * assignment's required pattern:
 *
 *   try   -> call the real API endpoint
 *   catch -> the API is unreachable (it's intentionally invalid
 *            for this assignment), so load the predefined mock
 *            JSON data instead and render that
 *
 * Because every page asks this hook for `data` and renders it the
 * same way regardless of where it came from, swapping the fake
 * base URL in src/api/apiClient.js for a real backend later will
 * NOT require any changes to page/UI code.
 *
 * @param {string} endpoint   - API path to call, e.g. "/students"
 * @param {*} mockData        - fallback data imported from src/mockData
 * @returns {{ data: any, loading: boolean, source: "api"|"mock"|null, error: string|null }}
 */
export default function useApiResource(endpoint, mockData) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        // --- TRY: call the (intentionally invalid) API endpoint ---
        const response = await apiClient.get(endpoint);
        if (!isMounted) return;
        setData(response.data);
        setSource("api");
      } catch (err) {
        // --- CATCH: API failed, fall back to mock data ---
        console.warn(
          `[useApiResource] "${endpoint}" failed (${err.message}). Falling back to mock data.`
        );
        if (!isMounted) return;
        setData(mockData);
        setSource("mock");
        setError(err.message || "Network request failed");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  return { data, loading, source, error };
}
