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
    <div style={styles.wrapper}>
      {/* Animated Starry Background */}
      <div style={styles.stars}></div>
      <div style={styles.stars2}></div>
      <div style={styles.stars3}></div>

      {/* Content */}
      <div style={styles.container}>
        <h1 style={styles.title}>🌌 Night Sky URL Shortener</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="Enter your URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Custom slug (optional)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Shorten URL
          </button>
        </form>

        {error && <p style={styles.error}>⚠️ {error}</p>}

        {shortUrl && (
          <p style={styles.shortUrl}>
            ✅ Short URL:{" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={styles.link}>
              {shortUrl}
            </a>
          </p>
        )}
      </div>

      <style jsx global>{`
        @keyframes moveStars {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-2000px);
          }
        }

        body {
          margin: 0;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

const styles = {
  wrapper: {
    position: "relative",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontFamily: "'Poppins', sans-serif",
  },
  stars: {
    position: "absolute",
    width: "2px",
    height: "2px",
    background: "transparent",
    boxShadow: Array(200)
      .fill()
      .map(
        () =>
          `${Math.random() * window.innerWidth}px ${
            Math.random() * window.innerHeight
          }px #fff`
      )
      .join(","),
    animation: "moveStars 100s linear infinite",
  },
  stars2: {
    position: "absolute",
    width: "3px",
    height: "3px",
    background: "transparent",
    boxShadow: Array(150)
      .fill()
      .map(
        () =>
          `${Math.random() * window.innerWidth}px ${
            Math.random() * window.innerHeight
          }px #ddd`
      )
      .join(","),
    animation: "moveStars 160s linear infinite",
  },
  stars3: {
    position: "absolute",
    width: "1px",
    height: "1px",
    background: "transparent",
    boxShadow: Array(250)
      .fill()
      .map(
        () =>
          `${Math.random() * window.innerWidth}px ${
            Math.random() * window.innerHeight
          }px #aaa`
      )
      .join(","),
    animation: "moveStars 220s linear infinite",
  },
  container: {
    position: "relative",
    background: "rgba(0,0,0,0.6)",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 0 20px rgba(255,255,255,0.2)",
    width: "90%",
    maxWidth: "400px",
    zIndex: 2,
    textAlign: "center",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "linear-gradient(90deg, #667eea, #764ba2)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    transition: "opacity 0.3s ease",
  },
  error: {
    color: "#ff7b7b",
    marginTop: "10px",
  },
  shortUrl: {
    marginTop: "15px",
  },
  link: {
    color: "#4fc3f7",
    textDecoration: "underline",
  },
};
