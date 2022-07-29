import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/user/user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userRest/user.service';
import Swal from 'sweetalert2';

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
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        localStorage.setItem('token', res.token);
        localStorage.setItem('identity', JSON.stringify(res.already));
        this.router.navigateByUrl('home');
      },
      error:(err)=>{
        Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    }
    })
  }
}
