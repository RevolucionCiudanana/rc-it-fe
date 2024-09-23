// auth.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './authentication.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
    selectAuthState,
    (state: AuthState) => state.isAuthenticated
);

export const selectUser = createSelector(
    selectAuthState,
    (state: AuthState) => state.user
);
