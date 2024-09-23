import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '@models/user';
import { AuthService } from '@services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;
    passwordFieldType: string = 'password';
    confirmPasswordFieldType: string = 'password';
    passwordStrengthMessage: string = '';
    passwordStrengthClass: string = '';

    constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService) { }

    ngOnInit(): void {
        this.registerForm = this.fb.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6), this.passwordValidator.bind(this)]],
            confirmPassword: ['', Validators.required]
        }, { validator: this.passwordsMatchValidator });

        this.registerForm.get('password')?.valueChanges.subscribe(() => {
            this.checkPasswordStrength();
        });
    }

    togglePasswordVisibility() {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    }

    toggleConfirmPasswordVisibility() {
        this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
    }

    checkPasswordStrength() {
        const password = this.registerForm.get('password')?.value;
        let strength = 0;

        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[\W]/.test(password)) strength++;

        switch (strength) {
            case 0:
            case 1:
                this.passwordStrengthClass = 'weak';
                this.passwordStrengthMessage = 'Debole: Almeno 8 caratteri, 1 maiuscola, 1 numero, 1 speciale';
                break;
            case 2:
                this.passwordStrengthClass = 'fair';
                this.passwordStrengthMessage = 'Media: Almeno 8 caratteri, 1 maiuscola, 1 numero, 1 speciale';
                break;
            case 3:
                this.passwordStrengthClass = 'good';
                this.passwordStrengthMessage = 'Buona: Almeno 8 caratteri, 1 maiuscola, 1 numero, 1 speciale';
                break;
            case 4:
                this.passwordStrengthClass = 'strong';
                this.passwordStrengthMessage = 'Forte';
                break;
        }
    }

    passwordValidator(control: FormControl): { [key: string]: boolean } | null {
        const value = control.value;
        let strength = 0;

        if (value.length >= 8) strength++;
        if (/[A-Z]/.test(value)) strength++;
        if (/[0-9]/.test(value)) strength++;
        if (/[\W]/.test(value)) strength++;

        switch (strength) {
            case 0:
            case 1:
                this.passwordStrengthClass = 'weak';
                this.passwordStrengthMessage = 'Debole: Almeno 8 caratteri, 1 maiuscola, 1 numero, 1 speciale';
                break;
            case 2:
                this.passwordStrengthClass = 'fair';
                this.passwordStrengthMessage = 'Media: Almeno 8 caratteri, 1 maiuscola, 1 numero, 1 speciale';
                break;
            case 3:
                this.passwordStrengthClass = 'good';
                this.passwordStrengthMessage = 'Buona: Almeno 8 caratteri, 1 maiuscola, 1 numero, 1 speciale';
                break;
            case 4:
                this.passwordStrengthClass = 'strong';
                this.passwordStrengthMessage = 'Forte';
                break;
        }

        return null;
    }

    passwordsMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
        const password = group.get('password')?.value;
        const confirmPassword = group.get('confirmPassword')?.value;
        return password === confirmPassword ? null : { mismatch: true };
    }

    register() {
        if (this.registerForm.valid) {
            const user: User = {
                name: this.registerForm.get('name')?.value,
                surname: this.registerForm.get('surname')?.value,
                email: this.registerForm.get('email')?.value,
                password: this.registerForm.get('password')?.value,
            };
            this.authService.register(user).subscribe(
                (response) => {
                    console.log("response ", response);
                    this.toastr.success(response.user.name + " creato con successo", "");
                },
                (error) => {
                    console.log("error ", error);
                    this.toastr.error(error?.error?.message, '');
                }
            );
        }
    }
}
