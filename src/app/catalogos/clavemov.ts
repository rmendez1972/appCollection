/*
Marlon Gomez
24-08-2017
clavemov
*/

export class Clavemov {
	public id_clave_mov:number;
	public clave_mov:String;
	public descripcion:String;
	
	constructor (
		public mid_clave_mov:number, public mclave_mov:String, public mdescripcion:String){
		this.id_clave_mov=mid_clave_mov;
		this.clave_mov=mclave_mov;
		this.descripcion=mdescripcion;
	}

}
