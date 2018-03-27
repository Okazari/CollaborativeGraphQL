import React from 'react';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';

const NotificationSubscription = gql`
    subscription onMessageAdded {
        messageAdded {
            username
            content
        }
    }
`;

export default NotificationComponent =>
    <Subscription subscription={NotificationSubscription}>
        {
            ({ data, loading }) => 
                <NotificationComponent data={data} loading={loading} />
        }
    </ Subscription>;