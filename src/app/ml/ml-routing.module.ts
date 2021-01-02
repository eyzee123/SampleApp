import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MlPage } from './ml.page';

const routes: Routes = [
  {
    path: '',
    component: MlPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MlPageRoutingModule {}
