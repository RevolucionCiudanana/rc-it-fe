import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { EventPricingService } from '@services/eventPricing.service';
import { Event } from '@models/event';
import { filter } from 'rxjs/operators';
import { Step } from 'src/app/models/step'; // Assuming you have a Step model defined
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '@services/event.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  steps: Step[] = [{ name: '1', route: 'step-1', index: 1 }, { name: '2', route: 'step-2', index: 2 }, { name: '3', route: 'step-3', index: 3 }];
  currentStep!: string;
  previewItems: any;
  event!: Event;
  isCollapsed: boolean = true;
  createEventForm!: FormGroup;
  characterCount: number = 0;


  constructor(
    private router: Router,
    private store: Store<any>,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private toastr: ToastrService,
    private eventPricingService: EventPricingService
  ) {
    this.initializeCurrentStep();
  }

  ngOnInit() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.initializeCurrentStep();
    });

    this.createEventForm = this.formBuilder.group({
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


    this.store.select('eventState').subscribe(eventState => {
      this.event = { ...eventState.step1, ...eventState.step2, ...eventState.step3 };
    });
  }

  patchForm(formData: any): void {
    this.createEventForm.patchValue({
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

  get formControls() { return this.createEventForm.controls; }


  initializeCurrentStep() {
    const currentUrlParts = this.router.url.split('/');
    this.currentStep = currentUrlParts[currentUrlParts.length - 1];

  }

  isStepActive(step: Step): boolean {
    let currentIndex = this.steps.find(step => step.route === this.currentStep)?.index || 0;

    return step?.index <= currentIndex;
  }

  updateCharacterCount(): void {
    const shortDescription = this.createEventForm.get('shortDescription')?.value || '';
    this.characterCount = shortDescription.length;
  }

  togglePricingWrapper() {
    this.isCollapsed = !this.isCollapsed;
  }

  saveEvent() {
    if (this.createEventForm.valid) {
      const eventData: Event = {
        title: this.createEventForm.value.title,
        shortDescription: this.createEventForm.value.shortDescription,
        location: this.createEventForm.value.location,
        startDateTime: this.createEventForm.value.startDateTime,
        endDateTime: this.createEventForm.value.endDateTime,
        category: this.createEventForm.value.category,
        contactInfo: this.createEventForm.value.contactInfo,
        imageUrl: this.createEventForm.value.imageUrl,
        status: "active"
      };


      // Call the createEvent method from the service
      this.eventService.createEvent(eventData).subscribe({
        next: (response) => {
          this.toastr.success(" Evento creato con successo"),

            console.log('Event created successfully:', response);
            this.router.navigate(['/events']);
        },
        error: (error) => {
          this.toastr.error(" Errore creazione evento")
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

}
