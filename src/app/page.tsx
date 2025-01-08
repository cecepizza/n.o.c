"use client";

import React from "react";
import RandomRoam from "./RandomRoam";
import ProbabilityRoam from "./ProbabilityRoam";
import PaintSplatter from "./PaintSplatter";
import "./styles.css";

const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "stretch",
  height: "50vh",
  padding: "5px",
  boxSizing: "border-box",
  backgroundColor: "#e0e0e0",
};

const titleStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#444",
  fontFamily: "'Roboto', sans-serif",
};

const App: React.FC = () => {
  return (
    <div style={containerStyle}>
      <div className="card">
        <h2 style={titleStyle}>Random Roam</h2>
        <RandomRoam />
      </div>
      <div className="card">
        <h2 style={titleStyle}>Probability Roam</h2>
        <ProbabilityRoam />
      </div>
      <div className="card">
        <h2 style={titleStyle}>Paint Splatter</h2>
        <PaintSplatter />
      </div>
    </div>
  );
};

export default App;
