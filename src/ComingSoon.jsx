export default function ComingSoon() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #F6F0EA 0%, #FFFFFF 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #C4798B, #E7B6C8)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontWeight: "700",
          fontSize: "1.2rem",
          letterSpacing: "0.1em",
          marginBottom: "22px",
          fontFamily: "Playfair Display, serif",
        }}
      >
        BL
      </div>

      <h1
        style={{
          fontSize: "2.2rem",
          margin: "0",
          color: "#4A3F3F",
          letterSpacing: "0.05em",
          fontFamily: "Playfair Display, serif",
        }}
      >
        BossLady
      </h1>

      <p
        style={{
          marginTop: "10px",
          fontSize: "1.05rem",
          color: "#7a6a6a",
        }}
      >
        Lead your career. Own your worth.
      </p>

      <p
        style={{
          marginTop: "24px",
          fontSize: "1rem",
          color: "#7a6a6a",
          maxWidth: "360px",
          lineHeight: "1.6",
        }}
      >
        We’re crafting a new way for ambitious women to grow their careers
        through coaching, mentorship, confidence-building and personalized
        guidance.
      </p>

      <p
        style={{
          marginTop: "12px",
          fontSize: "0.9rem",
          color: "#C4798B",
        }}
      >
        Launching soon ✨
      </p>

      <input
        type="email"
        placeholder="Leave your email for early access"
        style={{
          marginTop: "24px",
          padding: "12px 16px",
          borderRadius: "999px",
          border: "1px solid #E7B6C8",
          width: "260px",
          fontFamily: "inherit",
        }}
      />

      <button
        style={{
          marginTop: "14px",
          padding: "10px 24px",
          background: "linear-gradient(135deg, #C4798B, #E7B6C8)",
          borderRadius: "999px",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontWeight: "600",
          fontFamily: "inherit",
          boxShadow: "0 6px 16px rgba(196, 141, 150, 0.3)",
        }}
      >
        Notify Me
      </button>
    </div>
  );
}
