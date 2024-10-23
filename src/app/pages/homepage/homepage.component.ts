// homepage.component.ts

import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from '@models/event';
import { fadeInAnimation, fadeInLeftAnimation, fadeInRightAnimation, zoomInAnimation } from 'src/app/animations';
import { SpacesService } from '@services/spaces.service';

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

  events: Event[] = [];
  currentIndex: number = 0;
  isMobile: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private spacesService: SpacesService,
    private router: Router,
  ) { }

  sliderImages: any = [];

  socialMediaLinks = [
    { platform: 'Facebook', icon: 'fab fa-facebook', handle: '@RC5Italia', link: "https://www.facebook.com/RC5Italia/" },
    { platform: 'Instagram', icon: 'fab fa-instagram', handle: '@rc5italia', link: "https://www.instagram.com/rc5italia/" },
    { platform: 'X (Twitter)', icon: 'fab fa-x-twitter', handle: '@RC5Italia', link: "https://x.com/RC5Italia" },
    { platform: 'TikTok', icon: 'fab fa-tiktok', handle: '@RC5Italia', link: "https://www.tiktok.com/@rc5italia?_t=8qF1wSzeEee&_r=1" }
  ];


  ngOnInit() {

    this.checkIfMobile();
    this.loadEvents();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkIfMobile();
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  loadEvents() {
    this.eventService.getEvents({ category: '' }).subscribe(
      (events: Event[]) => {
        this.events = events.map(event => {
          if (event.eventDocuments && event.eventDocuments.length > 0) {
            const document = event.eventDocuments[0];
            if (document.keyFile) {
              this.sliderImages.push(this.getFileUrl(document.keyFile))
            }
          }
          return event;
        });
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  get firstThreeImages(): string[] {
    return this.sliderImages.slice(0, 3); // Get the first 3 images
  }
  

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  getFileUrl(key: string): string {
    return this.spacesService.s3.getSignedUrl('getObject', {
      Bucket: this.spacesService.bucketName,
      Key: key,
      Expires: 3600,
    });
  }

  getSliderTransform(): string {
    return `translateX(-${this.currentIndex * 100}%)`;
  }


  nextSlide() {
    if (this.currentIndex < this.events.length - 1) {
      this.currentIndex++;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
  
}
