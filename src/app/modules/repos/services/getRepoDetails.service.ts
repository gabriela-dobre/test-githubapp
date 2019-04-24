import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RepoDetailsDTO } from 'src/app/shared/models/RepoDetailsDTO';
import { ReposDTO } from 'src/app/shared/models/ReposDTO';

@Injectable()
export class GetRepoDetailsService {
    private repoDetailsSubject = new Subject<ReposDTO>();
    repoDetailsSubject$ = this.repoDetailsSubject.asObservable();

    constructor() { }

    showDetails(repo: ReposDTO) {
        this.repoDetailsSubject.next(repo);
    }

}

