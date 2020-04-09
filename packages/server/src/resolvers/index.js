import { PubSub } from "graphql-yoga";
import faker from "faker";

const pubsub = new PubSub();
const messages = [];

export default {
  Query: {
    messages: () => messages.sort((m1, m2) => m2.timestamp - m1.timestamp),
  },
  Mutation: {
    addMessage: (_, { username, content }) => {
      const message = {
        id: faker.random.uuid(),
        timestamp: Date.now(),
        username,
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
