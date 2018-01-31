export class Vencidos {
	public fecha:String;
	public letra:String;
	public capital:number;
	public interes :number;
	public seguro :number;
	public admon:number;
	public oseg:number;
	public com:number;
	public tit:number;
	public mor:number;
	public total:number;


	constructor(public m_fecha:String, public m_letra:String, public m_capital:number, public m_interes:number, public m_seguro:number,
		public m_admon:number,public m_oseg:number, public m_com:number, public m_tit:number,public m_mor:number, public m_total:number){

		this.fecha = m_fecha;
		this.letra = m_letra;
		this.capital = m_capital;
		this.interes = m_interes;
		this.seguro = m_seguro;	
		this.admon = m_admon;
		this.oseg = m_oseg;
		this.com = m_com;
		this.tit = m_tit;
		this.mor = m_mor;
		this.total = m_total;
	}
}