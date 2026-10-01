export type ClassId = "thief" | "mage" | "merchant" | "knight";

export interface ClassDef {
  id: ClassId;
  name: string;
  description: string;
  startAreaId: string;
  startingGold: number;
  startingItems: string[];
}

export const classes: Record<ClassId, ClassDef> = {
  thief: {
    id: "thief",
    name: "Thief",
    description: "You've learned to take what the world won't give.",
    startAreaId: "crossroads",
    startingGold: 2,
    startingItems: ["lockpicks"],
  },
  mage: {
    id: "mage",
    name: "Mage",
    description: "Years at the academy taught you more than spells.",
    startAreaId: "crossroads",
    startingGold: 15,
    startingItems: ["spellbook"],
  },
  merchant: {
    id: "merchant",
    name: "Merchant",
    description: "Every road is a market if you know how to look.",
    startAreaId: "crossroads",
    startingGold: 40,
    startingItems: ["ledger"],
  },
  knight: {
    id: "knight",
    name: "Knight",
    description: "Your family's crest still opens doors.",
    startAreaId: "crossroads",
    startingGold: 60,
    startingItems: ["sword"],
  },
};