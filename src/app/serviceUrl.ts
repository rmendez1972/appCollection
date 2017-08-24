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

constructor() {}


  		getUrlmov_edoscta():String{

	  			return this.URL='http://localhost:8080/cobranza/controladormov_edocta?operacion=listarJsonbyIdbenef&criterio=';
		}
		
		getUrlmov_diversos():String{			
			return this.URLdiversos='http://localhost:8080/cobranza/controladormov_diversos?operacion=listarJsonbyIdbenef&criterio=';
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
			return this.URLdiversos='http://localhost:8080/cobranza/controladorcpp?operacion=listarJson';
		}

		getUrlsalmin():String{			
			return this.URLdiversos='http://localhost:8080/cobranza/controladorsalmin?operacion=listarJson';
		}

		getUrlsalmindf():String{			
			return this.URLdiversos='http://localhost:8080/cobranza/controladorsalmindf?operacion=listarJson';
		}

		getUrlclavemov():String{			
			return this.URLdiversos='http://localhost:8080/cobranza/controladorclavemov?operacion=listarJson';
		}

		getUrlclavediv():String{			
			return this.URLdiversos='http://localhost:8080/cobranza/controladorclavediversos?operacion=listarJson';
		}

		getUrlbonificaciones():String{			
			return this.URLdiversos='http://localhost:8080/cobranza/controladorbonificacion?operacion=listarJson';
		}
}
