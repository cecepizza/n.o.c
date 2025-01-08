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

  /** eight directional movements + stay still*/
  wanderer() {
    let xstep = this.p5.random(-1, 1);
    let ystep = this.p5.random(-1, 1);
    this.x += xstep;
    this.y += ystep;
  }
}

const RandomRoam: React.FC = () => {
  let roam: Roamer;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
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

export default RandomRoam;
