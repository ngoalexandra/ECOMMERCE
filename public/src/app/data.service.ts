import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  cart = new BehaviorSubject ({
    
  })

isLoggedIn = new BehaviorSubject ({
  loggedIn: false,
  isAdmin: false

})
  

  constructor() { }
}
