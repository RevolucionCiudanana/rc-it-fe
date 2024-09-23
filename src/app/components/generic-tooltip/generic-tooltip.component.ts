import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-tooltip',
  templateUrl: './generic-tooltip.component.html',
  styleUrls: ['./generic-tooltip.component.scss']
})
export class GenericTooltipComponent {
  @Input() text: string = '';
  isModalOpen: boolean = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
