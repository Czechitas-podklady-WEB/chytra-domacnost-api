import { Application } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { parse } from "https://deno.land/std@0.137.0/flags/mod.ts";
import { apiRouter } from "./api/index.ts";

const { args } = Deno;
const DEFAULT_PORT = 8080;
const argPort = parse(args).port;
const port = argPort ? Number(argPort) : DEFAULT_PORT;

const app = new Application();

// Serve public directory
app.use(async (context, next) => {
  try {
    await context.send({
      root: `${Deno.cwd()}/public`,
      index: "index.html",
    });
  } catch {
    next();
  }
});

app.use(apiRouter.routes());

await app.listen({ port });
console.log(`Server is running at http://localhost:${port}.`);
