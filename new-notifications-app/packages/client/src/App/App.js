import React, { useState, useCallback } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";

const Container = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: solid 1px darkseagreen;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid lightgrey;
  &:focus {
    border-color: darkseagreen;
  }
`;

const Textarea = styled.textarea`
  border: none;
  border-bottom: 1px solid lightgrey;
`;

const Button = styled.button`
  border: none;
  background-color: darkseagreen;
  padding: 10px;
  color: white;
  cursor: pointer;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  color: #729072;
`;

const addMessage = gql`
  mutation addMessage($username: String!, $content: String!) {
    addMessage(username: $username, content: $content) {
      id
    }
  }
`;

const MessageInput = () => {
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
      <InputGroup>
        <Label>Username</Label>
        <Input
          value={username}
          placeholder="Benjamin"
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
      </InputGroup>
      <InputGroup>
        <Label>Message</Label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          placeholder="Message..."
        />
      </InputGroup>
      <Button onClick={onSubmit}>Submit</Button>
    </Container>
  );
};
export default MessageInput;
