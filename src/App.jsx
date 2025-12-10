import { useState } from "react";
import "./App.css";

/* CHAT-SCHERM MET ECHTE AI */
function ChatScreen({ name, goal, formData }) {
  const displayName = name || "powerwoman";

  const goalTextMap = {
    salary: "een beter salaris",
    promotion: "een promotie",
    switch: "een carrièreswitch",
    confidence: "meer zelfvertrouwen en zichtbaarheid",
  };

  // extra context voor salaris-doel
  const salaryContext =
    goal === "salary"
      ? `De gebruiker wil onderhandelen over salaris.
Huidig salaris: ${formData?.currentSalary || "onbekend"}.
Gewenst salaris: ${formData?.targetSalary || "onbekend"}.
Rol: ${formData?.role || "onbekend"}.
Ervaring in huidige rol: ${formData?.experienceYears || "onbekend"} jaar.`
      : "Geen specifieke salariscontext beschikbaar.";

  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "coach",
      text: `Hey ${displayName}, goed dat je er bent. Laten we samen kijken naar ${
        goalTextMap[goal] || "jouw volgende stap"
      } 💪`,
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

    // eerst je eigen bericht laten zien
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // berichten vertalen naar OpenAI-formaat
    const apiMessages = [
      {
        role: "system",
        content: `
Je bent een warme maar directe carrièrecoach voor vrouwen, gespecialiseerd in:
- salarisonderhandelingen
- promoties en leiderschap
- carrièreswitches
- zelfvertrouwen en zichtbaarheid op het werk

Extra context:
${salaryContext}

Stijl:
- Schrijf in het Nederlands.
- Spreek de gebruiker aan als "je".
- Klink eerlijk, bemoedigend en praktisch.
- Geen vage praat, maar concrete tips en stappen.

Regels voor je antwoorden:
- Begin met 1 korte zin waarin je haar keuze of gevoel bevestigt.
- Geef daarna 3–5 concrete tips of stappen in een duidelijk lijstje.
- Houd je antwoord kort (maximaal een paar alinea’s).
- Stel aan het einde 1 simpele vervolgvraag om haar verder te helpen.
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) {
        throw new Error("Serverfout");
      }

      const data = await response.json();

      if (data.error) {
        console.error("Backend error:", data.error, data.details || "");
        setErrorMsg(
          `Serverfout: ${data.error}${
            data.details ? " – " + data.details : ""
          }`
        );
        return;
      }

      const coachReply = {
        id: Date.now() + 1,
        from: "coach",
        text: data.reply || "Er kwam geen antwoord terug van de coach.",
      };

      setMessages((prev) => [...prev, coachReply]);
    } catch (error) {
      console.error(error);
      setErrorMsg(
        "Er ging iets mis bij het ophalen van het antwoord. Probeer het later nog eens."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Jouw coach</h2>
        <p>
          Je chat nu met je persoonlijke carrièrecoach. Deze coach draait op
          echte AI, maar is nog in een vroege versie. Experimenteer gerust met
          verschillende vragen.
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
            <div className="chat-bubble">De coach is aan het nadenken…</div>
          </div>
        )}
      </div>

      {errorMsg && (
        <p style={{ color: "#c0392b", fontSize: "0.85rem" }}>{errorMsg}</p>
      )}

      <form className="chat-input-row" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Typ je vraag of gedachte hier…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="primary-btn chat-send-btn"
          disabled={loading}
        >
          {loading ? "..." : "Verstuur"}
        </button>
      </form>
    </div>
  );
}

/* HOOFD-APP MET ONBOARDING + CHAT */
function App() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    goal: "",
    currentSalary: "",
    targetSalary: "",
    experienceYears: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState("onboarding"); // 'onboarding' of 'chat'

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
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
      Empowering Women to Lead Their Careers
    </div>

    <p className="app-slogan">
      Lead your career. Own your worth.
    </p>
  </div>
</header>


      {/* MAIN CONTENT */}
      {step === "onboarding" ? (
        <main className="app-main">
          <section className="intro">
            <h2>Ontgrendel je volgende carrièrestap</h2>
            <p>
              BossLady helpt je om zelfverzekerder te worden in je carrière,
              betere salarisonderhandelingen te voeren en duidelijke doelen te
              stellen. Vul het formulier in en ontvang een eerste, persoonlijke
              mini-scan van jouw carrièredoel.
            </p>
          </section>

          {/* FORMULIER */}
          <section className="onboarding-card">
            <h3>Start jouw journey</h3>
            <p className="onboarding-text">
              Vertel iets over jezelf zodat we je beter kunnen helpen.
            </p>

            <form className="onboarding-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Naam</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Bijv. Lisa"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Huidige rol / functie</label>
                <input
                  id="role"
                  name="role"
                  type="text"
                  placeholder="Bijv. Marketing specialist"
                  value={formData.role}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="goal">Grootste carrièredoel</label>
                <select
                  id="goal"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  required
                >
                  <option value="">Maak een keuze…</option>
                  <option value="salary">
                    Beter salaris (salarisverhoging / aanbieding)
                  </option>
                  <option value="promotion">Promotie / leiderschapsrol</option>
                  <option value="switch">
                    Career switch naar andere baan
                  </option>
                  <option value="confidence">
                    Meer zelfvertrouwen & zichtbaarheid
                  </option>
                </select>
              </div>

              {/* EXTRA VELDEN VOOR SALARIS – ALLEEN ZICHTBAAR BIJ 'BETER SALARIS' */}
              {formData.goal === "salary" && (
                <>
                  <div className="form-group">
                    <label htmlFor="currentSalary">
                      Huidig bruto maandsalaris (ongeveer)
                    </label>
                    <input
                      id="currentSalary"
                      name="currentSalary"
                      type="number"
                      placeholder="Bijv. 2600"
                      value={formData.currentSalary}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="targetSalary">
                      Gewenst bruto maandsalaris
                    </label>
                    <input
                      id="targetSalary"
                      name="targetSalary"
                      type="number"
                      placeholder="Bijv. 3000"
                      value={formData.targetSalary}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="experienceYears">
                      Hoeveel jaar in je huidige rol?
                    </label>
                    <input
                      id="experienceYears"
                      name="experienceYears"
                      type="number"
                      placeholder="Bijv. 2"
                      value={formData.experienceYears}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              <button type="submit" className="primary-btn">
                Maak mijn mini-scan
              </button>
            </form>

            {submitted && (
              <>
                <div className="result-card">
                  <h4>Jouw eerste BossLady-insight</h4>
                  <p>
                    {formData.name
                      ? `Hey ${formData.name}, `
                      : "Hey powerwoman, "}
                    goed dat je bezig bent met je volgende stap als{" "}
                    {formData.role || "professional"}. Als jouw focus ligt op{" "}
                    {formData.goal === "salary" && "een beter salaris,"}
                    {formData.goal === "promotion" && "een promotie,"}
                    {formData.goal === "switch" &&
                      "een switch naar een andere baan,"}
                    {formData.goal === "confidence" &&
                      "meer zelfvertrouwen en zichtbaarheid,"}
                    {formData.goal === "" && "je carrière,"} dan is de eerste
                    stap: helder krijgen wat jij waard bent en waar je precies
                    naartoe wilt. In de volgende stap kun je hierover chatten
                    met jouw persoonlijke coach.
                  </p>
                </div>

                <button className="secondary-btn" onClick={goToChat}>
                  Praat met je coach
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
        <p>© {new Date().getFullYear()} BossLady · Made for ambitious women</p>
      </footer>
    </div>
  );
}

export default App;
