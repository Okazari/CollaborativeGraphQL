import React, { useState, useCallback, useRef, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import { useHistory } from "react-router-dom";
import { Button, Input, Box, useUser } from "../../common";

const addMessage = gql`
  mutation addMessage($userId: ID!, $content: String!) {
    addMessage(userId: $userId, content: $content) {
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
  const user = useUser();
  const history = useHistory();
  const messageInputRef = useRef(null);
  const [sendMessage] = useMutation(addMessage);
  useFocusOnLoad(messageInputRef);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (message) {
        sendMessage({
          variables: { userId: user.id, content: message },
        }).catch(() => {
          history.push("/");
        });
        setMessage("");
        messageInputRef.current.focus();
      }
    },
    [sendMessage, user, message]
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
