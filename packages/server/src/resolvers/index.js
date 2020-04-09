import { PubSub } from "graphql-yoga";
import faker from "faker";
import { GraphQLError } from "graphql";

const pubsub = new PubSub();
const messages = [];
const users = {};

const findUserByUsername = (usernameToSearch) => {
  const user = Object.entries(users).find(
    ([_, { username }]) => username === usernameToSearch
  );
  return user && user[1];
};

export default {
  Query: {
    messages: () =>
      messages
        .filter((m) => !!m.user)
        .sort((m1, m2) => m2.timestamp - m1.timestamp),
  },
  Mutation: {
    connectUser: (_, { user }) => {
      if (!findUserByUsername(user.username)) {
        const id = faker.random.uuid();
        const newUser = {
          id,
          ...user,
        };
        users[id] = newUser;
        return newUser;
      } else {
        const foundUser = findUserByUsername(user.username);
        console.log(foundUser, foundUser.key, user.key);
        if (user.key === foundUser.key) return foundUser;
        else throw new GraphQLError("WRONG KEY");
      }
    },
    addMessage: (_, { userId, content }) => {
      if (!users[userId]) throw new GraphQLError("NOT A REAL USER");
      const message = {
        id: faker.random.uuid(),
        timestamp: Date.now(),
        user: users[userId],
        content,
      };
      messages.unshift(message);
      pubsub.publish("messageAdded", { messageAdded: message });
      return message;
    },
  },
  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator("messageAdded"),
    },
  },
};
