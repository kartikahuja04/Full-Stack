const canvas = document.getElementById("canvas");
const shapeSelector = document.getElementById("shape");
const colorPicker = document.getElementById("color");
const undoBtn = document.getElementById("undo");
const clearBtn = document.getElementById("clear");

let isDrawing = false;
let startX, startY;
let currentShape = null;
let history = [];

function getSVGPoint(e) {
  const svg = canvas;
  const pt = svg.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;
  const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
  return { x: svgP.x, y: svgP.y };
}

function createShape(type, x, y, color) {
  const ns = "http://www.w3.org/2000/svg";
  let shape;

  if (type === "line") {
    shape = document.createElementNS(ns, "line");
    shape.setAttribute("x1", x);
    shape.setAttribute("y1", y);
    shape.setAttribute("x2", x);
    shape.setAttribute("y2", y);
    shape.setAttribute("stroke", color);
    shape.setAttribute("stroke-width", 2);
  }

  if (type === "rect") {
    shape = document.createElementNS(ns, "rect");
    shape.setAttribute("x", x);
    shape.setAttribute("y", y);
    shape.setAttribute("width", 0);
    shape.setAttribute("height", 0);
    shape.setAttribute("fill", "none");
    shape.setAttribute("stroke", color);
    shape.setAttribute("stroke-width", 2);
  }

  if (type === "circle") {
    shape = document.createElementNS(ns, "circle");
    shape.setAttribute("cx", x);
    shape.setAttribute("cy", y);
    shape.setAttribute("r", 0);
    shape.setAttribute("fill", "none");
    shape.setAttribute("stroke", color);
    shape.setAttribute("stroke-width", 2);
  }

  if (type === "freehand") {
    shape = document.createElementNS(ns, "path");
    shape.setAttribute("d", `M ${x} ${y}`);
    shape.setAttribute("fill", "none");
    shape.setAttribute("stroke", color);
    shape.setAttribute("stroke-width", 2);
  }

  return shape;
}

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  const { x, y } = getSVGPoint(e);
  startX = x;
  startY = y;

  currentShape = createShape(
    shapeSelector.value,
    startX,
    startY,
    colorPicker.value
  );

  canvas.appendChild(currentShape);
});

canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing || !currentShape) return;

  const { x, y } = getSVGPoint(e);

  if (currentShape.tagName === "line") {
    currentShape.setAttribute("x2", x);
    currentShape.setAttribute("y2", y);
  }

  if (currentShape.tagName === "rect") {
    currentShape.setAttribute("x", Math.min(startX, x));
    currentShape.setAttribute("y", Math.min(startY, y));
    currentShape.setAttribute("width", Math.abs(x - startX));
    currentShape.setAttribute("height", Math.abs(y - startY));
  }

  if (currentShape.tagName === "circle") {
    const r = Math.hypot(x - startX, y - startY);
    currentShape.setAttribute("r", r);
  }

  if (currentShape.tagName === "path") {
    currentShape.setAttribute("d", currentShape.getAttribute("d") + ` L ${x} ${y}`);
  }
});

canvas.addEventListener("mouseup", () => {
  if (isDrawing && currentShape) {
    history.push(currentShape);
  }
  isDrawing = false;
  currentShape = null;
});

undoBtn.addEventListener("click", () => {
  if (history.length === 0) return;
  const last = history.pop();
  canvas.removeChild(last);
});

clearBtn.addEventListener("click", () => {
  // Remove all drawn shapes from the SVG
  while (canvas.lastChild) {
    canvas.removeChild(canvas.lastChild);
  }
  // Reset history so Undo doesn't try to remove old elements
  history = [];
});
