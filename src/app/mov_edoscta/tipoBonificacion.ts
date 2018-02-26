export class TipoBonificacion {
	public id_bonific:number;
	public clave_bonific :String;
	public descripcion :String;


	constructor(public t_id_bonific:number, 
		public t_clave_bonific:String, 
		public t_descripcion:String,
		){
		this.id_bonific = t_id_bonific;
		this.clave_bonific = t_clave_bonific;
		this.descripcion = t_descripcion;
	}
}