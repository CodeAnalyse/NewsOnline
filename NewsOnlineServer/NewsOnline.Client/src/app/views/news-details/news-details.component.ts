import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../services/news.service';
import {Router, ActivatedRoute} from "@angular/router";
import { catchError, map } from 'rxjs/operators';


@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {
  news = {};
  constructor(private newsService:NewsService, private activatedRoute: ActivatedRoute) { 
      this.activatedRoute.queryParams.subscribe(params => {
        var id = params['id'];
        if(!id){
          id = 0;
        }
        this.loadNews(id);
    });
  }

  loadNews(id){
    this.newsService.listNewsById(id).pipe(catchError((error: any) => {
      //this.flashMessage.show("Error while saving feedback!!",  { cssClass: 'alert-danger', timeout: 3000 });
      alert("Error while getting data!!");
      throw error;
    })).subscribe(data => {
      this.news = JSON.parse(data["_body"]);
    }); 
  }

  ngOnInit() {
  }

}
