import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendario-event',
  templateUrl: './calendario-event.component.html',
  styleUrls: ['./calendario-event.component.scss'] // Cambiato in SCSS
})
export class CalendarioEventComponent implements OnInit {
  currentMonth: moment.Moment;
  months: moment.Moment[] = [];
  events: { [key: string]: { title: string; organizer: string; time: string; registrationLink: string }[] } = {};

  constructor() {
    this.currentMonth = moment();
    this.events = {
      '2024-03-04': [{
        title: 'Cómo Romper el Hábito de la Auto-Duda y Construir Confianza Real',
        organizer: 'Benedikt Safiyulin',
        time: '02:20 - 04:20',
        registrationLink: '#'
      }],
      '2024-03-14': [{
        title: 'Domina Tus Habilidades Interpersonales',
        organizer: 'Beth Murphy',
        time: '02:20 - 04:20',
        registrationLink: '#'
      }],
      '2024-10-02': [{
        title: 'Entra en tu Flujo Creativo',
        organizer: 'Deveeprasad Acharya',
        time: '14:00 - 16:00',
        registrationLink: '#'
      }],
      '2024-10-03': [{
        title: 'Haz Realidad Tu Viaje de Sueños',
        organizer: 'Dontae Little',
        time: '14:00 - 16:00',
        registrationLink: '#'
      }],
      '2024-10-05': [{
        title: 'Cómo Jubilarse Temprano: El Factor Latte',
        organizer: 'Chloé Modibo',
        time: '14:00 - 16:00',
        registrationLink: '#'
      }],
      '2024-10-07': [{
        title: 'El Poder del Lenguaje Corporal',
        organizer: 'Jioke Ugoorji',
        time: '14:00 - 16:00',
        registrationLink: '#'
      }],
      '2024-10-08': [{
        title: 'Cómo los Multimillonarios, Íconos y Performers de Clase Mundial Dominan la Productividad',
        organizer: 'Ren Xue',
        time: '14:00 - 16:00',
        registrationLink: '#'
      }],
    };
  }

  ngOnInit(): void {
    this.loadMonths();
  }

  loadMonths() {
    this.months = [
      this.currentMonth.clone().add(1, 'month'), // Mese successivo
      this.currentMonth.clone(),                   // Mese corrente
      this.currentMonth.clone().subtract(1, 'month') // Mese precedente
    ];
  }

  getDaysInMonth(month: moment.Moment) {
    const start = month.clone().startOf('month');
    const end = month.clone().endOf('month');
    const days = [];

    for (let day = start; day.isBefore(end, 'day'); day.add(1, 'day')) {
      days.push(day.clone());
    }

    return days;
  }

  getEventsForDay(day: moment.Moment) {
    const dateKey = day.format('YYYY-MM-DD');
    return this.events[dateKey] || [];
  }
}
