import "./ModuleLayout.css";

export default function Mentors({ plan, onBack }) {
  const isPremium = plan === "premium";

  return (
    <div className="module-wrapper">
      <button className="back-button" onClick={onBack}>
        ← Back to home
      </button>
      <h2 className="module-title">Mentor Matches</h2>
      <p className="module-intro">
        Swipe through mentor profiles based on your goals, industry and personality.
      </p>

      {!isPremium && (
        <div className="locked-box">
          <p>
            Mentor matching is a <strong>Premium</strong> feature.
          </p>
        </div>
      )}

      {isPremium && (
        <>
          <section className="module-section">
            <h3>Swipe for matches</h3>
            <p>See suggested mentors and swipe right to connect.</p>
          </section>

          <section className="module-section">
            <h3>Chat & scheduling</h3>
            <p>Message mentors and schedule sessions that fit both your calendars.</p>
          </section>
        </>
      )}
    </div>
  );
}
