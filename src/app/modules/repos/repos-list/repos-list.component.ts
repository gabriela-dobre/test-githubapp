import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/baseComponent';
import { MessagesService } from 'src/app/shared/services/messages.services';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { DataStorageService } from 'src/app/shared/services/dataStorage.service';
import { ReposDTO } from 'src/app/shared/models/ReposDTO';
import { GetRepoDetailsService } from '../services/getRepoDetails.service';
import { PartialRepoDetailsService } from '../services/partialRepoDetails.service';
import { RepoDetailsDTO } from 'src/app/shared/models/RepoDetailsDTO';

@Component({
  selector: 'app-repos-list',
  templateUrl: './repos-list.component.html',
  styleUrls: ['./repos-list.component.css'],
  providers: [GetRepoDetailsService, PartialRepoDetailsService]
})
export class ReposListComponent extends BaseComponent implements OnInit {

  @ViewChild("reposFilter") reposFilter: ElementRef;
  repos: ReposDTO[];
  selectedRepo: ReposDTO;
  editedRepoName: string;

  constructor(protected messagesService: MessagesService,
    protected loaderService: LoaderService,
    protected dataStorageService: DataStorageService,
    protected repoDetailsService: GetRepoDetailsService,
    protected partialRepoDetailsService: PartialRepoDetailsService) {
    super(messagesService, loaderService);
  }

  ngOnInit() {
    this.editedRepoName = this.partialRepoDetailsService.currentRepoValue == null ? '' : this.partialRepoDetailsService.currentRepoValue.name;

    this.getReposList('');
  }

  showUsers($event, name) {
    setTimeout(() => {
      this.getReposList(name);
    }, 400);
  }

  getReposList(filter: string) {
    this.loaderService.show();
    this.dataStorageService.getReposList().subscribe(res => {
      this.repos = res.filter((repo: ReposDTO) => repo.name.includes(filter));
      this.loaderService.hide();
    });
  }

  showRepoDetails(repo: ReposDTO) {
    this.selectedRepo = repo;
    this.editedRepoName = repo.name;
  }

}
