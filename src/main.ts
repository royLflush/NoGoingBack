import "./style.css";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.width = 800;
canvas.height = 600;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "white";
ctx.fillRect(100, 100, 50, 50);

const story = document.getElementById("story") as HTMLParagraphElement;
const choices = document.getElementById("choices") as HTMLDivElement;

function addChoice(label: string, onClick: () => void) {
  const button = document.createElement("button");
  button.textContent = label;
  button.addEventListener("click", onClick);
  choices.appendChild(button);
}

story.textContent = "You stand at a crossroads. Two paths lead into the dark.";

addChoice("Take the forest path", () => {
  story.textContent = "The trees close in behind you.";
});

addChoice("Take the mountain path", () => {
  story.textContent = "The wind bites as you climb.";
});