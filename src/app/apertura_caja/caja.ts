export class Caja {
	public id_caja:number;
  public fecha:String;
	public folio_inicial:number;
	public folio_final:number;
	public poliza:String;
	public monto_inicial:number;
	public id_usuario:number;


  constructor(public mfecha:String, public mfolio_inicial: number,public mfolio_final:number, public mpoliza:String,
    public mmonto_inicial: number, public mid_usuario: number ){
  		this.fecha=mfecha;
  		this.folio_inicial=mfolio_inicial;
  		this.folio_final=mfolio_final;
  		this.poliza=mpoliza;
  		this.monto_inicial=mmonto_inicial;
  		this.id_usuario=mid_usuario;
  	}
}
