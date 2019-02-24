import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent implements OnInit {
  users = [];
  displayedColumns = [];
  dataSource = [];

  constructor(private userService: UserService) { 
    this.displayedColumns = ['Username', 'Email', 'Type', 'StatusId', 'star'];
    this.loadUsers();
  }

  //loads users from server
  loadUsers(){
    this.userService.listUser().pipe(catchError((error: any) => {
      //this.flashMessage.show("Error while saving feedback!!",  { cssClass: 'alert-danger', timeout: 3000 });
      alert("Error while getting data!!");
      throw error;
    })).subscribe(data => {
      this.users = JSON.parse(data["_body"]);
      this.dataSource = this.users;
      //this.flashMessage.show("Feedback saved successfully, Thank you!!",  { cssClass: 'alert-success', timeout: 3000 });
    }); 
  }

  ApproveUser(user){
    this.userService.approveUser(user).pipe(catchError((error: any) => {
      //this.flashMessage.show("Error while saving feedback!!",  { cssClass: 'alert-danger', timeout: 3000 });
      alert("Error while approving User!!");
      throw error;
    })).subscribe(data => {
      this.loadUsers();
      alert("User approved successfully!!");
      //this.flashMessage.show("Feedback saved successfully, Thank you!!",  { cssClass: 'alert-success', timeout: 3000 });
    }); 
  }

  DisableUser(user){
    this.userService.disableUser(user).pipe(catchError((error: any) => {
      //this.flashMessage.show("Error while saving feedback!!",  { cssClass: 'alert-danger', timeout: 3000 });
      alert("Error while disabling User!!");
      throw error;
    })).subscribe(data => {
      this.loadUsers();
      alert("User disabled successfully!!");
      //this.flashMessage.show("Feedback saved successfully, Thank you!!",  { cssClass: 'alert-success', timeout: 3000 });
    }); 
  }

  ngOnInit() {
  }

}
