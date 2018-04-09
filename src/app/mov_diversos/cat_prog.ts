export class Programas {
    public id_catprog: number;
    public clave: String;
    public descripcion: String;
    public sub_ini:number;
    public eng_fon:number;
    public eng_inv:number;
    public interes:number;
    public admon:number;
    public seguro:number;
    public costo_m2:number;
    public por_sub:number;
    public por_admon:number;
    public por_sv:number;
    public por_os:number;
    public sal_min:number;
    public pago_mes:number;
    public por_eng:number;
    public anual:number;
    public plazo:number;
    public por_cap:number;
    public status:Boolean;
    public mecanica:number;
    public id_tipocred:number;
    public mensual:number;
    public sub_bp:number;
    public apor_fij:number;
    public por_pm:number;
    public por_pf:number;
    public clave_ant:String;
    public id_colonia:number;
    public dias_gracia:number;
    public mora:Boolean;
    public por_ga:number;
    public cuenta_cont:String;
    public id_delegacion:number;
    public id_modulo:number;
    public condicion_fija:Boolean;
    public id_usuario:number;
	
	
	constructor (public mid_catprog: number, public mclave: String, public mdescripcion: String,
                public msub_ini:number, public meng_fon:number, public meng_inv:number,public minteres:number,
                public madmon:number,public mseguro:number, public mcosto_m2:number,public mpor_sub:number,
                public mpor_admon:number,public mpor_sv:number,public mpor_os:number,public msal_min:number,
                public mpago_mes:number,public mpor_eng:number,public manual:number, public mplazo:number,
                public mpor_cap:number,public mstatus:Boolean,public mmecanica:number,public mid_tipocred:number,
                public mmensual:number,public msub_bp:number, public mapor_fij:number,public mpor_pm:number,
                public mpor_pf:number,public mclave_ant:String,public mid_colonia:number,public mdias_gracia:number,
                public mmora:Boolean,public mpor_ga:number, public mcuenta_cont:String, public mid_delegacion:number,
                public mid_modulo:number,public mcondicion_fija:Boolean,public mid_usuario:number)
		{
            this.id_catprog=mid_catprog;
            this.clave=mclave;
            this.descripcion=mdescripcion;
            this.sub_ini=msub_ini;
            this.eng_fon=meng_fon;
            this.eng_inv=meng_inv;
            this.interes=minteres;
            this.admon=madmon;
            this.seguro=mseguro;
            this.costo_m2=mcosto_m2;
            this.por_sub=mpor_sub;
            this.por_admon=mpor_admon;
            this.por_sv=mpor_sv;
            this.por_os=mpor_os;
            this.sal_min=msal_min;
            this.pago_mes=mpago_mes;
            this.por_eng=mpor_eng;
            this.anual=manual;
            this.plazo=mplazo;
            this.por_cap=mpor_cap;
            this.status=mstatus;
            this.mecanica=mmecanica;
            this.id_tipocred=mid_tipocred;
            this.mensual=mmensual;
            this.sub_bp=msub_bp;
            this.apor_fij=mapor_fij;
            this.por_pm=mpor_pm;
            this.por_pf=mpor_pf;
            this.clave_ant=mclave_ant;
            this.id_colonia=mid_colonia;
            this.dias_gracia=mdias_gracia;
            this.mora=mmora;
            this.por_ga=mpor_ga;
            this.cuenta_cont=mcuenta_cont;
            this.id_delegacion=mid_delegacion;
            this.id_modulo=mid_modulo;
            this.condicion_fija=mcondicion_fija;
            this.id_usuario=mid_usuario;
	}

}
