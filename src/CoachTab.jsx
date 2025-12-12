import "./ModuleLayout.css";
import SalaryCoach from "./SalaryCoach";

export default function CoachTab({ plan, onBack }) {
  const isPremium = plan === "premium";

  // If user is on a free plan → show locked screen
  if (!isPremium) {
    return (
      <div className="module-wrapper">
        <button className="back-button" onClick={onBack}>
          ← Back to home
        </button>
        <h2 className="module-title">Coach Tab</h2>
        <p className="module-intro">
          Chat with your AI career coach, get feedback on documents and practice roleplays.
        </p>

        <div className="locked-box">
          <p>
            The AI coach is a <strong>Premium</strong> feature.
            Upgrade to unlock AI-based career coaching, negotiation support and roleplay practice.
          </p>
        </div>
      </div>
    );
  }

  // If user is premium → show full SalaryCoach experience
  return <SalaryCoach />;
}
