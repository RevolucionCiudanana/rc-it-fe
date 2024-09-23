import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.endpoint + 'api/eventPricing/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
    providedIn: 'root',
})
export class EventPricingService {

    constructor(private http: HttpClient) { }

    getEventPricing(): Observable<any> {
        return this.http.get(
            API_URL + `getEventPricing`,
            httpOptions,
        );
    }
}
