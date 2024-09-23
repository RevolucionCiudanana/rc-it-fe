import { eventReducer } from './event/event.reducer';
import { authenticationReducer } from './auth/authentication.reducer'
import { sidebarReducer } from './sidebar/sidebar.reducer';

import { MetaReducer } from "@ngrx/store";
import { HydrationMetaReducer } from "./hydratation/hydratation.reducer";
import { cartReducer } from './cart/cart.reducer';


export const reducers = {
  eventState: eventReducer,
  authState: authenticationReducer,
  sidebarState: sidebarReducer,
  cartState: cartReducer,
};
export const metaReducers: MetaReducer[] = [HydrationMetaReducer];


