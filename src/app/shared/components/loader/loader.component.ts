import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
import { LoaderState } from '../../models/loader.model';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
  @Input() IsVisible = false;

  private subscription: Subscription;

  constructor(private loaderService: LoaderService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderSubject$
      .subscribe((state: LoaderState) => {
        this.IsVisible = state.IsVisible;
        this.cd.detectChanges();
      });
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

