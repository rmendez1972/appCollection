export class Benef {
	public id_beneficiario:number;
  public id_catprog:number;
	public clave_elect:String;
	public curp:String;
	public rfc:String;
	public nombre:String;


  constructor(public mid_beneficiario:number, public mid_catprog: number,public mclave_elect:String, public mcurp:String,public mrfc: String, public mnombre: String ){
    this.id_beneficiario=mid_beneficiario;
  	this.id_catprog=mid_catprog;
  	this.clave_elect=mclave_elect;
  	this.curp=mcurp;
  	this.rfc=mrfc;
  	this.nombre=mnombre;
  }
}
