import useApiResource from "../hooks/useApiResource";
import attendanceMock from "../mockData/attendance.json";
import PageHeader from "../components/PageHeader";
import Loader from "../components/Loader";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";

const STATUS_CLASS = {
  Present: "status-present",
  Absent: "status-absent",
  Late: "status-late",
  Excused: "status-excused",
};

const COLORS = ["#14b8a6", "#ec4899", "#f59e0b", "#4f46e5"];

export default function Attendance() {
  const { data, loading, source } = useApiResource(
    "/attendance",
    attendanceMock
  );

  const chartData = loading
    ? []
    : [
        { name: "Present", value: data.summary.present },
        { name: "Absent", value: data.summary.absent },
        { name: "Late", value: data.summary.late },
        { name: "Excused", value: data.summary.excused },
      ];

  return (
    <div>
      <PageHeader
        eyebrow="Records"
        title="Attendance"
        subtitle="Term-to-date attendance summary and recent daily records."
        loading={loading}
        source={source}
        accent="var(--grad-teal)"
      />

      {loading ? (
        <Loader label="Fetching attendance records..." />
      ) : (
        <>
          {/* Summary Cards */}
          <section className="stat-grid">
            <StatCard
              icon="✅"
              label="Present"
              value={`${data.summary.present}%`}
              accent="teal"
            />

            <StatCard
              icon="❌"
              label="Absent"
              value={`${data.summary.absent}%`}
              accent="rose"
            />

            <StatCard
              icon="⏰"
              label="Late"
              value={`${data.summary.late}%`}
              accent="amber"
            />

            <StatCard
              icon="📄"
              label="Excused"
              value={`${data.summary.excused}%`}
              accent="blue"
            />
          </section>

          {/* Attendance Table */}
          <div className="card table-card">
            <table className="table">
              <thead>
                <tr>
                  <th>📅 Date</th>
                  <th>📖 Day</th>
                  <th>📌 Status</th>
                </tr>
              </thead>

              <tbody>
                {data.records.map((record) => (
                  <tr key={record.date}>
                    <td>{record.date}</td>

                    <td>{record.day}</td>

                    <td>
                      <span
                        className={`status-badge ${
                          STATUS_CLASS[record.status] || ""
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bar Chart + Pie Chart side by side */}
          <div className="chart-row">
            <section className="card chart-card">
              <h2 style={{ marginBottom: "20px" }}>
                📊 Attendance Overview
              </h2>

              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />

                  <Bar
                    dataKey="value"
                    radius={[10, 10, 0, 0]}
                    animationDuration={1500}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </section>

            <section className="card chart-card">
              <h2 style={{ marginBottom: "20px" }}>
                🥧 Attendance Distribution
              </h2>

              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={45}
                    label
                    animationDuration={1500}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </section>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, accent }) {
  return (
    <div className={`stat-card stat-${accent}`}>
      <div
        style={{
          fontSize: "30px",
          marginBottom: "10px",
        }}
      >
        {icon}
      </div>

      <p className="stat-value">{value}</p>

      <p className="stat-label">{label}</p>
    </div>
  );
}