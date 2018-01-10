import { Component, OnInit } from '@angular/core';

import {TranslateService} from '@ngx-translate/core';
import {ApiService} from './services/api.service'
import {GlobalsService} from './services/globals.service'
import {Event} from './_models/event'
import {URLS} from './_models/urls'
import * as moment from 'moment'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 public tab:string = 'resumen';
 public events:Event[]=[];
 public local;
 public locale;
public login:boolean=false;
public admin:boolean=false;
public colores:string[]=['black','yellow','orange','red'];
public error: string=null;
  constructor(private translate:TranslateService, private api:ApiService, public globals: GlobalsService){
        translate.setDefaultLang('en');
        translate.use('en');
        if (localStorage.getItem("idioma")) translate.use(localStorage.getItem("idioma"));
  }
  
ngOnInit(){
  if (sessionStorage.getItem("uuid")=="admin") this.admin = true;
   switch (localStorage.getItem("idioma")){
     case "es":
            this.local = {
            firstDayOfWeek: 1,
            dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
            dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
            dayNamesMin: [ "D","L","M","X","J","V","S" ],
            monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
            monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ]
        }
        break;
      case "cat":
            this.local = {
            firstDayOfWeek: 1,
            dayNames: [ "diumenge","dilluns","dimarts","dimecres","dijous","divendres","dissabte" ],
            dayNamesShort: ['Dug','Dln','Dmt','Dmc','Djs','Dvn','Dsb'],
            dayNamesMin: ['Dg','Dl','Dt','Dc','Dj','Dv','Ds'],
            monthNames: [ "gener","febrer","març","abril","maig","juny","juliol","agost","septembre","octubre","novembre","decembre" ],
            monthNamesShort: [ "gen","feb","mar","abr","mai","jun","jul","ago","sep","oct","nov","dec" ]
        }
        break;
      case "en":
            this.local = {
            firstDayOfWeek: 0,
            dayNames: [ "sunday","monday","tuesday","wednesday","thursday","friday","saturday" ],
            dayNamesShort: [ "sun","mon","tue","wed","thu","fri","sat" ],
            dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
            monthNames: [ "january","february","march","april","may","june","july","agost","september","october","november","december" ],
            monthNamesShort: [ "jan","feb","mar","apr","may","jun","jul","ago","sep","oct","nov","dec" ]
        }
        break;
        default:
                    this.local = {
            firstDayOfWeek: 1,
            dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
            dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
            dayNamesMin: [ "D","L","M","X","J","V","S" ],
            monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
            monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ]
        }
   }
}

setLogin(estado:boolean){
this.login=estado;
this.globals.setFechas({"inicio":new Date(moment().subtract(8,'w').format('YYYY-MM-DD')),"fin":new Date(moment().format('YYYY-MM-DD'))})
if (this.login) this.loadEvent();
let param="";
try{
this.api.getObjects(URLS.SEGURIDAD,param).subscribe(
  (ok)=>{
    console.log(ok);
    if (ok.success == "ERROR"){
      this.error=ok.success;
    }
  }
);
}catch(e){

}
}
setFiltro(filtro){
  //this.globals.fechas=fechas;
  this.loadEvent();
}
loadEvent(){
  if (sessionStorage.getItem("uuid")=="admin") this.admin = true;
  let fechas = this.globals.getStringFechas();
console.log("loadEvent;",fechas);
  let param ="entidad=diario&filterdates=true&fecha_inicio="+fechas['inicio']+"&fecha_fin="+fechas['fin']+" 23:59:59&fecha_field=fecha"
  this.api.getObjects(URLS.STD_ITEM,param).subscribe(
    result=>{
      //console.log("result",result.data)
      if (result.success && result.data){
        //console.log("result",result.data)
        this.events=[];
        result.data.forEach(element => {
          console.log(moment(element.fecha).toDate());
          this.events.push(new Event(element.id,element.contador,new Date(moment(element.fecha).toDate()),null,element.intensidad,this.colores[element.intensidad]))
        });

      }
    },
    error=>{
      console.log('loadEvents error', error)
    },
    ()=>console.log('loadEvents ok', this.events)
  );
}
}
