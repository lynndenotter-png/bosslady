import "./ModuleLayout.css";

export default function Mentoring({ plan, onBack }) {
  const isPremium = plan === "premium";

  return (
    <div className="module-wrapper">
      <button className="back-button" onClick={onBack}>
        ← Back to home
      </button>
      <h2 className="module-title">Mentoring & Network</h2>
      <p className="module-intro">
        Connect with a safe community, ask questions and join live sessions with female leaders.
      </p>

      {!isPremium && (
        <div className="locked-box">
          <p>
            This is a <strong>Premium</strong> feature. Upgrade to join the community,
            live masterclasses and mentoring Q&A.
          </p>
        </div>
      )}

      {isPremium && (
        <>
          <section className="module-section">
            <h3>Community space</h3>
            <p>Post questions, share wins and support other women in similar roles.</p>
          </section>

          <section className="module-section">
            <h3>Live masterclasses & Q&A</h3>
            <p>
              Weekly or monthly sessions with female leaders on negotiation, leadership,
              confidence and visibility.
            </p>
          </section>
        </>
      )}
    </div>
  );
}
