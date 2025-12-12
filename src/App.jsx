import { useState } from "react";
import "./App.css";
import Home from "./Home";
import SkillBoosters from "./SkillBoosters";
import Mentoring from "./Mentoring";
import SalaryBooster from "./SalaryBooster";
import CareerJournal from "./CareerJournal";
import CoachTab from "./CoachTab";
import Mentors from "./Mentors";

function App() {
  const [screen, setScreen] = useState("home");
  const [plan, setPlan] = useState("free"); // "free" or "premium"

  const navigate = (nextScreen) => {
    setScreen(nextScreen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-root">
      {/* TOP HEADER */}
      <header className="app-header">
        <h1 className="app-logo">BOSSLADY</h1>
        <div className="app-plan">
          <span>Plan: {plan === "free" ? "Free" : "Premium"}</span>
          <button
            className="plan-toggle"
            onClick={() =>
              setPlan((prev) => (prev === "free" ? "premium" : "free"))
            }
          >
            Switch to {plan === "free" ? "Premium" : "Free"}
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="app-content">
        {screen === "home" && <Home plan={plan} onNavigate={navigate} />}

        {screen === "skillBoosters" && (
          <SkillBoosters plan={plan} onBack={() => navigate("home")} />
        )}

        {screen === "mentoring" && (
          <Mentoring plan={plan} onBack={() => navigate("home")} />
        )}

        {screen === "salaryBooster" && (
          <SalaryBooster plan={plan} onBack={() => navigate("home")} />
        )}

        {screen === "careerJournal" && (
          <CareerJournal plan={plan} onBack={() => navigate("home")} />
        )}

        {screen === "coachTab" && (
          <CoachTab plan={plan} onBack={() => navigate("home")} />
        )}

        {screen === "mentors" && (
          <Mentors plan={plan} onBack={() => navigate("home")} />
        )}
      </div>

      {/* STICKY BOTTOM NAVIGATION */}
      <nav className="bottom-nav">
        <div className="bottom-nav-inner">
          <button
            className={
              "bottom-nav-item " + (screen === "home" ? "active" : "")
            }
            onClick={() => navigate("home")}
          >
            <span className="bottom-nav-icon">🏠</span>
            <span className="bottom-nav-label">Home</span>
          </button>

          <button
            className={
              "bottom-nav-item " + (screen === "skillBoosters" ? "active" : "")
            }
            onClick={() => navigate("skillBoosters")}
          >
            <span className="bottom-nav-icon">📚</span>
            <span className="bottom-nav-label">Skills</span>
          </button>

          <button
            className={
              "bottom-nav-item " + (screen === "coachTab" ? "active" : "")
            }
            onClick={() => navigate("coachTab")}
          >
            <span className="bottom-nav-icon">💬</span>
            <span className="bottom-nav-label">Coach</span>
          </button>

          <button
            className={
              "bottom-nav-item " + (screen === "careerJournal" ? "active" : "")
            }
            onClick={() => navigate("careerJournal")}
          >
            <span className="bottom-nav-icon">📝</span>
            <span className="bottom-nav-label">Journal</span>
          </button>

          <button
            className={
              "bottom-nav-item " + (screen === "mentors" ? "active" : "")
            }
            onClick={() => navigate("mentors")}
          >
            <span className="bottom-nav-icon">⭐</span>
            <span className="bottom-nav-label">Mentors</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default App;
