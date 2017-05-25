import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ApiService} from '../services/api.service'
import {URLS} from '../_models/urls'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
@Output() logado: EventEmitter<boolean> = new EventEmitter<boolean>();
public user:string;//='fda5';
public password:string;//='2d3c';
public lang:string;
public languages:object[];
private sub: any;
  constructor(private route: ActivatedRoute,
    private router: Router, private api: ApiService) { }

  ngOnInit() {
    if (localStorage.getItem("idioma")) this.lang = localStorage.getItem("idioma");
    this.languages=[{idioma:'English',valor:'en'},{idioma:'Castellano',valor:'es'},{idioma:'Català',valor:'cat'}]
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        if(params['uuid']){
        this.user = params['uuid'].substr(0,4);
        this.password = params['uuid'].substr(4,4);
        console.log("usuario:",this.user);
        this.doLogin();
        }
      });
}
doLogin(){
localStorage.setItem("idioma",this.lang);
    let param = '?user=' + this.user + '&password=' + this.password; 
    this.api.login(URLS.LOGIN, param).subscribe(
      response => {
        // Limpiar form
        // this.user = '';
        // this.password =''; 
        if (response.success == 'true') {
          sessionStorage.setItem('uuid', response.data[0].uuid);
          sessionStorage.setItem('token', response.token);
          this.logado.emit(true);
        }
        else
        {
          this.showError(response.error);
        }
    },
    error=>this.showError(error),
    ()=>console.log('ok')
    );
}
showError(error:string){
  console.log(error);
}

}
