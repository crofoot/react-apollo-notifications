import * as React from 'react';
import { Notification } from './utils';
import { NotificationList } from './NotificationList';
import NotificationManager from './NotificationManager';

type Props = {
    enterTimeout: number;
    leaveTimeout: number;
}

type State = {
    notifications: Notification[];
}


class NotificationContainer extends React.Component<Props, State> {

    state = {
        notifications: []
    };

    UNSAFE_componentWillMount() {
        NotificationManager.addChangeListener(this.handleStoreChange);
    };

    componentWillUnmount() {
        NotificationManager.removeChangeListener(this.handleStoreChange);
    };

    handleStoreChange = (notifications) => {
        this.setState({
            notifications
        });
    };

    handleRequestHide = (notification) => {
        NotificationManager.remove(notification);
    };

    render() {

        return (
            <NotificationList
                enterTimeout={this.props.enterTimeout}
                leaveTimeout={this.props.leaveTimeout}
                notifications={this.state.notifications}
                onRequestHide={this.handleRequestHide}
            />
        );
    }
}

export default NotificationContainer;