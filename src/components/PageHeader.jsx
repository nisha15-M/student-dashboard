export default function PageHeader({ eyebrow, title, subtitle, accent }) {
  return (
    <header className="page-header" style={accent ? { "--nav-accent": accent } : undefined}>
      <div>
        {eyebrow && <p className="page-eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
    </header>
  );
}
 





