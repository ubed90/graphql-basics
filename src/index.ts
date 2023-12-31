import { createYoga } from "graphql-yoga";
import { schema } from "./schema";
import { createServer } from "http";
import { createContext } from "./context";

// * Previous Dev Command using ts-node-dev
// "dev": "ts-node-dev --transpile-only --no-notify --exit-child src/index.ts",

const yoga = createYoga({ schema, context: createContext })

const server = createServer(yoga)

server.listen(4000, () => {
    console.log(`Server is running on port 4000.`);
})