import * as React from "react";

export class NotificationContextType {
    notifications: any[];
    pushNotifications: Function
}

export const NotificationContext = React.createContext(new NotificationContextType());

class Counter {
    count: number = 1;
}

export const NotificationProvider = (props: any) => {
    const [notifications, setNotifications] = React.useState<any[]>([]);
    // const [count, setCount] = React.useState(1);

    const counter = new Counter();

    const pushNotifications = (data: any) => {
        if (notifications.length < counter.count)
            setNotifications([...notifications, data])
        else {
            counter.count++;
        }
    }

    return (
        <NotificationContext.Provider value={{
            notifications,
            pushNotifications
        }}>
            {props.children}
        </NotificationContext.Provider>
    );
}