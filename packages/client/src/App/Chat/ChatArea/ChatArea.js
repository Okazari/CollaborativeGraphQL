import React, { useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import get from "lodash/get";
import Message from "./Message";
import { useUser, useUsernamesColors, Rows, Cols } from "../../common";

const query = gql`
  query {
    messages {
      id
      content
      user {
        id
        username
      }
      timestamp
    }
  }
`;

const subscription = gql`
  subscription {
    messageAdded {
      id
      content
      user {
        id
        username
      }
      timestamp
    }
  }
`;

const ChatArea = () => {
  const { data, loading, subscribeToMore } = useQuery(query);
  const currentUser = useUser();
  const messages = get(data, "messages", []);
  useEffect(() => {
    subscribeToMore({
      document: subscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = get(subscriptionData, "data.messageAdded");
        return {
          messages: [newMessage, ...prev.messages],
        };
      },
    });
  }, [subscribeToMore]);
  const usernameColorMap = useUsernamesColors(messages);
  return (
    <Cols layout="500px" horizontalAlign="center">
      <Rows gap=".5rem" horizontalAlign="center">
        {!loading &&
          messages.map(
            ({ id, user: { id: userId, username }, content, timestamp }) => (
              <Message
                key={id}
                color={
                  userId !== currentUser.id ? usernameColorMap[username] : null
                }
                date={timestamp}
                username={username}
                content={content}
              />
            )
          )}
      </Rows>
    </Cols>
  );
};

export default ChatArea;
