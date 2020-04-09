import React, { useState, useCallback, useRef, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import { Button, Input, Box, useUsername } from "../../common";

const addMessage = gql`
  mutation addMessage($username: String!, $content: String!) {
    addMessage(username: $username, content: $content) {
      id
    }
  }
`;

const useFocusOnLoad = (ref) => {
  useEffect(() => {
    ref.current.focus();
  }, [ref]);
};

const MessageInputBox = () => {
  const [message, setMessage] = useState("");
  const username = useUsername();
  const messageInputRef = useRef(null);
  const [sendMessage] = useMutation(addMessage);
  useFocusOnLoad(messageInputRef);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (message) {
        sendMessage({
          variables: { username, content: message },
        });
        setMessage("");
        messageInputRef.current.focus();
      }
    },
    [sendMessage, username, message]
  );

  return (
    <form>
      <Box>
        <Input
          inputRef={messageInputRef}
          label="Message"
          value={message}
          onChange={setMessage}
          placeholder="Bonsoir à tous."
        />
        <Button onClick={onSubmit}>Submit</Button>
      </Box>
    </form>
  );
};
export default MessageInputBox;
