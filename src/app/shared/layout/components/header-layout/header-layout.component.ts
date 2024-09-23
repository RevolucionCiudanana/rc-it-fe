import { Component, OnInit, HostListener } from '@angular/core';
import { User } from '@models/user';
import { Store } from '@ngrx/store';
import { logout } from '@stores/auth/authentication.actions';

@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.scss']
})
export class HeaderLayoutComponent implements OnInit {
  isMenuModalOpen: boolean = false;
  isMenuUserOpen: boolean = false;
  isAuthenticated: boolean = false;
  user!: User;
  constructor(private store: Store<{ authState: any }>) { }

  ngOnInit(): void {
    this.store.select('authState').subscribe(authState => {
      this.isAuthenticated = authState.isAuthenticated;
      this.user = authState.user;
    });
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!this.isMenuUserOpen || target.closest('.profile-wrapper') || target.closest('.profile-menu')) {
      return;
    }
    this.isMenuUserOpen = false;
  }


  toggleMenuUser(): void {
    this.isMenuUserOpen = !this.isMenuUserOpen;
  }

  closeMenuUser(): void {
    this.isMenuUserOpen = false;
  }


  toggleMenuModal(): void {
    this.isMenuModalOpen = !this.isMenuModalOpen;
  }
  closeMenuModal() {
    this.isMenuModalOpen = false;
  }

}
