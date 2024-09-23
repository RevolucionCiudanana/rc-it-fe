import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.scss']
})
export class OrgChartComponent implements OnInit {

  currentCity: string = 'Italia'; // Città iniziale

  constructor() { }

  ngOnInit(): void { }

  switchCity(city: string): void {
    this.currentCity = city;
    // Logica per aggiornare l'organigramma in base alla città selezionata
    console.log(`Switched to ${city}`);
  }

}
