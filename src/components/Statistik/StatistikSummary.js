import React from "react";

const colors = ["#4ecdc4", "#f7b32b", "#2a3d66", "#e63946"];

const StatistikSummary = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>Belum ada data statistik.</p>;
  }

  return (
    <div className="statistik-summary-row">
      {data.map((item, index) => (
        <div
          key={index}
          className={`statistik-summary-card ${item.label
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
          style={{
            background: colors[index % colors.length],
            color: "#fff",
            borderRadius: "12px",
            padding: "1.5rem 2.5rem",
            minWidth: "180px",
            boxShadow: "0 2px 8px rgba(44,62,80,0.10)",
            textAlign: "center",
            fontSize: "1.2rem",
            fontWeight: 600,
          }}
        >
          <div
            className="statistik-summary-value"
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              marginBottom: "0.3rem",
            }}
          >
            {item.value}
          </div>
          <div className="statistik-summary-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatistikSummary;
