// homepage.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from '@models/event';
import { fadeInAnimation, fadeInLeftAnimation, fadeInRightAnimation, zoomInAnimation } from 'src/app/animations';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  animations: [fadeInAnimation, fadeInLeftAnimation, fadeInRightAnimation, zoomInAnimation],
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  filteredEvents: Event[] = [];
  categories: string[] = [];
  filterForm!: FormGroup;
  showFiltersModal: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private eventService: EventService // Assuming you have an EventService to handle API calls
  ) { }

  imageUrls = [
    'assets/images/homepage/hero.jpg',
    'assets/images/homepage/hero.jpg',
    'assets/images/homepage/hero.jpg'
  ];

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      search: [''],
      category: [''],
      date: [''],
      price: ['200']  // Default value for the price range slider
    });

    this.loadEvents(); // Fetch events initially
  }

  loadEvents() {
    // this.eventService.getEvents(this.filterForm.value).subscribe(
    //   (events: Event[]) => {
    //     this.filteredEvents = events;
    //     this.categories = [...new Set(events.map(event => event.category))];
    //   },
    //   (error) => {
    //     console.error('Error fetching events:', error);
    //     // Handle error
    //   }
    // );
  }

  applyFilters() {
    this.loadEvents(); // Reload events based on current filters
  }

  updatePriceDisplay(event: any) {
    const inputElement = event.target as HTMLInputElement;
    this.filterForm.patchValue({ price: inputElement.value });
  }

  openFiltersModal() {
    this.showFiltersModal = true;
  }

  closeFiltersModal() {
    this.showFiltersModal = false;
  }

  goToEvent(event: Event) {
    this.router.navigate(['/event', event?.uuid]);
  }
}
