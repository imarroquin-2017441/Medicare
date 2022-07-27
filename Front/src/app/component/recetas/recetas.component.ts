import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userRest/user.service';
import { RecetasModel } from 'src/app/model/recetas/recetas.model';
import { RecetasRestService } from 'src/app/services/RecetasRest/recetas-rest.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent implements OnInit {
  recetas: any=[];
  recetasM: RecetasModel;
  receUpdate={
    _id:"",name:"",description:"",ingredients:"",preparation:0
  }
  role: String="";

  constructor(
    private receRest: RecetasRestService,
    private userRest: UserService
  ) {
    this.recetasM = new RecetasModel('', '', '', '', '','', 0,);
  }

  ngOnInit(): void {
    this.getAllPrescriptions();
    this.role = this.userRest.getIdentity().role;
  }
  getAllPrescriptions(){
    this.receRest.getAllPrescriptions().subscribe({
      next:(res:any)=>{
        this.recetas= res.getPres;
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };

  getPrescriptionId(idRece:any){
    this.receRest.getPrescriptionId(idRece).subscribe({
      next: (res:any)=> {
        this.receUpdate._id = res.presExist._id;
        this.receUpdate.name = res.presExist.name;
        this.receUpdate.description= res.presExist.description;
        this.receUpdate.ingredients = res.presExist.ingredients;
        this.receUpdate.preparation= res.presExist.preparation;
      },
      error: (err)=> {
        console.log(err);
      }
    });
  }
  updatePrescription(){
    this.receRest.updatePrescription(this.receUpdate._id, this.receUpdate).subscribe({
      next: (res:any)=>{alert(res.message);
        this.getAllPrescriptions();
      },
      error: (err)=> alert(err.error.message || err.error)
    });
  }
  deletePrescription(idRece:any){
    this.receRest.deletePrescription(idRece).subscribe({
      next: (res:any)=>{alert(res.message);
        this.getAllPrescriptions();
      },
      error: (err)=> alert(err.error.message || err.error)
    })
  }

}
