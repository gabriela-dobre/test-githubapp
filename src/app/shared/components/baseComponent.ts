import { MessagesService } from "../services/messages.services";
import { LoaderService } from "../services/loader.service";

/**
 * the base component object that stores the common components
 */
export class BaseComponent {
  constructor(
    protected messagesService: MessagesService,
    protected loaderService: LoaderService
  ) {
    this.messagesService.onClearMessage();
  }
}
