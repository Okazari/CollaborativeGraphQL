import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { formatDistanceToNow } from "date-fns";

const MessageContainer = styled.div`
  background-color: ${({ color }) => color || "#b7e0b7"};
  border-radius: 3px;
  padding: 10px;
  width: 300px;
  margin-bottom: 10px;
  transform: translateX(${({ color }) => (color ? "-50px" : "50px")});
`;

const Username = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-weight: 400;
  color: grey;
  border-bottom: 1px solid #aaa;
`;

const MessageContent = styled.div`
  font-size: 1.2rem;
  word-break: break-word;
  white-space: pre-wrap;
`;

const MessageDate = styled.div`
  font-size: 0.8rem;
`;

const useDateDistanceToNow = (givenDate) => {
  const [date, setDate] = useState(
    formatDistanceToNow(givenDate, { includeSeconds: true })
  );
  useEffect(() => {
    setInterval(
      () => setDate(formatDistanceToNow(givenDate, { includeSeconds: true })),
      1000
    );
  }, []);

  return date;
};

const Message = ({ content, username, color, date }) => {
  const formatedDate = useDateDistanceToNow(date);
  return (
    <MessageContainer color={color}>
      <Username>
        <div>{username}</div>
        <MessageDate>{formatedDate}</MessageDate>
      </Username>
      <MessageContent>{content}</MessageContent>
    </MessageContainer>
  );
};

export default Message;
