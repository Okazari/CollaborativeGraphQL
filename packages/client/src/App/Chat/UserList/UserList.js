import React, { useEffect } from "react";
import { Box, Rows, Label, Cols, getUserColor, useUser } from "../../common";
import styled from "styled-components";
import gql from "graphql-tag";
import get from "lodash/get";
import { useQuery } from "react-apollo";

const query = gql`
  query {
    users {
      id
      username
    }
  }
`;

const subscription = gql`
  subscription {
    userConnected {
      id
      username
    }
  }
`;

const Username = styled.div`
  color: ${({ color }) => color};
`;

const Chip = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const UsernameLabel = styled.div`
  max-width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
`;

const UserList = () => {
  const { data, subscribeToMore } = useQuery(query, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    subscribeToMore({
      document: subscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newUser = get(subscriptionData, "data.userConnected");
        console.log(newUser);
        return {
          users: [...prev.users, newUser],
        };
      },
    });
  }, [subscribeToMore]);
  const user = useUser();
  const users = get(data, "users", []);
  return (
    <Cols layout="300px">
      <Box>
        <Rows>
          <Label>Connected Users</Label>
          <Rows gap=".5rem">
            {users.map(({ username, id }) => (
              <Username key={id}>
                <Cols layout="auto" gap="0.5rem" verticalAlign="center">
                  <Chip
                    color={user.id === id ? "#b7e0b7" : getUserColor(username)}
                  />
                  <UsernameLabel>
                    {username} {user.id === id && "(you)"}
                  </UsernameLabel>
                </Cols>
              </Username>
            ))}
          </Rows>
        </Rows>
      </Box>
    </Cols>
  );
};
export default UserList;
