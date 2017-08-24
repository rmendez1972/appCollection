/*
Marlon Gomez
24-08-2017
clavediv
*/

export class Clavediv {
	public id_clave_div:number;
	public clave_div:String;
	public descripcion:String;
	public importe:number;
	public cuenta_cont:String;
	
	constructor (
		public mid_clave_div:number, public mclave_div:String, public mdescripcion:String, public mimporte:number, 
		public mcuenta_cont:String){

		this.id_clave_div=mid_clave_div;
		this.clave_div=mclave_div;
		this.descripcion=mdescripcion;
		this.importe=mimporte;
		this.cuenta_cont=mcuenta_cont;
	}

}
