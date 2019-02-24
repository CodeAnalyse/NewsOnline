import { Component, OnInit } from '@angular/core';
import { PublisherService } from '../../../services/publisher.service';
import { LocationService } from '../../../services/location.service';

import { catchError, map } from 'rxjs/operators';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent implements OnInit {

  myForm :FormGroup;

  matcher : ErrorStateMatcher;

  dataSource = [];
  displayedColumns = [];
  countries = [];
  states = [];
  cities = [];
  
  constructor(private publisherService: PublisherService, private fb: FormBuilder, private locationService: LocationService) { 
    
    this.displayedColumns = ['name', 'StatusId', 'star'];
    this.loadPublishhers();
    this.loadCountries();
    this.myForm = new FormGroup({
      Id: new FormControl('0'),
      name: new FormControl('', [
        Validators.required
      ]),
      statusId: new FormControl('1'),
      selectedCountry: new FormControl(''),
      selectedState: new FormControl(''),
      selectedCity: new FormControl('')
   });
   this.matcher = new ErrorStateMatcher();
  }

  loadCountries(){
    this.locationService.listCountries().pipe(catchError((error: any) => {
      //this.flashMessage.show("Error while saving feedback!!",  { cssClass: 'alert-danger', timeout: 3000 });
      //alert("Error while getting data!!");
      throw error;
    })).subscribe(data => {
      this.countries = JSON.parse(data["_body"]);
      //this.flashMessage.show("Feedback saved successfully, Thank you!!",  { cssClass: 'alert-success', timeout: 3000 });
    }); 
  }

  getStates(countryId = null){
    this.cities = [];
    if(!countryId){
      countryId = this.myForm.value.selectedCountry;
    }
    this.locationService.listStates(countryId).pipe(catchError((error: any) => {
      //this.flashMessage.show("Error while saving feedback!!",  { cssClass: 'alert-danger', timeout: 3000 });
      //alert("Error while getting data!!");
      throw error;
    })).subscribe(data => {
      this.states = JSON.parse(data["_body"]);
      //this.flashMessage.show("Feedback saved successfully, Thank you!!",  { cssClass: 'alert-success', timeout: 3000 });
    });
  }

  getCities(stateId = null){
    if(!stateId){
      stateId = this.myForm.value.selectedState;
    }
    this.locationService.listCities(stateId).pipe(catchError((error: any) => {
      //this.flashMessage.show("Error while saving feedback!!",  { cssClass: 'alert-danger', timeout: 3000 });
      //alert("Error while getting data!!");
      throw error;
    })).subscribe(data => {
      this.cities = JSON.parse(data["_body"]);
      //this.flashMessage.show("Feedback saved successfully, Thank you!!",  { cssClass: 'alert-success', timeout: 3000 });
    });
  }

  loadPublishhers(){
    this.publisherService.listPublisher().pipe(catchError((error: any) => {
      //this.flashMessage.show("Error while saving feedback!!",  { cssClass: 'alert-danger', timeout: 3000 });
      alert("Error while getting data!!");
      throw error;
    })).subscribe(data => {
      this.dataSource = JSON.parse(data["_body"]);
      //this.flashMessage.show("Feedback saved successfully, Thank you!!",  { cssClass: 'alert-success', timeout: 3000 });
    }); 
  }

  onSubmit(){
    if(!this.myForm.invalid){
      this.publisherService.addUpdatePublisher(this.myForm.value).pipe(catchError((error: any) => {
        //this.flashMessage.show("Error while saving feedback!!",  { cssClass: 'alert-danger', timeout: 3000 });
        alert("Error while saving data!!");
        throw error;
      })).subscribe(data => {
        this.loadPublishhers();
        alert("Publisher Saved Successfully!!");
        //this.flashMessage.show("Feedback saved successfully, Thank you!!",  { cssClass: 'alert-success', timeout: 3000 });
      }); 
    }
  }

  resetForm(){
    this.myForm.setValue({Id:0, name: '', statusId: "1",
    selectedCountry: '',
    selectedState: '',
    selectedCity: ''});
  }

  
  Edit(element){
    this.getStates(element.SelectedCountry);
    this.getCities(element.SelectedState)
    this.myForm.setValue({Id:element.Id, name: element.Name, statusId: element.StatusId+"",
    selectedCountry: element.SelectedCountry+'',
    selectedState: element.SelectedState+'',
    selectedCity: element.SelectedCity+''
  });
    //this.myForm.controls["selectedCountry"].setValue([element.selectedCountry+'']);
    this.myForm.get('selectedCountry').setValue(element.SelectedCountry);
    this.myForm.get('selectedState').setValue(element.SelectedState);
    this.myForm.get('selectedCity').setValue(element.SelectedCity);

    // this.myForm.setControl("selectedCountry", new FormControl('1'));
  }

  ngOnInit() {
  }

}
