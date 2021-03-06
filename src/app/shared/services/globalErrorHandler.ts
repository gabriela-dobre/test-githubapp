import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { MessagesService } from "src/app/shared/services/messages.services";
import { HttpErrorResponse } from "@angular/common/http";
import { Message } from "../models/message.model";
import { LoaderService } from "./loader.service";
import { MessageType } from '../enums/messageType.enum';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
      constructor(protected messagesService: MessagesService, protected loaderService: LoaderService) { }

      handleError(error: Error) {

            let message: Message = new Message();
            message.type = MessageType.ERROR;
            message.summary = error.name;

            if (error instanceof HttpErrorResponse) {
                  message.details = "There was an error with the API server - check console for details";
                  console.error("Handle Server Error", error);
            } else {
                  message.details = "There was an unexpected error (client side) - check console for details";
                  console.error("Handle Client Error", error);
            }

            this.messagesService.onAddMessage(message);

            this.loaderService.hide();
      }
}
