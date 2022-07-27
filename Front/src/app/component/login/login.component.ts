import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/user/user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userRest/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserModel;

  constructor(
    private userRest: UserService,
    private router: Router
  ) {
    this.user = new UserModel('', '', '', '', '', '', '')
   }

  ngOnInit(): void {
  }
  login(){
    this.userRest.getLoginUser(this.user).subscribe({
      next: (res: any)=>{
        alert(res.message);
        localStorage.setItem('token', res.token);
        localStorage.setItem('identity', JSON.stringify(res.already));
        this.router.navigateByUrl('home');
      },
      error: (err)=> alert(err.error.message || err.error)
    })
  }
}
