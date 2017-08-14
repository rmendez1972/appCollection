export class Adjunto {
	public id_adjunto:number;
	public nombre:String;
	public id_seguimiento:number;
	public id_usuario:number;
	public nombreusuario:String;

  	constructor(public mid_adjunto:number, public mnombre: String,public mid_seguimiento:number, public mid_usuario:number, public mnombreusuario: String){
  		this.id_adjunto=mid_adjunto;
  		this.nombre=mnombre;
  		this.id_seguimiento=mid_seguimiento;
  		this.id_usuario=mid_usuario;
  		this.nombreusuario=mnombreusuario;

  	}
}
