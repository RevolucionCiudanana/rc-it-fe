import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  profileForm!: FormGroup;
  user: any;

  constructor(private fb: FormBuilder, private store: Store<{ authState: any }>) { }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required]],
    });

    this.store.select('authState').subscribe(authState => {
      this.user = authState.user;
    });
  }
}
