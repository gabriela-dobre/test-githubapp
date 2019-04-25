import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  /**
   * redirects to another page url
   * @param page the specific page
   */
  goTo(page: string) {
    this.router.navigate(['/'+ page]);
  }

}
