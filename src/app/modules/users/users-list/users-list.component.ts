import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/baseComponent';
import { MessagesService } from 'src/app/shared/services/messages.services';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { DataStorageService } from 'src/app/shared/services/dataStorage.service';
import { UsersDTO } from 'src/app/shared/models/UsersDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent extends BaseComponent implements OnInit {

  @ViewChild("usersFilter") usersFilter: ElementRef;
  users: UsersDTO[];

  constructor(protected messagesService: MessagesService, 
    protected loaderService: LoaderService,
    protected dataStorageService: DataStorageService,
    public router: Router
    ) { 
      super(messagesService, loaderService);
    }

  ngOnInit() {
    this.getUsersList('');
  }

  showUsers(e) {
    this.getUsersList(e.target.value);
  }

  getUsersList(filter: string) {
    this.loaderService.show();
    this.dataStorageService.getUsersList().subscribe(res => {
//       if(res["message"]) {
// throw new Error(res["message"]);
//       }
// else {
      this.users = res.filter((user: UsersDTO) => user.login.includes(filter));
//}
      this.loaderService.hide();
    }); 
  }

  showUserDetails(username: string) {
    let url = this.router.createUrlTree(["/user/" + username]);
    window.open(url.toString(), "_blank");
  }

}
