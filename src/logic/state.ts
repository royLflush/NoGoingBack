import { areas } from "../content/areas";

export interface GameState {
  areaId: string;
  hp: number;
  inventory: string[];
  flags: Record<string, boolean>;
  eventDone: boolean;
}

export const state: GameState = {
  areaId: "crossroads",
  hp: 10,
  inventory: [],
  flags: {},
  eventDone: false,
};

export function moveTo(areaId: string) {
  if (!areas[areaId]) {
    console.error(`No area with id "${areaId}"`);
    return;
  }
  state.areaId = areaId;
  state.eventDone = false;
}