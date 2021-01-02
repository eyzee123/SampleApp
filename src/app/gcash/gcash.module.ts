import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GcashPageRoutingModule } from './gcash-routing.module';
import { File } from '@ionic-native/File/ngx';
import { Camera } from '@ionic-native/Camera/ngx';
import { GcashPage } from './gcash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GcashPageRoutingModule
  ],
  providers: [
    File,
    Camera
  ],
  declarations: [GcashPage]
})
export class GcashPageModule {}
