import React, { useRef } from "react";
import Sketch from "react-p5";
import p5Types from "p5";

let octavesSlider: p5Types.Element;
let falloffSlider: p5Types.Element;
let xoffSlider: p5Types.Element;
let yoffSlider: p5Types.Element;

const NoiseDetail: React.FC = () => {
  const controlsContainerRef = useRef<HTMLDivElement | null>(null);

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(300, 200).parent(canvasParentRef);
    p5.colorMode(p5.HSB);
    createControls(p5);
  };

  const draw = (p5: p5Types) => {
    p5.noiseDetail(
      octavesSlider.value() as number,
      falloffSlider.value() as number
    );
    const xoffValue = xoffSlider.value() as number;
    const yoffValue = yoffSlider.value() as number;

    p5.loadPixels();
    let xoff = 0.0;
    for (let x = 0; x < p5.width; x++) {
      let yoff = 0.0;
      for (let y = 0; y < p5.height; y++) {
        const bright = p5.map(p5.noise(xoff, yoff), 0, 1, 0, 255);
        const hu = p5.map(p5.noise(xoff, yoff), 0, 1, 0, 360);
        p5.set(x, y, p5.color(hu, 100, bright));
        yoff += yoffValue;
      }
      xoff += xoffValue;
    }
    p5.updatePixels();
  };

  const createControls = (p5: p5Types) => {
    const controlsContainer = p5
      .createDiv()
      .parent(controlsContainerRef.current!);
    controlsContainer.style("display", "flex").style("gap", "10px");

    const createSlider = (
      label: string,
      min: number,
      max: number,
      value: number,
      step: number
    ) => {
      const container = p5
        .createDiv()
        .style("display", "flex")
        .style("flex-direction", "column")
        .style("align-items", "center");
      p5.createP(label).parent(container);
      const slider = p5
        .createSlider(min, max, value, step)
        .parent(container)
        .size(60);
      container.parent(controlsContainer);
      return slider;
    };

    octavesSlider = createSlider("Octaves", 1, 10, 4, 1);
    falloffSlider = createSlider("Falloff", 0, 1, 0.5, 0);
    xoffSlider = createSlider("xoff", 0.01, 0.1, 0.01, 0.01);
    yoffSlider = createSlider("yoff", 0.01, 0.1, 0.01, 0.01);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        id="noise-detail-container"
        style={{
          padding: "1px",
          width: "400px",
          height: "20px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div id="p5-canvas" />
      </div>
      <div id="controls-container" ref={controlsContainerRef} />
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default NoiseDetail;
