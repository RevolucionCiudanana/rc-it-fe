import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-become-member',
  templateUrl: './become-member.component.html',
  styleUrls: ['./become-member.component.scss']
})
export class BecomeMemberComponent {
  memberForm: FormGroup;
  currentStep: number = 1;
  registrationSuccess: boolean = false;
  sectors: string[] = [
    'Attività domestiche',
    'Sanità/Assistenza',
    'Educazione',
    'Finanza',
    'Ingegneria',
    'Marketing',
    'Legale',
    'Risorse Umane',
    'Vendite',
    'Tecnologia',
    'Logistica',
    'Altro'
  ];
  
  professions: { [key: string]: string[] } = {
    'Sanità/Assistenza': ['Medico', 'Infermiere', 'Tecnico di laboratorio', 'Fisioterapista', 'Chirurgo', 'Dentista', 'Farmacista', 'Badante', 'Operatore socio-sanitario (OSS)', 'Assistente domiciliare', 'Assistente alla persona', 'Coordinatore dei servizi di assistenza'],
    Educazione: ['Insegnante', 'Professore', 'Tutor', 'Educatore', 'Formatore', 'Coordinatore didattico'],
    Finanza: ['Contabile', 'Analista finanziario', 'Consulente', 'Revisore dei conti', 'Gestore patrimoniale', 'Addetto alla finanza aziendale'],
    Ingegneria: ['Ingegnere civile', 'Ingegnere meccanico', 'Ingegnere elettronico', 'Ingegnere chimico', 'Ingegnere gestionale', 'Progettista'],
    Marketing: ['Specialista SEO', 'Content Creator', 'Social Media Manager', 'Brand Manager', 'Digital Marketer', 'Copywriter', 'Stratega di marketing'],
    Legale: ['Avvocato', 'Notaio', 'Consulente legale', 'Paralegale', 'Giurista', 'Mediatore'],
    'Risorse Umane': ['Recruiter', 'HR Manager', 'Specialista della formazione', 'Specialista della busta paga', 'Consulente del lavoro', 'HR Business Partner'],
    Vendite: ['Venditore', 'Account Manager', 'Sales Manager', 'Addetto vendite', 'Rappresentante commerciale', 'Direttore vendite'],
    Tecnologia: ['Sviluppatore', 'Analista', 'Tecnico', 'Ingegnere di sistema', 'Data Scientist', 'DevOps Engineer', 'IT Support'],
    Logistica: ['Responsabile della logistica', 'Magazziniere', 'Pianificatore dei trasporti', 'Operatore logistico', 'Gestore della supply chain', 'Corriere'],
    'Attività domestiche': ['Casalingo','Colf'],
    'Altro': ['Libero professionista', 'Disoccupato','Altro']
  };
  filteredProfessions: string[] = [];

  constructor(private fb: FormBuilder) {
    this.memberForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cellphone: ['', Validators.required],
      password: ['', Validators.required],
      city: ['', Validators.required],
      sector: ['', Validators.required],
      profession: ['', Validators.required],
    });
  }

  onSectorChange(event: any) {
    const sector = event.target.value;
    if (sector) {
      this.filteredProfessions = this.professions[sector] || [];
      this.memberForm.get('profession')?.reset();
    }
  }

  nextStep() {
    this.currentStep++;

  }

  previousStep() {
    this.currentStep--;
  }

  submit() {
    if (this.memberForm.valid) {
      console.log('Form Submitted', this.memberForm.value);
      this.currentStep = 3; // Vai allo step di conferma
    }
  }
}
