import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GeocodingService {
    constructor(private http: HttpClient) { }

    findLocation(searchInput: string | number) {
        if (searchInput) {
            let url = 'https://nominatim.openstreetmap.org/search?accept-language=it-IT&limit=100&format=json&addressdetails=true';

            if (isNaN(+searchInput)) {
                // Replace spaces with '+'
                const formattedSearchInput = (searchInput as string).replace(/\s+/g, '+');
                url += '&q=' + formattedSearchInput;
            }

            return this.http.get(url);
        } else {
            throw new Error('No Input For Location');
        }
    }

}
