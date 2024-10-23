import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '@models/event';
import { Store } from '@ngrx/store';
import { MessageService } from '@services/message.service';
import { EventService } from '@services/event.service';
import { User } from '@models/user';
import { HasRolePipe } from '../../../pipes/has-role.pipe';
import { SpacesService } from '@services/spaces.service';



@Component({
    selector: 'app-list-events',
    templateUrl: './list-events.component.html',
    styleUrls: ['./list-events.component.scss']
})
export class ListEventsComponent implements OnInit {
    events: Event[] = [];
    paramEmail: string = '';
    selectedType: string = '';
    eventTypes: string[] = ['Politico', 'Culturale', 'Sportivo']; // Aggiungi altri tipi se necessario
    user!: User;



    constructor(
        private store: Store<{ authState: any }>,
        private router: Router,
        private messageService: MessageService,
        private spacesService: SpacesService,
        private eventService: EventService,
    ) {
    }

    ngOnInit(): void {
        this.store.select('authState').subscribe(authState => {
            this.paramEmail = authState?.user?.email;
        });
        const authStateSubscription = this.store.select('authState').subscribe(authState => {
            this.user = authState.user;
        });

        this.loadServices();
    }

    loadServices() {
        this.getEvents(); // Carica tutti gli eventi inizialmente
    }

    getFileUrl(key: string): string {
        return this.spacesService.s3.getSignedUrl('getObject', {
            Bucket: this.spacesService.bucketName,
            Key: key,
            Expires: 3600, // Tempo di scadenza del link in secondi
        });
    }


    getEvents() {
        const filters = {
            category: this.selectedType
        }
        this.eventService.getEvents(filters).subscribe(
            (events: Event[]) => {
                // Process each event to extract and generate signed URLs
                this.events = events.map(event => {
                    // If there are event documents, use the first one to generate a signed URL
                    if (event.eventDocuments && event.eventDocuments.length > 0) {
                        const document = event.eventDocuments[0];
                        if (document.keyFile) {
                            event.imageUrl = this.getFileUrl(document.keyFile);
                        }
                    }
                    return event;
                });
            },
            (error) => {
                console.error('Error fetching events:', error);
            }
        );
    }

    applyFilters() {
        this.getEvents(); // Chiama getEvents per ottenere gli eventi filtrati
    }

    goToEvent(event: Event) {
        this.router.navigate(['/event', event?.id]); // Cambiato uuid in id
    }

    goToPageCreateEvent() {
        this.router.navigate(['/create-event']);
    }

    onClickDeleteEvent(event: Event) {
        this.showConfirmModalDeleteEvent(event);
    }

    deleteEventByUUID(event: Event) {
        if (event.id)
            this.eventService.deleteEventById(event.id).subscribe(
                (message) => {
                    console.log(message);
                    this.loadServices();
                },
                (error) => {
                    console.error('Error deleting event:', error);
                }
            );
    }

    showConfirmModalDeleteEvent(event: Event) {
        this.messageService.openModal(
            'error',
            'Attenzione!',
            'Sei sicuro di voler eliminare l\'evento?',
            'No',
            'Sì',
            () => { console.log('Success Modal Cancelled'); },
            () => { this.deleteEventByUUID(event); }
        );
    }
}
