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
    <div style={{ fontFamily: "sans-serif", padding: "30px" }}>
      <h1>🔗 vercel-lnkto (URL Shortener)</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter your URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
        />
        <br />
        <input
          type="text"
          placeholder="Custom slug (optional)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
        />
        <br />
        <button type="submit" style={{ padding: "10px" }}>
          Shorten
        </button>
      </form>
      {error && <p style={{ color: "red" }}>⚠️ {error}</p>}
      {shortUrl && (
        <p>
          ✅ Short URL: <a href={shortUrl}>{shortUrl}</a>
        </p>
      )}
    </div>
  );
}