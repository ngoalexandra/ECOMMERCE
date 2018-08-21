import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  allUsers: {};
  allFormattedDates: {};
  public sessionExists: boolean;

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
    console.log('=== MAIN.COMPONENT.TS LOADED ===');
    this.fetchAllUsers();
  }
  
  fetchAllUsers() {
    this._userService.fetchAllUsers().subscribe(res => {
      this.allUsers = res['result'];
    });
  }





} // -- EOF
