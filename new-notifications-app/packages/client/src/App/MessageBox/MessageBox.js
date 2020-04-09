import React, { useState, useCallback } from "react";
import gql from "graphql-tag";
import styled from "styled-components";
import { useMutation } from "react-apollo";
import Button from "./Button";
import Input from "./Input";

const Container = styled.div`
  width: 400px;
  margin: auto;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 10px;
  border: solid 1px darkseagreen;
`;

const addMessage = gql`
  mutation addMessage($username: String!, $content: String!) {
    addMessage(username: $username, content: $content) {
      id
    }
  }
`;

const MessageBox = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [sendMessage] = useMutation(addMessage);
  const onSubmit = useCallback(() => {
    if (message) {
      sendMessage({ variables: { username, content: message } });
      setMessage("");
    }
  }, [sendMessage, username, message]);

  return (
    <Container>
      <Input
        label="Username"
        value={username}
        placeholder="Benjamin"
        onChange={setUsername}
      />
      <Input
        label="Message"
        value={message}
        onChange={setMessage}
        placeholder="Bonsoir à tous."
      />
      <Button onClick={onSubmit}>Submit</Button>
    </Container>
  );
};
export default MessageBox;
