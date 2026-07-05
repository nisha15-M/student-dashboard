import { useState } from "react";
import useApiResource from "../hooks/useApiResource";
import notificationsMock from "../mockData/notifications.json";
import PageHeader from "../components/PageHeader";
import Loader from "../components/Loader";

import {
  GraduationCap,
  CalendarCheck,
  Megaphone,
  BookOpen,
  Settings,
} from "lucide-react";

const TYPE_ICON = {
  grade: GraduationCap,
  attendance: CalendarCheck,
  announcement: Megaphone,
  course: BookOpen,
  system: Settings,
};

export default function Notifications() {
  const { data, loading, source } = useApiResource(
    "/notifications",
    notificationsMock
  );
  const [search, setSearch] = useState("");
  // Summary Values
  const totalNotifications = data?.length || 0;

  const unreadNotifications =
    data?.filter((note) => !note.read).length || 0;

  const announcementCount =
    data?.filter((note) => note.type === "announcement").length || 0;

  const academicCount =
    data?.filter(
      (note) =>
        note.type === "grade" ||
        note.type === "course"
    ).length || 0;

  return (
    <div>
      <PageHeader
        eyebrow="Inbox"
        title="Notifications"
        subtitle="Grade updates, reminders, and announcements in one place."
        loading={loading}
        source={source}
        accent="var(--grad-blue)"
      />

      {loading ? (
        <Loader label="Fetching notifications..." />
      ) : (
        <>
          {/* Summary Cards */}

          <section className="stat-grid">
            <StatCard
              icon="📩"
              label="Total"
              value={totalNotifications}
              accent="blue"
            />

            <StatCard
              icon="🔴"
              label="Unread"
              value={unreadNotifications}
              accent="rose"
            />

            <StatCard
              icon="📢"
              label="Announcements"
              value={announcementCount}
              accent="amber"
            />

            <StatCard
              icon="📚"
              label="Academic"
              value={academicCount}
              accent="teal"
            />
          </section>

          {/* Notification List */}

          <div className="card">
            <ul className="notification-list">
              {data.map((note) => {
                const Icon = TYPE_ICON[note.type] || Settings;

                return (
                  <li
                    key={note.id}
                    className={
                      note.read ? "" : "notification-unread"
                    }
                  >
                    <span className="notification-icon">
                      <Icon
                        size={18}
                        strokeWidth={2.3}
                      />
                    </span>

                    <div className="notification-body">
                      <div className="notification-top">
                        <p className="notification-title">
                          {note.title}
                        </p>

                        <span className="notification-time">
                          {note.time}
                        </span>
                      </div>

                      <p className="notification-message">
                        {note.message}
                      </p>
                    </div>

                    {!note.read && (
                      <span
                        className="unread-dot"
                        aria-label="Unread"
                      />
                    )}
                  </li>
                );
              })}
            </ul>
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