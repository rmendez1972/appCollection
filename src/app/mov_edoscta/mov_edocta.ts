export class Mov_edocta {
	public id_movedoscta:number;
  public id_benef:number;
	public capital:number;
	public interes:number;
	public admon:number;
	public seguro:number;
	public clave_mov:String;
	public poliza:String;
	public fecha_mov:String;
	public recibo:number;
  public o_seguro:number;
  public moratorios:number;
  public status:String;


  public fecha_pol: String;
  public id_usuario:number;
  public prepago:String;
  public id_bonific:number;
  public comisiones: number;
  public serie: String;
  public puntual: boolean;
  public clave_b: String;
  public tit: number;
  public id_catprog: number;
  public numcontrato: number;
  public id_caja: number;
  public nombrebenef: String;
  public nombreusuario: String;
  public bonific: boolean;
  public sumcapital: number;
  public suminteres: number;
  public sumadmon: number;
  public sumseguro: number;
  public sumoseg: number;
  public sumcomisiones: number;
  public sumtitulacion: number;


  constructor(public mid_movedoscta:number, public mid_benef: number,public mcapital:number, public minteres:number,
      public madmon: number, public mseguro: number , public mclave_mov: String, public mpoliza: String,
      public mfecha_mov: String, public mrecibo:number, public mo_seguro:number, public mmoratorios: number, public mstatus: String,
      public mfecha_pol: String, public mid_usuario: number, public mprepago: String, public mid_bonific: number, public mcomisiones: number,
      public  mserie: String, public mpuntual: boolean, public mclave_b: String, public mtit:number, public mid_catprog: number,
      public mnumcontrato: number, public mid_caja: number, public mnombrebenef: String, public mnombreusuario: String, public mbonific: boolean,
      public msumcapital: number, public msuminteres: number, public msumadmon: number, public msumseguro: number,public msumoseg: number,
      public msumcomisiones: number, public msumtitulacion: number ){
  		this.id_movedoscta=mid_movedoscta;
  		this.id_benef=mid_benef;
  		this.capital=mcapital;
  		this.interes=minteres;
  		this.admon=madmon;
  		this.seguro=mseguro;
  		this.clave_mov=mclave_mov;
  		this.poliza=mpoliza;
  		this.fecha_mov=mfecha_mov;
      this.recibo=mrecibo;
      this.o_seguro=mo_seguro;
      this.moratorios=mmoratorios;
      this.status=mstatus;

      this.fecha_pol=mfecha_pol;
      this.id_usuario=mid_usuario;
      this.prepago=mprepago;
      this.id_bonific=mid_bonific;
      this.comisiones=mcomisiones;
      this.serie=mserie;
      this.puntual=mpuntual;
      this.clave_b=mclave_b;
      this.tit=mtit;
      this.id_catprog=mid_catprog;
      this.numcontrato=mnumcontrato;
      this.id_caja=mid_caja;
      this.nombrebenef=mnombrebenef;
      this.nombreusuario=mnombreusuario;
      this.bonific=mbonific;
      this.sumcapital=msumcapital;
      this.suminteres=msuminteres;
      this.sumadmon=msumadmon;
      this.sumseguro=msumseguro;
      this.sumoseg=msumoseg;
      this.sumcomisiones=msumcomisiones;
      this.sumtitulacion=msumtitulacion;

  	}
}
