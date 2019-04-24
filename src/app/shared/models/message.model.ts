import { MessageType } from '../enums/messageType.enum';

export class Message {
    type?: MessageType;
    summary: string;
    details: string;

    constructor() {
        this.type = null;
        this.summary = '';
        this.details = '';
    }
}
