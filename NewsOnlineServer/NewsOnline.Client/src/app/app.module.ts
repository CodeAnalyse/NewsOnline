import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HttpModule } from '@angular/http';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  
  MatButtonModule,  
  MatMenuModule,  
  MatToolbarModule,  
  MatIconModule,  
  MatCardModule,  
  MatFormFieldModule,  
  MatInputModule,  
  MatNativeDateModule,  
  MatRadioModule,  
  MatSelectModule,  
  MatOptionModule,  
  MatSlideToggleModule
} from '@angular/material';  
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';


// Import containers
import { DefaultLayoutComponent, NewsLayoutComponent, LoginLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { UserService } from '../services/user.service';
import { CategoryService } from '../services/category.service';

import { PublisherService } from '../services/publisher.service';
import { NewsService } from '../services/news.service';
import { ValidateService } from '../services/validation.service';

import { LocationService } from '../services/location.service';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

const APP_CONTAINERS = [
  DefaultLayoutComponent,
  NewsLayoutComponent,
  LoginLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AdmindashboardComponent } from './views/admindashboard/admindashboard.component';
import { CategoryComponent } from './views/category/category.component';
import { PublisherComponent } from './views/publisher/publisher.component';
import { NewsComponent } from './views/news/news.component';
import { NgxEditorModule } from 'ngx-editor';
import { HttpClientModule } from '@angular/common/http';
import { NewsListComponent } from './views/news-list/news-list.component'; 
import { ImageCropperModule } from 'ngx-image-cropper';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NewsDetailsComponent } from './views/news-details/news-details.component';
import { NewsManagementComponent } from './views/news-management/news-management.component';
enableProdMode();
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpModule,
    MatTableModule,
  MatButtonModule,  
  MatMenuModule,  
  MatToolbarModule,  
  MatIconModule,  
  MatCardModule,  
  MatFormFieldModule,  
  MatInputModule,  
  MatNativeDateModule,  
  MatRadioModule,  
  MatSelectModule,  
  MatOptionModule,  
  MatSlideToggleModule,
  NgxEditorModule,
  HttpClientModule,
  ImageCropperModule,
  InfiniteScrollModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    AdmindashboardComponent,
    CategoryComponent,
    PublisherComponent,
    NewsComponent,
    NewsListComponent,
    NewsDetailsComponent,
    NewsManagementComponent
  ],  
  exports: [  
    MatButtonModule,  
    MatMenuModule,  
    MatToolbarModule,  
    MatIconModule,  
    MatCardModule,  
    BrowserAnimationsModule,  
    MatFormFieldModule,  
    MatInputModule,   
    MatNativeDateModule,  
    MatRadioModule,  
    MatSelectModule,  
    MatOptionModule,  
    MatSlideToggleModule  
  ],  
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  UserService,
  CategoryService,
  PublisherService,
  NewsService,
  ValidateService,
  LocationService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
