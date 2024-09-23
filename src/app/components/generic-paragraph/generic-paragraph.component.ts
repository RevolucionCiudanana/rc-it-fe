import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-paragraph',
  templateUrl: './generic-paragraph.component.html',
  styleUrls: ['./generic-paragraph.component.scss']
})
export class GenericParagraphComponent {
  @Input() text: string = '';
  @Input() textColor: string = '';
  @Input() size: string = '';
  @Input() uppercase: boolean = false; // Default to false
  @Input() font: string = 'Arial';
}
