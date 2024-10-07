import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SectorService } from '@services/sector.service';
import { ProfessionService } from '@services/profession.service';
import { GeocodingService } from '@services/geocoding.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-become-member',
  templateUrl: './become-member.component.html',
  styleUrls: ['./become-member.component.scss']
})
export class BecomeMemberComponent implements OnInit {
  memberForm: FormGroup;
  currentStep: number = 3;
  registrationSuccess: boolean = false;

  sectors: any;

  professions: any;

  filteredProfessions: string[] = [];

  results: any = [];

  subscriptions: Subscription = new Subscription();


  resultNotFound: boolean = false;

  constructor(private fb: FormBuilder, private geocodingService: GeocodingService, private translate: TranslateService, private sectorService: SectorService, private professionService: ProfessionService) {
    this.memberForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cellphone: ['', Validators.required],
      search_address: ['', Validators.required],
      address: ['', Validators.required],
      country: [''],
      country_code: [''],
      county: [''],
      house_number: [''],
      postcode: [''],
      quarter: [''],
      road: [''],
      state: [''],
      town: [''],
      latitude: [''],
      longitude: [''],
      sectorId: [null, Validators.required],
      professionId: [null, Validators.required],


    });
  }
  ngOnInit(): void {
    this.loadSectors();
  }

  loadSectors() {
    this.sectorService.getSectors().subscribe(
      (data) => {
        this.sectors = [];

        data.forEach(sector => {
          this.translate.get(sector.code).subscribe(translatedName => {
            this.sectors.push({
              ...sector,
              name: translatedName
            });
          });
        });
      },
      (error) => {
        console.error('Error fetching sectors:', error); // Handle errors appropriately
      }
    );
  }

  clearAddress() {
    this.results = [];
    this.resultNotFound = false;
    this.memberForm.patchValue({
      search_address: "",
      address: "", // Adjust according to the data structure
      latitude: "",
      longitude: "",
      country: "",
      country_code: "",
      county: "",
      house_number: "",
      postcode: "",
      quarter: "",
      road: "",
      state: "",
      town: "",
    });
  }

  searchAddress() {
    this.results = [];
    this.resultNotFound = false;
    this.memberForm.patchValue({
      address: "",
      latitude: "",
      longitude: "",
      country: "",
      country_code: "",
      county: "",
      house_number: "",
      postcode: "",
      quarter: "",
      road: "",
      state: "",
      town: "",
    });
    const address = this.memberForm.get('search_address')?.value;
    if (address) {
      const subscription = this.geocodingService.findLocation(address).subscribe({
        next: data => {
          this.results = data;
          if (this.results.length > 0) {
            this.resultNotFound = false;
          } else {
            this.resultNotFound = true;
          }
        },
        error: err => {
          this.resultNotFound = true;
        }
      });
      this.subscriptions.add(subscription);

    }
  }

  selectAddress(result: any) {
    // Set the input value to the selected address
    console.log("result", result)
    this.memberForm.patchValue({
      address: result.display_name, // Adjust according to the data structure
      latitude: result.lat,
      longitude: result.lon,
      country: result?.address?.country,
      country_code: result?.address?.country_code,
      county: result?.address?.county,
      house_number: result?.address?.house_number,
      postcode: result?.address?.postcode,
      quarter: result?.address?.quarter,
      road: result?.address?.road,
      state: result?.address?.state,
      town: result?.address?.town,
    });

    // Clear the results after selection
    this.results = [];
  }

  onSectorChange(event: any) {
    const sector = event.target.value;
    if (sector) {
      this.memberForm.get('professionId')?.reset();
      this.loadProfessions(sector);
    }
  }

  loadProfessions(sector: any) {
    this.professions = [];

    this.professionService.getProfessions(sector).subscribe(
      (data) => {
        data.forEach(profession => {
          console.log(profession)
          this.translate.get(profession.code).subscribe(translatedName => {
            console.log(translatedName)
            this.professions.push({
              ...profession,
              name: translatedName
            });
          });

        });
        console.log(this.professions)
      },
      (error) => {
        console.error('Error fetching professions:', error); // Handle errors appropriately
      }
    );
  }

  nextStep() {
    this.currentStep++;

  }

  previousStep() {
    this.currentStep--;
  }

  submit() {
    console.log(this.memberForm.valid)
    if (this.memberForm.valid) {
      console.log('Form Submitted', this.memberForm.value);
      this.currentStep = 4; // Vai allo step di conferma
    }
  }
}
