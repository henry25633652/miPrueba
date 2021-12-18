import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { Posts } from '../interfaces/conexion';
import { ConexionService } from '../services/conexion.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  elementos: Posts[] = [];

  constructor(private conexexionService: ConexionService, private router: Router) {}

  ngOnInit() {
    this.conexexionService.informacionGeneral().subscribe(element => {
      this.elementos = element
    })

  }
  async buscarElemento(evt) {
    const searchTerm = evt.srcElement.value;
    this.conexexionService.informacionGeneral().subscribe(element => {
      this.elementos = element;
      this.elementos = this.elementos.filter((currentFood) => {
        if (currentFood.title && searchTerm) {
          return (
            currentFood.title.toLowerCase().indexOf(searchTerm.toLowerCase()) >
            -1
          );
        }
      });
    });

    if (!searchTerm) {
      this.ngOnInit();
      return;
    }
  }
  modificiar(elemento){
    localStorage.setItem('elemento', JSON.stringify(elemento));
    this.router.navigate(['/modificar']);
  }
  modificar(){
    this.router.navigate(['/anadir']);
  }
  
}
