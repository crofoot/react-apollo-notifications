import React from 'react'

import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default function App(props) {
    const uri = 'ws://localhost:4000/graphql';

    // Create an http link:
    const httpLink = new HttpLink({ uri });

    // Create a WebSocket link:
    const wsLink = new WebSocketLink({
        uri,
        options: {
            reconnect: true
        }
    });

    const link = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        httpLink,
    );

    const cache = new InMemoryCache();
    const client = new ApolloClient({ link, cache });

    return (
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider>
    )

}
