"use client";

import React from "react";
import RandomRoam from "./RandomRoam";
import ProbabilityRoam from "./ProbabilityRoam";

const containerStyle: React.CSSProperties = {
  display: "flex",
  //   justifyContent: "space-between",
  alignItems: "stretch",
  height: "50vh",
  padding: "5px",
  //   boxSizing: "border-box",
  backgroundColor: "#f0f0f0",
};

const cardStyle: React.CSSProperties = {
  flex: 1,
  margin: "10px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  //   padding: "10px",
  //   boxSizing: "border-box",
  overflow: "auto",
  backgroundColor: "#fff",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s",
};

const titleStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#333",
};

const App: React.FC = () => {
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Random Roam</h2>
        <RandomRoam />
      </div>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Probability Roam</h2>
        <ProbabilityRoam />
      </div>
    </div>
  );
};

export default App;
