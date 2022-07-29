import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from '../userRest/user.service';

@Injectable({
  providedIn: 'root'
})
export class MisRecetasRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken()
  })
  constructor(
    private userRest: UserService,
    private http: HttpClient
  ) { }

  getMyPrescriptions(){
    return this.http.get(environment.baseUrl + 'prescription/getPrescriptionsByUser',{headers:this.httpOptions});
  };

  getMyPrescription(id: string){
    return this.http.get(environment.baseUrl + 'prescription/getPrescription/' + id, {headers:this.httpOptions});
  };
  
  updateMyPrescription(id:string, params:{}){
    return this.http.put(environment.baseUrl + 'prescription/updatePrescriptions/' + id, params,  {headers: this.httpOptions});
   };
  
   deleteMyPresciption(id: string){
    return this.http.delete(environment.baseUrl + 'prescription/deletePrescription/' + id, {headers: this.httpOptions});
   };
}
