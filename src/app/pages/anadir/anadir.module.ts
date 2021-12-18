import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnadirPageRoutingModule } from './anadir-routing.module';

import { AnadirPage } from './anadir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AnadirPageRoutingModule
  ],
  declarations: [AnadirPage]
})
export class AnadirPageModule {}
