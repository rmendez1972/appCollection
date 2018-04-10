import { Component, OnInit, HostBinding, trigger, transition, animate, style, state, Input, EventEmitter, Output } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { BonificServiceDiversos } from '../mov_diversos/bonificacion.service';
import { AlertService} from '../_services/index';
import { ConfirmService} from '../_services/index';

export class BonificacionComponentDiversos implements OnInit {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'relative';
  }


  @Output() onMessageAplicaBonific = new EventEmitter<String>();
  @Output() onerrorMessageAplicaBonific = new EventEmitter<String>();
  @Output() onMessageAplicaBonificSiDiversos = new EventEmitter<String>();


  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private bonificservicediversos: BonificServiceDiversos,
      private alertService:AlertService,
      private confirmService:ConfirmService,

    )
    {}
    ngOnInit() {
    };

    confirmarBonificacionDiversos() {
       this.confirmService.confirmBonificacionDiversos("Tiene Bonificaciones?",this.bonificservicediversos,this.onMessageAplicaBonificSiDiversos,function(bonificservice,eventemmitter){
              //ACTION: Do this If user says YES
              //this.pagar = aplicarservice.getPagar(fecha);
              eventemmitter.emit('SI');
              //bonificservice.siBonificacion();
            },function(eventemmitter){
              //ACTION: Do this if user says NO
              eventemmitter.emit(null);
      })

    };
    
    confirmar(){
      console.log("hola");
    }


}