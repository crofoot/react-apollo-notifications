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
