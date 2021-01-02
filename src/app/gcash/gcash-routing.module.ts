import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GcashPage } from './gcash.page';

const routes: Routes = [
  {
    path: '',
    component: GcashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GcashPageRoutingModule {}
