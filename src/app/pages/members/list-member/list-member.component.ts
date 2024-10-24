import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../../services/member.service';
import { SectorService } from '@services/sector.service';
import { TranslateService } from '@ngx-translate/core';
import { ProfessionService } from '@services/profession.service';
import { User } from '@models/user';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-list-member',
  templateUrl: './list-member.component.html',
  styleUrls: ['./list-member.component.scss']
})
export class ListMemberComponent implements OnInit {
  members: any[] = [];
  filteredMembers: any[] = [];
  user!: User;

  // Filter properties
  filterName: string = '';
  filterSurname: string = '';
  filterEmail: string = '';
  filterCellphone: string = '';
  filterAddress: string = '';
  filterBirthdate: string = '';
  filterSectorId: string = '';
  filterProfessionId: string = '';
  filterCountry: string = '';
  filterCounty: string = '';
  filterPostcode: string = '';

  sectors: any[] = [];
  professions: any[] = [];

  // Mapping for IDs to names
  sectorMap: { [key: string]: string } = {};
  professionMap: { [key: string]: string } = {};

  constructor(
    private store: Store<{ authState: any }>,
    private memberService: MemberService,
    private translate: TranslateService,
    private sectorService: SectorService,
    private professionService: ProfessionService
  ) { }

  ngOnInit(): void {
    const authStateSubscription = this.store.select('authState').subscribe(authState => {
      this.user = authState.user;
    });

    this.getMembers();
    this.loadSectors();
    this.loadAllProfessions();
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
            // Store in the map
            if (sector.id)
              this.sectorMap[sector.id] = translatedName; // Assuming sector has an 'id' property
          });
        });
      },
      (error) => {
        console.error('Error fetching sectors:', error);
      }
    );
  }

  loadAllProfessions() {
    this.professions = [];
    this.professionService.getAllProfessions().subscribe(
      (data) => {
        data.forEach(profession => {
          this.translate.get(profession.code).subscribe(translatedName => {
            this.professions.push({
              ...profession,
              name: translatedName
            });
            // Store in the map
            if (profession.id)
              this.professionMap[profession.id] = translatedName; // Assuming profession has an 'id' property
          });
        });
      },
      (error) => {
        console.error('Error fetching professions:', error);
      }
    );
  }

  deleteMember(memberId: number) {
    if (confirm(this.translate.instant('CONFIRM_DELETE_MEMBER'))) {
      this.memberService.deleteMemberById(memberId).subscribe(
        () => {
          // Refresh the list after deletion
          this.getMembers();
        },
        (error: any) => {
          console.error('Error deleting member:', error);
        }
      );
    }
  }

  getMembers() {
    this.memberService.getAllMembers().subscribe(
      (response: any) => {
        this.members = response;
        this.filteredMembers = this.members; // Initialize with all members
      },
      (error: any) => {
        console.error('Error fetching members', error);
      }
    );
  }

  filterMembers() {
    this.filteredMembers = this.members.filter(member => {
      return (
        member.name.toLowerCase().includes(this.filterName.toLowerCase()) &&
        member.surname.toLowerCase().includes(this.filterSurname.toLowerCase()) &&
        member.email.toLowerCase().includes(this.filterEmail.toLowerCase()) &&
        member.cellphone.includes(this.filterCellphone) &&
        member.address.toLowerCase().includes(this.filterAddress.toLowerCase()) &&
        (this.filterBirthdate ? member.birthdate === this.filterBirthdate : true) &&
        member.sectorId.includes(this.filterSectorId) &&
        member.professionId.includes(this.filterProfessionId) &&
        member.country.toLowerCase().includes(this.filterCountry.toLowerCase()) &&
        member.county.toLowerCase().includes(this.filterCounty.toLowerCase()) &&
        member.postcode.includes(this.filterPostcode)
      );
    });
  }

  // Method to get sector name by ID
  getSectorName(sectorId: string): string {
    return this.sectorMap[sectorId] || sectorId; // Return ID if not found
  }

  // Method to get profession name by ID
  getProfessionName(professionId: string): string {
    return this.professionMap[professionId] || professionId; // Return ID if not found
  }
}
