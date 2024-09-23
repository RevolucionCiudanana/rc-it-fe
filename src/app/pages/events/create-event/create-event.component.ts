import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { EventPricingService } from '@services/eventPricing.service';
import { Event } from '@models/event';
import { filter } from 'rxjs/operators';
import { Step } from 'src/app/models/step'; // Assuming you have a Step model defined

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

  constructor(
    private router: Router,
    private store: Store<any>,
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


    this.store.select('eventState').subscribe(eventState => {
      this.event = { ...eventState.step1, ...eventState.step2, ...eventState.step3 };
    });
  }

  initializeCurrentStep() {
    const currentUrlParts = this.router.url.split('/');
    this.currentStep = currentUrlParts[currentUrlParts.length - 1];

  }

  isStepActive(step: Step): boolean {
    let currentIndex = this.steps.find(step => step.route === this.currentStep)?.index || 0;

    return step?.index <= currentIndex;
  }



  togglePricingWrapper() {
    this.isCollapsed = !this.isCollapsed;
  }
}
