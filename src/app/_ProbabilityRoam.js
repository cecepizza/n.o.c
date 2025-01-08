"use client";

// The Nature of Code Exercise 0.3
// solution by Rick Sidwell
// http://natureofcode.com

import React from "react";
import Sketch from "react-p5";

class Walker {
  constructor(p5) {
    this.p5 = p5;
    this.x = p5.width / 2;
    this.y = p5.height / 2;
  }

  show() {
    this.p5.stroke(0);
    this.p5.point(this.x, this.y);
  }

  step() {
    const r = this.p5.random();
    if (r < 0.5) {
      if (r < 0.25) {
        if (this.x < this.p5.mouseX) {
          this.x++;
        } else {
          this.x--;
        }
      } else {
        if (this.y < this.p5.mouseY) {
          this.y++;
        } else {
          this.y--;
        }
      }
    } else {
      const choice = this.p5.floor(this.p5.random(4));
      if (choice === 0) {
        this.x++;
      } else if (choice === 1) {
        this.x--;
      } else if (choice === 2) {
        this.y++;
      } else {
        this.y--;
      }
    }
  }
}

const ProbabilityRoam = () => {
  let walker;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
    walker = new Walker(p5);
    p5.background(255);
  };

  const draw = (p5) => {
    walker.step();
    walker.show();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // height: "100vh",
      }}
    >
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default ProbabilityRoam; 