import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';
//let localStorage = require('local-storage');


@Injectable()
export class UserService {
  isSessionVaild = true;
  constructor(private http: Http, public router: Router) {  }

  getHeaders(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');
    headers.append('Authorization', this.getToken());
    return headers;
  }

  getToken(){
    var userString = localStorage.getItem('user');
    if(userString){
      var user = JSON.parse(userString);
      if(user.Token){
        return user.Token
      }
    }
    
    return '';
  }

  registerUser(data) {
    let headers = this.getHeaders();//new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');
    return this.http.post(environment.apiUrl + 'User/RegisterUser', data, { headers: headers });
  }

  approveUser(data) {
    let headers = this.getHeaders();//new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');
    return this.http.post(environment.apiUrl + 'User/ApproveUser', data, { headers: headers });
  }

  disableUser(data) {
    let headers = this.getHeaders();//new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');
    return this.http.post(environment.apiUrl + 'User/DisableUser', data, { headers: headers });
  }

  loginUser(data) {
    let headers = this.getHeaders();//new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');
    return this.http.post(environment.apiUrl + 'User/Login', data, { headers: headers });
  }

  listUser() {
    let headers = this.getHeaders();
    return this.http.get(environment.apiUrl + 'User/GetUsers', { headers: headers });
  }
}