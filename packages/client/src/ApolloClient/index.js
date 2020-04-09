import { ApolloClient } from "apollo-client";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";
import config from "./config";

const wsLink = new WebSocketLink({
  uri: `ws://${config.api.websocket.host}:${config.api.websocket.port}${config.api.websocket.endpoint}`,
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: `http://${config.api.http.host}:${config.api.http.port}${config.api.http.endpoint}`,
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
