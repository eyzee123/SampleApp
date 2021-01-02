import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MlPageRoutingModule } from './ml-routing.module';

import { MlPage } from './ml.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MlPageRoutingModule
  ],
  declarations: [MlPage]
})
export class MlPageModule {}
