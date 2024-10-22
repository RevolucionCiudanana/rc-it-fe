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

  socialMediaLinks = [
    { platform: 'Facebook', icon: 'fab fa-facebook', handle: '@RC5Italia', link: "https://www.facebook.com/RC5Italia/" },
    { platform: 'Instagram', icon: 'fab fa-instagram', handle: '@rc5italia', link: "https://www.instagram.com/rc5italia/" },
    { platform: 'X (Twitter)', icon: 'fab fa-x-twitter', handle: '@RC5Italia', link: "https://x.com/RC5Italia" },
    { platform: 'TikTok', icon: 'fab fa-tiktok', handle: '@RC5Italia', link: "https://www.tiktok.com/@rc5italia?_t=8qF1wSzeEee&_r=1" }
  ];


  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      search: [''],
      category: [''],
      date: [''],
      price: ['200']  // Default value for the price range slider
    });

  }
}
