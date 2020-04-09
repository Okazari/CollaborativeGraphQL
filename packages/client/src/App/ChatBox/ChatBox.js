import React, { useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import get from "lodash/get";
import Message from "./Message";
import { useUsername } from "../common";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400;
  margin: auto;
`;

const query = gql`
  query {
    messages {
      id
      content
      username
    }
  }
`;

const subscription = gql`
  subscription {
    messageAdded {
      id
      content
      username
    }
  }
`;

const Chatbox = () => {
  const { data, loading, subscribeToMore } = useQuery(query);
  const currentUsername = useUsername();
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
  return (
    <Container>
      {!loading &&
        messages.map(({ id, username, content }, index) => (
          <Message
            key={id}
            secondary={username !== currentUsername}
            username={username}
            content={content}
          />
        ))}
    </Container>
  );
};

export default Chatbox;
