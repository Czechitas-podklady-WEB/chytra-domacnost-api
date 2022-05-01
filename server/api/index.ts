import { Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { createDemoThings } from "../things/createDemoThings.ts";

export const apiRouter = new Router({ prefix: "/api" });

const things = createDemoThings();

apiRouter
  .use(oakCors())
  .get("/things", (context) => {
    context.response.body = {
      things: things.listThings().map((thing) => ({
        ...thing,
        url: `${context.request.url.origin}/api/thing/${thing.id}`,
      })),
    };
  })
  .get("/thing/:id", (context) => {
    const thing = things.getThing(context.params.id);
    if (thing) {
      context.response.body = thing;
    }
  });
