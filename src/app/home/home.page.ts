import { CartService } from './../services/cart.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartModalPage } from '../pages/cart-modal/cart-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  cart = [];
  products: any = [];
  cartItemCount: BehaviorSubject<number>;

  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;

  constructor( private cartService: CartService, private modalCtrl: ModalController ) {}

  ngOnInit() {
    this.cartItemCount = this.cartService.getCartItemCount();
    this.getProducts();
  }
  
  getProducts() {
    this.cartService.getProducts().subscribe((data: any) => {
      this.products = data.catalog;
    })
  }

  addProduct(product) {
    this.cartService.addProduct(product);
  }
  
  async goCart() {
    let modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    });
    modal.present();
  }
}
