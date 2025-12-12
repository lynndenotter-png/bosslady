import "./ModuleLayout.css";

export default function CareerJournal({ plan, onBack }) {
  return (
    <div className="module-wrapper">
      <button className="back-button" onClick={onBack}>
        ← Back to home
      </button>
      <h2 className="module-title">Career Journal & Dashboard</h2>
      <p className="module-intro">
        A simple space to capture your goals, wins and weekly reflections so you never downplay your impact again.
      </p>

      <section className="module-section">
        <h3>Goals</h3>
        <p>Define your short-term and long-term career goals.</p>
      </section>

      <section className="module-section">
        <h3>Wins</h3>
        <p>Log your achievements so you can use them in performance reviews and salary talks.</p>
      </section>

      <section className="module-section">
        <h3>Weekly reflections</h3>
        <p>Reflect on what went well, what was challenging and what you want to try next week.</p>
      </section>
    </div>
  );
}
