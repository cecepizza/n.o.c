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
    this.p5.fill(this.p5.random(255), this.p5.random(255), this.p5.random(255));
    this.p5.noStroke();
    this.p5.ellipse(this.x, this.y, 5, 5); // Draw a small circle
  }

  /** eight directional movements + stay still*/
  wanderer() {
    let speed = this.p5.random(1, 3); // Variable speed
    let xstep = this.p5.random(-speed, speed);
    let ystep = this.p5.random(-speed, speed);
    this.x += xstep;
    this.y += ystep;

    // Edge wrapping
    if (this.x > this.p5.width) this.x = 0;
    if (this.x < 0) this.x = this.p5.width;
    if (this.y > this.p5.height) this.y = 0;
    if (this.y < 0) this.y = this.p5.height;
  }
}

const RandomRoam: React.FC = () => {
  let roam: Roamer;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(200, 200).parent(canvasParentRef);
    roam = new Roamer(p5);
    p5.background(245);
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
        // height: "100vh",
      }}
    >
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default RandomRoam;
