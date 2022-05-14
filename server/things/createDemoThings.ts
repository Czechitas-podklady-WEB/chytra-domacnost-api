import { initializeThings } from "./index.ts";

export const createDemoThings = () => {
  const things = initializeThings();

  things.addTelevision();

  things.addWashingMachine();

  things.addRgbLight("Obývák");
  things.addRgbLight("Kuchyň");
  things.addRgbLight("Dětský pokoj");

  things.addMotionSensor("Vstupní dveře");

  things.addMotionSensor("Dětský pokoj", "motionDetected");

  things.addVacuum();

  return things;
};
