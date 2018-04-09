export class Clave_Diversos {

	public id_clave_div: number;
	public clave_div: String;
	public descripcion: String;
	public importe: number ;
	public cuenta_cont: String ;


	constructor(
		public a_id_clave_div: number,
		public a_clave_div: String,
		public a_descripcion: String,
		public a_importe: number,
		public a_cuenta_cont: String,
		){
		this.id_clave_div = a_id_clave_div;
		this.clave_div = a_clave_div;
		this.descripcion = a_descripcion;
		this.importe = a_importe;
		this.cuenta_cont = a_cuenta_cont;
	}
}