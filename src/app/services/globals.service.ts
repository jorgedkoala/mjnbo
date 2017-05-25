import { Injectable } from '@angular/core';
import * as moment from 'moment'
@Injectable()
export class GlobalsService {
public fechas:object;
  constructor() { 

   // this.fechas={'inicio':new Date(moment().subtract(8,'w').toDate()),'fin':new Date(moment().toDate())};
//this.fechas ={"inicio":new Date('2017-04-12'),"fin":new Date('2017-05-16')};
  }

public setFechas(fechas){
  this.fechas=fechas;
}
public getFechas(){
return this.fechas;
}
public getStringFechas(){
return {"inicio":moment(this.fechas['inicio']).format('YYYY-MM-DD'),"fin":moment(this.fechas['fin']).format('YYYY-MM-DD')};
}
}
