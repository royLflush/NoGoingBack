export interface Exit {
    to: string;
    label: string;
}

export interface Area {
    id: string;
    name: string;
    description: string;
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
    exits: [{ to: "ruins", label: "Follow the faint trail east" }],
  },
  mountain: {
    id: "mountain",
    name: "Mountain Pass",
    description: "The wind bites as you climb. Below, you spot crumbling stone walls.",
    exits: [{ to: "ruins", label: "Descend toward the walls" }],
  },
  ruins: {
    id: "ruins",
    name: "Sunken Ruins",
    description: "Broken pillars rise from the mud. There is no path behind you now.",
    exits: [],
  },
};
