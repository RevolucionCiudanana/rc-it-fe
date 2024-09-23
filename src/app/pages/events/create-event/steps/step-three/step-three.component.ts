import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '@services/event.service';

import { select, Store } from '@ngrx/store';
import { cleanSteps, saveStep3 } from '@stores/event/event.actions';
import { debounceTime, first } from 'rxjs/operators';
import { Event } from '@models/event';
import { ROUTES } from '@utils/routes.constants';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss']
})
export class StepThreeComponent implements OnInit {

  step3Form!: FormGroup;
  fullName: string = "";
  email: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<any>,
    private eventService: EventService

  ) { }

  ngOnInit() {
    this.step3Form = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      disclaimer: [false, [Validators.requiredTrue]]
    });

    this.step3Form.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(formData => {
      this.store.dispatch(saveStep3({ step3Data: formData }));
    });

    this.store.select('eventState').subscribe(event => {
      if (event && event.step3) {
        this.step3Form.patchValue(event.step3, { emitEvent: false });
      }
    });

    this.store.select('authState').subscribe(authState => {
      this.email = authState?.user?.email;
      this.fullName = authState?.user?.name + ' ' + authState?.user?.surname;
      this.step3Form.patchValue({ fullName: this.fullName, email: this.email }, { emitEvent: false })
    });

  }

  goNext() {
    this.store.dispatch(saveStep3({ step3Data: this.step3Form.value }));
    this.createEvent();
  }

  createEvent() {
    this.store.pipe(
      select('eventState'),
      first()
    ).subscribe(eventState => {
      const event: Event = {
        ...eventState.step1,
        ...eventState.step2,
        ...eventState.step3,
        status: "sent"
      };

      this.eventService.createEvent(event).subscribe(date => {
        this.store.dispatch(cleanSteps());
        this.router.navigate([ROUTES.HOME]);
      });
    });
  }

  goBack() {
    this.router.navigate([ROUTES.CREATE_EVENT_STEP_2]);
  }

}
