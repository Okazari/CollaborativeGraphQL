import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ChatArea from "./ChatArea";
import MessageInputBox from "./MessageInputBox";
import { useUsername } from "../common";

const Chat = () => {
  const username = useUsername();
  const history = useHistory();
  useEffect(() => {
    if (!username) history.push("/");
  }, [username, history]);
  return (
    <div>
      <MessageInputBox />
      <ChatArea />
    </div>
  );
};

export default Chat;
