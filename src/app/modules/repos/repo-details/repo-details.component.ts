import { Component, OnInit, Input } from '@angular/core';
import { RepoDetailsDTO } from 'src/app/modules/repos/models/RepoDetailsDTO';
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
  providers: [PartialRepoDetailsService]
})
export class RepoDetailsComponent implements OnInit {

  @Input() selectedRepo: RepoDetailsDTO;

  constructor(protected partialRepoDetailsService: PartialRepoDetailsService,
    protected dataStorageService: DataStorageService,
    private router: Router,
    protected messagesService: MessagesService) { }

  ngOnInit() {
    //checkes page url changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.partialRepoDetailsService.savePartialData(this.selectedRepo);
      }
    });

    //get value for repo from storred value
    this.selectedRepo = this.partialRepoDetailsService.currentRepoValue;
  }

  /**
   * edits a repo details
   * @param repo the repo object to be saved
   */
  editRepo(repo: RepoDetailsDTO) {
    let editRepo = new EditRepoReq();
    editRepo.description = repo.description;
    editRepo.homepage = repo.homepage;
    editRepo.private = repo.private;

    this.dataStorageService.editRepoDetails(repo.owner.login, repo.name, editRepo)
      .subscribe(data => {
        this.selectedRepo = data;

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


}
