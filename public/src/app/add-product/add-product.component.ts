import { Component, OnInit } from '@angular/core';
import {ProductService} from './../product.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  newProduct: {};
  constructor(private _productServ: ProductService, private _router: Router) { }

  ngOnInit() {
    this.newProduct = {
      product_name: "",
      description: "",
      color: "",
      price: "",
      qty: "",
      sku: "",
      img: ""
    }
  }
  createNewProduct(newProductForm){
    this.newProduct = newProductForm.value;
    this._productServ.createProduct(this.newProduct).subscribe((res: any) =>{
      console.log(res);
      if (res["success"] === true) {
        this._router.navigate(['/admindash'])
      } else {
        alert("Could Not successfully create product");
      }
    })
  }

}
