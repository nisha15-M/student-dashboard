import useApiResource from "../hooks/useApiResource";
import coursesMock from "../mockData/courses.json";
import PageHeader from "../components/PageHeader";
import Loader from "../components/Loader";

export default function Courses() {
  const { data, loading, source } = useApiResource(
    "/courses",
    coursesMock
  );

  const courseIcons = ["📘", "🌍", "🧬", "💻", "📖"];

  const courseColors = [
    "#7C3AED",
    "#2196F3",
    "#22C55E",
    "#F97316",
    "#EC4899",
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Academics"
        title="Courses"
        subtitle="Everything currently on offer this term."
        loading={loading}
        source={source}
        accent="var(--grad-amber)"
      />

      {loading ? (
        <Loader label="Fetching courses..." />
      ) : (
        <section className="course-grid">
          {data.map((course, index) => (
            <div
              key={course.id}
              className="card course-card"
              style={{
                borderTop: `5px solid ${courseColors[index]}`,
                borderRadius: "20px",
              }}
            >
              <div className="course-card-head">
                <div className="course-info">
                  <div
                    className="course-icon"
                    style={{
                      background: courseColors[index],
                    }}
                  >
                    {courseIcons[index]}
                  </div>

                  <div>
                    <h2>{course.name}</h2>

                    <p className="course-instructor">
                      👨‍🏫 {course.instructor}
                    </p>

                    <p className="course-schedule">
                      📅 {course.schedule}
                    </p>
                  </div>
                </div>

                <span className="credits-badge">
                  {course.credits} Credits
                </span>
              </div>

              <div className="progress-row">
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${course.progress}%`,
                      background: courseColors[index],
                    }}
                  />
                </div>

                <span>{course.progress}%</span>
              </div>

              <p className="course-enrolled">
                👥 {course.enrolled} Students Enrolled
              </p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}