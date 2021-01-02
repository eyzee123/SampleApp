import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PalawanPageRoutingModule } from './palawan-routing.module';

import { PalawanPage } from './palawan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PalawanPageRoutingModule
  ],
  declarations: [PalawanPage]
})
export class PalawanPageModule {}
