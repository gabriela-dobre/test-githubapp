import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from '../models/loader.model';

@Injectable()
export class LoaderService {
    private loaderSubject = new Subject<LoaderState>();
    loaderSubject$ = this.loaderSubject.asObservable();

    constructor() { }

    show() {
        this.loaderSubject.next(<LoaderState>{ IsVisible: true });
    }

    hide() {
        this.loaderSubject.next(<LoaderState>{ IsVisible: false });
    }
}

