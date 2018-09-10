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
      email: null,
      password: '',
      pass2: '',
      created_at: '',
      updated_at: '',
      admin: 0
    };
  }


  // ======= submit form - CREATE USER =====
  submitNewUser(newFormUser) {
    this.newUser = newFormUser.value;
    if (this.newUser['password'] === this.newUser['pass2']) {
      this._userService.createUser(this.newUser)
        .subscribe((res: any) => {
          if (res.success === true) {
            console.log('new user was created');
            alert("successfully registered, proceed by logging in")
            this._router.navigate(['/login']);
          } else {
            console.log("SERVER RES WHEN REGISTERING >>>>>", res)
            alert(res['message'])
            this._router.navigate(['/register'])
          }
        });
    } else {
      console.log('password doesn\'t match');
      alert('passwords do not match');
    }

  }





}
