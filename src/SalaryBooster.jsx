import "./ModuleLayout.css";

export default function SalaryBooster({ plan, onBack }) {
  const isPremium = plan === "premium";

  return (
    <div className="module-wrapper">
      <button className="back-button" onClick={onBack}>
        ← Back to home
      </button>
      <h2 className="module-title">Salary Booster</h2>
      <p className="module-intro">
        Get clarity on your market value and practice your negotiation with AI.
      </p>

      {!isPremium && (
        <div className="locked-box">
          <p>
            This module is part of the <strong>Premium</strong> plan. Upgrade to access
            salary benchmarks and AI negotiation scripts.
          </p>
        </div>
      )}

      {isPremium && (
        <>
          <section className="module-section">
            <h3>Salary benchmark</h3>
            <p>Compare your current salary to typical ranges in your sector and level.</p>
          </section>

          <section className="module-section">
            <h3>AI negotiation script</h3>
            <p>
              Generate a customized script based on your role, experience and current offer.
            </p>
          </section>

          <section className="module-section">
            <h3>Compare with similar roles</h3>
            <p>
              See how other women in similar positions are paid and where there is room to grow.
            </p>
          </section>
        </>
      )}
    </div>
  );
}
