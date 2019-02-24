import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import { NewsService } from '../../../services/news.service';
import { CategoryService } from '../../../services/category.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { PublisherService } from '../../../services/publisher.service';
import { LocationService } from '../../../services/location.service';
import {Router, ActivatedRoute} from "@angular/router";

import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  newsList = [];
  isReading = false;
  readHtml = '';
  pageNumber = 1;
  reachedEnd = false;
  isLoading = false;
  categories=[];
  country = 0; state = 0; city = 0;
  countries = [];
  states = [];
  cities = [];
  publications = [];
  publication = 0;
  categoryId = 0;
  currentLocation = {};
  skipIp = false;
  constructor(private newsService:NewsService,
    private categoryService:CategoryService,
    private publisherService: PublisherService,
    private locationService: LocationService,
    private activatedRoute: ActivatedRoute, private router: Router) {
      if(window["data"]){
        console.log(window["data"]);
        this.country = window["data"].country;
        this.state = window["data"].state;
        this.city = window["data"].city;
        this.publication = window["data"].publication;
        this.skipIp = true;
        
        this.getStates(true);
      }
      this.activatedRoute.queryParams.subscribe(params => {
        this.categoryId = params['category'];
        this.pageNumber = 1;
        if(!this.categoryId){
          this.categoryId = 0;
        }
        //this.loadNews(this.pageNumber, true);
        this.loadCountries();
        this.loadPublishers();
    });
   }

  ngOnInit() {
  }

  loadPublishers(){
    this.publisherService.listPublisherByLocation(this.country, this.state, this.city).subscribe((data) => {
      var f = this.publication;
      this.publications = JSON.parse(data["_body"]);
    });
  }

  getIp(){
    this.locationService.getPublicIp().subscribe(data => {
      var ip = JSON.parse(data["_body"]);
      this.locationService.getLocationByIp(ip["ip"]).subscribe(data => {
        this.currentLocation = JSON.parse(data["_body"]);
        if(this.currentLocation["country_name"]){
          this.country = this.getCountryIdValue(this.currentLocation["country_name"]);
        }
        this.getStates(true);
      });
    });
  }

  getCountryIdValue(countryName){
    for(var i = 0; i < this.countries.length; i++){
      if(countryName.toLowerCase() == this.countries[i].Name.toLowerCase()){
        return this.countries[i].Id;
      }
    }

    return 0;
  }

  getStateIdValue(stateName){
    for(var i = 0; i < this.states.length; i++){
      if(stateName.toLowerCase() == this.states[i].Name.toLowerCase()){
        return this.states[i].Id;
      }
    }

    return 0;
  }

  getCityIdValue(cityName){
    for(var i = 0; i < this.cities.length; i++){
      if(cityName.toLowerCase() == this.cities[i].Name.toLowerCase()){
        return this.cities[i].Id;
      }
    }

    return 0;
  }


  loadCountries(){
    this.locationService.listCountries().pipe(catchError((error: any) => {
      //this.flashMessage.show("Error while saving feedback!!",  { cssClass: 'alert-danger', timeout: 3000 });
      //alert("Error while getting data!!");
      throw error;
    })).subscribe(data => {
      this.countries = JSON.parse(data["_body"]);
      if(!this.skipIp){
        this.getIp();
      }
      //this.flashMessage.show("Feedback saved successfully, Thank you!!",  { cssClass: 'alert-success', timeout: 3000 });
    }); 
  }

  getStates(skipLoadNews = false){
    this.cities = [];
    this.pageNumber = 1;
    if(!skipLoadNews){
      this.loadNews(this.pageNumber, true);
    }

    if(!this.skipIp){
      this.publication = 0;
    }

    this.loadPublishers();
    this.locationService.listStates(this.country).pipe(catchError((error: any) => {
      //this.flashMessage.show("Error while saving feedback!!",  { cssClass: 'alert-danger', timeout: 3000 });
      //alert("Error while getting data!!");
      throw error;
    })).subscribe(data => {
      this.states = JSON.parse(data["_body"]);
      if(this.currentLocation["region_name"]){
      this.state = this.getStateIdValue(this.currentLocation["region_name"]);
      }
      this.getCities(true);
      //this.flashMessage.show("Feedback saved successfully, Thank you!!",  { cssClass: 'alert-success', timeout: 3000 });
    });
  }

  getCities(skipLoadNews = false){
    this.pageNumber = 1;
    if(!skipLoadNews){
      this.loadNews(this.pageNumber, true);
    }

    this.loadPublishers();
    this.locationService.listCities(this.state).pipe(catchError((error: any) => {
      //this.flashMessage.show("Error while saving feedback!!",  { cssClass: 'alert-danger', timeout: 3000 });
      //alert("Error while getting data!!");
      throw error;
    })).subscribe(data => {
      this.cities = JSON.parse(data["_body"]);
      if(this.currentLocation["city"]){
      this.city = this.getCityIdValue(this.currentLocation["city"]);
      }
      setTimeout(function() { this.citySelected();}.bind(this), 100);
      //this.flashMessage.show("Feedback saved successfully, Thank you!!",  { cssClass: 'alert-success', timeout: 3000 });
    });
  }

  citySelected(){
    if(!this.skipIp){
      this.publication = 0;
    }

    this.loadPublishers();
    this.pageNumber = 1;
    this.loadNews(this.pageNumber, true);
  }

  publisherSelected(){
    
    this.pageNumber = 1;
    this.loadNews(this.pageNumber, true);
  }

  loadCategories(){
    this.categoryService.listCategory().subscribe(data => {
      this.categories = JSON.parse(data["_body"]);
      
      if(this.categories && this.categories.length > 0){
        this.categories = this.categories.filter(data => { return data.StatusId == 1; });
      }
    });
  }
  onScrollDown() {
    
    console.log('scrolled down!!');
    if(!this.reachedEnd && !this.isLoading){
      this.loadNews(++this.pageNumber);
    }
  }
 
  onScrollUp() {
    console.log('scrolled up!!');
  }

  loadNews(pageNumber, newLoad = false){
    this.isLoading = true;
    window["data"] = { "country": this.country, "state": this.state, "city": this.city, "publication": this.publication };
    this.newsService.listNews(pageNumber, this.categoryId, this.country, this.state, this.city, this.publication).pipe(catchError((error: any) => {
      //this.flashMessage.show("Error while saving feedback!!",  { cssClass: 'alert-danger', timeout: 3000 });
      alert("Error while getting data!!");
      throw error;
    })).subscribe(data => {
      var newData = JSON.parse(data["_body"]);
      if(newLoad){
        this.reachedEnd = false;
        this.newsList = [];
      }
      if(newData && newData.length > 0){
        this.newsList = this.newsList.concat(newData);
        this.reachedEnd = newData.length < 10;
      }
      else{
        this.reachedEnd = true;
      }
      this.isLoading = false;
      //this.flashMessage.show("Feedback saved successfully, Thank you!!",  { cssClass: 'alert-success', timeout: 3000 });
    }); 
  }

  readNews(news){
    this.readHtml = news.Body;
    this.isReading = true;
  }

  backToNewsList(){
    this.isReading = false;
  }

  openDetails(Id){
    this.router.navigate(['/newsdetails'], { queryParams: { id: Id } }); 
  }

}
