import { areas } from "../content/areas";

export interface GameState {
  areaId: string;
}

export const state: GameState = {
  areaId: "crossroads",
};

export function moveTo(areaId: string) {
  if (!areas[areaId]) {
    console.error(`No area with id "${areaId}"`);
    return;
  }
  state.areaId = areaId;
}