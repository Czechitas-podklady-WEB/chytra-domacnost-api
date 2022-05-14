import { initializeThings } from "./index.ts";

export const createDemoThings = () => {
  const things = initializeThings();

  things.addTelevision();

  things.addWashingMachine();

  for (let i = 0; i < 3; i++) {
    things.addRgbLight();
  }

  things.addMotionSensor("Front door");

  things.addMotionSensor("Children's room");

  things.addVacuum();

  return things;
};
