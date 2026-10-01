import { areas } from "../content/areas";
import { classes, type ClassId } from "../content/classes";

export interface GameState {
  classId: ClassId | null;
  areaId: string;
  hp: number;
  gold: number;
  inventory: string[];
  flags: Record<string, boolean>;
  eventDone: boolean;
}

export const state: GameState = {
  classId: null,
  areaId: "",
  hp: 10,
  gold: 0,
  inventory: [],
  flags: {},
  eventDone: false,
};

export function startGame(classId: ClassId) {
  const chosen = classes[classId];
  state.classId = classId;
  state.areaId = chosen.startAreaId;
  state.hp = 10;
  state.gold = chosen.startingGold;
  state.inventory = [...chosen.startingItems];
  state.flags = {};
  state.eventDone = false;
}

export function moveTo(areaId: string) {
  if (!areas[areaId]) {
    console.error(`No area with id "${areaId}"`);
    return;
  }
  state.areaId = areaId;
  state.eventDone = false;
}