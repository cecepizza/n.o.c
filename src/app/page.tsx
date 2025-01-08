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
    this.p5.strokeWeight(2);
    this.p5.point(this.x, this.y);
  }

  /** four directional movements
   wanderer() {
    const choice = floor(random(4));
    if (choice == 0) {
      this.x++;
    } else if (choice == 1) {
      this.x--;
    } else if (choice == 2) {
      this.y++;
    } else {
      this.y--;
    }
}
   */

  /** eight directional movements + stay still*/
  wanderer() {
    // Yields –1, 0, or 1
    // Left (xstep = -1), Right (xstep = 1), or Stay Still (xstep = 0)
    let xstep = this.p5.floor(this.p5.random(3)) - 1; // Randomly generates -1, 0, or 1
    // Up (ystep = -1), Down (ystep = 1), or Stay Still (ystep = 0)
    let ystep = this.p5.floor(this.p5.random(3)) - 1;
    this.x += xstep;
    this.y += ystep;
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
