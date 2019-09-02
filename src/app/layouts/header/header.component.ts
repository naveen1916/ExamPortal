import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  show = false;
  showMenu = false;
  userName: string;
  constructor() {
    this.userName = 'VENKATESH';
  }

  ngOnInit() {
  }
  toggleCollapse() {
    this.show = !this.show;
  }
  toggleCollapseMenu() {
    this.showMenu = !this.showMenu;
    console.log(this.showMenu);
  }
}
