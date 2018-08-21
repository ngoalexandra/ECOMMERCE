import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { ActivatedRoute, Params, Router } from '@angular/router'

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productToEdit: {};
  prod_id: any;
  editConfirmation: any;


  constructor(private _productServ: ProductService, private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.productToEdit = {
      product_name: "",
      qty: "",
      color: "",
      price: "",
      stu: "",
      description: "",
      img: ""
    };
    this._route.params.subscribe(params => {
      console.log("Inside edit component ngoninit")
      console.log(params['id']);
      this.prod_id = params['id'];
      this.findProduct(params['id']);
    })
    // putting on ngoninit so value resets to empty after page reloads
    
  }

  findProduct(id: string) {
    this._productServ.findOne(id).subscribe(res => {
      console.log(res);
      this.productToEdit = res["result"]
      console.log("this is the product to edit", this.productToEdit);
    })
  }
  // you need to pass two parameters, the id and the edited values, which sends request to the server
  // and the server does the query to edit, then sends back with a response which the front end subscribes to 
  // the server response to get the new edited information
  editProduct() {
    this.editConfirmation = confirm("Are you sure you want to edit this product?")
    if (this.editConfirmation === true) {
      this._productServ.editProduct(this.prod_id, this.productToEdit).subscribe(res => {
        console.log(res);
        alert("Product has been edited");
        this._router.navigate(['/admindash']);
      })
    }
  }

}
