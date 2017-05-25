import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
public userId:string;
  constructor(private http: Http) {
    
   }

  login(url: string, param: string, payload = '') {
    return this.http.post(url + param, payload)
      .map((res: Response) => JSON.parse(res.json()));
  }

  getObjects(url: string, param: string) {
    this.userId=sessionStorage.getItem("uuid");
    let parametros = '?token=' + sessionStorage.getItem('token')+"&userId="+this.userId + "&" + param; 
    return this.http.get(url + parametros)
      .map((res: Response) => JSON.parse(res.json()));
  }

  postObject(url: string, object: Object, param?: string) {
    this.userId=sessionStorage.getItem("uuid");
    let payload = JSON.stringify(object);
    let parametros = '?token=' + sessionStorage.getItem('token')+"&userId="+this.userId + "&" + param;
    return this.http.post(url + parametros, payload)
      .map((res: Response) => JSON.parse(res.json()));
  }

  putObject(url: string, object: Object, param: string) {
    this.userId=sessionStorage.getItem("uuid");
    let payload = JSON.stringify(object);        
    let parametros = '&token=' + sessionStorage.getItem('token')+"&userId="+this.userId + "&" + param;
    return this.http.put(url + parametros, payload)
      .map((res: Response) => JSON.parse(res.json()));
  }
  
  deleteObject(url: string, param: string) {
    let parametros = '&token=' + sessionStorage.getItem('token')+"&userId="+this.userId + "&" + param;
    return this.http.delete(url + parametros)
      .map((res: Response) => JSON.parse(res.json()));
  }

}
