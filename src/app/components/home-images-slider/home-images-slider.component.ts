import { Component, Input, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-home-images-slider',
  templateUrl: './home-images-slider.component.html',
  styleUrls: ['./home-images-slider.component.scss']
})
export class HomeImagesSliderComponent implements OnInit, OnDestroy {
  @Input() sliderImages: string[] = [];
  currentIndex = 0;
  isMobileView = false;
  private intervalId: any;

  ngOnInit(): void {
    this.detectScreenSize();
    this.startImageRotation();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.detectScreenSize();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  get images(): string[] {
    return this.isMobileView ? this.sliderImages : this.sliderImages;
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  private startImageRotation(): void {
    this.intervalId = setInterval(() => {
      this.next();
    }, 3000); // Change image every 3 seconds
  }

  private detectScreenSize(): void {
    // Set mobile view to true if window width is 768px or below
    this.isMobileView = window.innerWidth <= 768;
  }
}
