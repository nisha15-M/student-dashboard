import useApiResource from "../hooks/useApiResource";
import dashboardMock from "../mockData/dashboardSummary.json";
import PageHeader from "../components/PageHeader";
import Loader from "../components/Loader";

export default function Dashboard() {
  const { data, loading, source } = useApiResource(
    "/dashboard/summary",
    dashboardMock
  );

  return (
    <div>
      <PageHeader
        eyebrow="Academic Control Center"
        title="StudentSphere Dashboard"
        subtitle="Monitor students, courses, attendance, and notifications from one intelligent dashboard."
        loading={loading}
        source={source}
        accent="var(--grad-violet)"
      />

      {loading ? (
        <Loader label="Fetching dashboard summary…" />
      ) : (
        <>
          {/* Statistics */}
          <section className="stat-grid">
            <StatCard
              label="Total Students"
              value={data.totalStudents}
              accent="violet"
            />
            <StatCard
              label="Active Courses"
              value={data.totalCourses}
              accent="rose"
            />
            <StatCard
              label="Attendance Rate"
              value={`${data.attendanceRate}%`}
              accent="teal"
            />
            <StatCard
              label="Unread Notifications"
              value={data.unreadNotifications}
              accent="amber"
            />
          </section>

          {/* Recent Activity + Schedule */}
          <div className="dashboard-grid">
            <section className="card">
              <h2>📌 Recent Activity</h2>

              <ul className="activity-list">
                {data.recentActivity.map((item) => (
                  <li key={item.id}>
                    <span className="activity-dot" />
                    <div>
                      <p>{item.text}</p>
                      <span className="activity-time">{item.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="card">
              <h2>📅 Today's Schedule</h2>

              <div className="schedule-item">
                <span>09:00 AM</span>
                <p>Mathematics</p>
              </div>

              <div className="schedule-item">
                <span>11:00 AM</span>
                <p>Physics</p>
              </div>

              <div className="schedule-item">
                <span>02:00 PM</span>
                <p>React Lab</p>
              </div>

              <div className="schedule-item">
                <span>03:30 PM</span>
                <p>Sports Activity</p>
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ label, value, accent }) {
  const icons = {
    violet: "🎓",
    rose: "📚",
    teal: "✅",
    amber: "🔔",
  };

  return (
    <div className={`stat-card stat-${accent}`}>
      <div
        style={{
          fontSize: "30px",
          marginBottom: "10px",
        }}
      >
        {icons[accent]}
      </div>

      <p className="stat-value">{value}</p>
      <p className="stat-label">{label}</p>
    </div>
  );
}