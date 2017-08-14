export class Tramite {
	public id_tramite: number;
	public dias_resolucion: number;
	public id_unidadadministrativa: number;
	public id_direccion: number;
	public nombre: String;
	public unidadAdministrativa: String;
	public direccion: String;
	constructor(
  		public mid_tramite: number,
		public mdias_resolucion: number,
		public mid_unidadadministrativa: number,
		public mid_direccion: number,
		public mnombre: String,
		public munidadAdministrativa: String,
		public mdireccion: String

  		)
  		{

	  		this.id_tramite=mid_tramite;
			this.dias_resolucion=mdias_resolucion;
			this.id_unidadadministrativa=mid_unidadadministrativa;
			this.id_direccion=mid_direccion;
			this.nombre=mnombre;
			this.unidadAdministrativa=munidadAdministrativa;
			this.direccion=mdireccion;
		}
}