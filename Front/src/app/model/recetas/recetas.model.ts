export class RecetasModel {
    constructor(
        public id: String,
        public user: String,
        public name: String,
        public description:String,
        public ingredients: String,
        public preparation: String,
        public like: Number
    ){
  
    }
  }