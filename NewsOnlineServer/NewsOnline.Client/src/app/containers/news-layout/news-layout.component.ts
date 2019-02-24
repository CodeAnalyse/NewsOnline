import {Component, OnDestroy} from '@angular/core';
import { navItems } from './../../_nav';
import {Router, ActivatedRoute} from "@angular/router";

import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './news-layout.component.html',
  styleUrls: ['./news.layout.component.css',
              //'./bootstrap.min.css',
              //'./owl.carousel.min.css',
              //'./responsive.css',
              //'./style.css'
            ]
})
export class NewsLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  categories=[];
  categoryId = 0;
  userCurrent;
  constructor(private categoryService:CategoryService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.loadCategories();
    this.activatedRoute.queryParams.subscribe(params => {
      this.categoryId = params['category'];
      if(!this.categoryId){
        this.categoryId = 0;
      }

      console.log("nnnnn");
      var usr = localStorage.getItem("user");
      if(usr){
        this.userCurrent = JSON.parse(usr);
      }
    });
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: [ 'class' ]
    });
  }

  navigate(path){
    this.router.navigate([path]); 
  }

  SignOut(){
    localStorage.removeItem("user");
    this.userCurrent = null;

    this.router.navigate(['/readnews']);
  }

  SelectCategory(categoryId){
    this.categoryId = categoryId;
    this.router.navigate(['/readnews'], { queryParams: { category: categoryId } }); 
  }
  loadCategories(){
    this.categoryService.listCategory().subscribe(data => {
      this.categories = JSON.parse(data["_body"]);
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
