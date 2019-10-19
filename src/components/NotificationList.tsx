import * as React from 'react';
import { Notification } from "./utils";
import NotificationItem from './NotificationItem';
import { CSSTransition } from "react-transition-group";

type Props = {
    notifications: Notification[];
    onRequestHide: Function;
    enterTimeout: number;
    leaveTimeout: number;
}


export class NotificationList extends React.Component<Props> {

    static defaultProps = {
        notifications: []
    };

    handleRequestHide = notification => () => {
        const { onRequestHide } = this.props;
        if (onRequestHide) {
            onRequestHide(notification);
        }
    };

    render() {

        return (
            <div>
                <CSSTransition
                    classNames={{
                        exit : 'notification-exit',
                        enter : 'notification-enter',
                        exitActive: 'notification-exit-active',
                        enterActive : 'notification-enter-active'
                    }}

                    timeout={{
                        appear: this.props.enterTimeout,
                        exit: this.props.leaveTimeout
                    }}>
                    <div>
                        {this.props.notifications.map((notification) => {
                            return <NotificationItem
                                key={notification.id}
                                notification={notification}
                                timeOut={this.props.enterTimeout}
                                onRequestHide={this.props.onRequestHide}
                            />
                        })}
                    </div>
                </CSSTransition>
            </div>
        );
    }
}
