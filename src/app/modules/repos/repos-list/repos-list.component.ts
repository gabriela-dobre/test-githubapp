import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/baseComponent';
import { MessagesService } from 'src/app/shared/services/messages.services';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { DataStorageService } from 'src/app/shared/services/dataStorage.service';
import { ReposDTO } from 'src/app/modules/repos/models/ReposDTO';
import { PartialRepoDetailsService } from '../services/partialRepoDetails.service';
import { RepoDetailsDTO } from 'src/app/modules/repos/models/RepoDetailsDTO';

@Component({
  selector: 'app-repos-list',
  templateUrl: './repos-list.component.html',
  styleUrls: ['./repos-list.component.css'],
  providers: [PartialRepoDetailsService]
})
export class ReposListComponent extends BaseComponent implements OnInit {

  @ViewChild("reposFilter") reposFilter: ElementRef;
  repos: ReposDTO[];
  selectedRepo: RepoDetailsDTO;
  editedRepoName: string;

  constructor(protected messagesService: MessagesService,
    protected loaderService: LoaderService,
    protected dataStorageService: DataStorageService,
    protected partialRepoDetailsService: PartialRepoDetailsService
    , private cd: ChangeDetectorRef) {
    super(messagesService, loaderService);
  }

  ngOnInit() {
    //gets storred repoName (if exists)
    this.editedRepoName = this.partialRepoDetailsService.currentRepoValue == null ? '' : this.partialRepoDetailsService.currentRepoValue.name;

    //lists all repositories
    this.getReposList('');
  }

  /**
   * filters repos by name
   * @param $event 
   * @param name the name value that filters the result
   */
  showRepos($event, name) {
    setTimeout(() => {
      this.getReposList(name);
    }, 400);
  }

  /**
   * lists all repos, filtering by name
   * @param filter the name value that filters the result
   */
  getReposList(filter: string) {
    this.loaderService.show();
    this.dataStorageService.getReposList().subscribe(res => {
      this.repos = res.filter((repo: ReposDTO) => repo.name.includes(filter));
      this.loaderService.hide();
    });
  }

  /**
   * gets de selected repo details objects
   * @param repo selected repo
   */
  showRepoDetails(repo: ReposDTO) {
    this.dataStorageService.getRepoDetails(repo.owner.login, repo.name).subscribe(data => {
      this.selectedRepo = data;
      this.editedRepoName = repo.name;
    });
    
  }

}
