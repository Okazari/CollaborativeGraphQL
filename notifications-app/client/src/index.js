import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import registerServiceWorker from './registerServiceWorker';
import Config from './config';
import Views from './views';

const wsLink = new WebSocketLink({
    uri: `ws://${Config.api.websocket.host}:${Config.api.websocket.port}${Config.api.websocket.endpoint}`,
    options: {
        reconnect: true,
    },
});

const httpLink = new HttpLink({
    uri: `http://${Config.api.http.host}:${Config.api.http.port}${Config.api.http.endpoint}`,
});

const link = split(({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
}, wsLink, httpLink);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <Views />
    </ApolloProvider>, document.getElementById('root'));
registerServiceWorker();
