import { Injectable } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }
  createProduct(product: any) {
    console.log(product)
    return this._http.post("/api/createProduct", product);
  }
  fetchAllProducts(){
    return this._http.get("/api/allProducts")
  }

  deleteProduct(id: any){
    console.log("inside delete product in serv", id)
    return this._http.delete("/api/" + id + "/deleteProduct")
  }
  findOne(id: any){
    console.log("product found", id)
    return this._http.get("/api/" + id)
  }
  // you need to pass two parameters, the id and the edited values, which sends request to the server
  // and the server does the query to edit, then sends back with a response which the front end subscribes to 
  // the server response to get the new edited information
  editProduct(id: any, productToEdit){
    return this._http.put("/api/" + id + "/edit", productToEdit )
  }
  // front end controller. passes information to the server
  sendSearchStr(search_str: any){
    console.log("IN SERVICE", search_str);
    return this._http.get("/api/product/search/"+ search_str);
   
  }
  byOrder(){
    return this._http.get("/api/products/byOrder");
  }

  orderDesc(){
    return this._http.get("/api/products/byDesc");
  }

  priceByOrder(){
    return this._http.get("/api/products/pricebyOrder");
  }
  priceHighToLow(){
    return this._http.get("/api/prodcuts/priceHighToLow");
  }

  getAllCartProds(){
    console.log("In product service - get all cart products")
    return this._http.get("/api/getAllCartProducts")

  }
  removeFromSession(id){
    return this._http.get("/api/products/removeItemSession/" + id);
  }
}
