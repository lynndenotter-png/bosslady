import { useState, useEffect } from "react";
import "./Home.css";

export default function Home({ plan, onNavigate }) {
  const [quote, setQuote] = useState("");
  const [challenge, setChallenge] = useState("");

  const quotes = [
    "You are capable of more than you think.",
    "Soft power can be your strongest advantage.",
    "Every small step builds your empire.",
    "Own your worth — always.",
  ];

  const challenges = [
    "Write down 3 wins from this week.",
    "Ask clearly for what you need at least once today.",
    "Take 5 minutes to define your boundaries for today.",
    "Send one message to someone who can support your growth.",
  ];

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setChallenge(challenges[Math.floor(Math.random() * challenges.length)]);
  }, []);

  const modules = [
    {
      id: "skillBoosters",
      title: "Skill Boosters",
      description: "3–5 minute micro-lessons on negotiation, leadership, branding and more.",
      tag: "Free + Premium",
    },
    {
      id: "mentoring",
      title: "Mentoring & Network",
      description: "Safe community, Q&A and live masterclasses with female leaders.",
      tag: "Premium",
    },
    {
      id: "salaryBooster",
      title: "Salary Booster",
      description: "Salary benchmarks, AI negotiation scripts and comparisons.",
      tag: "Premium",
    },
    {
      id: "careerJournal",
      title: "Career Journal & Dashboard",
      description: "Track your goals, wins and weekly reflections.",
      tag: "Free + Premium",
    },
    {
      id: "coachTab",
      title: "Coach Tab",
      description: "AI career coaching, document feedback and roleplay practice.",
      tag: "Premium",
    },
    {
      id: "mentors",
      title: "Mentor Matches",
      description: "Swipe for mentor matches, chat and schedule sessions.",
      tag: "Premium",
    },
  ];

  return (
    <main className="app-main home-main">
      {/* INTRO – dezelfde stijl als jouw onboarding intro */}
      <section className="home-intro-centered">
  <h2>Welcome back, Bosslady</h2>
  <p>
    Your personal hub for growth, clarity and confidence.
  </p>
</section>


      {/* DAILY + QUOTE in één grote kaart, zelfde look als onboarding-card */}
      <section className="onboarding-card home-top-card">
        <div className="home-top-columns">
          <div className="home-section-block">
            <h3>✨ Daily Challenge</h3>
            <p className="home-text">{challenge}</p>
          </div>
          <div className="home-section-block">
            <h3>💬 Quote of Empowerment</h3>
            <p className="quote">“{quote}”</p>
          </div>
        </div>
      </section>

      {/* MODULE OVERVIEW – kaarten in dezelfde stijl als je app */}
      <section className="onboarding-card home-modules-card">
        <h3>Your BOSSLADY modules</h3>
        <p className="home-text">
          Explore the tools that help you grow your skills, salary and visibility.
        </p>

        <div className="modules-grid">
          {modules.map((mod) => (
            <button
              key={mod.id}
              className="module-card"
              onClick={() => onNavigate(mod.id)}
            >
              <div className="module-header">
                <h4>{mod.title}</h4>
                <span className="module-tag">{mod.tag}</span>
              </div>
              <p className="module-description">{mod.description}</p>
              <span className="module-link">Open module →</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
