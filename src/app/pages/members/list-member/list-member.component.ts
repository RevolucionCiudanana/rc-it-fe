import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../../services/member.service'; // Assuming service exists

@Component({
  selector: 'app-list-member',
  templateUrl: './list-member.component.html',
  styleUrls: ['./list-member.component.scss']
})
export class ListMemberComponent implements OnInit {
  members: any[] = [];
  filteredMembers: any[] = [];

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

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.getMembers();
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

  // Filter method based on each column input
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
}
