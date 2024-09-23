import { Component } from '@angular/core';

@Component({
  selector: 'app-affiliates',
  templateUrl: './affiliates.component.html',
  styleUrls: ['./affiliates.component.scss']
})
export class AffiliatesComponent {
  users = [
    {
      firstName: 'Carlos',
      lastName: 'González',
      email: 'carlos.gonzalez@example.com',
      phone: '+391234567890',
      dateOfBirth: new Date('1985-06-15'),
      address: 'Via Roma 10',
      city: 'Milano'
    },
    {
      firstName: 'Lucía',
      lastName: 'Martínez',
      email: 'lucia.martinez@example.com',
      phone: '+391234567891',
      dateOfBirth: new Date('1990-02-20'),
      address: 'Via Torino 5',
      city: 'Torino'
    },
    {
      firstName: 'Javier',
      lastName: 'López',
      email: 'javier.lopez@example.com',
      phone: '+391234567892',
      dateOfBirth: new Date('1980-11-30'),
      address: 'Via Napoli 20',
      city: 'Napoli'
    },
    {
      firstName: 'María',
      lastName: 'Pérez',
      email: 'maria.perez@example.com',
      phone: '+391234567893',
      dateOfBirth: new Date('1975-04-10'),
      address: 'Via Firenze 15',
      city: 'Firenze'
    },
    {
      firstName: 'Andrés',
      lastName: 'Ramírez',
      email: 'andres.ramirez@example.com',
      phone: '+391234567894',
      dateOfBirth: new Date('1998-01-05'),
      address: 'Via Bologna 30',
      city: 'Bologna'
    },
    {
      firstName: 'Sofía',
      lastName: 'Hernández',
      email: 'sofia.hernandez@example.com',
      phone: '+391234567895',
      dateOfBirth: new Date('1988-12-25'),
      address: 'Via Genova 8',
      city: 'Genova'
    },
    {
      firstName: 'Diego',
      lastName: 'Gutiérrez',
      email: 'diego.gutierrez@example.com',
      phone: '+391234567896',
      dateOfBirth: new Date('1982-07-19'),
      address: 'Via Venezia 12',
      city: 'Venezia'
    },
    {
      firstName: 'Isabella',
      lastName: 'Castillo',
      email: 'isabella.castillo@example.com',
      phone: '+391234567897',
      dateOfBirth: new Date('1995-09-14'),
      address: 'Via Palermo 25',
      city: 'Palermo'
    },
    {
      firstName: 'Fernando',
      lastName: 'Díaz',
      email: 'fernando.diaz@example.com',
      phone: '+391234567898',
      dateOfBirth: new Date('1970-05-30'),
      address: 'Via Bari 40',
      city: 'Bari'
    },
    {
      firstName: 'Gabriela',
      lastName: 'Torres',
      email: 'gabriela.torres@example.com',
      phone: '+391234567899',
      dateOfBirth: new Date('1984-03-22'),
      address: 'Via Trieste 18',
      city: 'Trieste'
    },
    {
      firstName: 'Miguel',
      lastName: 'Morales',
      email: 'miguel.morales@example.com',
      phone: '+391234567800',
      dateOfBirth: new Date('1992-08-01'),
      address: 'Via Catania 27',
      city: 'Catania'
    },
    {
      firstName: 'Valentina',
      lastName: 'Serrano',
      email: 'valentina.serrano@example.com',
      phone: '+391234567801',
      dateOfBirth: new Date('1978-10-12'),
      address: 'Via Lecce 50',
      city: 'Lecce'
    },
    {
      firstName: 'Sebastián',
      lastName: 'Vargas',
      email: 'sebastian.vargas@example.com',
      phone: '+391234567802',
      dateOfBirth: new Date('1993-11-02'),
      address: 'Via Messina 60',
      city: 'Messina'
    },
    {
      firstName: 'Camila',
      lastName: 'Jiménez',
      email: 'camila.jimenez@example.com',
      phone: '+391234567803',
      dateOfBirth: new Date('1986-04-28'),
      address: 'Via Modena 3',
      city: 'Modena'
    },
    {
      firstName: 'Arturo',
      lastName: 'Cano',
      email: 'arturo.cano@example.com',
      phone: '+391234567804',
      dateOfBirth: new Date('1981-01-15'),
      address: 'Via Pavia 70',
      city: 'Pavia'
    },
    {
      firstName: 'Patricia',
      lastName: 'Bermúdez',
      email: 'patricia.bermudez@example.com',
      phone: '+391234567805',
      dateOfBirth: new Date('1979-09-08'),
      address: 'Via Verona 33',
      city: 'Verona'
    },
    {
      firstName: 'Rafael',
      lastName: 'Salazar',
      email: 'rafael.salazar@example.com',
      phone: '+391234567806',
      dateOfBirth: new Date('1991-03-18'),
      address: 'Via Taranto 44',
      city: 'Taranto'
    },
    {
      firstName: 'Nadia',
      lastName: 'Rojas',
      email: 'nadia.rojas@example.com',
      phone: '+391234567807',
      dateOfBirth: new Date('1994-06-20'),
      address: 'Via Cagliari 90',
      city: 'Cagliari'
    },
    {
      firstName: 'Diego',
      lastName: 'Alonso',
      email: 'diego.alonso@example.com',
      phone: '+391234567808',
      dateOfBirth: new Date('1987-05-14'),
      address: 'Via Parma 11',
      city: 'Parma'
    },
    {
      firstName: 'Claudia',
      lastName: 'Sánchez',
      email: 'claudia.sanchez@example.com',
      phone: '+391234567809',
      dateOfBirth: new Date('1996-12-22'),
      address: 'Via Roma 100',
      city: 'Roma'
    },
    {
      firstName: 'Emilio',
      lastName: 'Mora',
      email: 'emilio.mora@example.com',
      phone: '+391234567810',
      dateOfBirth: new Date('1974-07-25'),
      address: 'Via Milano 80',
      city: 'Milano'
    },
    {
      firstName: 'Rocío',
      lastName: 'Salas',
      email: 'rocio.salas@example.com',
      phone: '+391234567811',
      dateOfBirth: new Date('1983-02-17'),
      address: 'Via Napoli 4',
      city: 'Napoli'
    },
    {
      firstName: 'Salvador',
      lastName: 'Ceballos',
      email: 'salvador.ceballos@example.com',
      phone: '+391234567812',
      dateOfBirth: new Date('1989-08-29'),
      address: 'Via Bologna 22',
      city: 'Bologna'
    },
    {
      firstName: 'Paola',
      lastName: 'Martinez',
      email: 'paola.martinez@example.com',
      phone: '+391234567813',
      dateOfBirth: new Date('1997-04-05'),
      address: 'Via Genova 45',
      city: 'Genova'
    },
    {
      firstName: 'Óscar',
      lastName: 'Fuentes',
      email: 'oscar.fuentes@example.com',
      phone: '+391234567814',
      dateOfBirth: new Date('1985-11-14'),
      address: 'Via Firenze 60',
      city: 'Firenze'
    },
    {
      firstName: 'Gina',
      lastName: 'Núñez',
      email: 'gina.nunez@example.com',
      phone: '+391234567815',
      dateOfBirth: new Date('1990-01-09'),
      address: 'Via Verona 14',
      city: 'Verona'
    },
  ];


  searchTerm: string = '';

  get filteredUsers() {
    if (!this.searchTerm) {
      return this.users;
    }
    const lowerCaseTerm = this.searchTerm.toLowerCase();
    return this.users.filter(user =>
      user.firstName.toLowerCase().includes(lowerCaseTerm) ||
      user.lastName.toLowerCase().includes(lowerCaseTerm) ||
      user.email.toLowerCase().includes(lowerCaseTerm) ||
      user.city.toLowerCase().includes(lowerCaseTerm)
    );
  }

  openWhatsApp(phone: string) {
    const message = "Hello!"; // Customize your message here
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  }

  sendEmail(email: string) {
    window.location.href = `mailto:${email}`;
  }
}
