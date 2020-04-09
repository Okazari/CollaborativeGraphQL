import { PubSub } from "graphql-yoga";

const pubsub = new PubSub();
const messages = [];

export default {
  Query: {
    messages: () => messages,
    message: (obj, { id }, ctx, info) => messages[parseInt(id)],
  },
  Mutation: {
    addMessage: (obj, { username, content }, ctx, info) => {
      const message = { id: messages.length.toString(), username, content };
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
