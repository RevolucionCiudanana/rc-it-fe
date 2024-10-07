import { Component, OnInit, HostListener } from '@angular/core';
import { User } from '@models/user';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { logout } from '@stores/auth/authentication.actions';

@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.scss'],
})
export class HeaderLayoutComponent implements OnInit {
  isMenuModalOpen: boolean = false;
  isMenuUserOpen: boolean = false;
  isAuthenticated: boolean = false;
  menuBecomeMember: string = "";
  user!: User;
  constructor(private translate: TranslateService, private store: Store<{ authState: any }>) { }

  ngOnInit(): void {
    this.store.select('authState').subscribe(authState => {
      this.isAuthenticated = authState.isAuthenticated;
      this.user = authState.user;
    });

  }

}
