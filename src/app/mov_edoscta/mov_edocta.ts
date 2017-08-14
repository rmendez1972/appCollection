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


  constructor(public mid_movedoscta:number, public mid_benef: number,public mcapital:number, public minteres:number,
      public madmon: number, public mseguro: number , public mclave_mov: String, public mpoliza: String,
      public mfecha_mov: String, public mrecibo:number, public mo_seguro:number, public mmoratorios: number, public mstatus: String){
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
  	}
}
