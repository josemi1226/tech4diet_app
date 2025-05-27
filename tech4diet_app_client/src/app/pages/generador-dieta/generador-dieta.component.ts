import { Component } from '@angular/core';
import { DietaService } from '../../services/dieta.service';

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
    alimentosEliminados: '',
  };

  constructor(private dietaService: DietaService) {}

  onSubmit() {
    this.dietaService.guardarDieta(this.dieta).subscribe(
      (response) => {
        console.log('Dieta guardada:', response);
        alert('Dieta guardada correctamente');
      },
      (error) => {
        console.error('Error al guardar la dieta:', error);
        alert('Hubo un error al guardar la dieta');
      }
    );
  }

  resetForm() {
    this.dieta = {
      objetivo: '',
      tipoDieta: [],
      restricciones: [],
      numeroComidas: 3,
      grasas: null,
      hidratos: null,
      proteinas: null,
      alimentosFavoritos: '',
      alimentosEliminados: '',
    };
  }
}