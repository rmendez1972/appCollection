/*
Marlon Gomez
23-08-2017
Cpp
*/

export class Cpp {
	public id_cpp:number;
	public fecha:Date;
	public importe:number;
	
	constructor (
		public mid_cpp:number, public mfecha:Date, public mimporte:number){

		this.id_cpp=mid_cpp;
		this.fecha=mfecha;
		this.importe=mimporte;
	}

}
