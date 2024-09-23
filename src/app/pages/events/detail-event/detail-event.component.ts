import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { EventService } from '@services/event.service';
import { addToCart } from '@stores/cart/cart.actions';
import { CartState } from '@stores/cart/cart.reducer';
import { fadeInAnimation, fadeInLeftAnimation } from 'src/app/animations';
import { Event } from '@models/event';
import { Product } from '@models/product';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.scss'],
  animations: [fadeInAnimation, fadeInLeftAnimation]
})
export class DetailEventComponent implements OnInit {
  event: Event | undefined;
  uuid: string = '';
  tossState = 'start';

  constructor(
    private store: Store<{ cart: CartState }>,
    private activeRoute: ActivatedRoute,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.uuid = params['uuid'];
      this.getEventByUUID(this.uuid);
    });
  }

  getEventByUUID(uuid: string) {
    this.eventService.getEventByUUID(uuid).subscribe(
      (event) => {
        event.products.forEach((product: Product) => {
          if (product.quantity === undefined) {
            product.quantity = 0;
          }
        });
        this.event = event;
      },
      (error) => {
        console.error('Error fetching event:', error);
      }
    );
  }

}
