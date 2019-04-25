import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/baseComponent';
import { MessagesService } from 'src/app/shared/services/messages.services';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { DataStorageService } from 'src/app/shared/services/dataStorage.service';
import { UserDetailsDTO } from 'src/app/modules/users/models/UserDetailsDTO';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent extends BaseComponent implements OnInit {

  //selected user details object
  user: UserDetailsDTO;
  
  constructor(protected messagesService: MessagesService,
    protected loaderService: LoaderService,
    protected dataStorageService: DataStorageService,
    private route: ActivatedRoute) {
    super(messagesService, loaderService);
  }

  ngOnInit() {
    //the name of the user is retrieved from url 
    let username = this.route.snapshot.paramMap.get("name");
    //and the details are displayed
    this.getUserDetails(username);
  }

  /**
   * get details of the specified user
   * @param username the name of the selected user
   */
  getUserDetails(username: string) {
    this.loaderService.show();
    this.dataStorageService.getUserDetails(username).subscribe(res => {
      this.user = res;
      this.loaderService.hide();
    });
  }

}
