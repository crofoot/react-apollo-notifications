export class Notification {
    id: string;
    data: any;
    timeout: number = 1000;

    constructor(data, timeout = 1000) {
        this.id = uuid();
        this.data = data;
        this.timeout = timeout
    }
}

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
