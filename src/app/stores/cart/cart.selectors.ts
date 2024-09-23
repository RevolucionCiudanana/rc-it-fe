import { createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';
import { AppState } from '@stores/app.state';

export const selectCartState = (state: AppState): CartState => state.cartState;

export const selectShippingAddress = createSelector(
    selectCartState,
    (state: CartState) => state.shippingAddress
);

export const selectBillingAddress = createSelector(
    selectCartState,
    (state: CartState) => state.billingAddress
);

export const selectCourier = createSelector(
    selectCartState,
    (state: CartState) => state.courier
);
