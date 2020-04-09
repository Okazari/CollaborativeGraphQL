import React from "react";
import styled from "styled-components";
import Chat from "./Chat";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UsernameSelection from "./UsernameSelection";

const AppContainer = styled.div`
  font-family: Arial, Helvetica, sans-serif;
`;

const App = () => (
  <AppContainer>
    <Router>
      <Switch>
        <Route exact path="/">
          <UsernameSelection />
        </Route>
        <Route path="/chat">
          <Chat />
        </Route>
        <Redirect to="/chat" />
      </Switch>
    </Router>
  </AppContainer>
);

export default App;
