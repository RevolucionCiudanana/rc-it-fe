import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '@models/member';  // Assuming you have a Member model

const API_URL = environment.endpoint + 'api/member/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class MemberService {

    constructor(private http: HttpClient) { }

    // Create a new member
    createMember(memberData: Member): Observable<any> {
        return this.http.post(API_URL + 'createMember', memberData, httpOptions);
    }

    // Fetch all members
    getAllMembers(): Observable<Member[]> {
        return this.http.get<Member[]>(API_URL + 'getAllMembers', httpOptions);
    }

    // Fetch a specific member by ID
    getMemberById(memberId: number): Observable<Member> {
        return this.http.get<Member>(API_URL + `getMemberById/${memberId}`, httpOptions);
    }

    // Delete a member by ID (requires token in headers)
    deleteMemberById(memberId: number, token: string): Observable<any> {
        return this.http.delete(API_URL + `deleteMemberById/${memberId}`, httpOptions);
    }
}
