import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { MenuComponent }  from './menu.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule

  ],
  declarations: [
    MenuComponent

  ],
  providers: [

  ]
})
export class MenuModule {}

$(document).ready(function(){
  $('.dropdown-submenu a.test').on("click", function(e){
    $(this).next('ul').toggle();
    e.stopPropagation();
    e.preventDefault();
  });
});
