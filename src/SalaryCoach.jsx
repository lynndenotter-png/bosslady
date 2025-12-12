import { useState } from "react";
import "./App.css";

/* CHAT SCREEN WITH REAL AI */
function ChatScreen({ name, goal, formData }) {
  const displayName = name || "powerwoman";

  const goalTextMap = {
    salary: "a better salary",
    promotion: "a promotion",
    switch: "a career switch",
    confidence: "more confidence and visibility",
    other: formData?.customGoal || "a custom goal",
  };

  // Additional salary context for the system prompt
  const salaryContext =
    goal === "salary"
      ? `The user wants to negotiate her salary.
Current salary: ${formData?.currentSalary || "unknown"}.
Target salary: ${formData?.targetSalary || "unknown"}.
Role: ${formData?.role || "unknown"}.
Years in current role: ${formData?.experienceYears || "unknown"} years.`
      : "No specific salary context available.";

  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "coach",
      text: `Hey ${displayName}, great to see you here. Let’s explore ${
        goalTextMap[goal] || "your next career move"
      } together 💪`,
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSend(event) {
    event.preventDefault();
    setErrorMsg("");

    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      from: "user",
      text: input.trim(),
    };

    // show user message immediately
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // AI messages format
    const apiMessages = [
      {
        role: "system",
        content: `
You are BossLady — a warm, premium, high-end AI career coach for ambitious women.
You are supportive, clear, emotionally intelligent, and gently encouraging.
You are soft in tone but professional in guidance. You validate feelings without becoming therapeutic or spiritual.

Tone guidelines:
Speak in plain text only. No markdown formatting. No bold or italics.
Use short, clear, intentional sentences.
If a user shares something emotional, respond with grounded kindness.
Avoid hype, clichés, or over-cheerful language.
Do not use lists unless the user specifically asks.
Use emojis only when subtle and aligned.

You avoid:
therapy-like interpretations,
spiritual concepts,
or anything overly heavy.

Your coaching role:
Help women with negotiation, confidence, promotions, visibility, and career transitions.
Offer grounded clarity, calm encouragement, and meaningful next steps.

Additional context:
${salaryContext}

End each response with one gentle, simple follow-up question that helps her go one step deeper.
        `.trim(),
      },

      ...messages.map((m) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text,
      })),

      {
        role: "user",
        content: userMessage.text,
      },
    ];

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();

      if (data.error) {
        console.error("Backend error:", data.error);
        setErrorMsg("Server error: " + data.error);
        return;
      }

      const coachReply = {
        id: Date.now() + 1,
        from: "coach",
        text: data.reply || "Your coach didn't respond.",
      };

      setMessages((prev) => [...prev, coachReply]);
    } catch (error) {
      console.error(error);
      setErrorMsg(
        "Something went wrong while fetching the answer. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Your Coach</h2>
        <p>
          You’re now chatting with your personal career coach. This coach runs
          on real AI and is still in an early version. Feel free to experiment
          with different questions.
        </p>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              "chat-message " +
              (message.from === "user"
                ? "chat-message-user"
                : "chat-message-coach")
            }
          >
            <div className="chat-bubble">{message.text}</div>
          </div>
        ))}

        {loading && (
          <div className="chat-message chat-message-coach">
            <div className="chat-bubble">Your coach is thinking…</div>
          </div>
        )}
      </div>

      {errorMsg && (
        <p style={{ color: "#c0392b", fontSize: "0.85rem" }}>{errorMsg}</p>
      )}

      <form className="chat-input-row" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type your question or thought here…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="primary-btn chat-send-btn"
          disabled={loading}
        >
          {loading ? "…" : "Send"}
        </button>
      </form>
    </div>
  );
}

