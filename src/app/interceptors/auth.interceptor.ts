import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '@stores/auth/authentication.reducer';
import { logout } from '@stores/auth/authentication.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private store: Store<{ authState: AuthState }>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    // Handle 401 Unauthorized error
                    this.store.dispatch(logout());
                    this.router.navigate(['/login']); // Redirect to login page
                }
                return throwError(error);
            })
        );
    }
}
