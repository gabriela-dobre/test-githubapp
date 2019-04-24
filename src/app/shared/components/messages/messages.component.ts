import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from '../../models/message.model';
import { LoaderService } from '../../services/loader.service';
import { MessagesService } from '../../services/messages.services';
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService]
})
export class MessagesComponent implements OnInit, OnDestroy {

    private addMessageSubscription: Subscription;
    private clearMessageSubscription: Subscription;

    message: Message;
    display = false;

    @ViewChild('alertModal') alertModalElem: ElementRef;

    constructor(private messagesService: MessagesService, private loaderService: LoaderService, 
        private cd: ChangeDetectorRef, private confirmationService: ConfirmationService) {}

    ngOnInit() {
        this.addMessageSubscription = this.messagesService.addMessage$.subscribe(
            (data: Message) => {
                this.message = data;
               
                this.confirmationService.confirm({
                    message: this.message.details,
                    header: this.message.type.toString(),
                    icon: 'pi pi-exclamation-triangle',
                    accept: () => {
                    }
                });

                this.cd.detectChanges();
            }
        );

        this.clearMessageSubscription = this.messagesService.clearMessage$.subscribe(
            () => {
                this.message = null;
                this.cd.detectChanges();
            }
        );
    }

    showDialog() {
        this.display = true;
    }

    ngOnDestroy() {
        this.addMessageSubscription.unsubscribe();
        this.clearMessageSubscription.unsubscribe();
      }

}
