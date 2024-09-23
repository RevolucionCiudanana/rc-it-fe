import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInAnimation, fadeInLeftAnimation, fadeInRightAnimation, zoomInAnimation } from 'src/app/animations';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  animations: [fadeInAnimation, fadeInLeftAnimation, fadeInRightAnimation, zoomInAnimation]
})
export class NotFoundComponent {
  constructor(private router: Router) { }

  goToPageHome() {
    this.router.navigate(['/']);
  }
}
