import { useState } from "react";
import { Link } from "react-router-dom";
import useApiResource from "../hooks/useApiResource";
import studentsMock from "../mockData/students.json";
import PageHeader from "../components/PageHeader";
import Loader from "../components/Loader";

export default function StudentList() {
  const { data, loading, source } = useApiResource("/students", studentsMock);

  const [search, setSearch] = useState("");

  return (
    <div>
      <PageHeader
        eyebrow="Directory"
        title="Student List"
        subtitle="Browse all enrolled students. Click a row to view their profile."
        loading={loading}
        source={source}
        accent="var(--grad-rose)"
      />
      <div style={{ marginBottom: "20px" }}>
  <input
    type="text"
    placeholder="🔍 Search student by name..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      width: "100%",
      padding: "14px 18px",
      borderRadius: "12px",
      border: "1px solid #ddd",
      fontSize: "16px",
      outline: "none",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    }}
  />
</div>

      {loading ? (
        <Loader label="Fetching student list…" />
      ) : (
        <div className="card table-card">
          <table className="table">
            <thead>
              <tr>
                <th>👨‍🎓 Student</th>
                <th>🎓 Grade</th>
                <th>🏫 Section</th>
                <th>🏆GPA</th>
              </tr>
            </thead>
            <tbody>
              {data
  .filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  )
  .map((student) => (
                <tr key={student.id}>
                  <td>
                    <Link to={`/students/${student.id}`} className="student-row">
                      <span
                        className="avatar"
                        style={{ background: student.avatarColor }}
                      >
                        {student.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                      <span>
                        <span className="student-name">{student.name}</span>
                        <span className="student-email">{student.email}</span>
                      </span>
                    </Link>
                  </td>
                  <td>
  🎓 {student.grade}
</td>

<td>
  🏫 {student.section}
</td>
                  <td>
                    <span className="gpa-badge">
  🏆 {student.gpa.toFixed(1)}
</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
