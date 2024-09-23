import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { toggleSidebar, closeSidebar } from '@stores/sidebar/sidebar.actions';
import { selectIsSidebarOpen } from '@stores/sidebar/sidebar.selectors';
import { SidebarState } from '@stores/sidebar/sidebar.reducer';
import { AuthState } from '@stores/auth/authentication.reducer';
import { User } from '@models/user';
import { NavigationEnd, Router } from '@angular/router';
import { logout } from '@stores/auth/authentication.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  isOpen: boolean = false;
  isAuthenticated: boolean = false;
  user!: User;

  private subscription!: Subscription;
  constructor(private router: Router, private store: Store<{ sidebarState: SidebarState, authState: AuthState }>) { }

  ngOnInit() {

    const sidebarSubscription = this.store.select('sidebarState').subscribe(sidebar => {
      this.isOpen = sidebar.isOpen;
    });
    const authStateSubscription = this.store.select('authState').subscribe(authState => {
      this.isAuthenticated = authState.isAuthenticated;
      this.user = authState.user;
    });

    const routerEventsSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.store.dispatch(closeSidebar());
      }
    })

    if (this.subscription && sidebarSubscription)
      this.subscription.add(sidebarSubscription);
    if (this.subscription && authStateSubscription)
      this.subscription.add(authStateSubscription);
    if (this.subscription && routerEventsSubscription)
      this.subscription.add(routerEventsSubscription);

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onToggle() {
    this.store.dispatch(toggleSidebar());
  }

  onClose() {
    this.store.dispatch(closeSidebar());
  }

  logout() {
    this.store.dispatch(logout());
    this.store.dispatch(closeSidebar());
  }
}
