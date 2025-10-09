import { useEffect, useState } from "react";

export default function StatsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setData(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        fontFamily: "'Poppins', sans-serif",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      <h1 style={{ fontWeight: "700", marginBottom: "20px" }}>📊 Link Analytics</h1>

      {loading ? (
        <p>Loading data...</p>
      ) : data.length === 0 ? (
        <p>No short links found yet 😅</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            width: "100%",
            maxWidth: "900px",
          }}
        >
          {data.map((item, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: "14px",
                padding: "20px",
                backdropFilter: "blur(10px)",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                transition: "transform 0.2s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <p style={{ fontWeight: "600", color: "#ffeb3b" }}>
                {window.location.origin}/{item.slug}
              </p>
              <p style={{ fontSize: "14px", opacity: 0.9 }}>{item.url}</p>
              <p style={{ marginTop: "8px" }}>🔥 Clicks: <b>{item.clicks}</b></p>
              {item.title && (
                <p style={{ marginTop: "4px", opacity: 0.8 }}>
                  🏷️ {item.title}
                </p>
              )}
              {item.description && (
                <p style={{ fontSize: "13px", opacity: 0.7 }}>
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
