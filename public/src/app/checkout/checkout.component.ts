import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';


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
  clearCartConfirmation: boolean;
  zeroConfirmation: boolean;

  constructor(private _dataService: DataService, private _productService: ProductService, private _router: Router) {
    this._dataService.cart.subscribe((res) => {
      this.cart = res;
      this.cart_total = this.cartItemCount();
    })
    this._dataService.cart_total.subscribe((dataServRes) => {
      this.cart_total = dataServRes;
    })
  }

  ngOnInit() {
    this.cartProducts = [];
    this.getAllInSession();
  }

  cartItemCount() {
    this.cart_total = 0;
    // loop through cart
    for (let i = 0; i < this.cart.length; i++) {
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
      else if (res['message'] === "Success") {
        // our products in the cart and what we get as a response from the server
        this.cartProducts = res['totalItemsBack']
        // then we update the cart in the service
        this._dataService.cart.next(this.cartProducts);
        // then we set the final price
        this.final_price = res['final_price']
      }
    })
  }

  // ================ CLEAR CART =======================
  clearCart() {
    this.clearCartConfirmation = confirm("Are you sure you want to clear cart?")
    if (this.clearCartConfirmation === true) {
      //  clears cart in session, making it empty
      this._dataService.clearCartSession().subscribe(dataServRes => {
        console.log("While clearing the cart, this is response >>>>", dataServRes);
        if (dataServRes['message'] === "Successfully cleared cart") {
          this.cart = null;
          console.log(this.cart)
          console.log("EMPTY CART >>>>>>>", this.cart)

          // we are updating the cart in the service setting it back to empty
          this._dataService.cart.next(this.cart)

          //  we are also updating the cart_total since we cleared the cart, setting it to 0
          this.cart_total = 0;
          this._dataService.cart_total.next(this.cart_total);

          // we want to get all products which is EMPTY
          this.getAllInSession();

          // then redirect
          this._router.navigate(['/'])

        }
      })
    }
  }

  // =================== ADD QTY OF ITEM =======================
  addCartQty(product_id) {
    console.log(">>>>>>>>> product id ", product_id)
    // adding to existing cart
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].id === product_id) {
        this.cart[i].qty++;
        this._dataService.cart.next(this.cart);
        // update cart session in data service
        this._dataService.updateCartSession({ cart: this.cart }).subscribe(serverRes => {
          console.log("when updating cart session", serverRes);
          this.getAllInSession();
        })
        return;
      }
    }
  }

  decreaseQty(product_id) {
    console.log("Button to decrease qty has been clicked");
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].id === product_id) {
        if (this.cart[i].qty > 1) {
          this.cart[i].qty--;
          // update cart in service
          this._dataService.cart.next(this.cart);
          // then update the cart session in data service
          this._dataService.updateCartSession({ cart: this.cart }).subscribe(serverRes => {
            console.log("when we updated cart in session", serverRes);
            // console.log("CART WHEN DECREASING QUANTITY >>>>>>>>>>", this.cart)
            // this.cart_total = this.cart[i].qty
            // console.log("UPDATED CART TOTAL AFTER DECREASE QTY>>>>>>>>>", this.cart_total);
            // this._dataService.cart_total.next(this.cart_total);
             // get all cart products after we have made changes
            this.getAllInSession();
          })
        } else if (this.cart[i].qty === 1) {
          this.zeroConfirmation = confirm("Are you sure you want to remove last item in cart?");
          if (this.zeroConfirmation === true){
            console.log("Last item was removed");
          }
        }
        return;
      }
    }
  }
  // ================== DECREASE DTY OF ITEM ===================
}

