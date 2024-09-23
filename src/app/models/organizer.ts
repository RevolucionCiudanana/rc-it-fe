export interface Organizer {
    id?: string; // Unique identifier for the organizer
    uuid?: string,
    name: string; // Name of the organizer
    contactEmail: string; // Contact email of the organizer
    phoneNumber?: string; // Optional phone number of the organizer
    website?: string; // Optional website of the organizer
    address?: string; // Optional address of the organizer
    imageUrl?: string;

    userUUID: string;
}
