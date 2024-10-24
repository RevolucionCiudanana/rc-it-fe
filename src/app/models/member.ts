export interface Member {
    id?: string;                 // Optional: ID of the member
    name: string;                // Required: Member's name
    surname: string;             // Required: Member's surname
    email: string;               // Required: Member's email
    cellphone: string;           // Required: Member's cellphone number
    address?: string;            
    birthdate?: string;          
    sectorId: string;            
    professionId: string;        // Required: Profession ID associated with the member
    country?: string;            // Optional: Country
    country_code?: string;       // Optional: Country code
    county?: string;             // Optional: County
    house_number?: string;       // Optional: House number
    postcode?: string;           // Optional: Postal code
    quarter?: string;            // Optional: Quarter
    road?: string;               // Optional: Road
    state?: string;              // Optional: State
    town?: string;               // Optional: Town
    createdAt?: Date;
}
