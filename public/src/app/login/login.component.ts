import { UserService } from './../user.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: {};
  public isLoggedIn: any;

  constructor(private _dataService: DataService, private _userService: UserService, private _route: ActivatedRoute, private _router: Router) { 
    this._dataService.isLoggedIn.subscribe((dataServResponse) => {
      this.isLoggedIn = dataServResponse;
    });
  }

  ngOnInit() {
    this.loginUser = {
      email: '',
      pass: ''
    };
  }


  login() {
    this.checkUser(this.loginUser);
  }

  goToAdmin() {
    // this.checkIfAdmin();
    this._router.navigate(['admindash'])
   
  }

  goToProducts() {
    this._router.navigate(['products']);
    // .then(nav => {
    //   console.log('nav success?', nav); // true if nav is successful
    // }, err => {
    //   console.log('nav success?', err); // when there is an error
    // });
  }

  checkValidations(){
    
  }

  checkUser(potentialUser: any) {
    this._userService.checkUser(potentialUser)
    .subscribe((res: any) => {
      if (res.canLogin === true) {
        if (res.admin === true ) {
          this.isLoggedIn['loggedIn'] = true;
          this.isLoggedIn['isAdmin'] = true;
          // .next is updating values
          this._dataService.isLoggedIn.next(this.isLoggedIn)
          alert('ADMIN Logged In!');
          this.goToAdmin();
        } else {
          this.isLoggedIn['loggedIn'] = true;
          this.isLoggedIn['isAdmin'] = false;
          this._dataService.isLoggedIn.next(this.isLoggedIn)
          alert('USER logged in!');
          this.goToProducts();
        }
      } else {
        alert('FAIL');
        return;
      }
    });
  }






} // -- EOF

