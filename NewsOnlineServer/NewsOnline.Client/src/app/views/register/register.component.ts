import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ValidateService } from '../../../services/validation.service';
import { catchError, map } from 'rxjs/operators';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  username = '';
  email = '';
  password = '';
  type = 'Reader'; 
  repeatpassword = '';
  validationMessage = '';
  showValidation = false;
  constructor(private userService: UserService, private router: Router, private validateService: ValidateService) { }

  FormChanged(){
    var user = {username: this.username, email: this.email, password: this.password, repeatpassword: this.repeatpassword, type: this.type};
    if(this.validationMessage != ''){
      var inValidateResult = this.validateService.validateUser(user);
      if(inValidateResult){
        this.validationMessage = inValidateResult;
        this.showValidation = true;
      }
      else{
        this.validationMessage = '';
        this.showValidation = false;
      }
    }
  }

  registerUser(){
    var user = {username: this.username, email: this.email, password: this.password, repeatpassword: this.repeatpassword, type: this.type};
    
    this.validationMessage = this.validateService.validateUser(user);
    if(this.validationMessage){
      return;
    }

    this.userService.registerUser(user).pipe(catchError((error: any) => {
      //this.flashMessage.show("Error while saving feedback!!",  { cssClass: 'alert-danger', timeout: 3000 });
      //alert("Error while saving feedback!!");
      //this.validationMessage = "Error while saving feedback!!";
      var errorObj = JSON.parse(error["_body"]);
      
      this.validationMessage = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + errorObj['Message'];
      setTimeout(function(){
          this.validationMessage = '';
      }.bind(this), 4000);
      throw error;
    })).subscribe(data => {
      this.login(user);
      //this.flashMessage.show("Feedback saved successfully, Thank you!!",  { cssClass: 'alert-success', timeout: 3000 });
    });
  }

  login(user){
    
    this.userService.loginUser(user).pipe(catchError((error: any) => {
      //this.flashMessage.show("Error while saving feedback!!",  { cssClass: 'alert-danger', timeout: 3000 });
      alert("User Validation Failed!!");
      throw error;
    })).subscribe(data => {
      
      var user = JSON.parse(data["_body"]);
      localStorage.setItem("user", data["_body"]);
      if(user.Type == "Reader"){
        this.router.navigate(['/readnews']);
      }
      if(user.Type == "Publisher"){
        this.router.navigate(['/news']);
      }
      else{

      this.router.navigate(['/dashboard']);
      }
      //this.flashMessage.show("Feedback saved successfully, Thank you!!",  { cssClass: 'alert-success', timeout: 3000 });
    }); 
  }
}
