import { state } from "./state";

export type Condition =
  | { type: "hasItem"; item: string }
  | { type: "hasFlag"; flag: string }
  | { type: "hpAtLeast"; amount: number }
  | { type: "not"; condition: Condition }
  | { type: "all"; conditions: Condition[] }
  | { type: "any"; conditions: Condition[] };

export function checkCondition(condition: Condition): boolean {
  switch (condition.type) {
    case "hasItem":
      return state.inventory.includes(condition.item);
    case "hasFlag":
      return state.flags[condition.flag] === true;
    case "hpAtLeast":
      return state.hp >= condition.amount;
    case "not":
      return !checkCondition(condition.condition);
    case "all":
      return condition.conditions.every((c) => checkCondition(c));
    case "any":
      return condition.conditions.some((c) => checkCondition(c));
    default: {
      const unhandled: never = condition;
      throw new Error(`Unknown condition: ${JSON.stringify(unhandled)}`);
    }
  }
}