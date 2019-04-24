import { Component, OnInit } from '@angular/core';
import { RepoDetailsService } from '../services/repoDetails.service';
import { RepoDetailsDTO } from 'src/app/shared/models/RepoDetailsDTO';
import { DataStorageService } from 'src/app/shared/services/dataStorage.service';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.css'],
  providers: [RepoDetailsService]
})
export class RepoDetailsComponent implements OnInit {

  repo: RepoDetailsDTO;

  constructor(protected repoDetailsService: RepoDetailsService, 
    protected dataStorageService: DataStorageService) { }

  ngOnInit() {
    
    this.repoDetailsService.repoDetailsSubject$.subscribe(res => {
      //iau owner si repo din obiect
      this.dataStorageService.getRepoDetails(res.owner, res.repoName).subscribe(data => {
        this.repo = data;
      });
    });
  }

}
