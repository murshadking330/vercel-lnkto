import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, slug }),
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
    } else {
      setShortUrl(`${window.location.origin}/${data.slug}`);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 40%, #fbc2eb 100%)",
        color: "#333",
        textAlign: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.8)",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>🔗 URL Shortener</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="Enter your URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            style={{
              padding: "10px",
              width: "100%",
              marginBottom: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
          <input
            type="text"
            placeholder="Custom slug (optional)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            style={{
              padding: "10px",
              width: "100%",
              marginBottom: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              background:
                "linear-gradient(90deg, #667eea, #764ba2, #ff758c, #ff7eb3)",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
              width: "100%",
              transition: "opacity 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.opacity = "0.85")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            Shorten
          </button>
        </form>
        {error && <p style={{ color: "red", marginTop: "10px" }}>⚠️ {error}</p>}
        {shortUrl && (
          <p style={{ marginTop: "15px" }}>
            ✅ Short URL:{" "}
            <a href={shortUrl} style={{ color: "#0070f3" }}>
              {shortUrl}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
