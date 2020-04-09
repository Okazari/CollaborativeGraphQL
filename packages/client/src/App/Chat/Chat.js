import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ChatArea from "./ChatArea";
import MessageInputBox from "./MessageInputBox";
import { useUser } from "../common";

const Chat = () => {
  const user = useUser();
  const history = useHistory();
  useEffect(() => {
    if (!user.id) history.push("/");
  }, [user.id, history]);
  return (
    <div>
      <MessageInputBox />
      <ChatArea />
    </div>
  );
};

export default Chat;
