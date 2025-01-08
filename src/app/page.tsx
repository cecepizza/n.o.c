"use client";

import React from "react";
import Sketch from "react-p5";
import p5Types from "p5"; // Import this for type definitions

class Roamer {
  constructor(private p5: p5Types) {
    this.x = p5.width / 2;
    this.y = p5.height / 2;
  }
  x: number;
  y: number;

  draw() {
    this.p5.stroke(0);
    this.p5.strokeWeight(2); // Increase point size to 5 pixels
    this.p5.point(this.x, this.y);
  }

  wanderer() {
    const decide = this.p5.floor(this.p5.random(36));
    if (decide >= 0 && decide < 6) {
      this.x++;
    } else if (decide >= 6 && decide < 12) {
      this.x--;
    } else if (decide >= 12 && decide < 18) {
      this.y++;
    } else if (decide >= 18 && decide < 24) {
      this.y--;
    } else if (decide >= 24 && decide < 30) {
      this.x++;
      this.y++;
    } else {
      this.x--;
      this.y--;
    }
  }
}

const App: React.FC = () => {
  let roam: Roamer;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(1500, 1500).parent(canvasParentRef);
    roam = new Roamer(p5);
    p5.background(255);
  };

  const draw = (p5: p5Types) => {
    roam.wanderer();
    roam.draw();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default App;
