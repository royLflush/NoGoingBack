import { areas } from "../content/areas";
import { state, moveTo } from "../logic/state";

const areaName = document.getElementById("area-name") as HTMLHeadingElement;
const story = document.getElementById("story") as HTMLParagraphElement;
const choices = document.getElementById("choices") as HTMLDivElement;

function addChoice(label: string, onClick: () => void) {
  const button = document.createElement("button");
  button.textContent = label;
  button.addEventListener("click", onClick);
  choices.appendChild(button);
}

export function render() {
  const area = areas[state.areaId];

  areaName.textContent = area.name;
  story.textContent = area.description;

  choices.replaceChildren();

  for (const exit of area.exits) {
    addChoice(exit.label, () => {
      moveTo(exit.to);
      render();
    });
  }
}