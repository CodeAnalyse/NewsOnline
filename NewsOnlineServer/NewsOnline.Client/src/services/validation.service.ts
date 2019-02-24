import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if (user.email == undefined || user.email == '' || user.username == undefined || user.username == '' || user.password == undefined || user.password == '') {
      return false;
    }
    else {
      return true;
    }
  }

  validateUser(item){
    var validation = '<ul>';
    var isSuccess = true;
    if(item.username == null || item.username == ''){
      validation += '<li><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Username is require field.</li>';
      isSuccess = false;
    }
    
    if(item.email == null || item.email == ''){
      validation += '<li><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Email is require field.</li>';
      isSuccess = false;
    }
    else if(!this.validateEmail(item.email)){
      validation += '<li><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Please enter a valid email.</li>';
      isSuccess = false;
    }

    if(item.password == null || item.password == ''){
      validation += '<li><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Password is require field.</li>';
      isSuccess = false;
    }

    if(item.repeatpassword == null || item.repeatpassword == ''){
      validation += '<li><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Repeat Password is require field.</li>';
      isSuccess = false;
    }

    if(item.repeatpassword !== item.password){
      validation += '<li><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Password should match with Repeat Password.</li>';
      isSuccess = false;
    }
    
    validation += '</ul>';
    return isSuccess ? null : validation;
  }


  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}