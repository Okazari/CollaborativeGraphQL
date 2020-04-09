import React from "react";
import styled from "styled-components";

const MessageContainer = styled.div`
  background-color: ${({ secondary }) => (secondary ? "#b7e0b7" : "#cde0c8")};
  border-radius: 3px;
  padding: 10px;
  width: 300px;
  margin-bottom: 10px;
  transform: translateX(${({ secondary }) => (secondary ? "50px" : "-50px")});
`;

const Username = styled.div`
  margin-bottom: 10px;
  font-weight: 400;
  color: grey;
  border-bottom: 1px solid #aaa;
`;

const MessageContent = styled.div`
  font-size: 1.2rem;
`;

const Message = ({ content, username, secondary }) => (
  <MessageContainer secondary={secondary}>
    <Username>{username}</Username>
    <MessageContent>{content}</MessageContent>
  </MessageContainer>
);

export default Message;
