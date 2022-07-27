import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userRest/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  role: String = '';
  token: String ='';

  constructor(
    public userRest: UserService
  ) { }

  ngOnInit(): void {
    this.role = this.userRest.getIdentity().role;
    this.token = this.userRest.getToken();
  }
  logOut(){
    localStorage.clear();
  }
}
