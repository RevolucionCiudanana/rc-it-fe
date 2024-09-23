import { createAction, props } from '@ngrx/store';
import { Product } from '@models/product';

export const addToCart = createAction(
    '[Cart] Add to Cart',
    props<{ product: Product }>()
);

export const removeFromCart = createAction(
    '[Cart] Remove from Cart',
    props<{ cartProductId: string }>()
);

export const clearCart = createAction('[Cart] Clear Cart');

export const updateShippingAddress = createAction(
    '[Cart] Update Shipping Address',
    props<{ address: { name: string, city: string, country: string, zip: string } }>()
);

export const updateBillingAddress = createAction(
    '[Cart] Update Billing Address',
    props<{ address: { name: string, city: string, country: string, zip: string } }>()
);

export const updateCourier = createAction(
    '[Cart] Update Courier',
    props<{ courierId: number }>()
);