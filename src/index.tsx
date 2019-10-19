import * as React from 'react'
import { NotificationList } from "./components/NotificationList";
import { NotificationProvider } from './components/NotificationProvider';
import { NotificationSubscription } from "./components/NotificationSubscription";

export type Props = {
  subscription: any
}

export class Notifications extends React.Component<Props> {

  render() {
    return (
      <NotificationProvider>
        <NotificationList />
        <NotificationSubscription subscription={this.props.subscription} />
      </NotificationProvider>
    )
  }

}
