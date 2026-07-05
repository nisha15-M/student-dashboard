import { Link, useParams } from "react-router-dom";
import useApiResource from "../hooks/useApiResource";
import studentProfilesMock from "../mockData/studentProfiles.json";
import PageHeader from "../components/PageHeader";
import Loader from "../components/Loader";

export default function StudentProfile() {
  const { studentId } = useParams();
  // The mock "database" is an object keyed by id; a real API would
  // just return the single record for this id from /students/:id.
  const mockRecord = studentProfilesMock[studentId] || null;

  const { data, loading, source } = useApiResource(`/students/${studentId}`, mockRecord);

  return (
    <div>
      <Link to="/students" className="back-link">← Back to student list</Link>

      <PageHeader
        eyebrow="Student profile"
        title={loading ? "Loading student…" : data?.name || "Student not found"}
        subtitle={data ? `${data.grade} · Section ${data.section}` : "No mock record exists for this ID."}
        loading={loading}
        source={source}
        accent="var(--grad-rose)"
      />

      {loading ? (
        <Loader label="Fetching student profile…" />
      ) : !data ? (
        <div className="card empty-state">
          <p>We couldn't find a student with ID <strong>{studentId}</strong>, even in the mock data.</p>
        </div>
      ) : (
        <div className="profile-grid">
          <div className="card profile-card">
            <span className="avatar avatar-lg" style={{ background: data.avatarColor }}>
              {data.name.split(" ").map((n) => n[0]).join("")}
            </span>
            <h2>{data.name}</h2>
            <p className="student-email">{data.email}</p>
            <p className="profile-bio">{data.bio}</p>
          </div>

          <div className="card">
            <h2>Details</h2>
            <dl className="detail-list">
              <div><dt>Student ID</dt><dd>{data.id}</dd></div>
              <div><dt>Phone</dt><dd>{data.phone}</dd></div>
              <div><dt>Guardian</dt><dd>{data.guardian}</dd></div>
              <div><dt>Address</dt><dd>{data.address}</dd></div>
              <div><dt>Joined</dt><dd>{data.joined}</dd></div>
              <div><dt>GPA</dt><dd><span className="gpa-badge">{data.gpa.toFixed(1)}</span></dd></div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
