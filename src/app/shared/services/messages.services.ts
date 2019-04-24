import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../models/message.model';


@Injectable({providedIn: 'root'})
export class MessagesService {

    private addMessage = new Subject<Message>();
    addMessage$ = this.addMessage.asObservable();

    private clearMessage = new Subject();
    clearMessage$ = this.clearMessage.asObservable();

    constructor() {
        this.clearMessage.next();
    }

    onAddMessage(message: Message) {
        this.addMessage.next(message);
    }

    onClearMessage() {
        this.clearMessage.next();
    }
}
