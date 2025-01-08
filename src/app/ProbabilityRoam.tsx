"use client";

// The Nature of Code Exercise 0.3
// solution by Rick Sidwell
// http://natureofcode.com

import React from "react";
import Sketch from "react-p5";
import p5Types from "p5"; // Import this for type definitions

class Walker {
  x: number;
  y: number;

  constructor(private p5: p5Types) {
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

const ProbabilityRoam: React.FC = () => {
  let walker: Walker;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(500, 200).parent(canvasParentRef); // canvas parent ref ensures that the canvas is rendered correctly in React
    walker = new Walker(p5);
    p5.background(247);
  };

  const draw = (p5: p5Types) => {
    walker.step();
    walker.show();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // height: "50vh",
        // width: "100%",
      }}
    >
      <Sketch
        setup={setup}
        draw={draw}
        style={{
          display: "block",
          margin: "0 auto",
        }}
      />
    </div>
  );
};

export default ProbabilityRoam;
