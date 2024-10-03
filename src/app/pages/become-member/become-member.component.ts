import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from '@models/country';
import { TranslateService } from '@ngx-translate/core';
import { CountryService } from '@services/country.service';

@Component({
  selector: 'app-become-member',
  templateUrl: './become-member.component.html',
  styleUrls: ['./become-member.component.scss']
})
export class BecomeMemberComponent implements OnInit{
  memberForm: FormGroup;
  currentStep: number = 1;
  registrationSuccess: boolean = false;

  countries: Country[] = [

  ];

  sectors: string[] = [
  ];

  professions: string[] = [
  ];

  filteredProfessions: string[] = [];



  constructor(private fb: FormBuilder,  private countryService: CountryService) {
    this.memberForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cellphone: ['', Validators.required],
      password: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      sector: ['', Validators.required],
      profession: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.loadCountries();

  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe(
      (data) => {
        this.countries = data; // Store the countries in the component state
      },
      (error) => {
        console.error('Error fetching countries:', error); // Handle errors appropriately
      }
    );
  }

  onSectorChange(event: any) {
    const sector = event.target.value;
    if (sector) {
      // this.filteredProfessions = this.professions[sector] || [];
      this.memberForm.get('profession')?.reset();
    }
  }

  nextStep() {
    this.currentStep++;

  }

  previousStep() {
    this.currentStep--;
  }

  submit() {
    if (this.memberForm.valid) {
      console.log('Form Submitted', this.memberForm.value);
      this.currentStep = 3; // Vai allo step di conferma
    }
  }
}
