import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profession } from '@models/profession';

const API_URL = environment.endpoint + 'api/profession/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
    providedIn: 'root',
})
export class ProfessionService {

    constructor(private http: HttpClient) { }

    getProfessions(sector: any): Observable<Profession[]> {
        const params = { sector: sector };
        return this.http.get<Profession[]>(API_URL + 'allProfessionsBySector', { params });
    }

    getAllProfessions(): Observable<Profession[]> {
        return this.http.get<Profession[]>(API_URL + 'allProfessions');
    }
}
