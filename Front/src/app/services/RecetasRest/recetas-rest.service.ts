import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from '../userRest/user.service';

@Injectable({
  providedIn: 'root'
})
export class RecetasRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken()
  })

  constructor(
    private userRest: UserService,
    private http: HttpClient
  ) { }
  getAllPrescriptions(){
    return this.http.get(environment.baseUrl + 'prescription/getAllPrescriptions', {headers:this.httpOptions});
  }
  getPrescriptionId(id:string){
    return this.http.get(environment.baseUrl + 'prescription/getPrescription/'+ id, {headers: this.httpOptions});
  }
  deletePrescription(id:string){
    return this.http.delete(environment.baseUrl + 'prescription/deletePrescriptionByAdmin/' + id, {headers:this.httpOptions});
  }
  updatePrescription(id:string, params:{}){
    return this.http.put(environment.baseUrl + 'prescription/updatePrescriptionByAdmin/'+id,params,{headers:this.httpOptions});
  }
}
