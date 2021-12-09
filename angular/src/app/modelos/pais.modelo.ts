export class Pais{
    constructor(
      public _id: String,
      public nombre:String,
      public idRegion: {
        nombre: String;
      },
      public tarifa: Number
    ){}
  }