import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';

import { ROUTES } from '@utils/routes.constants';

import { AuthService } from '@services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): boolean | Promise<boolean> {
        const isAuthenticated = this.authService.getAuthStatus();
        if (!isAuthenticated) {
            this.router.navigate([ROUTES.LOGIN]);
        } else {
            const userRoles = this.authService.getRoles();
            const authRoles = route.data['roles'];
            const contains = userRoles.some((role: any) => {
                return authRoles?.indexOf(role) !== -1;
            });

            if (contains) {
                return true;
            }
        }

        return false;
    }
}
