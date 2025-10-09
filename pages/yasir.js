import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url,
        slug,
        title,
        description,
        image,
      }),
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
      <h1>🔗 vercel-Inkto (URL Shortener)</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
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
          }}
        />

        {/* New Inputs */}
        <input
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            marginBottom: "10px",
          }}
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          style={{
            padding: "10px",
            width: "100%",
            marginBottom: "10px",
          }}
        />

        <input
          type="url"
          placeholder="Image URL (for social preview)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            marginBottom: "15px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Shorten
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "10px" }}>⚠️ {error}</p>}
      {shortUrl && (
        <p style={{ marginTop: "15px" }}>
          ✅ Short URL:{" "}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}
