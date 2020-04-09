import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import get from "lodash/get";
import uniq from "lodash/uniq";
import faker from "faker";
import Message from "./Message";
import { useUsername } from "../../common";

const colorList = [
  "#ffbca8",
  "#babbea",
  "#dfcae2",
  "#c8e2de",
  "#e9eaba",
  "#f2bdbd",
];

const colorCache = JSON.parse(
  window.localStorage.getItem("colorCache") || "{}"
);

const getUserColor = (username) => {
  if (colorCache[username]) return colorCache[username];
  const color = faker.helpers.shuffle(colorList)[0];
  colorCache[username] = color;
  window.localStorage.setItem("colorCache", JSON.stringify(colorCache));
  return color;
};

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

const ChatArea = () => {
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
  const usernames = uniq(messages.map((m) => m.username));
  const colorMap = useMemo(
    () =>
      usernames.reduce(
        (acc, username) => ({ ...acc, [username]: getUserColor(username) }),
        {}
      ),
    [usernames.length]
  );
  console.log(colorMap);

  return (
    <Container>
      {!loading &&
        messages.map(({ id, username, content }, index) => (
          <Message
            key={id}
            color={username !== currentUsername ? colorMap[username] : null}
            username={username}
            content={content}
          />
        ))}
    </Container>
  );
};

export default ChatArea;
