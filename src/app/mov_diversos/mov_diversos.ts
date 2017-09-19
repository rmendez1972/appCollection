/*
Ismael García
18-08-2017
Bean para los movimientos diversos
Total de propiedades: 30
*/

export class Mov_diversos {
	public id_movdiversos:number;
	public id_bendiv:number;
	public clave_div:String;
	public fecha_div:String;
	public poliza:String;
	public recibo:number; 
	public cargo:number;
	public abono:number;
	public moratorios:number;
	public otros:number;
	public fecha_pol:Date;
	public estatus:String;
	public id_usuario:number;
	public aplicado:Boolean;
	public descripcion:String;
	public id_catprog:number;
	public bonificacion:number;
	public serie:String;
	public poliza_apli:String;
	public fecha_apli:String;
	public interes:number;
	public seguro:number;
	public id_emisor:number;
	public clave_b:String;
	public numcontrato:String;
	public id_caja:number;	
	public bonific:Boolean;
	public nombrebenef:String; 
	public nombreusuario:String;
	public nombreprograma:String;

	constructor (
		public mid_movdiversos:number,public mid_bendiv:number,public mclave_div:String,
		public mfecha_div:String,public mpoliza:String,	public mrecibo:number, 
		public mcargo:number,public mabono:number,public mmoratorios:number, 
		public motros:number,public mfecha_pol:Date,public mestatus:String, 
		public mid_usuario:number,public maplicado:Boolean,public mdescripcion:String,
		public mid_catprog:number,public mbonificacion:number,public mserie:String, 
		public mpoliza_apli:String,public mfecha_apli:String,public minteres:number, 
		public mseguro:number,public mid_emisor:number,public mclave_b:String, 
		public mnumcontrato:String,public mid_caja:number,public mbonific:Boolean,
		public mnombrebenef:String,public mnombreusuario:String,public mnombreprograma:String){

		this.id_movdiversos=mid_movdiversos;
		this.id_bendiv=	mid_bendiv;
		this.clave_div=mclave_div;
		this.fecha_div=mfecha_div;
		this.poliza=mpoliza;
		this.recibo=mrecibo; 
		this.cargo=mcargo;
		this.abono=mabono;
		this.moratorios=mmoratorios;
		this.otros=motros;
		this.fecha_pol=mfecha_pol;
		this.estatus=mestatus;
		this.id_usuario=mid_usuario;
		this.aplicado=maplicado;
		this.descripcion=mdescripcion;
		this.id_catprog=mid_catprog;
		this.bonificacion=mbonificacion;
		this.serie=mserie;
		this.poliza_apli=mpoliza_apli;
		this.fecha_apli=mfecha_apli;
		this.interes=minteres;
		this.seguro=mseguro;
		this.id_emisor=mid_emisor;
		this.clave_b=mclave_b;
		this.numcontrato=mnumcontrato;
		this.id_caja=mid_caja;	
		this.bonific=mbonific;
		this.nombrebenef=mnombrebenef; 
		this.nombreusuario=	mnombreusuario;
		this.nombreprograma=mnombreprograma;
	}

}
