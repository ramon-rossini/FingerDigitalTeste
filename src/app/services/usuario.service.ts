import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.http.get(environment.apiURL);
  }

  getUsuario(id: string): Observable<any> {
    return this.http.get(environment.apiURL + id);
  }

  postUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(environment.apiURL, usuario);
  }

  patchUsuario(id: string, usuario: Usuario): Observable<any> {
    return this.http.patch(environment.apiURL + id, usuario);
  }

  deleteUsuario(id: string): Observable<any> {
    return this.http.delete(environment.apiURL + id);
  }

}
