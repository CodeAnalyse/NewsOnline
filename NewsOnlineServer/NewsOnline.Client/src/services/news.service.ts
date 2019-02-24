import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';
//let localStorage = require('local-storage');


@Injectable()
export class NewsService {
  isSessionVaild = true;
  constructor(private http: Http, public router: Router) {  }

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

  addUpdateNews(data) {
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data;application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');
    let formData: FormData = new FormData();
    formData.append('Id', data.Id);
    formData.append('Title', data.Title);
    formData.append('BannerUrl', data.BannerUrl);
    formData.append('Body', encodeURIComponent(data.Body));
    formData.append('publication', encodeURIComponent(data.publication));
    formData.append('category', encodeURIComponent(data.category));
    //if(data.Attachment.length > 1){
      for(var i = 0; i < data.files.length; i++){
        formData.append('file', data.files[i]);
      }
    //}
    return this.http.post(environment.apiUrl + 'News/SaveNews', formData);
  }

  listNews(pageNumber, categoryId = 0, countryId = 0, stateId = 0, cityId=0, publisherId = 0, userId = 0) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get(environment.apiUrl + 'News/GetNews?pageNumber=' + pageNumber + '&categoryId=' + categoryId + '&countryId=' + countryId + '&stateId=' + stateId + '&cityId=' + cityId + '&publicationId=' + publisherId + '&userId=' + userId, { headers: headers });
  }

  listNewsById(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get(environment.apiUrl + 'News/GetNewsById?id='+id, { headers: headers });
  }
}
