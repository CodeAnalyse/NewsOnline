import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import { PublisherService } from '../../../services/publisher.service';
import { CategoryService } from '../../../services/category.service';
import { NewsService } from '../../../services/news.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  htmlContent ='';
  title='';
  myForm :FormGroup;
  imageUrl = '';
  fileToUpload = [];
  imageChangedEvent: any = '';
croppedImage: any = '';
  uploadImageForBanner: boolean = true;
  finishCropImage:boolean = false;
  croppingDone:boolean = false;
  publications = [];
  categories = [];
  matcher : ErrorStateMatcher;
  userCurrent;

  constructor(private newsService: NewsService, private publisherService:PublisherService, private categoryService: CategoryService) {
    this.loadPublications();
    this.loadCategories();
    this.imageUrl = environment.apiUrl + 'News/PostImage';
    var usr = localStorage.getItem("user");
      if(usr){
        this.userCurrent = JSON.parse(usr);
      }
    this.myForm = new FormGroup({
      Id: new FormControl('0'),
      title: new FormControl('', [
        Validators.required
      ]),
      BannerUrl: new FormControl(''),
      selectedPublication: new FormControl(''),
      selectedCategory: new FormControl('')
   });
    this.matcher = new ErrorStateMatcher();
    this.finishCropImage = false;
    this.croppingDone = false;
  }

  loadPublications(){
    this.publisherService.listPublisher().subscribe(data => {
      this.publications = JSON.parse(data["_body"]);
    });
  }

  loadCategories(){
    this.categoryService.listCategory().subscribe(data => {
      this.categories = JSON.parse(data["_body"]);
      if(this.categories && this.categories.length > 0){
        this.categories = this.categories.filter(data => { return data.StatusId == 1; });
      }
    });
  }

  ngOnInit() {
  }

  finishCrop(){
    this.finishCropImage = true;
  }
  willUpload(){
    this.uploadImageForBanner = true;
  }

  willUseUrl(){
    this.uploadImageForBanner = false;
  }

  handleFileInput(files: FileList, event: any) {
    this.imageChangedEvent = event;
    this.fileToUpload = []; 
    this.croppingDone = true;
    for(var i = 0; i < files.length; i++){

      this.fileToUpload.push(files.item(i));
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppingDone = true;
    //alert("Imagecroped");
  }
  imageLoaded() {
    this.croppingDone = true;
      // show cropper
  }
  loadImageFailed() {
      // show message
  }

  onSubmit(){
    if(!this.myForm.invalid){
      var data = {
        Title: this.myForm.value.title,
        Body: this.htmlContent,
        Id: this.myForm.value.Id,
        files: [this.fileToUpload],
        BannerUrl: this.uploadImageForBanner ? this.croppedImage : this.myForm.value.BannerUrl,
        publication: this.myForm.value.selectedPublication,
        category: this.myForm.value.selectedCategory
      };
      this.newsService.addUpdateNews(data).pipe(catchError((error: any) => {
        //this.flashMessage.show("Error while saving feedback!!",  { cssClass: 'alert-danger', timeout: 3000 });
        alert("Error while saving data!!");
        throw error;
      })).subscribe(data => {
        alert("News Saved Successfully!!");
        //this.flashMessage.show("Feedback saved successfully, Thank you!!",  { cssClass: 'alert-success', timeout: 3000 });
      }); 
    }
  }
}
