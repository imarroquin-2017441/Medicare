import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchMedi'
})
export class SearchMediPipe implements PipeTransform {

  transform(medicine:any, search:any){
    if(search == undefined){
      return medicine;
    }else{
      return medicine.filter( (medicine:any) => {
        return medicine.name.toLowerCase().includes(search.toLowerCase())

      })
    } 
  };

}
