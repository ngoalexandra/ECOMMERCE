import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { DataService } from '../data.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  cart: any;
  allProducts: any;
  search_str_val: any;

  constructor(private _userService: UserService, private _productServ: ProductService, private _dataService: DataService, private _router: Router) {
    this._dataService.cart.subscribe(res => {
      this.cart = res;
    })
  }

  ngOnInit() {
    this.fetchAllProducts()
    this.checkSession();

  }

  //  GET ALL PRODUCTS
  fetchAllProducts(){
    this._productServ.fetchAllProducts().subscribe(res =>{
      this.allProducts = res['results'];
    })
  }


  //  SEARCH BAR
  onKey(event: any) {
    // event is the actual key being pressed
    console.log("*********", event)
    console.log(event.target.value)
    // the value of the 
    this.search_str_val = event.target.value;
    console.log("SEARCH STRING VAL", this.search_str_val);
    if (this.search_str_val.length > 0) {
      this._productServ.sendSearchStr(this.search_str_val).subscribe(res => {
        console.log("Server response", res);
        // if there were results found in the DB allProducts will now equal whatever the results were. Which will show in the table
        if (res['found'] === true) {
          this.allProducts = res['results']
        }

      })
    }
    // else should be outside of first if statement, so it shows all products after if statement failed
    else {
      this.fetchAllProducts();
    }
  }



//   BUTTON TO ADD TO CART
  addToCartBtn(product_id) {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].id === product_id) {
        this.cart[i].qty++;
        // update cart value in dataServ
        this._dataService.cart.next(this.cart);
        return;

      } else {
        //  if it's the first time product is being clicked, set qty to 1
        this.cart.push({ id: product_id, qty: 1 })
        this._dataService.cart.next(this.cart);
      }
    }
  }

// CHECK IF USER IS IN SESSION
  checkSession() {
    console.log('ngOnInit check login user id');
    this._userService.checkSession()
      .subscribe((res) => {
        console.log('res =>', res);
        if (res['continue'] === true) {
          return;
        } else {
          this._router.navigate(['main']);
        }
      });
  }

// FILTER/ SORT PRODUCT BY
  priceByOrder(){
    this._productServ.priceByOrder().subscribe(res => {
      this.allProducts = res['results'];
    })
  }
  priceHighToLow(){
    this._productServ.priceHighToLow().subscribe(res => {
      this.allProducts = res['results'];
    })
  }






}
