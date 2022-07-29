import { Component, OnInit } from '@angular/core';
import { RecetasModel } from 'src/app/model/recetas/recetas.model';
import { RecetasRestService } from 'src/app/services/RecetasRest/recetas-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recetas: any=[];

  constructor(
    private receRest: RecetasRestService,
  ) { }

  ngOnInit(): void {
    this.getAllPrescriptions();
  }


  getAllPrescriptions(){
    this.receRest.getAllPrescriptions().subscribe({
      next:(res:any)=>{
        this.recetas= res.getPres;
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };
}
