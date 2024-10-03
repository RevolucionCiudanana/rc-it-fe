import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '@models/country';

const API_URL = environment.endpoint + 'api/country/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
    providedIn: 'root',
})
export class CountryService {

    constructor(private http: HttpClient) { }

    getCountries(): Observable<Country[]> {
        return this.http.get<Country[]>(API_URL + 'allCountries');
    }
}
