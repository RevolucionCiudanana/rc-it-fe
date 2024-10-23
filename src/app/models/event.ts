// src/models/event.model.ts

export interface Event {
    id?: string;                  // Unique identifier for the event (UUID)
    title: string;               // Title of the event
    shortDescription: string;     // Brief description of the event
    location?: string;           // Location of the event (optional)
    startDateTime: Date;         // Start date and time of the event
    endDateTime: Date;           // End date and time of the event
    category: string;                // Type of the event (in English)
    organizer?: string;          // Name of the organizer (optional)
    participants?: string[];     // List of participants (optional)
    contactInfo?: string;        // Contact information (optional)
    imageUrl?: string;           // URL of the event image (optional)
    status: string;              // Status of the event
    eventDocuments?: any
}
