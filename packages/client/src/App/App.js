import React from "react";
import styled from "styled-components";
import MessageBox from "./MessageBox";
import Chatbox from "./ChatBox";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UsernameBox from "./UsernameBox";

const AppContainer = styled.div`
  font-family: Arial, Helvetica, sans-serif;
`;

const App = () => (
  <AppContainer>
    <Router>
      <Switch>
        <Route exact path="/">
          <UsernameBox />
        </Route>
        <Route path="/chat">
          <MessageBox />
          <Chatbox />
        </Route>
        <Redirect to="/chat" />
      </Switch>
    </Router>
  </AppContainer>
);

export default App;
