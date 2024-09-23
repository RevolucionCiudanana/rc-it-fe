import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '@models/user';
import { AuthState } from '@stores/auth/authentication.reducer';
import { Store } from '@ngrx/store';

const API_URL = environment.endpoint + 'api/auth/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    authState$: Observable<AuthState>;
    isAuthenticated!: boolean;
    userRoles!: string;
    user: any;

    constructor(
        private http: HttpClient,
        private store: Store<{ authState: AuthState }>,
    ) {
        this.authState$ = store.select('authState');
    }
    login(user: User): Observable<any> {
        return this.http.post(
            API_URL + 'signin',
            {
                user
            },
            httpOptions,
        );
    }

    register(
        user: User
    ): Observable<any> {
        return this.http.post(
            API_URL + 'signup',
            {
                user
            },
            httpOptions,
        );
    }

    logout(): Observable<any> {
        return this.http.post(API_URL + 'signout', {}, httpOptions);
    }

    public getRoles(): any {
        this.authState$.subscribe((authS) => {
            this.userRoles = authS?.user?.roles || '';
        });

        return this.userRoles;
    }

    public getUser(): any {
        this.authState$.subscribe((authS) => {
            this.user = authS?.user || '';
        });
        return this.user;
    }

    public getAuthStatus(): boolean {
        this.authState$.subscribe((authS) => {
            this.isAuthenticated = authS.isAuthenticated;
        });

        return this.isAuthenticated;
    }
}
