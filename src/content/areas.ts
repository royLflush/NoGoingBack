import type { Condition } from "../logic/conditions";
import type { Effect } from "../logic/effects";

export interface Exit {
  to: string;
  label: string;
  requires?: Condition;
}

export interface Choice {
  label: string;
  requires?: Condition;
  effects: Effect[];
  result: string;
}

export interface GameEvent {
  id: string;
  text: string;
  choices: Choice[];
}

export interface Area {
  id: string;
  name: string;
  description: string;
  event?: GameEvent;
  exits: Exit[];
}

export const areas: Record<string, Area> = {
  crossroads: {
    id: "crossroads",
    name: "The Crossroads",
    description: "A weathered signpost stands where two paths split into the dark.",
    exits: [
      { to: "forest", label: "Take the forest path" },
      { to: "mountain", label: "Take the mountain path" },
    ],
  },
  forest: {
    id: "forest",
    name: "Whispering Forest",
    description: "The trees close in behind you. Something moves between the trunks.",
    event: {
      id: "hermit",
      text: "An old hermit sits by a dying fire. He asks you to help gather wood.",
      choices: [
        {
          label: "Help him",
          effects: [
            { type: "setFlag", flag: "helpedHermit" },
            { type: "addItem", item: "torch" },
          ],
          result: "He thanks you and presses a torch into your hands.",
        },
        {
          label: "Ignore him",
          effects: [],
          result: "You walk past. You feel his eyes on your back.",
        },
      ],
    },
    exits: [{ to: "ruins", label: "Follow the faint trail east" }],
  },
  mountain: {
    id: "mountain",
    name: "Mountain Pass",
    description: "The wind bites as you climb. Below, you spot crumbling stone walls.",
    event: {
      id: "rockslide",
      text: "Loose rocks start tumbling down the slope toward you.",
      choices: [
        {
          label: "Dive for cover",
          effects: [{ type: "damage", amount: 3 }],
          result: "A rock clips your shoulder as you land hard.",
        },
        {
          label: "Duck into a nearby cave",
          effects: [{ type: "addItem", item: "torch" }],
          result: "The rocks thunder past. In the dark, your hand finds an old torch.",
        },
      ],
    },
    exits: [{ to: "ruins", label: "Descend toward the walls" }],
  },
  ruins: {
    id: "ruins",
    name: "Sunken Ruins",
    description: "Broken pillars rise from the mud. There is no path behind you now.",
    event: {
      id: "vault",
      text: "A sealed doorway leads beneath the ruins. It's pitch black inside.",
      choices: [
        {
          label: "Light your torch and enter",
          requires: { type: "hasItem", item: "torch" },
          effects: [{ type: "setFlag", flag: "enteredVault" }],
          result: "Torchlight reveals carvings that seem to watch you.",
        },
        {
          label: "Search the rubble outside",
          effects: [{ type: "damage", amount: 2 }],
          result: "You cut your hand on a sharp stone and find nothing.",
        },
      ],
    },
    exits: [],
  },
};
