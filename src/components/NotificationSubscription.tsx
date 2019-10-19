import * as React from 'react';
import { Subscription, QueryResult } from "react-apollo";
import { NotificationContext, NotificationContextType } from "./NotificationProvider";

type Props = {
    subscription: any
}

export class NotificationSubscription extends React.Component<Props> {

    shouldComponentUpdate(){
        return false;
    }

    render() {
        return (
            <NotificationContext.Consumer>
                {(props: NotificationContextType) => {
                    console.log(props)
                    return (
                        <Subscription subscription={this.props.subscription} fetchPolicy="no-cache">
                            {(results: QueryResult) => {
                                if (results.loading) return null;
                                if (results.data) {
                                    props.pushNotifications(results.data[Object.keys(results.data)[0]])
                                }
                                return null;
                            }}
                        </Subscription>
                    );
                }}
            </NotificationContext.Consumer>
        );
    }
}

// export const NotificationSubscription = ({ subscription }: { subscription: any }) => {
//     const { pushNotifications } = React.useContext(NotificationContext);

//     return (
//         <Subscription subscription={subscription}>
//             {(results: QueryResult) => {
//                 if (results.loading) return null;
//                 console.log('Rerendering...', results.data)
//                 if (results.data) {
//                     pushNotifications(results.data[Object.keys(results.data)[0]])
//                 }
//                 return null;
//             }}
//         </Subscription>
//     )


// }
