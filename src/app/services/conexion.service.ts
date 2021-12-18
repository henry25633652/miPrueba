import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Posts } from '../interfaces/conexion';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  private api = "https://jsonplaceholder.typicode.com"
  constructor(private httpClient: HttpClient) { }

  informacionGeneral(){
		const path = `${this.api}/posts`;
		return this.httpClient.get<Posts[]>(path);
	}
  modificar(id, data){
    return this.httpClient.put<Posts>(this.api+'/posts/'+ id, data);
  }
  anadir(data){
    return this.httpClient.post<Posts>(this.api+'/posts/', data);
  }
}
