import { Component, OnInit } from '@angular/core';
import { UserAdminService } from 'src/app/services/UserARest/user-a.service';
import { UserModel } from 'src/app/model/user/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit {
  user: any=[];
  userM: UserModel;
  userUpdate={
    _id:"",name:"",username:"",email:"",phone:""
  }

  constructor(
    private userRest: UserAdminService
  ) { 
    this.userM = new UserModel('', '', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userRest.getUsers().subscribe({
      next:(res:any)=>{
        this.user= res.users;
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };
  getUserId(idUsers:any){
    this.userRest.getUserId(idUsers).subscribe({
      next: (res:any)=> {
        this.userUpdate._id = res.usersA._id;
        this.userUpdate.name = res.usersA.name;
        this.userUpdate.username= res.usersA.username;
        this.userUpdate.email = res.usersA.email;
        this.userUpdate.phone= res.usersA.phone;
      },
      error: (err)=> {
        console.log(err);
      }
    });
  }
  updateuserAdmin(){
    this.userRest.updateuserAdmin(this.userUpdate._id, this.userUpdate).subscribe({
      next: (res:any)=>{
        Swal.fire({
          title: res.message ,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getUsers();
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
  };
  deleteUserA(idUser:any){
    this.userRest.deleteUserA(idUser).subscribe({
      next: (res:any)=>{
        Swal.fire({
          title: res.message ,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getUsers();
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
  };
}
