import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';

import { catchError, map } from 'rxjs/operators';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  myForm :FormGroup;

  matcher : ErrorStateMatcher;

  dataSource = [];
  displayedColumns = [];
  constructor(private categoryService: CategoryService, private fb: FormBuilder) { 
    
    this.displayedColumns = ['name', 'StatusId', 'star'];
    this.loadCategories();
    this.myForm = new FormGroup({
      Id: new FormControl('0'),
      name: new FormControl('', [
        Validators.required
      ]),
      statusId: new FormControl('1')
   });
   this.matcher = new ErrorStateMatcher();
  }

  loadCategories(){
    this.categoryService.listCategory().pipe(catchError((error: any) => {
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
      this.categoryService.addUpdateCategory(this.myForm.value).pipe(catchError((error: any) => {
        //this.flashMessage.show("Error while saving feedback!!",  { cssClass: 'alert-danger', timeout: 3000 });
        alert("Error while saving data!!");
        throw error;
      })).subscribe(data => {
        this.loadCategories();
        alert("Category Saved Successfully!!");
        //this.flashMessage.show("Feedback saved successfully, Thank you!!",  { cssClass: 'alert-success', timeout: 3000 });
      }); 
    }
  }

  resetForm(){
    this.myForm.setValue({Id:0, name: '', statusId: "1"});
  }

  Edit(element){
    this.myForm.setValue({Id:element.Id, name: element.Name, statusId: element.StatusId+""});
  }

  ngOnInit() {
  }

}
