import { state } from "./state";

export type Effect =
  | { type: "damage"; amount: number }
  | { type: "heal"; amount: number }
  | { type: "addItem"; item: string }
  | { type: "removeItem"; item: string }
  | { type: "setFlag"; flag: string }
  | { type: "gainGold"; amount: number }
  | { type: "loseGold"; amount: number };

export function applyEffect(effect: Effect) {
  switch (effect.type) {
    case "damage":
      state.hp = Math.max(0, state.hp - effect.amount);
      break;
    case "heal":
      state.hp += effect.amount;
      break;
    case "addItem":
      state.inventory.push(effect.item);
      break;
    case "removeItem":
      state.inventory = state.inventory.filter((item) => item !== effect.item);
      break;
    case "setFlag":
      state.flags[effect.flag] = true;
      break;
    case "gainGold":
      state.gold += effect.amount;
      break;
    case "loseGold":
      state.gold = Math.max(0, state.gold - effect.amount);
      break;
    default: {
      const unhandled: never = effect;
      throw new Error(`Unknown effect: ${JSON.stringify(unhandled)}`);
    }
  }
}

export function applyEffects(effects: Effect[]) {
  for (const effect of effects) {
    applyEffect(effect);
  }
}