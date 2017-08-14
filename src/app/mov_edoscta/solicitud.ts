export class Solicitud {
	public id_solicitud: number;
	public fecha_ingreso: String;
	public id_tramite: number;
	public id_solicitante: number;
	public id_usuario_ingreso: number;
	public id_usuario_seguimiento: number;
	public id_status: number;
	public tramite: String;
	public solicitante: String;
	public status: String;
	public unidadadministrativa: String;
  	constructor(
  		public mid_solicitud: number,
		public mfecha_ingreso: String,
		public mid_tramite: number,
		public mid_solicitante: number,
		public mid_usuario_ingreso: number,
		public mid_usuario_seguimiento: number,
		public mid_status: number,
		public mtramite: String,
		public msolicitante: String,
		public mstatus: String,
		public munidadadministrativa: String

  		)
  		{

  		this.id_solicitud=mid_solicitud;
		this.fecha_ingreso=mfecha_ingreso;
		this.id_tramite=mid_tramite;
		this.id_solicitante=mid_solicitante;
		this.id_usuario_ingreso=mid_usuario_ingreso;
		this.id_usuario_seguimiento=mid_usuario_seguimiento;
		this.id_status=mid_status;
		this.tramite=mtramite;
		this.solicitante=msolicitante;
		this.status=mstatus;
		this.unidadadministrativa=munidadadministrativa;
  		}
}
