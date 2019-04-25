import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { RepoDetailsDTO } from 'src/app/modules/repos/models/RepoDetailsDTO';


@Injectable()
export class PartialRepoDetailsService {
    private currentRepoSubject: BehaviorSubject<RepoDetailsDTO>;
    private currentRepoObject: Observable<RepoDetailsDTO>;

    constructor() { 
        if(sessionStorage.getItem('currentRepo')){
            this.currentRepoSubject = new BehaviorSubject<RepoDetailsDTO>(JSON.parse(sessionStorage.getItem('currentRepo')));
           }
           else{
               this.currentRepoSubject = new BehaviorSubject<RepoDetailsDTO>(null);
           }
   
           this.currentRepoObject = this.currentRepoSubject.asObservable();
    }

    savePartialData(repo: RepoDetailsDTO) {
        sessionStorage.setItem('currentRepo', JSON.stringify(repo));
        this.currentRepoSubject.next(repo);
    }

    public get currentRepoValue(): RepoDetailsDTO {
        return this.currentRepoSubject.value;
    }
 
}

