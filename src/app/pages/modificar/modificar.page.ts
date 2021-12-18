import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Posts } from 'src/app/interfaces/conexion';
import { ConexionService } from 'src/app/services/conexion.service';


@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {
  contactForm: FormGroup;
  elementos: Posts[] = [];
  cuerpo;
  titulo;

  constructor(private router: Router, private conexionService: ConexionService, public alertController: AlertController) { }

  ngOnInit() {
    this.contactForm = this.createFormGroup();

  }
  ionViewWillEnter(){
    const elemento = localStorage.getItem('elemento');
    this.elementos = JSON.parse(elemento);
    console.log(this.elementos)
    this.titulo = this.elementos['title'];
    this.cuerpo = this.elementos['body'];
  }
  createFormGroup(){
		return new FormGroup({
		  title: new FormControl('', [Validators.required]),
		  body: new FormControl('', [Validators.required]),
		})
	}
  get title(){
		return this.contactForm.get('title'); 
	}

	get body(){
		return this.contactForm.get('body'); 
	}
  modificar(){
    console.log("entrar")
    let id = this.elementos['id'];
    let title = this.contactForm.value.title;
		let body = this.contactForm.value.body;
    const data  = {
      title: title,
      body: body
    }
    this.conexionService.modificar(id, data).subscribe(() => {
      this.presentAlertConfirm();
    })
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Información',
      message: 'Se ha modificado con éxito.',
      mode: 'ios',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.router.navigate(['/'])
          },
        },
      ],
    });
    await alert.present();
  }

}
