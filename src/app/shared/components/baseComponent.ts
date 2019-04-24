import { MessagesService } from "../services/messages.services";
import { LoaderService } from "../services/loader.service";

export class BaseComponent {
  constructor(
    protected messagesService: MessagesService,
    protected loaderService: LoaderService
  ) {
    this.messagesService.onClearMessage();
  }
}
