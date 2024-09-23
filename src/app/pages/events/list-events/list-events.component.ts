import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '@models/event';
import { Store } from '@ngrx/store';
import { MessageService } from '@services/message.service';
import { EventService } from '@services/event.service';

@Component({
    selector: 'app-list-events',
    templateUrl: './list-events.component.html',
    styleUrls: ['./list-events.component.scss']
})
export class ListEventsComponent implements OnInit {
    events: Event[] = [
        {
            title: 'Rivoluzione Ciudadana: Inizio',
            date: '2007-01-15',
            image: 'assets/images/events/event1.jpg',
            description: 'Un evento storico che segna l’inizio della Rivoluzione Ciudadana in Ecuador.'
        },
        {
            title: 'Rivoluzione Ciudadana: Progressi',
            date: '2010-05-01',
            image: 'assets/images/events/event2.jpg',
            description: 'Un incontro per discutere i progressi e le sfide della Rivoluzione Ciudadana.'
        },
        {
            title: 'Rivoluzione Ciudadana: Celebrazione',
            date: '2017-10-10',
            image: 'assets/images/events/event3.jpg',
            description: 'Celebrazione dei successi ottenuti grazie alla Rivoluzione Ciudadana.'
        }
    ];

    paramEmail: string = '';

    constructor(
        private store: Store<{ authState: any }>,
        private router: Router,
        private messageService: MessageService,
        private eventService: EventService
    ) { }

    ngOnInit(): void {
        this.store.select('authState').subscribe(authState => {
            this.paramEmail = authState?.user?.email;

        });

        this.loadServices();

    }

    loadServices() {
        this.getEventsByEmail(this.paramEmail);
    }

    getEventsByEmail(email: string) {
        this.eventService.getEventsByEmail(email).subscribe(
            (events: Event[]) => {
                if (events.length > 0) {
                    this.events = events;
                }
            },
            (error) => {
                console.error('Error fetching events:', error);
            }
        );
    }
    goToEvent(event: Event) {
        this.router.navigate(['/event', event?.uuid]);
    }

    goToPageCreateEvent() {
        this.router.navigate(['/create-event']);
    }

    onClickDeleteEvent(event: Event) {
        this.showConfirmModalDeleteEvent(event);
    }


    deleteEventByUUID(event: Event) {
        // this.eventService.deleteEventByUUID(event.uuid).subscribe(
        //     (message) => {
        //         console.log(message)
        //         this.loadServices();
        //     },
        //     (error) => {
        //         console.error('Error delete event:', error);
        //     }
        // );
    }


    showConfirmModalDeleteEvent(event: Event) {
        this.messageService.openModal(
            'error',
            'Attenzione!',
            'Sei sicuro di voler eliminare il evento?',
            'No',
            'Sì',
            () => { console.log('Success Modal Cancelled'); },
            () => { this.deleteEventByUUID(event) }
        );
    }
}
