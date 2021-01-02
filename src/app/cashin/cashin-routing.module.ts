import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashinPage } from './cashin.page';

const routes: Routes = [
  {
    path: '',
    component: CashinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashinPageRoutingModule {}
