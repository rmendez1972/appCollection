export class Autoriza {
	public id_autoriza:number;
	public nombre :String;
	public cargo :String;
	public id_delegacion: String;


	constructor(public a_id_autoriza:number, 
		public a_nombre:String, 
		public a_cargo:String,
		public a_id_delegacion:String,
		){

		this.id_autoriza = a_id_autoriza;
		this.nombre = a_nombre;
		this.cargo = a_cargo;
		this.id_delegacion = a_id_delegacion;
	}
}