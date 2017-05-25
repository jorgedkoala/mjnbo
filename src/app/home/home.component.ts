import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
//import { DatePipe } from '@angular/common';
import {GlobalsService} from '..//services/globals.service'
import {Header} from 'primeng/primeng';
import {Footer} from 'primeng/primeng';
import {Event} from '../_models/event'

import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {
  @Input() events: Event[];
  @Output() filtrado: EventEmitter<boolean> = new EventEmitter<boolean>();
  public cols: any[]=[];
  public paginator:boolean=false;
  //public fechas :object={"inicio":new Date('2017-04-12'),"fin":new Date('2017-05-16')};
  public local:any;
  public es:any;
  public en:any;
  public cat:any;
//public gallery:string;
  constructor(public globals:GlobalsService) { 
    
  }

   ngOnInit() {
  //  switch (localStorage.getItem("idioma")){
  //    case "es":
  //           this.local = {
  //           firstDayOfWeek: 1,
  //           dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
  //           dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
  //           dayNamesMin: [ "D","L","M","X","J","V","S" ],
  //           monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
  //           monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ]
  //       }
  //       break;
  //     case "cat":
  //           this.local = {
  //           firstDayOfWeek: 1,
  //           dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
  //           dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
  //           dayNamesMin: [ "D","L","M","X","J","V","S" ],
  //           monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
  //           monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ]
  //       }
  //       break;
  //     case "en":
  //           this.local = {
  //           firstDayOfWeek: 0,
  //           dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
  //           dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
  //           dayNamesMin: [ "D","L","M","X","J","V","S" ],
  //           monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
  //           monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ]
  //       }
  //       break;
  //  }

  this.cols = [{filed:"title",header:"title"},{filed:"intensidad",header:"intensidad"},{filed:"start",header:"start"},{filed:"color",header:"color"}];
  
}
  ngOnChanges(cambios: SimpleChanges){
//console.log(cambios,this.events)
//this.events.length > 100? this.paginator = true: this.paginator = false;
  }

  filterDates(){
   // this.globals.setFechas({"inicio":moment(this.fechas['inicio']).format('YYYY-MM-DD'),"fin":moment(this.fechas['fin']).format('YYYY-MM-DD')});
    this.filtrado.emit(true);
  }
}
