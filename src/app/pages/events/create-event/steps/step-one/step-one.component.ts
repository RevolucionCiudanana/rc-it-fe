import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime } from 'rxjs/operators';
import { saveStep1 } from '@stores/event/event.actions';
import { ROUTES } from '@utils/routes.constants';
import { OrganizerService } from '@services/organizer.service';
import { Organizer } from '@models/organizer'; // Import the Organizer interface

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent implements OnInit {
  step1Form!: FormGroup;
  characterCount: number = 0;
  organizers: Organizer[] = [];
  userUUID: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<any>,
    private organizerService: OrganizerService
  ) { }

  ngOnInit() {
    this.step1Form = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      organizers: [[]] // Initialize as an empty array
    });

    // this.step1Form.valueChanges.pipe(
    //   debounceTime(300)
    // ).subscribe(formData => {
    //   this.store.dispatch(saveStep1({ step1Data: formData }));
    //   if (formData.description) {
    //     this.characterCount = formData.description.length;
    //   }
    // });

    this.store.select('eventState').subscribe(event => {
      if (event && event.step1) {
        this.patchForm(event.step1);
      }
    });

    this.store.select('authState').subscribe(authState => {
      if (authState && authState.user) {
        this.userUUID = authState.user.uuid;
        this.getOrganizersByUserUUID(this.userUUID);
      }
    });
  }

  // Convenience getter for easy access to form controls
  get formControls() { return this.step1Form.controls; }

  // Function to patch form values
  patchForm(formData: any): void {
    this.step1Form.patchValue({
      name: formData.name || '',
      category: formData.category || '',
      description: formData.description || '',
      imageUrl: formData.imageUrl || '',
      organizers: formData.organizers || [] // Ensure organizers are correctly patched
    });
  }

  // Function to update character count for description field
  updateCharacterCount(): void {
    const description = this.step1Form.get('description')?.value || '';
    this.characterCount = description.length;
  }

  // Function to navigate to next step and save form data
  goNext() {
    this.store.dispatch(saveStep1({ step1Data: this.step1Form.value }));
    this.router.navigate([ROUTES.CREATE_EVENT_STEP_2]);
  }

  // Function to fetch organizers by user UUID
  getOrganizersByUserUUID(userUUID: string): void {
    this.organizerService.getOrganizersByUserUUID(userUUID).subscribe(
      (organizers: Organizer[]) => {
        this.organizers = organizers;
      },
      (error) => {
        console.error('Error fetching organizers', error);
      }
    );
  }
}
