/*
Marlon Gomez
24-08-2017
bonificaciones
*/

export class Bonificaciones {
	public id_bonific:number;
	public clave_bonific:String;
	public descripcion:String;
	
	
	constructor (
		public mid_bonific:number, public mclave_bonific:String, public mdescripcion:String){

		this.id_bonific=mid_bonific;
		this.clave_bonific=mclave_bonific;
		this.descripcion=mdescripcion;
	}

}
