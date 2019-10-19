import * as React from 'react'
import { NotificationContext } from "./NotificationProvider";
// export type Props = {
//     data : any[]
// }

export const NotificationList = () => {

  const { notifications } = React.useContext(NotificationContext);
  return (
    <React.Fragment>
      {notifications.map((notification: any, index: number) => {
        return <h3 key={index}>{notification.message} - {notification.date}</h3>
      })}
    </React.Fragment>
  )

}
