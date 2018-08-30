import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  allUsers: {};
  allFormattedDates: {};
  public sessionExists: boolean;
  isLoggedIn: any;
  cart: any;
  cart_total: any;

  constructor(private _dataServ: DataService, private _userService: UserService, private _router: Router) {
    // we are subscribing in the constructor because one it is constructed we want to automatically grab the data
    this._dataServ.isLoggedIn.subscribe((dataServResponse) => {
      this.isLoggedIn = dataServResponse;
    });
    this._dataServ.cart.subscribe((dataServRes) => {
      this.cart = dataServRes;
      this.cart_total = this.cartItemCount();
    })
    this._dataServ.cart_total.subscribe((dataServRes) => {
      this.cart_total = dataServRes;
    })
  }

  ngOnInit() {
  }

  cartItemCount() {
    this.cart_total = 0;
    // loop through cart
    for (let i = 0; i < this.cart.length; i++) {
      // the cart count = the qty of each item
      this.cart_total += this.cart[i]['qty']
      // always update total in DataService
      this._dataServ.cart_total.next(this.cart_total);
    }
    return this.cart_total;
  }


  destroySession() {
    this._userService.destroySession()
      .subscribe((res: any) => {
        console.log("###########", res)
        this.isLoggedIn['loggedIn'] = false;
        this.isLoggedIn['isAdmin'] = false;
        alert("Logging out")
        this._router.navigate(['main']);
      });
  }


  goToProducts() {
    console.log("Products was clicked in header")
    this._userService.checkSession()
      .subscribe((res) => {
        console.log("###############", res);
        if (res['continue'] === true) {
          this._router.navigate(['products']);
        } else {
          return;
        }
      });
  }


  goToAdminDash() {
    this._userService.checkIfAdmin()
      .subscribe((res) => {
        if (res['message'] === "IS ADMIN") {
          this._router.navigate(['admindash']);
        } else {
          return;
        }
      });
  }

  goToCheckout() {
    this._router.navigate(['checkout'])
  }
}
