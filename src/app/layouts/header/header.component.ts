import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  show = false;
  showMenu = false;
  userName: string;
  admin:boolean=false
  constructor(private router:Router) {
  }

  ngOnInit() {
    var profile :any=JSON.parse(localStorage.getItem('user'))
  console.log(profile)
    if(profile &&profile.name) {
      this.userName = profile.name;
     
    }
    if(profile &&profile.role=='admin'){
      this.admin=true
    }else{
      this.admin=false
    }
  }
  toggleCollapse() {
    this.show = !this.show;
  }
  toggleCollapseMenu() {
    this.showMenu = !this.showMenu;
    console.log(this.showMenu);
  }
  logout(){
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    this.router.navigate(['/'])

  }
}
