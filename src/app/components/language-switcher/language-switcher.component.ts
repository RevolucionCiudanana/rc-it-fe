import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent implements OnInit {
  currentLanguage = 'it'; // Set default language
  isDropdownOpen = false; // State for dropdown visibility

  languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'it', name: 'Italiano' }
  ];

  constructor(private translate: TranslateService) {
    // Set the default language from local storage if available
    const savedLanguage = localStorage.getItem('selectedLanguage');
    this.currentLanguage = savedLanguage ? savedLanguage : this.currentLanguage; // Use saved language or default
    moment.locale(savedLanguage || 'it'); // Default to Italian if no language saved
    translate.setDefaultLang(this.currentLanguage);
    translate.use(this.currentLanguage);
  }

  ngOnInit(): void {
    // Set initial language from local storage
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      this.switchLanguage(savedLanguage);
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  switchLanguage(language: string) {
    this.currentLanguage = language; // Update current language
    this.translate.use(language);
    localStorage.setItem('selectedLanguage', language); // Save selected language to local storage
    this.isDropdownOpen = false; // Close dropdown after selection
  }
}
