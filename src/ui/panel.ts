import { classes } from "../content/classes";
import { areas } from "../content/areas";
import { state, moveTo, startGame } from "../logic/state";
import { checkCondition } from "../logic/conditions";
import { applyEffects } from "../logic/effects";
import type { Condition } from "../logic/conditions";

const areaName = document.getElementById("area-name") as HTMLHeadingElement;
const status = document.getElementById("status") as HTMLParagraphElement;
const story = document.getElementById("story") as HTMLParagraphElement;
const choices = document.getElementById("choices") as HTMLDivElement;

function addChoice(label: string, onClick: () => void) {
  const button = document.createElement("button");
  button.textContent = label;
  button.addEventListener("click", onClick);
  choices.appendChild(button);
}

function isAvailable(requires?: Condition): boolean {
  return !requires || checkCondition(requires);
}

function renderClassSelect() {
  areaName.textContent = "Who are you?";
  status.textContent = "";
  story.textContent = "Before the road, there was a life. Choose the one you are leaving behind.";
  choices.replaceChildren();

  for (const chosen of Object.values(classes)) {
    addChoice(`${chosen.name}: ${chosen.description}`, () => {
      startGame(chosen.id);
      render();
    });
  }
}

export function render(message?: string) {
  if (state.classId === null) {
    renderClassSelect();
    return;
  }

  const area = areas[state.areaId];
  const playerClass = classes[state.classId];

  areaName.textContent = area.name;
  status.textContent =
    `${playerClass.name}   HP: ${state.hp}   Gold: ${state.gold}   ` +
    `Items: ${state.inventory.join(", ") || "none"}`;


  let text = area.description;
  if (message) {
    text += "\n\n" + message;
  }

  choices.replaceChildren();

  if (area.event && !state.eventDone) {
    text += "\n\n" + area.event.text;

    for (const choice of area.event.choices) {
      if (!isAvailable(choice.requires)) continue;

      addChoice(choice.label, () => {
        applyEffects(choice.effects);
        state.eventDone = true;
        render(choice.result);
      });
    }
  } 
  else {
    for (const exit of area.exits) {
      if (!isAvailable(exit.requires)) continue;

      addChoice(exit.label, () => {
        moveTo(exit.to);
        render();
      });
    }
  }

  story.textContent = text;
}