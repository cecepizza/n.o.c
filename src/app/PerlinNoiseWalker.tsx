import React from "react";
import Sketch from "react-p5";
import p5Types from "p5"; // Import this for type definitions

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Walker {
  private tx: number;
  private ty: number;
  private x: number;
  private y: number;
  private p5: p5Types;

  constructor(p5: p5Types) {
    this.p5 = p5;
    this.tx = 0;
    this.ty = 10000;
    this.x = 0;
    this.y = 0;
  }

  step() {
    // x- and y-position mapped from noise
    this.x = this.p5.map(this.p5.noise(this.tx), 0, 1, 0, this.p5.width);
    this.y = this.p5.map(this.p5.noise(this.ty), 0, 1, 0, this.p5.height);

    // Move forward through “time.”
    this.tx += 0.001;
    this.ty += 0.011;
  }

  show() {
    this.p5.strokeWeight(0.05);
    this.p5.fill(this.p5.random(255), this.p5.random(255), this.p5.random(255));
    this.p5.stroke(0);
    this.p5.circle(this.x, this.y, 8);
  }
}

const PerlinNoiseWalker: React.FC = () => {
  let walker: Walker;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(600, 200).parent(canvasParentRef);
    walker = new Walker(p5);
    p5.background(250);
  };

  const draw = (p5: p5Types) => {
    walker.step();
    walker.show();
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default PerlinNoiseWalker;
