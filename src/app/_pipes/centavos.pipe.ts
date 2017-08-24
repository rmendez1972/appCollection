import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'centavos'})
export class centavos implements PipeTransform {
  //public valueStr:string='';
  transform(value: any, exp: number): string {
 	var str = value.toFixed(2).replace(/\.00$/, '');
	return str;
 }
}