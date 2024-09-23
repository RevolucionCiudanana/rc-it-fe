// src/app/store/cart/cart.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { addToCart, removeFromCart, clearCart } from './cart.actions';
import { Product } from '@models/product';

export interface CartState {
    courier: any;
    billingAddress: any;
    shippingAddress: any;
    items: Product[];
}

export const initialState: CartState = {
    items: [],
    courier: null,
    billingAddress: null,
    shippingAddress: null
};

export const cartReducer = createReducer(
    initialState,
    on(addToCart, (state, { product }) => ({
        ...state,
        items: [...state.items, product],
    })),
    on(removeFromCart, (state, { cartProductId }) => ({
        ...state,
        items: state.items.filter(item => item.cartProductId !== cartProductId),
    })),
    on(clearCart, state => ({
        ...state,
        items: [],
    }))
);
