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

  dietaGenerada: any = null; // Para almacenar la dieta generada

  constructor(private dietaService: DietaService) {}

  onSubmit() {

    const { grasas = 0, hidratos = 0, proteinas = 0 } = this.dieta;

    // Validar que la suma de grasas, hidratos y proteínas no exceda 100
    if (grasas + hidratos + proteinas > 100) {
      alert('La suma de grasas, hidratos y proteínas no puede exceder 100.');
      return;
    }
    this.dietaService.guardarDieta(this.dieta).subscribe(
      (response) => {
        console.log('Dieta generada:', response.dieta);
        this.dietaGenerada = response.dieta; // Almacena la dieta generada
      },
      (error) => {
        console.error('Error al generar la dieta:', error);
        alert('Hubo un error al generar la dieta');
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