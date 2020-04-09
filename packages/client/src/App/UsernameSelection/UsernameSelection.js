import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Button, Input, Box, Rows } from "../common";
import qs from "query-string";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";

const mutation = gql`
  mutation connect($user: UserInput!) {
    connectUser(user: $user) {
      id
      username
    }
  }
`;

const Error = styled.div`
  color: tomato;
`;

const UsernameSelection = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const [connect, { loading }] = useMutation(mutation);
  const onClick = useCallback(
    (e) => {
      e.preventDefault();
      setError("");
      connect({ variables: { user: { username, key: password } } })
        .then(({ data }) => {
          history.push({
            pathname: "/chat",
            search: qs.stringify({ userId: data.connectUser.id }),
          });
        })
        .catch((e) => setError("User already taken / Wrong key"));
    },
    [history, username, password, connect]
  );
  return (
    <form onSubmit={onClick}>
      <Box>
        <Rows>
          <Input
            label="Username"
            value={username}
            onChange={setUsername}
            placeholder="Bob, Joeffrey, Stark..."
          />
          <Input
            label="Key (don't use a real password 🙏) "
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="toto, tata, titi..."
          />
          <Button>{!loading ? "GO TO CHAT" : "Connecting..."}</Button>
          {error && <Error>{error}</Error>}
        </Rows>
      </Box>
    </form>
  );
};

export default UsernameSelection;
