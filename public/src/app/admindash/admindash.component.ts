import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})

export class AdmindashComponent implements OnInit {
  allProducts: any;
  deleteConfirmation: any;
  search_str_val: any;

  constructor(private _productServ: ProductService, private _router: Router) { }

  ngOnInit() {
    this.fetchAllProducts()
    this.search_str_val = "";
  }

  fetchAllProducts() {
    this._productServ.fetchAllProducts().subscribe(res => {
      this.allProducts = res['result'];
    });
  }

  deleteProduct(id: any) {
    this.deleteConfirmation = confirm("Are you sure you want to delete this product?")
    if (this.deleteConfirmation == true) {
      this._productServ.deleteProduct(id).subscribe(res => {
        this.fetchAllProducts();
        alert("Product has been deleted")
      })
    }
    else {
      return;
    }
  }

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

  orderBy(){
    this._productServ.byOrder().subscribe(res => {
      this.allProducts = res['products'];
    })
  }
  orderDesc(){
    this._productServ.orderDesc().subscribe(res =>{
      this.allProducts = res['results'];
    })
  }
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
