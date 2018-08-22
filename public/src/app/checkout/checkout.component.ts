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

  constructor(private _dataService: DataService, private _productService: ProductService) {
    this._dataService.cart.subscribe((res) => {
      this.cart = res;

    })
  }

  ngOnInit() {
    this.cartProducts = [];
    this.getAllInSession();
  }

  getAllInSession() {
    this._productService.getAllCartProds().subscribe(res => {
      console.log("response when getting all products from cart", res);
      if (res['message'] === "Error") {
        return;
      }
      else if (res['message'] === "Success"){
        this.cartProducts = res['results']
      }
    })
  }
}
