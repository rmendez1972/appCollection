/*
Ismael García
18-08-2017
Bean para los los beneficiarios diversos
Total de propiedades: 29
*/

export class Benef_div {
	public id_bendiv:		number;
	public clave_elect:		String;
	public curp:			String;
	public clave_b:			String;
	public nombre:			String;
	public fecha_con:		Date;
	public capital:			number;
	public sub_inic:		number;
	public enganche:		number;
	public interes:			number;
	public admon:			number;
	public seguro:			number;
	public o_seg:			number;
	public plazo:			number;
	public pago_mes:		number;
	public sal_con:			number;
	public juridico:		String;
	public referencia_jur:	String;
	public fecha_jur:		Date;    
	public id_usuario:		number;
	public id_catprog:		number;
	public mza:				String;
	public lte:				String;
	public conyuge:			String;
	public fecha:			Date;
	public aperturado:		Boolean;
	public numcontrato:		String;
	public catprog:			String;
	public usuario:			String; //29 propiedades

	constructor(
		public mid_bendiv:number,	public mclave_elect:String,	public mcurp:String,
		public mclave_b:String,		public mnombre:String,		public mfecha_con:Date,
		public mcapital:number,		public msub_inic:number,	public menganche:number,
		public minteres:number,		public madmon:number,		public mseguro:number,
		public mo_seg:number, 		public mplazo:number,		public mpago_mes:number,
		public msal_con:number,		public mjuridico:String,	public mreferencia_jur:String, 
		public mfecha_jur:Date, 	public mid_usuario:number, 	public mid_catprog:number,  
		public mmza:String,			public mlte:String,			public mconyuge:String,
		public mfecha:Date,			public maperturado,			public mnumcontrato,
		public mcatprog:String, 	musuario:String)
		{

			this.id_bendiv=		mid_bendiv;
			this.clave_elect=	mclave_elect;				
			this.curp=			mcurp;		
			this.clave_b=		mclave_b;
			this.nombre=		mnombre;	
			this.fecha_con=		mfecha_con;	
			this.capital=		mcapital;
			this.sub_inic=		msub_inic;
			this.enganche=		menganche;
			this.interes=		minteres;
			this.admon=			madmon;
			this.seguro=		mseguro;
			this.o_seg=			mo_seg;
			this.plazo=			mplazo;
			this.pago_mes=		mpago_mes;
			this.sal_con=		msal_con;
			this.juridico=		mjuridico;
			this.referencia_jur=mreferencia_jur;
			this.fecha_jur=		mfecha_jur;	    
			this.id_usuario=	mid_usuario;
			this.id_catprog=	mid_catprog;
			this.mza=			mmza;
			this.lte=			mlte;
			this.conyuge=		mconyuge;
			this.fecha=			mfecha;	
			this.aperturado=	maperturado;
			this.numcontrato=	mnumcontrato;
			this.catprog=		mcatprog;
			this.usuario=		musuario;
  	}
}
