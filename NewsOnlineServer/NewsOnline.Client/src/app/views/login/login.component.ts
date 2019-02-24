import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { UserService } from '../../../services/user.service';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  username='';
  password='';
  
  validationMessage = "";
  constructor(private router: Router, private userService: UserService) { }

  Login(){
    var user = {username: this.username, password: this.password};
    
    this.userService.loginUser(user).pipe(catchError((error: any) => {
      //this.flashMessage.show("Error while saving feedback!!",  { cssClass: 'alert-danger', timeout: 3000 });
      //alert("User Validation Failed!!");
      var errorObj = JSON.parse(error["_body"]);
      
      this.validationMessage = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + errorObj['Message'];
      setTimeout(function(){
          this.validationMessage = '';
      }.bind(this), 3000);
      throw error;
    })).subscribe(data => {
      var user = JSON.parse(data["_body"]);
      localStorage.setItem("user", data["_body"]);
      if(user.Type == "Reader"){
        this.router.navigate(['/readnews']);
      }
      else if(user.Type == "Publisher"){
        this.router.navigate(['/news']);
      }
      else if(user.Type == "Admin"){

      this.router.navigate(['/dashboard']);
      }
      else{
        this.router.navigate(['/readnews']);
      }
      //this.flashMessage.show("Feedback saved successfully, Thank you!!",  { cssClass: 'alert-success', timeout: 3000 });
    }); 
  }

  RegisterUser(){
    this.router.navigate(['/register']); 
  }
}
