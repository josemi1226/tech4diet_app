import { Component } from '@angular/core';

@Component({
  selector: 'app-generador-dieta',
  templateUrl: './generador-dieta.component.html',
  styleUrls: ['./generador-dieta.component.scss'],
})
export class GeneradorDietaComponent {
  dieta = {
    objetivo: '',
    tipoDieta: [],
    restricciones: [],
    numeroComidas: 3,
    grasas: null,
    hidratos: null,
    proteinas: null,
    alimentosFavoritos: '',
    alimentosEliminados: ''
  };

  constructor() {}

  onSubmit() {
    console.log('Dieta generada:', this.dieta);
  }
}