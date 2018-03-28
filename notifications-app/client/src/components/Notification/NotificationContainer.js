import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const MessagesQuery = gql`
    query getMessages {
        messages {
            id
            username
            content
        }
    }
`;

const NotificationSubscription = gql`
    subscription onMessageAdded {
        messageAdded {
            id
            username
            content
        }
    }
`;

export default NotificationComponent =>
    <Query query={MessagesQuery}>
      {({ subscribeToMore, ...res }) => (
        <NotificationComponent
          {...res}
          subscribeToNewMessages={() =>
            subscribeToMore({
              document: NotificationSubscription,
              updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev;
                  const newMessage = subscriptionData.data.messageAdded;
                  return { messages: [newMessage, ...prev.messages] };
              }
            })
          }
        />
      )}
    </Query>
  ;