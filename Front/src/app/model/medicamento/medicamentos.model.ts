export class MedicamentosModel {
    constructor(
        public id: String,
        public user: String,
        public name: String,
        public description: String,
        public salesPlace: String,
        public averagePrice: Number
    ){
  
    }
  }