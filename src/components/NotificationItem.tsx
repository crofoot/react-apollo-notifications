import * as React from 'react';
import { Notification } from "./utils";


type Props = {
    timeOut: number;
    onClick?: Function;
    notification: Notification;
    onRequestHide?: Function;
}


class NotificationComponent extends React.Component<Props> {

    timer: any;

    componentDidMount() {
        if (this.props.timeOut !== 0) {
            this.timer = setTimeout(this.requestHide, this.props.timeOut);
        }

    };

    UNSAFE_componentWillMount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    };

    handleClick = () => {
        if (this.props.onClick) {
            this.props.onClick();
        }
        this.requestHide();
    };

    requestHide = () => {
        if (this.props.onRequestHide) {
            this.props.onRequestHide(this.props.notification);
        }
    };

    render() {

        return (
            <div className='notification' onClick={this.handleClick}>
                <div className="notification-message" role="alert">
                    <div className="message">{this.props.notification.data.message} - {this.props.notification.data.date}</div>
                </div>
            </div>
        );
    }
}

export default NotificationComponent;