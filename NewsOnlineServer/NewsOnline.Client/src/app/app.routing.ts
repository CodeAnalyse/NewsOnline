import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent, NewsLayoutComponent, LoginLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AdmindashboardComponent } from './views/admindashboard/admindashboard.component';
import { CategoryComponent } from './views/category/category.component';

import { PublisherComponent } from './views/publisher/publisher.component';
import { NewsComponent } from './views/news/news.component';
import { NewsListComponent } from './views/news-list/news-list.component';
import { NewsDetailsComponent } from './views/news-details/news-details.component'; 

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'readnews',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: '',
    component: NewsLayoutComponent,
    data: {
      title: 'News Onlie'
    },
    children: [
      {
        path: 'readnews',
        component: NewsListComponent,
        data: {
          title: 'News Online'
        }
      },
      {
        path: 'newsdetails',
        component: NewsDetailsComponent,
        data: {
          title: 'News Online'
        }
      }]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    data: {
      title: 'News Online'
    },
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'Register Page'
        }
      }]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule'
      },
      {
        path: 'buttons',
        loadChildren: './views/buttons/buttons.module#ButtonsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'dashboard',
        component: AdmindashboardComponent,
        data: {
          title: 'Dashboard'
        }
      },
      
      {
        path: 'category',
        component: CategoryComponent,
        data: {
          title: 'Category Master'
        }
      },
      
      {
        path: 'news',
        component: NewsComponent,
        data: {
          title: 'Publish News'
        }
      }, 
      {
        path: 'publisher',
        component: PublisherComponent,
        data: {
          title: 'Publication Master'
        }
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'notifications',
        loadChildren: './views/notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'theme',
        loadChildren: './views/theme/theme.module#ThemeModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
