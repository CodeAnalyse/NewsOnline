import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { UserService } from './user.service';

//let localStorage = require('local-storage');


@Injectable()
export class CategoryService {
  isSessionVaild = true;
  constructor(private http: Http, public router: Router, public userService: UserService) {  }

  getHeaders(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');
    headers.append('Authorization', 'Bearer ' + this.getToken());
    return headers;
  }

  getToken(){
    // var userString = localStorage.get('user');
    // if(userString){
    //   var user = JSON.parse(userString);
    //   if(user.token){
    //     return user.token
    //   }
    // }
    
    return '';
  }

  addUpdateCategory(data) {
    let headers = this.userService.getHeaders();//new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');
    return this.http.post(environment.apiUrl + 'Category/AddUpdateCategory', data, { headers: headers });
  }

  listCategory() {
    let headers = this.userService.getHeaders();//new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get(environment.apiUrl + 'Category/GetCategory', { headers: headers });
  }
}
