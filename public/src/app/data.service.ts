import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // cart needs to be an array to push into, if an object must specify key
  cart = new BehaviorSubject ([

  ])
  cart_total = new BehaviorSubject(null);

isLoggedIn = new BehaviorSubject ({
  loggedIn: false,
  isAdmin: false

})
  

  constructor() { }
}
