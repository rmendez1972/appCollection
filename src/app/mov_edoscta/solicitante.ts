export class Solicitante {
	public id_solicitante:number;
	public nombre:String;
	public apellido_paterno:String;
	public apellido_materno:String;
	public telefono:String;
	public rfc:String;
	public sexo:String;
	public email:String;
	public direccion:String;
  	constructor(public mid_solicitante:number, public mnombre: String,public mapellido_paterno:String, public mapellido_materno:String, public mtelefono: String, public mrfc: String , public msexo: String, public memail: String, public mdireccion: String){
  		this.id_solicitante=mid_solicitante;
  		this.nombre=mnombre;
  		this.apellido_paterno=mapellido_paterno;
  		this.apellido_materno=mapellido_materno;
  		this.telefono=mtelefono;
  		this.rfc=mrfc;
  		this.sexo=msexo;
  		this.email=memail;
  		this.direccion=mdireccion;
  	}
}
