import { Component } from '@angular/core';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss']
})
export class SocialLinksComponent {

  openSocial(socialNetwork: string) {
    switch (socialNetwork) {
      case 'facebook':
        window.open('https://www.facebook.com/', '_blank');
        break;
      case 'twitter':
        window.open('https://twitter.com/', '_blank');
        break;
      case 'instagram':
        window.open('https://www.instagram.com/', '_blank');
        break;
    }
  }

}
