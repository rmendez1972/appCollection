export class Bonific {
	public id_bonificacion:number;
	public id_movedoscta:number;
	public id_benef:number;
	public imp_cap :number;
	public imp_int :number;
	public imp_adm:number;
	public imp_seg:number;
	public imp_osg:number;
	public id_catbonific:number;
	public estatus:String;
	public id_usuario:number;
	public id_autoriza:number;
	public clave_b:String;
	public recibo:number;
	public serie:String;
	public id_movdiversos:number;
	public numcontrato:String;
	public id_catprog:number;

	public nombrebenef:String;
	public clavebonific:String;
	public usuario:String;
	public movdiversos:String;
	public catprograma:String;
	public nombreautoriza:String;
	public autoriza:String;

	constructor(public mid_bonificacion:number, public mid_movedoscta:number, public mid_benef:number, public mimp_cap:number, public mimp_int:number,
		public mimp_adm:number, public mimp_seg:number, public mimp_osg:number, public mid_catbonific:number, public mestatus:String, 
		public mid_usuario:number, public mid_autoriza:number, public mclave_b:String, public mrecibo:number, public mserie:String, 
		public mid_movdiversos:number, public mnumcontrato:String, public mid_catprog:number, public mnombrebenef:String, public mclavebonific:String,
		public musuario:String, public mmovdiversos:String, public mcatprograma:String, public mnombreautoriza:String, public mautoriza:String){

		this.id_bonificacion=mid_bonificacion;
		this.id_movedoscta=mid_movedoscta;
		this.id_benef=mid_benef;
		this.imp_cap=mimp_cap;
		this.imp_int=mimp_int;
		this.imp_adm=mimp_adm;
		this.imp_seg=mimp_seg;
		this.imp_osg=mimp_osg;
		this.id_catbonific=mid_catbonific;
		this.estatus=mestatus;
		this.id_usuario=mid_usuario;
		this.id_autoriza=mid_autoriza;
		this.clave_b=mclave_b;
		this.recibo=mrecibo;
		this.serie=mserie;
		this.id_movdiversos=mid_movdiversos;
		this.numcontrato=mnumcontrato;
		this.id_catprog=mid_catprog;
		this.nombrebenef=mnombrebenef;
		this.clavebonific=mclavebonific;
		this.usuario=musuario;
		this.movdiversos=mmovdiversos;
		this.catprograma=mcatprograma;
		this.nombreautoriza=mnombreautoriza;
		this.autoriza=mautoriza;


	}

}