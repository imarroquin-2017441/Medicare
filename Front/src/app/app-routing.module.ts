import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { MedicamentosComponent } from './component/medicamentos/medicamentos.component';
import { MisRecetasComponent } from './component/mis-recetas/mis-recetas.component';
import { RecetasComponent } from './component/recetas/recetas.component';
import { RegisterComponent } from './component/register/register.component';






const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'recetas', component: RecetasComponent},
  {path: 'medicamentos',component: MedicamentosComponent},
  {path: 'mis-recetas',component: MisRecetasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
