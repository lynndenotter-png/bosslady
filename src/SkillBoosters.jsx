import "./ModuleLayout.css";

export default function SkillBoosters({ plan, onBack }) {
  const lessons = [
    "Salary negotiation basics (3–5 min)",
    "Personal branding for women in tech",
    "Leadership skills for emerging leaders",
    "Assertive communication at work",
    "Time management for ambitious women",
    "Overcoming imposter syndrome",
  ];

  return (
    <div className="module-wrapper">
      <button className="back-button" onClick={onBack}>
        ← Back to home
      </button>
      <h2 className="module-title">Skill Boosters</h2>
      <p className="module-intro">
        Short, focused micro-lessons designed to boost your career confidence in 3–5 minutes.
      </p>

      <ul className="module-list">
        {lessons.map((item) => (
          <li key={item} className="module-list-item">
            <span>{item}</span>
            <button className="secondary-button">Start</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
