import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../services/news.service';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-news-management',
  templateUrl: './news-management.component.html',
  styleUrls: ['./news-management.component.scss']
})
export class NewsManagementComponent implements OnInit {
  isLoading = false;
  newsList = [];
  reachedEnd = false;
  dataSource = [];
  displayedColumns = [];
  constructor(private newsService: NewsService) {
    this.displayedColumns = ['Title', 'PublicationName', 'CategoryName', 'star'];

    this.loadNews(1);
  }

  ngOnInit() {
  }

  Edit(element) {
    console.log(element);
  }

  loadNews(pageNumber) {
    this.isLoading = true;
    this.newsService.listNews(pageNumber).pipe(catchError((error: any) => {
      //this.flashMessage.show("Error while saving feedback!!",  { cssClass: 'alert-danger', timeout: 3000 });
      alert("Error while getting data!!");
      throw error;
    })).subscribe(data => {
      var newData = JSON.parse(data["_body"]);
      if (newData && newData.length > 0) {
        this.newsList = this.newsList.concat(newData);
        this.reachedEnd = newData.length < 10;
      }
      else {
        this.reachedEnd = true;
      }

      this.dataSource = this.newsList;
      this.isLoading = false;
    });
  }

}
