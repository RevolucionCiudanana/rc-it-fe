import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from '@models/event';

const API_URL = environment.endpoint + 'api/event/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
    providedIn: 'root',
})
export class EventService {

    constructor(private http: HttpClient) { }

    createEvent(
        event: Event
    ): Observable<any> {
        return this.http.post(
            API_URL + 'createEvent',
            event,
            httpOptions
        );
    }

    deleteEventById(id: string): Observable<any> {
        return this.http.delete(
            API_URL + 'deleteEventById/' + id,
            httpOptions
        )
    }

    getEventsByEmail(email: string): Observable<any> {
        return this.http.post(
            API_URL + 'getEventsByEmail',
            {
                email,
            },
            httpOptions,
        );
    }

    getEventByUUID(uuid: string): Observable<any> {
        return this.http.get(
            API_URL + `getEventByUUID/${uuid}`,
            httpOptions,
        );
    }

    getEvents(filters: any): Observable<Event[]> {

        const params = { ...filters };
        return this.http.get<Event[]>(API_URL + 'getEvents', { params });
    }
}
