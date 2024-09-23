import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.scss']
})
export class WhatsappButtonComponent {
  whatsappNumber: string = '+3891733185';  // Replace with your WhatsApp number

  openWhatsApp() {
    const url = `https://wa.me/${this.whatsappNumber}`;
    window.open(url, '_blank');
  }
}
