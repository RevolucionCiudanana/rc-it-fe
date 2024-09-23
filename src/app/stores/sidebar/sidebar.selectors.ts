import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SidebarState } from './sidebar.reducer';

export const selectSidebarState = createFeatureSelector<SidebarState>('sidebar');

export const selectIsSidebarOpen = createSelector(
    selectSidebarState,
    (state: SidebarState) => state.isOpen
);
