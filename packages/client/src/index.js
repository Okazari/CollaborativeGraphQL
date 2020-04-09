import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { register } from "./serviceWorker";
import client from "./ApolloClient";
import App from "./App";

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
register();
