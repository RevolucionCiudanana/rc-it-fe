// src/app/cart-icon/cart-icon.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CartState } from '@stores/cart/cart.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit, OnDestroy {
  itemCountSubscription!: Subscription;
  itemCount: number = 0;

  constructor(private store: Store<any>, private router: Router) {
  }

  ngOnInit(): void {
    this.itemCountSubscription = this.store.select('cartState').subscribe(cartState => {
      this.itemCount = cartState?.items?.length;
    });
  }

  ngOnDestroy(): void {
    if (this.itemCountSubscription) {
      this.itemCountSubscription.unsubscribe();
    }
  }

  goToPageCheckout() {
    this.router.navigate(['/checkout/order-details']);
  }

}
