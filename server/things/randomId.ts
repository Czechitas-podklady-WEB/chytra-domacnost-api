import { makeSeededGenerators } from "https://deno.land/x/vegas@v1.3.0/mod.ts";

const seed = makeSeededGenerators("things");

export const randomId = (type: string) => {
  const randomIdFragment = () =>
    new Array(6).fill(null).map(() =>
      seed.randomPick([
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
      ])
    ).join("");

  return `${type.substring(0, 3)}-${randomIdFragment()}-${randomIdFragment()}`;
};
