import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  // Dati di contatto
  contacts = [
    {
      name: 'Nestor Carranza',
      role: 'Director',
      email: 'nestorcarranza@revolucionciudadana.it',
      phone: '+39 123 456 7890',
    },
  ];

  // Modulo di contatto
  contactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form Submitted!', this.contactForm.value);
      // Aggiungi qui la logica per inviare il modulo (es. chiamata a un API)
      this.contactForm.reset();
    }
  }
}
