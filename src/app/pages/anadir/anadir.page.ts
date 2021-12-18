import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ConexionService } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-anadir',
  templateUrl: './anadir.page.html',
  styleUrls: ['./anadir.page.scss'],
})
export class AnadirPage implements OnInit {
  contactForm: FormGroup;

  constructor(private conexionService: ConexionService, public alertController: AlertController, private router: Router) { }

  ngOnInit() {
    this.contactForm = this.createFormGroup();
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
    let title = this.contactForm.value.title;
		let body = this.contactForm.value.body;
    const data  = {
      title: title,
      body: body
    }
    this.conexionService.anadir(data).subscribe(() => {
      this.presentAlertConfirm();
    })
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Información',
      message: 'Se ha añadido un nuevo elemento con éxito.',
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
