import path from "path";
import fs from "fs";
import { express as middleware } from "graphql-voyager/middleware";
import express from "express";
import { GraphQLServer, PubSub } from "graphql-yoga";
import cookieParser from "cookie-parser";
import typeDefs from "./schema";
import resolvers from "./resolvers";
/**
 * Initialize port
 */
const port = process.env.PORT || "3001";
const pubsub = new PubSub();

/**
 * Create graphql server from typedefs and resolvers
 */
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: { pubsub },
});

/**
 * Use cookie parser middleware
 */
server.express.use(cookieParser());

/**
 * use GraphQL Voyager
 */
server.express.use("/voyager", middleware({ endpointUrl: "/api/graphql" }));

/**
 * serve mock files for PDF export, CSV export, etc.
 */
server.express.use("/export", express.static("public"));
server.express.use("/public", express.static("public"));

server.express.get("/", (req, res) =>
  res.send(fs.readFileSync(path.resolve(__dirname, "homePage.html")).toString())
);

/**
 * Start server on /graphql endpoint and on specific port
 */
server.start(
  { port, endpoint: "/api/graphql", playground: "/api/graphql" },
  () => console.log(`Server is running on localhost:${port}`)
);

export default server;
