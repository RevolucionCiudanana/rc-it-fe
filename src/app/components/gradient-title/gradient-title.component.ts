import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gradient-title',
  templateUrl: './gradient-title.component.html',
  styleUrls: ['./gradient-title.component.scss']
})
export class GradientTitleComponent {
  @Input() text: string = '';
  @Input() gradientColor1: string = '';
  @Input() gradientColor2: string = '';
  @Input() size: string = '';
  @Input() uppercase: boolean = false; // Default to false
  @Input() font: string = 'Arial'; // Default font is Arial

  getGradientBackground(): string {
    return `linear-gradient(to right, ${this.gradientColor1}, ${this.gradientColor2})`;
  }

}
