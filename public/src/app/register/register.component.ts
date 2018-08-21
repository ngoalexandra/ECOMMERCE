import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: {};

  constructor(private _userService: UserService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.newUser = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      pass2: '',
      created_at: '',
      updated_at: '',
      admin: 0
    };
  }


// ======= submit form - CREATE USER =====
  submitNewUser(newFormUser) {
    // if (this.newUser['first_name'].length < 3){
    //   alert("First name cannot be empty");
    //   return;
    // }
    // if(this.newUser['last_name'].length < 3) {
    //   alert("Last name cannot be empty");
    //   return;
    // }
    // if(this.newUser['email'].length < 5 && this.newUser['email'].length === 0){
    //   alert("Email cannot be empty");
    //   return;
    // }
    // if(this.newUser['password'].length < 5){
    //   alert("Password must contain at least 5 characters")
    //   return;
    // }
    
    this.newUser = newFormUser.value;
    if (this.newUser['password'] === this.newUser['pass2']) {
      this._userService.createUser(this.newUser)
      .subscribe((res: any) => {
          if (res.success === true) {
            console.log('result is valid -> routing back to app.component');
            this._router.navigate(['/']);
          } else {
            console.log('invalid result - server error not saved');
          }
        });
      } else {
        console.log('password doesn\'t match');
        alert('passwords do not match');
      }

  }





}
