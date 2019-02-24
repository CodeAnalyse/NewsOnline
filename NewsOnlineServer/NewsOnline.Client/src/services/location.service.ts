import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';
//let localStorage = require('local-storage');


@Injectable()
export class LocationService {
    constructor(private http: Http, public router: Router) {  }

    listCountries() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        return this.http.get(environment.apiUrl + 'Location/GetCountries', { headers: headers });
    }

    listStates(countryId) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        return this.http.get(environment.apiUrl + 'Location/GetStates?countryId='+countryId, { headers: headers });
    }

    listCities(stateId) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        return this.http.get(environment.apiUrl + 'Location/GetCities?stateId='+stateId, { headers: headers });
    }

    getPublicIp(){
        return this.http.get("https://api.ipify.org/?format=json");
    }

    getLocationByIp(ipAddress){
        return this.http.get("http://api.ipstack.com/"+ ipAddress +"?access_key=f5c71b9939fc8f41e5ea99cd1671235a&format=1");
    }
}