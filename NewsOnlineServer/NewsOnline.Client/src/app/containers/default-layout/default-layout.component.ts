import {Component, OnDestroy} from '@angular/core';
import { navItems } from './../../_nav';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.css']
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  userCurrent;

  constructor(private router: Router) {
    var usr = localStorage.getItem("user");
    if(usr){
      this.userCurrent = JSON.parse(usr);
      var type = this.userCurrent["Type"];
      this.navItems = this.navItems.filter(function(obj){

        return !obj["Type"] || obj["Type"] == "ALL" || obj["Type"].indexOf(type) > -1;
      });
    }
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: [ 'class' ]
    });
  }


  SignOut(){
    localStorage.removeItem("user");
    this.userCurrent = null;

    this.router.navigate(['/readnews']);
  }
  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
