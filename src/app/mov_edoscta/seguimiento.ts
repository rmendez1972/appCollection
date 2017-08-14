export class Seguimiento {
	public id_seguimiento: number;
	public fecha: String;
	public observaciones: String;
	public estatus: String;
	public adjunto: boolean;
	
	constructor(
  		public mid_seguimiento: number,
		public mfecha: String,
		public mobservaciones: String,
		public mestatus: String,
		public madjunto: boolean,
		

  		)
  		{

	  		this.id_seguimiento=mid_seguimiento;
			this.fecha=mfecha;
			this.observaciones=mobservaciones;
			this.estatus=mestatus;
			this.adjunto=madjunto;
		

		}
}