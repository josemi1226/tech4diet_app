import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getHeaders } from '../utils/headers.utils';
import { UsuariosService } from './usuarios.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DietaService {
  private baseUrl: string = `${environment.base_url}/dietas`;
  private idUsuario: string = this.usuariosService.uid;

  constructor(private http: HttpClient, private usuariosService: UsuariosService) {}

  // Crear una nueva dieta
  guardarDieta(dieta: any): Observable<any> {
    dieta.idUsuario = this.idUsuario; // Añade el idUsuario al objeto dieta
    return this.http.post(this.baseUrl, dieta, getHeaders());
  }

  // Cargar una dieta por ID
  cargarDietaPorId(uid: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${uid}`, getHeaders());
  }

  // Cargar todas las dietas del usuario
  cargarDietas(): Observable<any> {
    return this.http.get(`${this.baseUrl}?idUsuario=${this.idUsuario}`, getHeaders());
  }

  // Actualizar una dieta
  actualizarDieta(dieta: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${dieta.uid}`, dieta, getHeaders());
  }

  // Eliminar una dieta
  eliminarDieta(uid: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${uid}`, getHeaders());
  }
}