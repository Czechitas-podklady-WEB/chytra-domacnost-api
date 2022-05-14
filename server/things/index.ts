import { randomId } from "./randomId.ts";

type ThingCommon = {
  id: string;
};

type RgbLight = ThingCommon & {
  type: "rgbLight";
  color: string; // @TODO: add string shape
  changeColor: (newColor: RgbLight["color"]) => void;
};

type VacuumLight = ThingCommon & {
  type: "vacuum";
  status: "home" | "returningHome" | "working" | "idle";
};

type Thing = RgbLight | VacuumLight;

export const initializeThings = () => {
  const things: Thing[] = [];

  const listThings = () =>
    things.map((thing) => ({
      id: thing.id,
      type: thing.type,
    }));

  const addRgbLight = () => {
    const type = "rgbLight";
    const thing: RgbLight = {
      id: randomId(type),
      type,
      color: "#000000",
      changeColor: (newColor: RgbLight["color"]) => {
        thing.color = newColor;
      },
    };
    things.push(thing);
  };

  const addVacuum = () => {
    const type = "vacuum";
    things.push({
      id: randomId(type),
      type,
      status: "home",
    });
  };

  const getThing = (id: Thing["id"]) =>
    things.find((thing) => thing.id === id) ?? null;

  return {
    listThings,
    addRgbLight,
    addVacuum,
    getThing,
  };
};
