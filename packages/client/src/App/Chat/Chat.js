import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ChatArea from "./ChatArea";
import MessageInputBox from "./MessageInputBox";
import { useUser, Cols, Rows } from "../common";
import UserList from "./UserList";

const Chat = () => {
  const user = useUser();
  const history = useHistory();
  useEffect(() => {
    if (!user.id) history.push("/");
  }, [user.id, history]);
  return (
    <Cols
      layout="500px 300px"
      horizontalAlign="center"
      verticalAlign="flex-start"
    >
      <Rows>
        <MessageInputBox />
        <ChatArea />
      </Rows>
      <UserList />
    </Cols>
  );
};

export default Chat;
