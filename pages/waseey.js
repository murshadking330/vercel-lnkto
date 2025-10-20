import { useState, useEffect } from "react";

export default function SecretShortener() {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setCopied(false);

    const res = await fetch("/api/short-run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, slug, title, description, image }),
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
    } else {
      setShortUrl(`${window.location.origin}/${data.slug}`);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setCopied(false);

    const res = await fetch("/api/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, url, title, description, image }),
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
    } else {
      setShortUrl(`${window.location.origin}/${data.slug}`);
      setIsEditing(false);
    }
  };

  const handleCopy = async () => {
    if (shortUrl) {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={styles.page}>
      {/* 🌌 Night Sky */}
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      <div
        style={{
          ...styles.card,
          opacity: animate ? 1 : 0,
          transform: animate ? "scale(1)" : "scale(0.9)",
          transition: "all 0.8s ease",
        }}
      >
        <h1 style={styles.heading}>🌌 Secret URL Shortener</h1>

        {/* Form */}
        <form
          onSubmit={isEditing ? handleUpdate : handleSubmit}
          style={{ width: "100%" }}
        >
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
          <input
            type="text"
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            style={{ ...styles.input, resize: "none" }}
          />
          <input
            type="url"
            placeholder="Image URL (optional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={styles.input}
          />

          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.opacity = "0.85")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            {isEditing ? "Update URL" : "Shorten URL"}
          </button>
        </form>

        {error && <p style={styles.error}>⚠️ {error}</p>}

        {shortUrl && (
          <div style={styles.resultBox}>
            <p style={{ color: "#fff", marginBottom: "5px" }}>✅ Short URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.shortLink}
            >
              {shortUrl}
            </a>

            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              <button
                onClick={handleCopy}
                style={{
                  ...styles.copyButton,
                  backgroundColor: copied
                    ? "#4CAF50"
                    : "rgba(255,255,255,0.15)",
                }}
              >
                {copied ? "✔ Copied!" : "📋 Copy"}
              </button>

              <button
                onClick={() => setIsEditing(true)}
                style={{
                  ...styles.copyButton,
                  backgroundColor: "#2196F3",
                }}
              >
                ✏️ Edit
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ✨ Animation */}
      <style jsx global>{`
        body {
          margin: 0;
          overflow: hidden;
          background: radial-gradient(ellipse at bottom, #0d1b2a 0%, #000 100%);
        }
        .stars,
        .stars2,
        .stars3 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-repeat: repeat;
          background-size: contain;
          animation: animStar 200s linear infinite;
        }
        .stars {
          background-image: radial-gradient(2px 2px at 20px 20px, white, transparent),
            radial-gradient(1px 1px at 60px 80px, white, transparent),
            radial-gradient(2px 2px at 120px 200px, white, transparent),
            radial-gradient(1px 1px at 250px 100px, white, transparent);
          animation-duration: 100s;
        }
        .stars2 {
          background-image: radial-gradient(2px 2px at 50px 50px, #bbb, transparent),
            radial-gradient(1px 1px at 150px 150px, #ccc, transparent),
            radial-gradient(2px 2px at 250px 200px, #999, transparent);
          animation-duration: 160s;
        }
        .stars3 {
          background-image: radial-gradient(1px 1px at 80px 120px, #888, transparent),
            radial-gradient(1px 1px at 300px 80px, #aaa, transparent);
          animation-duration: 220s;
        }
        @keyframes animStar {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-2000px);
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
    position: "relative",
    overflow: "hidden",
    color: "#fff",
  },
  card: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(12px)",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
    width: "90%",
    maxWidth: "420px",
    textAlign: "center",
    zIndex: 2,
  },
  heading: {
    marginBottom: "25px",
    fontWeight: "700",
    fontSize: "1.5rem",
  },
  input: {
    width: "100%",
    padding: "10px 15px",
    marginBottom: "10px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    transition: "opacity 0.3s ease",
  },
  error: {
    color: "#ffbaba",
    marginTop: "10px",
  },
  resultBox: {
    marginTop: "20px",
    background: "rgba(255,255,255,0.1)",
    padding: "10px 15px",
    borderRadius: "10px",
  },
  shortLink: {
    color: "#4fc3f7",
    textDecoration: "underline",
    fontWeight: "600",
    display: "block",
    marginBottom: "10px",
    wordWrap: "break-word",
  },
  copyButton: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
};