/* MAIN APP WITH ONBOARDING + CHAT */
function SalaryCoach() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    goal: "",
    currentSalary: "",
    targetSalary: "",
    experienceYears: "",
    customGoal: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState("onboarding");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.goal) {
      alert("Please choose your main career goal.");
      return;
    }

    if (formData.goal === "other" && !formData.customGoal.trim()) {
      alert("Please describe your goal.");
      return;
    }

    setSubmitted(true);
  }

  function goToChat() {
    setStep("chat");
  }

  return (
    <div className="app">
      {/* HEADER */}
      <header className="app-header">
        <div className="logo-circle">BL</div>
        <div>
          <h1 className="app-title">BossLady</h1>
          <div className="header-badge">
            Empowering women to lead their careers
          </div>
          <p className="app-slogan">Lead your career. Own your worth.</p>
        </div>
      </header>

      {/* MAIN CONTENT */}
      {step === "onboarding" ? (
        <main className="app-main">
          <section className="intro">
            <h2>Unlock your next career move</h2>
            <p>
              BossLady helps you gain confidence in your career, negotiate
              better offers, and set clear goals. Fill in the form to receive
              your first personalized mini insight into your main career goal.
            </p>
          </section>

          <section className="onboarding-card">
            <h3>Start your journey</h3>
            <p className="onboarding-text">
              Tell us a bit about yourself so we can better support you.
            </p>

            <form className="onboarding-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. Lynn"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Current role / job title</label>
                <input
                  id="role"
                  name="role"
                  type="text"
                  placeholder="e.g. Marketing specialist"
                  value={formData.role}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* GOAL CHIPS */}
              <div className="form-group">
                <label>Your main career goal</label>

                <div className="goal-chip-container">
                  <button
                    type="button"
                    className={
                      "goal-chip " +
                      (formData.goal === "salary" ? "active" : "")
                    }
                    onClick={() =>
                      setFormData((p) => ({ ...p, goal: "salary" }))
                    }
                  >
                    💸 Better salary
                  </button>

                  <button
                    type="button"
                    className={
                      "goal-chip " +
                      (formData.goal === "promotion" ? "active" : "")
                    }
                    onClick={() =>
                      setFormData((p) => ({ ...p, goal: "promotion" }))
                    }
                  >
                    📈 Promotion
                  </button>

                  <button
                    type="button"
                    className={
                      "goal-chip " +
                      (formData.goal === "switch" ? "active" : "")
                    }
                    onClick={() =>
                      setFormData((p) => ({ ...p, goal: "switch" }))
                    }
                  >
                    🔄 Career switch
                  </button>

                  <button
                    type="button"
                    className={
                      "goal-chip " +
                      (formData.goal === "confidence" ? "active" : "")
                    }
                    onClick={() =>
                      setFormData((p) => ({ ...p, goal: "confidence" }))
                    }
                  >
                    ✨ Confidence & visibility
                  </button>

                  <button
                    type="button"
                    className={
                      "goal-chip " +
                      (formData.goal === "other" ? "active" : "")
                    }
                    onClick={() =>
                      setFormData((p) => ({
                        ...p,
                        goal: "other",
                        customGoal: "",
                      }))
                    }
                  >
                    📝 Something else
                  </button>
                </div>

                {formData.goal === "other" && (
                  <div className="form-group" style={{ marginTop: "10px" }}>
                    <label htmlFor="customGoal">Describe your goal</label>
                    <input
                      id="customGoal"
                      name="customGoal"
                      type="text"
                      placeholder="e.g. Start my own business, change industries…"
                      value={formData.customGoal}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>

              {/* EXTRA SALARY FIELDS */}
              {formData.goal === "salary" && (
                <>
                  <div className="form-group">
                    <label htmlFor="currentSalary">
                      Current monthly salary
                    </label>
                    <input
                      id="currentSalary"
                      name="currentSalary"
                      type="number"
                      placeholder="e.g. 2600"
                      value={formData.currentSalary}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="targetSalary">
                      Desired monthly salary
                    </label>
                    <input
                      id="targetSalary"
                      name="targetSalary"
                      type="number"
                      placeholder="e.g. 3000"
                      value={formData.targetSalary}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="experienceYears">
                      Years in current role
                    </label>
                    <input
                      id="experienceYears"
                      name="experienceYears"
                      type="number"
                      placeholder="e.g. 2"
                      value={formData.experienceYears}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              <button type="submit" className="primary-btn">
                Generate my mini insight
              </button>
            </form>

            {submitted && (
              <>
                <div className="result-card">
                  <h4>Your first BossLady insight</h4>
                  <p>
                    {formData.name ? `Hey ${formData.name}, ` : "Hey powerwoman, "}
                    great that you're working on your next step as{" "}
                    {formData.role || "a professional"}. If your main focus is{" "}
                    {formData.goal === "salary" && "getting a better salary, "}
                    {formData.goal === "promotion" && "getting a promotion, "}
                    {formData.goal === "switch" && "making a career switch, "}
                    {formData.goal === "confidence" &&
                      "building more confidence and visibility, "}
                    {formData.goal === "other" &&
                      `working on: ${formData.customGoal || "your unique goal"}, `}
                    the first step is getting clear on your value and where you
                    want to grow. In the next step, your personal coach will help
                    you explore this further.
                  </p>
                </div>

                <button className="secondary-btn" onClick={goToChat}>
                  Chat with your coach
                </button>
              </>
            )}
          </section>
        </main>
      ) : (
        <main className="chat-main">
          <ChatScreen
            name={formData.name}
            goal={formData.goal}
            formData={formData}
          />
        </main>
      )}

      <footer className="app-footer">
        <p>
          © {new Date().getFullYear()} BossLady · Made for ambitious women
        </p>
      </footer>
    </div>
  );
}

export default SalaryCoach;
