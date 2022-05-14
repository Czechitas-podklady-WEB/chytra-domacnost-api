import { initializeThings } from "./index.ts";

export const createDemoThings = () => {
  const things = initializeThings();

  things.addTelevision();

  things.addWashingMachine();

  for (let i = 0; i < 3; i++) {
    things.addRgbLight();
  }

  things.addMotionSensor("Vstupní dveře");

  things.addMotionSensor("Dětský pokoj");

  things.addVacuum();

  return things;
};
