import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart: any;
  cartProducts: any;
  final_price: any;
  cart_total: any;

  constructor(private _dataService: DataService, private _productService: ProductService) {
    this._dataService.cart.subscribe((res) => {
      this.cart = res;
      this.cart_total = this.cartItemCount();
    })
    this._dataService.cart_total.subscribe((dataServRes)=>{
      this.cart_total = dataServRes;
    })
  }

  ngOnInit() {
    this.cartProducts = [];
    this.getAllInSession();
  }

  cartItemCount(){
    this.cart_total = 0;
    // loop through cart
    for (let i = 0; i <this.cart.length; i++){
      // the cart count = the qty of each item
      this.cart_total += this.cart[i]['qty']
      // always update total in DataService
      this._dataService.cart_total.next(this.cart_total);
    }
    return this.cart_total;
  }

  getAllInSession() {
    this._productService.getAllCartProds().subscribe(res => {
      console.log("response when getting all products from cart", res);
      if (res['message'] === "Error") {
        return;
      }
      else if (res['message'] === "Success"){
        this.cartProducts = res['totalItemsBack']
        this.final_price = res['final_price']
      }
    })
  }
}
