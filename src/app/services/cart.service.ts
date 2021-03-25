import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  type: string;
  price: number;
  currency: string;
  amount: number;
  imageURL: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  data = '../../assets/data/mock.json'
  private cart: any = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor( private http: HttpClient ) { }
  
  getProducts() {
    return this.http.get(`${this.data}`)
  }
  
  getCart() {
    return this.cart;
  }
  
  getCartItemCount() {
    return this.cartItemCount;
  }
  
  addProduct(product) {
    let added = false;
    for(let p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if(!added) {
      this.cart.push(product)
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
  
  decreaseProduct(product) {
    for(let [i, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(i, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }
  
  removeProduct(product) {
    for (let [i, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(i, 1)
      }
    }
  }
}
