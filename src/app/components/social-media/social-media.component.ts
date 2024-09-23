import { Component } from '@angular/core';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss']
})
export class SocialMediaComponent {
  socialMediaLinks = [
    { platform: 'Facebook', icon: 'fab fa-facebook', handle: '@RC5Italia', link: "https://www.facebook.com/RC5Italia/" },
    { platform: 'Instagram', icon: 'fab fa-instagram', handle: '@rc5italia', link: "https://www.instagram.com/rc5italia/" },
    { platform: 'X (Twitter)', icon: 'fab fa-x-twitter', handle: '@RC5Italia', link: "https://x.com/RC5Italia" },
    { platform: 'TikTok', icon: 'fab fa-tiktok', handle: '@RC5Italia', link: "https://x.com/RC5Italia" }
  ];
}
