import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RepoReq } from '../models/RepoReq';

@Injectable()
export class RepoDetailsService {
    private repoDetailsSubject = new Subject<RepoReq>();
    repoDetailsSubject$ = this.repoDetailsSubject.asObservable();

    constructor() { }

    showDetails(repo: RepoReq) {
        this.repoDetailsSubject.next(repo);
    }

}

