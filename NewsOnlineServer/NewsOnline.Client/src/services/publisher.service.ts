import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { UserService } from './user.service';
//let localStorage = require('local-storage');


@Injectable()
export class PublisherService {
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

  addUpdatePublisher(data) {
    let headers = this.userService.getHeaders();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');
    return this.http.post(environment.apiUrl + 'Publisher/AddUpdatePublisher', data, { headers: headers });
  }

  listPublisher() {
    let headers = this.userService.getHeaders();

    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get(environment.apiUrl + 'Publisher/GetPublisher', { headers: headers });
  }

  listPublisherByLocation(countryId = 0, stateId = 0, cityId=0) {
    let headers = this.userService.getHeaders();

    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get(environment.apiUrl + 'Publisher/GetPublisherByLocation?countryId='+countryId+'&stateId='+stateId+'&cityId='+cityId, { headers: headers });
  }
}