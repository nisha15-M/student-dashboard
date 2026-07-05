export default function DataSourcePill({ loading, source }) {
  if (loading) {
    return (
      <span className="pill pill-loading">
        <span className="pill-dot" />
        Checking API…
      </span>
    );
  }

  if (source === "api") {
    return (
      <span className="pill pill-live">
        <span className="pill-dot" />
        Live API data
      </span>
    );
  }

  return (
    <span className="pill pill-mock">
      <span className="pill-dot" />
      Mock data (API unreachable)
    </span>
  );
}
