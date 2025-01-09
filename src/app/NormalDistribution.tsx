"use client";

import React, { useEffect } from "react";
import p5 from "p5";

const PaintSplatter: React.FC = () => {
  useEffect(() => {
    const sketch = (p: p5) => {
      let spreadSlider: p5.Element;
      let sizeSlider: p5.Element;
      let sizespSlider: p5.Element;
      let baseHueSlider: p5.Element;
      let huespSlider: p5.Element;
      let alphaSlider: p5.Element;

      p.setup = () => {
        const canvas = p.createCanvas(300, 150);
        canvas.parent("p5-canvas");
        p.colorMode(p.HSB);
        p.background(97);
        createControls(220);
      };

      p.draw = () => {
        p.translate(p.width / 2, p.height / 2);
        p.scale(p.height / 2);

        // random gaussian spread
        let x = p.randomGaussian(0, spreadSlider.value() as number);
        let y = p.randomGaussian(0, spreadSlider.value() as number);
        let size = p.randomGaussian(
          (sizeSlider.value() as number) / p.height,
          sizespSlider.value() as number
        );
        if (size <= 0) {
          size = 0.001;
        }

        // random gaussian hue
        let paintHue = p.randomGaussian(
          baseHueSlider.value() as number,
          huespSlider.value() as number
        );
        let paintSat = p.randomGaussian(80, 20);
        let paintBright = p.randomGaussian(80, 20);
        if (paintHue < 0) {
          paintHue += 360;
        } else if (paintHue >= 360) {
          paintHue -= 360;
        }
        if (paintSat > 100) {
          paintSat = 100;
        }
        if (paintBright > 100) {
          paintBright = 100;
        }

        p.noStroke();
        p.fill(paintHue, paintSat, paintBright, alphaSlider.value() as number);
        p.ellipse(x, y, size, size);
      };

      const styleSlider = (slider: p5.Element) => {
        slider.style("height", "1px");
        slider.style("background-color", "#ddd");
        slider.style("border-radius", "15px");
        slider.addClass("custom-slider");
      };

      const createControls = (ypos: number) => {
        const controlsContainer = p.createDiv();
        controlsContainer.parent("controls-container");
        controlsContainer.style("display", "flex");
        controlsContainer.style("flex-wrap", "wrap");
        controlsContainer.style("justify-content", "center");
        controlsContainer.style("align-items", "center");
        controlsContainer.style("gap", "15px");
        controlsContainer.style("position", "relative");

        const createSliderWithLabel = (
          label: string,
          min: number,
          max: number,
          value: number,
          step: number
        ) => {
          const container = p.createDiv();
          container.style("display", "flex");
          container.style("flex-direction", "column");
          container.style("align-items", "center");
          container.style("width", "80px");

          const title = p.createP(label);
          title.style("margin", "0");
          title.style("font-size", "10px");
          title.parent(container);

          const slider = p.createSlider(min, max, value, step);
          slider.parent(container);
          slider.size(60);
          styleSlider(slider);

          container.parent(controlsContainer);
          return slider;
        };

        spreadSlider = createSliderWithLabel("Spread", 0, 0.75, 0.25, 0);
        sizeSlider = createSliderWithLabel("Size", 1, 50, 2, 0);
        sizespSlider = createSliderWithLabel("Size Spread", 0, 0.1, 0.01, 0);
        baseHueSlider = createSliderWithLabel("Base Hue", 0, 360, 250, 0);
        huespSlider = createSliderWithLabel("Hue Spread", 0, 100, 15, 0);
        alphaSlider = createSliderWithLabel("Transparency", 0, 1, 0.75, 0);

        const clearButton = p.createButton("clear");
        clearButton.parent(controlsContainer);
        clearButton.style("background-color", "#ffe6f2");
        clearButton.style("border", "2px solid #ff99cc");
        clearButton.style("border-radius", "5px");
        clearButton.style("padding", "2px 10px");
        clearButton.style("font-family", "Arial, sans-serif");
        clearButton.style("cursor", "pointer");
        clearButton.style("position", "absolute");
        clearButton.style("bottom", "160px");
        clearButton.style("right", "15px");
        clearButton.mousePressed(() => p.background(97));
      };
    };

    new p5(sketch);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // height: "100vh",
      }}
    >
      <div
        id="paint-splatter-container"
        style={{
          width: "320px",
          height: "250px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div id="p5-canvas" />
        <div id="controls-container" />
      </div>
    </div>
  );
};

export default PaintSplatter;
