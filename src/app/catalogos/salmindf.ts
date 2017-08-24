/*
Marlon Gomez
23-08-2017
Salmin
*/

export class Salmindf {
	public id_salmindf:number;
	public fecha:Date;
	public importe:number;
	
	constructor (
		public mid_salmindf:number, public mfecha:Date, public mimporte:number){

		this.id_salmindf=mid_salmindf;
		this.fecha=mfecha;
		this.importe=mimporte;
	}

}
