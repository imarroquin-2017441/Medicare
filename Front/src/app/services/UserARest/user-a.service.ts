import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from '../userRest/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserAdminService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken()
  })

  constructor(
    private userRest: UserService,
    private http: HttpClient
  ) { }
  
  getUsers(){
    return this.http.get(environment.baseUrl + 'user/getUsers', {headers:this.httpOptions});
  };
  getUserId(id:string){
    return this.http.get(environment.baseUrl + 'user/getUserId/'+ id, {headers: this.httpOptions});
  }
  deleteUserA(id:string){
    return this.http.delete(environment.baseUrl + 'user/deleteUserByAdmin/' + id, {headers:this.httpOptions});
  }
  updateuserAdmin(id:string, params:{}){
    return this.http.put(environment.baseUrl + 'user/updateUserByAdmin/'+id,params,{headers:this.httpOptions});
  }
}
