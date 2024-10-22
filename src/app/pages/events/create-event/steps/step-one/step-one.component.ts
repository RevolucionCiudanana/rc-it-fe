import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Event } from '@models/event';
import { Store } from '@ngrx/store';
import { EventService } from '@services/event.service';
import { saveStep1 } from '@stores/event/event.actions';
import { ROUTES } from '@utils/routes.constants';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent implements OnInit {
  step1Form!: FormGroup;
  characterCount: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private eventService: EventService,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.step1Form = this.formBuilder.group({
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      location: ['', Validators.required],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required],
      category: ['', Validators.required],
      contactInfo: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });

    this.store.select('eventState').subscribe(event => {
      if (event && event.step1) {
        this.patchForm(event.step1);
      }
    });
  }

  // Convenience getter for easy access to form controls
  get formControls() { return this.step1Form.controls; }

  // Function to patch form values
  patchForm(formData: any): void {
    this.step1Form.patchValue({
      title: formData.title || '',
      shortDescription: formData.shortDescription || '',
      location: formData.location || '',
      startDateTime: formData.startDateTime || '',
      endDateTime: formData.endDateTime || '',
      category: formData.category || '',
      contactInfo: formData.contactInfo || '',
      imageUrl: formData.imageUrl || '',
    });
  }

  // Function to update character count for short description field
  updateCharacterCount(): void {
    const shortDescription = this.step1Form.get('shortDescription')?.value || '';
    this.characterCount = shortDescription.length;
  }

  // Function to navigate to the next step and save form data
  saveEvent() {
    if (this.step1Form.valid) {
      const eventData: Event = {
        title: this.step1Form.value.title,
        shortDescription: this.step1Form.value.shortDescription,
        location: this.step1Form.value.location,
        startDateTime: this.step1Form.value.startDateTime,
        endDateTime: this.step1Form.value.endDateTime,
        category: this.step1Form.value.category,
        contactInfo: this.step1Form.value.contactInfo,
        imageUrl: this.step1Form.value.imageUrl,
        status: "active"
      };


      // Call the createEvent method from the service
      this.eventService.createEvent(eventData).subscribe({
        next: (response) => {
          console.log('Event created successfully:', response);
          // Navigate to the next step
          // this.router.navigate([ROUTES.nextStepRoute]);
        },
        error: (error) => {
          console.error('Error creating event:', error);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
