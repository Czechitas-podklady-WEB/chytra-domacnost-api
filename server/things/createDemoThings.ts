import { initializeThings } from "./index.ts";

export const createDemoThings = () => {
  const things = initializeThings();

  things.addVacuum();

  for (let i = 0; i < 102; i++) {
    things.addRgbLight();
  }

  return things;
};
