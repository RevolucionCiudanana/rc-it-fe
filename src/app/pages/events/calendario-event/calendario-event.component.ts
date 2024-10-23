import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Event } from '../../../models/event';
import { EventService } from '../../../services/event.service'; // Adjust the import path accordingly

@Component({
  selector: 'app-calendario-event',
  templateUrl: './calendario-event.component.html',
  styleUrls: ['./calendario-event.component.scss']
})
export class CalendarioEventComponent implements OnInit {
  currentMonth: moment.Moment;
  months: moment.Moment[] = [];
  events: { [key: string]: Event[] } = {};
  selectedType: string = '';
  openMonths: { [key: string]: boolean } = {}; // Per tenere traccia dei mesi aperti

  constructor(private eventService: EventService) {
    this.currentMonth = moment();
  }

  ngOnInit(): void {
    this.loadMonths();
    this.getEvents();
    this.setLanguage();
  }

  setLanguage() {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'it';
    moment.locale(savedLanguage || 'it'); // Default to Italian if no language saved
    this.selectedType = savedLanguage || 'it'; // Set to default if not found
  }

  loadMonths() {
    this.months = [
      this.currentMonth.clone().subtract(1, 'month'),
      this.currentMonth.clone(),
      this.currentMonth.clone().add(1, 'month'),
      this.currentMonth.clone().add(2, 'months'),

    ];
  }

  // Funzione per aprire/chiudere i mesi
  toggleMonth(month: moment.Moment) {
    const monthKey = month.format('MMMM-YYYY');
    this.openMonths[monthKey] = !this.openMonths[monthKey];
  }

  // Funzione per sapere se un mese è aperto
  isMonthOpen(month: moment.Moment): boolean {
    const monthKey = month.format('MMMM-YYYY');
    return !!this.openMonths[monthKey];
  }

  isCurrentDay(day: moment.Moment): boolean {
    return day.isSame(moment(), 'day'); // Check if the day is today
  }

  getEvents() {
    const filters = { category: this.selectedType };

    this.eventService.getEvents(filters).subscribe(
      (events: Event[]) => {
        this.events = events.reduce((acc: { [key: string]: Event[] }, event) => {
          const dateKey = moment(event.startDateTime).format('YYYY-MM-DD');

          if (!acc[dateKey]) {
            acc[dateKey] = [];
          }
          acc[dateKey].push(event);
          return acc;
        }, {});
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  getDaysInMonth(month: moment.Moment) {
    const start = month.clone().startOf('month');
    const end = month.clone().endOf('month');
    const days: moment.Moment[] = [];

    // Calcola il numero di giorni vuoti fino al lunedì
    const startDay = start.day(); // Ottieni il giorno della settimana del primo giorno del mese
    const daysToAdd = startDay === 0 ? 6 : startDay - 1; // Se è Domenica, aggiungi 6 giorni, altrimenti aggiungi startDay - 1

    // Aggiungi giorni vuoti all'inizio per allineare il primo giorno della settimana (Lun)
    for (let i = 0; i < daysToAdd; i++) {
      days.push(moment(null)); // Aggiungi spazi vuoti come moment nullo
    }

    for (let day = start; day.isBefore(end.clone().add(1, 'day'), 'day'); day.add(1, 'day')) {
      if (day.isValid()) {
        days.push(day.clone());
      }
    }

    return days;
  }


  getEventsForDay(day: moment.Moment) {
    const dateKey = day.format('YYYY-MM-DD');
    return this.events[dateKey] || [];
  }

  getFileUrl(keyFile: string): string {
    return `https://your-storage-url.com/${keyFile}`; // Adjust this logic as needed
  }
}
