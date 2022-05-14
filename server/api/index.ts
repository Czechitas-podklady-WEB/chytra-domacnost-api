import { Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { createDemoThings } from "../things/createDemoThings.ts";

export const apiRouter = new Router({ prefix: "/api" });

const things = createDemoThings();

apiRouter
  .use(oakCors())
  .get("/things", (context) => {
    let { origin } = context.request.url;
    if (!origin.includes("localhost")) {
      origin = origin.replace("http:", "https:"); // Heroku workaround
    }

    context.response.body = {
      things: things.listThings().map((thing) => ({
        ...thing,
        url: `${origin}/api/thing/${thing.id}`,
      })),
    };
  })
  .get("/thing/:id", (context) => {
    const thing = things.getThing(context.params.id);
    if (thing) {
      context.response.body = thing;
    }
  })
  .post("/thing/:id", async (context) => {
    const thing = things.getThing(context.params.id);
    if (thing?.type === "rgbLight") {
      const data = await context.request.body({ type: "json" }).value;
      const color: unknown = data.color;

      if (
        typeof color === "string" &&
        color.toUpperCase().match(/^#[0123456789ABCDEF]{6}$/) !== null
      ) {
        console.log(`Changing color to ${color}`);
        thing.changeColor(color.toUpperCase());

        context.response.body = thing;
      } else {
        context.response.body = {
          error: "Bad data",
        };
      }
    }
  });
