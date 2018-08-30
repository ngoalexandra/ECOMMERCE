import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
allUsers: any;
allFormattedDates: {};
  public sessionExists: boolean;
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.fetchAllUsers();
  }

  fetchAllUsers(){
    this._userService.fetchAllUsers().subscribe(res => {
      this.allUsers = res['result']
    })
  }

}
