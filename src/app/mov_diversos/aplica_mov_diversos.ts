export class Aplica_Mov_diversos {

	public id_bendiv:number;
	public clave_elector: String;
	public curp: String;
	public clave_b:String;
	public nombrebenef:String; 
	public fecha_div:String;
	public juridico:String;
	public id_usuario:number;
	public id_catprog:number;
	public mza:number;
	public lte:number;
	public conyuge: String;
	public aperturado: String;
	public numcontrato: number;

	constructor (public m_id_bendiv:number,
	public m_clave_elector: String,
	public m_curp: String,
	public m_clave_b:String,
	public m_nombrebenef:String, 
	public m_fecha_div:String,
	public m_juridico:String,
	public m_id_usuario:number,
	public m_id_catprog:number,
	public m_mza:number,
	public m_lte:number,
	public m_conyuge: String,
	public m_aperturado: String,
	public m_numcontrato: number){

		this.id_bendiv=m_id_bendiv;
		this.clave_elector=m_clave_elector;
		this.curp= m_curp;
		this.clave_b=m_clave_b;
		this.nombrebenef=m_nombrebenef; 
		this.fecha_div=m_fecha_div;
		this.juridico= m_juridico;
		this.id_usuario=m_id_usuario;
		this.id_catprog=m_id_catprog;
		this.mza=m_mza;
		this.lte=m_lte;
		this.conyuge=m_conyuge;
		this.aperturado=m_aperturado;
		this.numcontrato= m_numcontrato;

	}

}
