import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/baseComponent';
import { MessagesService } from 'src/app/shared/services/messages.services';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { DataStorageService } from 'src/app/shared/services/dataStorage.service';
import { UserDetailsDTO } from 'src/app/shared/models/UserDetailsDTO';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent extends BaseComponent implements OnInit {

  user: UserDetailsDTO;
  
  constructor(protected messagesService: MessagesService,
    protected loaderService: LoaderService,
    protected dataStorageService: DataStorageService,
    private route: ActivatedRoute) {
    super(messagesService, loaderService);
  }

  ngOnInit() {
    console.log('init user details comp');
    var username = this.route.snapshot.paramMap.get("name");
    this.getUserDetails(username);
  }

  getUserDetails(username: string) {
    this.loaderService.show();
    this.dataStorageService.getUserDetails(username).subscribe(res => {
      console.log('get user details');
      this.user = res;
      this.loaderService.hide();
    });
  }

}
