import { randomId } from "./randomId.ts";

type ThingCommon = {
  id: string;
  note?: string;
};

type RgbLight = ThingCommon & {
  type: "rgbLight";
  color: string; // @TODO: add string shape
  changeColor: (newColor: RgbLight["color"]) => void;
};

type Vacuum = ThingCommon & {
  type: "vacuum";
  state: "home" | "returningHome" | "working" | "idle";
};

type Television = ThingCommon & {
  type: "television";
  nowPlaying: string;
  availableChannels: string[];
};

type WashingMachine = ThingCommon & {
  type: "washingMachine";
  state: "on" | "off";
};

type MotionSensor = ThingCommon & {
  type: "motionSensor";
  state: "motionDetected" | "noMotion";
};

type Thing = RgbLight | Vacuum | Television | WashingMachine | MotionSensor;

export const initializeThings = () => {
  const things: Thing[] = [];

  const listThings = () =>
    things.map((thing) => ({
      id: thing.id,
      type: thing.type,
    }));

  const addRgbLight = (note?: string) => {
    const type = "rgbLight";
    const thing: RgbLight = {
      id: randomId(type),
      type,
      color: "#000000",
      changeColor: (newColor: RgbLight["color"]) => {
        thing.color = newColor;
      },
      note,
    };
    things.push(thing);
  };

  const addVacuum = () => {
    const type = "vacuum";
    things.push({
      id: randomId(type),
      type,
      state: "idle",
    });
  };

  const addTelevision = () => {
    const type = "television";
    things.push({
      id: randomId(type),
      type,
      nowPlaying: "Déčko",
      availableChannels: ["ČT1", "ČT2", "Déčko", "Nova", "Prima"],
    });
  };

  const addWashingMachine = () => {
    const type = "washingMachine";
    things.push({
      id: randomId(type),
      type,
      state: "off",
    });
  };

  const addMotionSensor = (
    note?: string,
    initialState: MotionSensor["state"] = "noMotion",
  ) => {
    const type = "motionSensor";
    things.push({
      id: randomId(type),
      type,
      state: initialState,
      note,
    });
  };

  const getThing = (id: Thing["id"]) =>
    things.find((thing) => thing.id === id) ?? null;

  return {
    listThings,
    addRgbLight,
    addVacuum,
    addTelevision,
    addWashingMachine,
    addMotionSensor,
    getThing,
  };
};
