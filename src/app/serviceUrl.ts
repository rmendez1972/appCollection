import { Injectable } from '@angular/core';

@Injectable()
export class ServiceUrl {
public URL: String;
public URLadjuntos: String;
public URLadjuntosdescarga: String;
public URLadjuntosupload: String;
public URLbuscarsolicitud: String;
public URLlogin: String;
public URLcambiapassword: String;
public URLupload: String;
public URLfilename: String;
public URLbonificacion:String;
public URLdiversos:String; //ismael
public URLbonificacion_div:String; //ismael
public URLbeneficiario_div:String; //ismael

public URLbeneficiario:String; //marlon
public URLcpp:String;//marlon
public URLsalmin:String;//marlon
public URLsalmindf:String;//marlon
public URLclavemov:String;//marlon
public URLclavediv:String;//marlon
public URLvencidos:String;
<<<<<<< HEAD
public URLaplicabonificacion:String;
=======
public URLcajas:String;
>>>>>>> d4e008757714dd29190005570d9b689ab1bec958


constructor() {}


  		getUrlmov_edoscta():String{

	  			return this.URL='http://localhost:8080/cobranza/controladormov_edocta?operacion=listarJsonbyMovimientos&criterio=';

		}

		getUrlBeneficiario():String{

				return this.URLbeneficiario='http://localhost:8080/cobranza/controladorbeneficiario?operacion=listarJsonbyIdBeneficiario&criterio=';
		}

		getUrlmov_diversos():String{
			return this.URLdiversos='http://localhost:8080/cobranza/controladormov_diversos?operacion=listarJsonbyMovimientos&criterio=';
		}

		getUrlBeneficiario_div():String{

			return this.URLbeneficiario_div='http://localhost:8080/cobranza/controladorbendiv?operacion=listarJsonbyIdBeneficiarioDiv&criterio=';
		}


	  	getUrlbonificacion():String{
	  			return this.URLbonificacion='http://localhost:8080/cobranza/controladormovbonific?operacion=listarJsonbyCriterio&criterio=';
		}

		getUrlbonificacion_div():String{
			return this.URLbonificacion_div='http://localhost:8080/cobranza/controladormovbonific?operacion=listarJsonbyCriterioDiv&criterio=';

		}


	  	getUrladjuntos():String{
	  			return this.URLadjuntos='http://localhost:8080/Tramites/controladoradjunto?operacion=listarjson&id_seguimiento=';
	  	}

	  	getUrladjuntosdescarga():String{
	  			return this.URLadjuntosdescarga='http://localhost:8080/Tramites/adjuntos/';
	  	}

		getUrladjuntosupload():String{
	  			return this.URLadjuntosupload='http://localhost:3001/upload/';
	  	}

	  	getUrllogin():String{
	  			return this.URLlogin='http://localhost:8080/cobranza/controladorlogin?operacion=apilogin&username=';
	  	}

		getUrlCambiaPassword():String{
	  			return this.URLcambiapassword='http://localhost:8080/Tramites/controladorregistro?operacion=apiSolicitanteCambioPassword&id_solicitante=';
	  	}

		getUrlupload():String{
	  			return this.URLupload='http://localhost:3001/upload';
	  	}

		getUrlfilename():String{
	  			return this.URLupload='http://localhost:8080/Tramites/controladoradjunto?operacion=grabarfromApp&id_seguimiento=';
		}

		//URL de catalagos
		getUrlcpp():String{
			return this.URLcpp='http://localhost:8080/cobranza/controladorcpp?operacion=listarJson';
		}

		getUrlsalmin():String{
			return this.URLsalmin='http://localhost:8080/cobranza/controladorsalmin?operacion=listarJson';
		}

		getUrlsalmindf():String{
			return this.URLsalmindf='http://localhost:8080/cobranza/controladorsalmindf?operacion=listarJson';
		}

		getUrlclavemov():String{
			return this.URLclavemov='http://localhost:8080/cobranza/controladorclavemov?operacion=listarJson';
		}

		getUrlclavediv():String{
			return this.URLclavediv='http://localhost:8080/cobranza/controladorclavediversos?operacion=listarJson';
		}

		getUrlbonificaciones():String{

			return this.URLbonificacion='http://localhost:8080/cobranza/controladorbonificacion?operacion=listarJson';

		}

		getUrlprogramas():String{
			return this.URLdiversos='http://localhost:8080/cobranza/controladorprogramas?operacion=listarJson';

		}

		getUrlVencidos():String{
			return this.URLvencidos='http://localhost:8080/cobranza/controladorvencidos?operacion=listar&clave_b=';

			//return this.URLvencidos='http://localhost:8083/cobranza/controladormov_edocta?operacion=aplicaMovedoctaApi&clave_b=';
		}

<<<<<<< HEAD
    getUrlAplicabonificacion():String{
        return this.URLaplicabonificacion='http://localhost:8080/cobranza/controladormovbonific?operacion=aplicaBonificacionesApi&id_movedoscta=';
    }
=======
		getUrlcajas():String{
			return this.URLcajas='http://localhost:8080/cobranza/controladorcaja?operacion=grabarfromApp&fecha=';

		}
>>>>>>> d4e008757714dd29190005570d9b689ab1bec958
}

