import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchRece'
})
export class SearchRecePipe implements PipeTransform {

  transform(recetasM:any, search:any){
    if(search == undefined){
      return recetasM;
    }else{
      return recetasM.filter( (recetasM:any) => {
        return recetasM.name.toLowerCase().includes(search.toLowerCase())

      })
    } 
  };

}
