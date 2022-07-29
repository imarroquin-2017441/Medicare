import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userRest/user.service';
import { RecetasModel } from 'src/app/model/Mis-recetas/mis-recetas.model';
import { MisRecetasRestService } from 'src/app/services/misRecetasRest/mis-recetas-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-recetas',
  templateUrl: './mis-recetas.component.html',
  styleUrls: ['./mis-recetas.component.css']
})
export class MisRecetasComponent implements OnInit {
  recetas: any = [];
  receta: RecetasModel;
  recetasUpdate: any;


  constructor(
    public recetasRest: MisRecetasRestService, 
  ) {
    this.receta = new RecetasModel ('', '', '', '', '', '', 0);
   }

  ngOnInit(): void {
    this.getRecetas();
  }
  

  getRecetas(){
    this.recetasRest.getMyPrescriptions().subscribe({
      next:(res:any)=>{
        this.recetas= res.prescriptions;
        console.log(this.recetas);
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };


  getReceta(id: string){
    this.recetasRest.getMyPrescription(id).subscribe({
      next:(res:any)=>{this.recetasUpdate= res.presExist},
      error:(err)=>{alert(err.error.message)}
    })
  };

  updateReceta(){
    this.recetasRest.updateMyPrescription(this.recetasUpdate._id, this.recetasUpdate).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.presUpdated.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getRecetas()},
        error:(err)=> alert(err.error.message || err.error)
    })
  };

  deleteReceta(id: string){
    this.recetasRest.deleteMyPresciption(id).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getRecetas();
      },
       error:(err)=> alert(err.error.message || err.error)
    })
  };



}
