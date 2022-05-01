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
  })
  .post("/thing/:id", (context) => {
    const thing = things.getThing(context.params.id);
    if (thing?.type === "rgbLight") {
      // Throws "BadResource: Bad resource ID" for some reason
      // const result = context.request.body({
      //   type: "json",
      // });
      // console.log(await result.value);

      // @TODO: use color from body
      thing.changeColor("#ff00ff");

      context.response.body = thing;
    }
  });
