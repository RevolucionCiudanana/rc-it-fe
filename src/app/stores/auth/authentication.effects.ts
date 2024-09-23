import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import {
    login,
    loginRedirect,
    logout,
    logoutConfirmation,
    logoutConfirmationDismiss,
    loginSuccess,
    loginFailure,
    idleTimeout,
    register,
    registerSuccess,
    registerFailure,
} from './authentication.actions';

import { AuthService } from '../../services/auth.service';

import { ROUTES } from '@utils/routes.constants';
import { User } from '@models/user';

import { ToastrService } from 'ngx-toastr';


@Injectable()
export class AuthEffects {
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(login),
            map((action) => action.user),
            exhaustMap((user: User) =>
                this.authService.login(user).pipe(
                    map((user) => loginSuccess({ user })),
                    catchError((error) => of(loginFailure({ error }))),
                ),
            ),
        ),
    );

    loginSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(loginSuccess),
                tap(() => this.router.navigate([ROUTES.HOME])),
            ),
        { dispatch: false },
    );
    loginFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(loginFailure),
                tap((error) =>
                    this.toastr.error(error?.error?.message, ''),
                ),
            ),
        { dispatch: false },
    );

    removeLocalStorage$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(logout),
                tap(() => localStorage.removeItem('state')),
            ),
        { dispatch: false },
    );

    loginRedirect$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(loginRedirect, logout),
                tap(() => {
                    this.router.navigate([ROUTES.HOME]);
                }),
            ),
        { dispatch: false },
    );

    logoutConfirmation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(logoutConfirmation),
            map((result) => (result ? logout() : logoutConfirmationDismiss())),
        ),
    );

    logoutIdleUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(idleTimeout),
            map(() => logout()),
        ),
    );

    //Register effects
    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(register),
            map((action) => action.user),
            exhaustMap((user: User) =>
                this.authService
                    .register(user)
                    .pipe(
                        map((user) => registerSuccess({ user })),
                        catchError((error) => of(registerFailure({ error }))),
                    ),
            ),
        ),
    );

    registerSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(registerSuccess),
                tap((response) =>
                    this.toastr.success(response.user.name + " loggato con successo", ""),
                ),
            ),
        { dispatch: false },
    );

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService,
    ) { }
}
