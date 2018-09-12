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
  }

  checkValidations() {

  }

  checkUser(potentialUser: any) {
    this._userService.checkUser(potentialUser)
      .subscribe((res: any) => {
        console.log("SERVER RES WHILE LOGGING IN>>>>>", res);
        if (res.canLogin === true) {
          console.log("User can login >>>>>>>>>>>")
          if (res.admin === true) {
            console.log("User is ADMIN >>>>>>>>>>>")
            this.isLoggedIn['loggedIn'] = true;
            this.isLoggedIn['isAdmin'] = true;
            // .next is updating values
            this._dataService.isLoggedIn.next(this.isLoggedIn)
            alert(res['message']);
            this.goToAdmin();
          } else if (res.admin !== true) {
            console.log("User is not ADMIN >>>>>>>>>>>")
            this.isLoggedIn['loggedIn'] = true;
            this.isLoggedIn['isAdmin'] = false;
            this._dataService.isLoggedIn.next(this.isLoggedIn)
            alert(res['message']);
            this.goToProducts();
          }
          console.log("before else statement >>>>>>>>>>")
        }
        else {
          console.log("FAILED LOGIN >>>>>>>>>>>>")
          alert(res['message']);
          return;
        }
      });
  }






} // -- EOF

