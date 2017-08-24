/*
Marlon Gomez
23-08-2017
Salmin
*/

export class Salmin {
	public id_salmin:number;
	public fecha:Date;
	public importe:number;
	
	constructor (
		public mid_salmin:number, public mfecha:Date, public mimporte:number){

		this.id_salmin=mid_salmin;
		this.fecha=mfecha;
		this.importe=mimporte;
	}

}
