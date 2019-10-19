# react-apollo-notifications

> Notification component that uses a GraphQL subscription query

[![NPM](https://img.shields.io/npm/v/react-apollo-notifications.svg)](https://www.npmjs.com/package/react-apollo-notifications) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-apollo-notifications
```

## Usage
* Clone [apollo-subscription-server](https://github.com/crofoot/apollo-subscription-server) to set up an apollo server with subscriptions 

* Calling Notifications (You don't have to make the ApolloWrapper you can include it in there)

```jsx
import React, { Component } from 'react';
import ApolloWrapper from "./ApolloWrapper";
import { Notifications } from 'react-apollo-notifications';
import gql from 'graphql-tag';


const NS = gql`
  subscription {
    subscribeToNotifications{
      message
      date
    }
  }
`;

export default class App extends Component {
  render() {
    return (
      <ApolloWrapper>
        <Notifications subscription={NS} />
      </ApolloWrapper>
    )
  }
}

```

* ApolloWrapper 

```jsx
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

```

## License

MIT © [crofoot](https://github.com/crofoot)
