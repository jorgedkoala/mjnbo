import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service'
import {URLS} from '../_models/urls'

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {
public mensaje:string;


  constructor(private api: ApiService) { }

  ngOnInit() {
  }

sendMessage(TEn,En,TEs,Es,TCa,Ca){

  let param='';
  let contents={'en':En,'es':Es,'ca':Ca};
  let titles={'en':TEn,'es':TEs,'ca':TCa};
  //let mensaje = {'en':En,'es':Es,'ca':Ca,'ten':TEn,'tes':TEs,'tca':TCa};
  let mensaje = {'contents':contents,'titles':titles};
  console.log (mensaje);
  this.api.postObject(URLS.NOTIFICACION,mensaje,param).subscribe(
      response => {
        console.log(response);
      });
}

}
