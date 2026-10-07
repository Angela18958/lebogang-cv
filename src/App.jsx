import React, { useEffect, useState } from "react";
import { cvData } from "./data/cvData";
import "./App.css";

function Section({ id, title, children }) {
  return (
    <section id={id} className="section">
      <h2 className="section-title">
        <span className="section-accent"></span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Chip({ label }) {
  return <span className="chip">{label}</span>;
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#profile", label: "Profile" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <a href="#top" className="nav-brand">
        LM<span>.</span>
      </a>
      <ul className="nav-links">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>
      <a href={`mailto:${cvData.contact.email}`} className="nav-cta">
        Hire Me
      </a>
    </nav>
  );
}

function Hero() {
  return (
    <header id="top" className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <p className="hero-eyebrow">Hello, I'm</p>
          <h1 className="hero-name">{cvData.name}</h1>
          <h2 className="hero-title">{cvData.title}</h2>
          <p className="hero-tagline">{cvData.tagline}</p>

          <div className="hero-actions">
            <a href={`mailto:${cvData.contact.email}`} className="btn btn-primary">
              ✉ Get in Touch
            </a>
            <a
              href={`tel:${cvData.contact.phones[0].replace(/\s/g, "")}`}
              className="btn btn-ghost"
            >
              📞 Call Now
            </a>
          </div>

          <div className="hero-contact">
            <span>📍 {cvData.contact.address}</span>
            <span>✉ {cvData.contact.email}</span>
            <span>📞 {cvData.contact.phones.join(" / ")}</span>
          </div>
        </div>

        <div className="hero-avatar" aria-hidden="true">
          <div className="avatar-ring">
            <span className="avatar-initials">LM</span>
          </div>
        </div>
      </div>

      <div className="stats">
        {cvData.stats.map((s) => (
          <div key={s.label} className="stat">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </header>
  );
}

export default function App() {
  return (
    <div className="app">
      <NavBar />
      <Hero />

      <main className="main">
        <Section id="profile" title="Profile">
          <p className="paragraph">{cvData.profile}</p>
        </Section>

        <Section id="experience" title="Work Experience">
          <div className="timeline">
            {cvData.experience.map((job, i) => (
              <article key={i} className="job-card">
                <div className="job-dot" />
                <div className="job-header">
                  <h3 className="job-role">{job.role}</h3>
                  <p className="job-company">
                    {job.company}
                    {job.period ? <span className="job-period"> · {job.period}</span> : null}
                  </p>
                </div>
                <ul className="job-bullets">
                  {job.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
                {job.tags?.length ? (
                  <div className="job-tags">
                    {job.tags.map((t, k) => (
                      <Chip key={k} label={t} />
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <div className="projects-grid">
            {cvData.projects.map((proj, i) => (
              <a
                key={i}
                href={proj.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card"
              >
                <div className="project-header">
                  <h4>{proj.name}</h4>
                  <span className="project-arrow">↗</span>
                </div>
                <p className="project-desc">{proj.description}</p>
                <div className="project-tags">
                  {proj.tags.map((t, j) => (
                    <Chip key={j} label={t} />
                  ))}
                </div>
                <span className="project-url">
                  {proj.url.replace(/^https?:\/\//, "")}
                </span>
              </a>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="skills-grid">
            {cvData.skillGroups.map((group, i) => (
              <div key={i} className="skill-card">
                <h4>{group.title}</h4>
                <div className="chips">
                  {group.items.map((item, j) => (
                    <Chip key={j} label={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="education" title="Education">
          <div className="edu-grid">
            {cvData.education.map((edu, i) => (
              <div key={i} className="edu-card">
                <h4>{edu.title}</h4>
                <p>
                  {edu.school} <span>· {edu.year}</span>
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="awards" title="Awards">
          <ul className="awards">
            {cvData.awards.map((a, i) => (
              <li key={i}>
                <span className="trophy">🏆</span>
                <div>
                  <strong>{a.title}</strong>
                  <span className="muted"> — {a.year}</span>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="contact" title="References & Contact">
          <div className="contact-grid">
            {cvData.references.map((ref, i) => (
              <div key={i} className="ref-card">
                <h4>{ref.name}</h4>
                <p className="muted">{ref.relationship}</p>
                <a href={`tel:${ref.phone.replace(/\s/g, "")}`} className="ref-phone">
                  📞 {ref.phone}
                </a>
              </div>
            ))}

            <div className="ref-card ref-card-accent">
              <h4>Let's Work Together</h4>
              <p className="muted">Available for freelance & full-time opportunities.</p>
              <a href={`mailto:${cvData.contact.email}`} className="ref-phone">
                ✉ {cvData.contact.email}
              </a>
            </div>
          </div>
        </Section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} {cvData.name} — Built with React</p>
      </footer>
    </div>
  );
}