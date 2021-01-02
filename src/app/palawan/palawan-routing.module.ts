import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PalawanPage } from './palawan.page';

const routes: Routes = [
  {
    path: '',
    component: PalawanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PalawanPageRoutingModule {}
