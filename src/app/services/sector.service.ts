import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sector } from '@models/sector';

const API_URL = environment.endpoint + 'api/sector/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
    providedIn: 'root',
})
export class SectorService {

    constructor(private http: HttpClient) { }

    getSectors(): Observable<Sector[]> {
        return this.http.get<Sector[]>(API_URL + 'allSectors');
    }
}
