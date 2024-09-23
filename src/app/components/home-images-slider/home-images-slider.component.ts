import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home-images-slider',
  templateUrl: './home-images-slider.component.html',
  styleUrls: ['./home-images-slider.component.scss']
})
export class HomeImagesSliderComponent implements OnInit, OnDestroy {
  @Input() imageNames: string[] = [];
  currentIndex = 0;
  private intervalId: any; // To hold the interval ID

  ngOnInit(): void {
    if (this.imageNames.length === 0) {
      throw new Error('No images provided');
    }
    this.startImageRotation();
  }

  ngOnDestroy(): void {
    // Clean up interval when the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  get images(): string[] {
    return this.imageNames.map(name => `${name}`);
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
}
