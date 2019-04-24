import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { GetRepoDetailsService } from '../services/getRepoDetails.service';
import { RepoDetailsDTO } from 'src/app/shared/models/RepoDetailsDTO';
import { DataStorageService } from 'src/app/shared/services/dataStorage.service';
import { EditRepoReq } from '../models/EditRepoReq';
import { Router, NavigationStart } from '@angular/router';
import { PartialRepoDetailsService } from '../services/partialRepoDetails.service';
import { MessagesService } from 'src/app/shared/services/messages.services';
import { Message } from 'src/app/shared/models/message.model';
import { MessageType } from 'src/app/shared/enums/messageType.enum';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.css'],
  providers: [GetRepoDetailsService, PartialRepoDetailsService]
})
export class RepoDetailsComponent implements OnInit, AfterViewInit {

  @Input() repo: RepoDetailsDTO;
  
  

  constructor(protected repoDetailsService: GetRepoDetailsService,
    protected partialRepoDetailsService: PartialRepoDetailsService,
    protected dataStorageService: DataStorageService,
    private router: Router, 
    protected messagesService: MessagesService) { }

  ngOnInit() {
    this.repoDetailsService.repoDetailsSubject$.subscribe(res => {
      //iau owner si repo din obiect
      this.dataStorageService.getRepoDetails(res.owner.login, res.name).subscribe(data => {
        this.repo = data;
      });
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.partialRepoDetailsService.savePartialData(this.repo);
      }
    });

    this.repo = this.partialRepoDetailsService.currentRepoValue;
  }

  ngAfterViewInit() {
    
  }

  editRepo(repo: RepoDetailsDTO) {
    var editRepo = new EditRepoReq();
    editRepo.description = repo.description;
    editRepo.private = repo.private;

    this.dataStorageService.editRepoDetails(repo.owner.login, repo.name, editRepo)
      .subscribe(data => {
        this.repo = data;

        //this.partialRepoDetailsService.savePartialData(null);

        let message: Message = new Message();
        message.type = MessageType.SUCCESS;
        message.summary = "Edit repo";
        message.details = "Edit with success!";
        this.messagesService.onAddMessage(message);
      },
        error => {
          let message: Message = new Message();
          message.type = MessageType.ERROR;
          message.summary = "Edit repo";
          message.details = "Error edit repo!";
          this.messagesService.onAddMessage(message);
        });;
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }

}
