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
  font-weight: 700;
`;

const UserList = () => {
  const { data, subscribeToMore } = useQuery(query);

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
              <Username
                key={id}
                color={user.id === id ? "#b7e0b7" : getUserColor(username)}
              >
                {username} {user.id === id && "(you)"}
              </Username>
            ))}
          </Rows>
        </Rows>
      </Box>
    </Cols>
  );
};
export default UserList;
