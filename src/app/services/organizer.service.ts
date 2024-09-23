import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organizer } from '@models/organizer';

const API_URL = environment.endpoint + 'api/organizer/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class OrganizerService {

    constructor(private http: HttpClient) { }

    getOrganizersByUserUUID(userUUID: string): Observable<Organizer[]> {
        return this.http.get<Organizer[]>(API_URL + `getOrganizersByUserUUID/${userUUID}`, httpOptions);
    }

    createOrganizer(organizer: Organizer): Observable<any> {
        return this.http.post(API_URL + 'createOrganizer', organizer, httpOptions);
    }

    deleteOrganizerByUUID(uuid: string): Observable<any> {
        return this.http.delete(API_URL + `deleteOrganizerByUUID/${uuid}`, httpOptions);
    }

    getOrganizerByUUID(uuid: string): Observable<Organizer> {
        return this.http.get<Organizer>(API_URL + `getOrganizerByUUID/${uuid}`, httpOptions);
    }

    getOrganizers(filters: any): Observable<Organizer[]> {
        const params = { ...filters };
        return this.http.get<Organizer[]>(API_URL + 'getOrganizers', { params });
    }
}
