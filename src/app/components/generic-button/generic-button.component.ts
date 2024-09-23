import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-generic-button',
  templateUrl: './generic-button.component.html',
  styleUrls: ['./generic-button.component.scss']
})
export class GenericButtonComponent {
  @Input() text: string = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() color: string = 'primary';
  @Input() glassEffect: boolean = false;
  @Output() buttonClicked: EventEmitter<void> = new EventEmitter<void>();

  onClick() {
    this.buttonClicked.emit();
  }
}
