import { EventEmitter } from 'events';
import { Notification } from "./utils";

class NotificationManager extends EventEmitter {

    notifications: Notification[];

    constructor() {
        super();
        this.notifications = [];
    }

    create(message) {
        let n = new Notification(message);
        this.notifications.push(n);
        this.emitChange();
    }


    remove(notification) {
        this.notifications = this.notifications.filter(n => notification.id !== n.id);
        this.emitChange();
    }

    emitChange() {
        this.emit('change', this.notifications);
    }

    addChangeListener(callback) {
        this.addListener('change', callback);
    }

    removeChangeListener(callback) {
        this.removeListener('change', callback);
    }
}

export default new NotificationManager();