import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Users, BookOpen, CalendarCheck, Bell, GraduationCap, Moon } from "lucide-react";

const NAV_ITEMS = [
  {
    to: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
    end: true,
    accent: "var(--grad-violet)",
    iconBg: "var(--violet-soft)",
    iconColor: "var(--violet)",
  },
  {
    to: "/students",
    label: "Student List",
    icon: Users,
    accent: "var(--grad-rose)",
    iconBg: "var(--rose-soft)",
    iconColor: "var(--rose)",
  },
  {
    to: "/courses",
    label: "Courses",
    icon: BookOpen,
    accent: "var(--grad-amber)",
    iconBg: "var(--amber-soft)",
    iconColor: "var(--amber)",
  },
  {
    to: "/attendance",
    label: "Attendance",
    icon: CalendarCheck,
    accent: "var(--grad-teal)",
    iconBg: "var(--teal-soft)",
    iconColor: "var(--teal)",
  },
  {
    to: "/notifications",
    label: "Notifications",
    icon: Bell,
    accent: "var(--grad-blue)",
    iconBg: "var(--blue-soft)",
    iconColor: "var(--blue)",
  },
];

export default function Layout() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={"app-shell" + (darkMode ? " dark" : "")}>
      <div className="bg-blobs" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">SD</span>
          <div>
            <p className="brand-name">Student Dashboard</p>
          </div>
        </div>

        <nav className="nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => "nav-link" + (isActive ? " nav-link-active" : "")}
                style={{ "--nav-accent": item.accent, "--nav-icon-bg": item.iconBg, "--nav-icon-color": item.iconColor }}
              >
                <span className="nav-icon">
                  <Icon size={16} strokeWidth={2.4} />
                </span>
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* Illustration / promo card */}
          <div
            style={{
              padding: "18px 16px",
              borderRadius: "18px",
              background: "var(--violet-soft)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "var(--grad-violet)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px",
                boxShadow: "0 8px 16px -6px rgba(124,58,237,0.5)",
              }}
            >
              <GraduationCap size={24} color="#fff" strokeWidth={2} />
            </div>

            <p
              style={{
                margin: "0 0 4px",
                fontWeight: 700,
                fontSize: "13.5px",
                color: "var(--text)",
              }}
            >
              Empowering Education
            </p>
            <p
              style={{
                margin: "0 0 14px",
                fontSize: "11.5px",
                color: "var(--text-muted)",
                lineHeight: 1.4,
              }}
            >
              Smart insights for a better tomorrow.
            </p>

            <button
              style={{
                width: "100%",
                border: "none",
                borderRadius: "10px",
                padding: "9px 0",
                background: "var(--grad-violet)",
                color: "#fff",
                fontSize: "12.5px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              View Reports →
            </button>
          </div>

          {/* Dark mode toggle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 14px",
              borderRadius: "14px",
              background: "var(--bg)",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12.5px",
                fontWeight: 500,
                color: "var(--text)",
              }}
            >
              <Moon size={15} strokeWidth={2.2} />
              Dark Mode
            </span>

            <button
              onClick={() => setDarkMode((prev) => !prev)}
              aria-pressed={darkMode}
              style={{
                width: "38px",
                height: "20px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                position: "relative",
                background: darkMode ? "var(--grad-violet)" : "#d1d5db",
                transition: "background 0.2s ease",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: "2px",
                  left: darkMode ? "20px" : "2px",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: "#fff",
                  transition: "left 0.2s ease",
                }}
              />
            </button>
          </div>
        </div>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}