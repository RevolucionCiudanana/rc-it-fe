import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@models/user';
import { Store } from '@ngrx/store';
import { login } from '@stores/auth/authentication.actions';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

    constructor(private fb: FormBuilder, private store: Store<{ authState: any }>,
    ) { }

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    login(): void {
        const user: User = {
            email: this.loginForm.get('email')?.value,
            password: this.loginForm.get('password')?.value,
        };
        
        this.store.dispatch(login({ user }));
    }
}
