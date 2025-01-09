import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5'; // Import this for type definitions

const ProbabilityDisplacement = () => {
  let walker;

  class Walker {
    constructor(p5) {
      this.p5 = p5;
      this.x = p5.width / 2;
      this.y = p5.height / 2;
      this.color = p5.color(0, 0, 0);
    }

    show() {
      this.p5.stroke(this.color);
      this.p5.point(this.x, this.y);
    }

    step() {
      let step = 11;
      let xstep = acceptreject(this.p5) * step;
      if (this.p5.random([false, true])) {
        xstep *= -1;
      }
      let ystep = acceptreject(this.p5) * step;
      if (this.p5.random([false, true])) {
        ystep *= -1;
      }
      this.x += xstep;
      this.y += ystep;

      // Determine color based on random number
      this.color = this.getColorBasedOnNumber(this.p5.random(1));
    }

    getColorBasedOnNumber(number) {
      if (number < 0.5) {
        return this.p5.color(255, 0, 0); // Red
      } else {
        return this.p5.color(0, 0, 255); // Blue
      }
    }
  }
// An algorithm for picking a random number based on monte carlo method
// Here probability is determined by formula y = x squared
  const acceptreject = (p5) => {
    while (true) {
      let r1 = p5.random(1);
      let probability = r1 * r1;
      let r2 = p5.random(1);
      if (r2 < probability) {
        return r1;
      }
    }
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 200).parent(canvasParentRef);
    walker = new Walker(p5);
    p5.background(245);
  };

  const draw = (p5) => {
    walker.step();
    walker.show();
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default ProbabilityDisplacement;