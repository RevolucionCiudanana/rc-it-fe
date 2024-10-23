import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { EventPricingService } from '@services/eventPricing.service';
import { Event } from '@models/event';
import { filter } from 'rxjs/operators';
import { Step } from 'src/app/models/step';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '@services/event.service';
import { ToastrService } from 'ngx-toastr';
import { UploadService } from '@services/upload.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  // Other properties...
  createEventForm!: FormGroup;
  characterCount: number = 0;
  selectedFile!: File | null;
  uploadedFiles: File[] = []; // Array to hold uploaded documents

  constructor(
    private router: Router,
    private store: Store<any>,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private uploadService: UploadService,
    private toastr: ToastrService,
    private eventPricingService: EventPricingService
  ) {
  }

  ngOnInit() {
    // Existing initialization code...
    this.createEventForm = this.formBuilder.group({
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      location: ['', Validators.required],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required],
      category: ['', Validators.required],
      contactInfo: ['', Validators.required],
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onDocumentChange(event: any) {
    const files = event.target.files;
    this.uploadedFiles = Array.from(files); // Convert FileList to an array
  }
  updateCharacterCount(): void {
    const shortDescription = this.createEventForm.get('shortDescription')?.value || '';
    this.characterCount = shortDescription.length;
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
        status: "active"
      };

      // Create the event and get the event ID
      this.eventService.createEvent(eventData).subscribe({
        next: (response) => {
          this.toastr.success("Evento creato con successo");
          console.log("response", response)
          const eventId = response.event.id; // Assuming your response returns the created event ID
          // Now upload event documents
          if (eventId)
            this.saveEventDocuments(eventId);
        },
        error: () => {
          this.toastr.error("Errore creazione evento");
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  saveEventDocuments(eventId: string) {
    const formData = new FormData();

    for (let file of this.uploadedFiles) {
      formData.append('files', file);
    }

    formData.append('eventId', eventId);

    this.uploadService.uploadEventDocuments(formData).subscribe(
      (response) => {
        console.log(response);
        this.uploadedFiles = []; // Clear the uploaded files array
        this.router.navigate(['/events']);
      },
      (error) => {
        this.toastr.error("Errore nel caricamento dei documenti");
      }
    );
  }
}
