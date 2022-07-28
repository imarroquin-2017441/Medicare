import { Component, OnInit } from '@angular/core';
import { MedicamentosModel } from 'src/app/model/medicamento/medicamentos.model';
import { MedicamentosRestService } from 'src/app/services/MedicamentosRest/medicamentos-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css']
})
export class MedicamentosComponent implements OnInit {

  medicines: any =[] ;
  medicine: MedicamentosModel;
  mediUpdate: any= [];

  constructor(
    public medicineRest: MedicamentosRestService,
  

  ) {
    this.medicine = new MedicamentosModel('','','','','',0);
   }

  ngOnInit(): void {
    this.getMedicines();
  }

  getMedicines(){
    this.medicineRest.getMedicines().subscribe({
      next:(res:any)=>{
        this.medicines= res.medicines;
        console.log(this.medicines);
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };

  addMedicine(addMedicineForm:any){
    this.medicineRest.addMedicine(this.medicine).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message ,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getMedicines()
        addMedicineForm.reset()
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
  };

  getMedicine(id: string){
    this.medicineRest.getMedicine(id).subscribe({
      next:(res:any)=>{this.mediUpdate= res.mediExist},
      error:(err)=>{alert(err.error.message)}
    })
  };

  updateMedicine(){
    this.medicineRest.updateMedicine(this.mediUpdate._id, this.mediUpdate).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.mediUpdate.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getMedicines()},
        error:(err)=> alert(err.error.message || err.error)
    })
  };

  deleteMedicine(id: string){
    this.medicineRest.deleteMedicine(id).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.mediDeleted.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getMedicines();
      },
       error:(err)=> alert(err.error.message || err.error)
    })
  };

}
