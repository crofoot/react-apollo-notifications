import './styles.css';
import * as React from 'react';
import { Subscription, SubscriptionResult } from "react-apollo";
import NotificationCreator from './components/NotificationManager';
import NotificationContainer from './components/NotificationContainer';


type Props = {
  subscription: any;
  enterTimeout?: number;
  leaveTimeout?: number;
}



export class Notifications extends React.Component<Props> {

  render() {
    return (
      <React.Fragment>
        <Subscription subscription={this.props.subscription} fetchPolicy="no-cache">
          {(results: SubscriptionResult) => {
            if (results.loading && results.data === undefined) return null;
            if (results.data) {
              setTimeout(() => {
                NotificationCreator.create(results.data[Object.keys(results.data)[0]]);
              }, 0);
            }
            return null;
          }}
        </Subscription>
        <NotificationContainer
          enterTimeout={(this.props.enterTimeout ? this.props.enterTimeout : 4000)}
          leaveTimeout={(this.props.leaveTimeout ? this.props.leaveTimeout : 4000)}
        />
      </React.Fragment>
    )
  }

}

