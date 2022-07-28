import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from '../userRest/user.service';

@Injectable({
  providedIn: 'root'
})
export class MedicamentosRestService {

  httOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.userRest.getToken()
  })

  constructor(
    private http: HttpClient,
    private userRest: UserService
  ) { }

  getMedicines(){
      return this.http.get(environment.baseUrl + 'medicine/getMedicines',{headers:this.httOptions});
    };

    addMedicine(params: {}){
      return this.http.post(environment.baseUrl + 'medicine/addMedicine',params, {headers:this.httOptions});
    };

    getMedicine(id: string){
      return this.http.get(environment.baseUrl + 'medicine/getMedicine/' + id, {headers:this.httOptions});
    };

    updateMedicine(id:string, params:{}){
      return this.http.put(environment.baseUrl + 'medicine/updateMedicine/' + id, params,  {headers: this.httOptions});
     };

     deleteMedicine(id: string){
      return this.http.delete(environment.baseUrl + 'medicine/deleteMedicine/' + id, {headers: this.httOptions});
     };
}
