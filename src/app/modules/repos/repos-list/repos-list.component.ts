import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/baseComponent';
import { MessagesService } from 'src/app/shared/services/messages.services';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { DataStorageService } from 'src/app/shared/services/dataStorage.service';
import { ReposDTO } from 'src/app/shared/models/ReposDTO';
import { RepoDetailsService } from '../services/repoDetails.service';
import { RepoReq } from '../models/RepoReq';

@Component({
  selector: 'app-repos-list',
  templateUrl: './repos-list.component.html',
  styleUrls: ['./repos-list.component.css'],
  providers: [RepoDetailsService]
})
export class ReposListComponent extends BaseComponent implements OnInit {

  @ViewChild("reposFilter") reposFilter: ElementRef;
  repos: ReposDTO[];
  
  constructor(protected messagesService: MessagesService, 
    protected loaderService: LoaderService,
    protected dataStorageService: DataStorageService,
    protected repoDetailsService: RepoDetailsService) { 
      super(messagesService, loaderService);
    }

  ngOnInit() {
    this.getReposList('');
  }

  showUsers(e) {
    this.getReposList(e.target.value);
  }

  getReposList(filter: string) {
    this.loaderService.show();
    this.dataStorageService.getReposList().subscribe(res => {
      this.repos = res.filter((repo: ReposDTO) => repo.name.includes(filter));
      this.loaderService.hide();
    }); 
  }

  showRepoDetails(repo: ReposDTO) {
    this.repoDetailsService.showDetails(<RepoReq>{owner: repo.owner.login, repoName: repo.name});
  }

}
