import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CashinPageRoutingModule } from './cashin-routing.module';

import { CashinPage } from './cashin.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component: CashinPage,
    children: [
      {
        path: 'gcash',
      //  loadChildren: '../gcash/gcash.module#GcashPageModule'
        loadChildren: () => import('../gcash/gcash.module').then( m => m.GcashPageModule)
  
      },
      {
        path: 'ml',
       // loadChildren: '../ml/ml.module#MlPageModule'
        loadChildren: () => import('../ml/ml.module').then( m => m.MlPageModule)
  
      },  
      {
        path: 'palawan',
        //loadChildren: '../palawan/palawan.module#PalawanPageModule'
        loadChildren: () => import('../palawan/palawan.module').then( m => m.PalawanPageModule)
  
      },
      // {  
      //   path: 'tab3',
      //   loadChildren: '../tab3/tab3.module#Tab3PageModule'
      // },
      
    ]
  },
  {
    path:'',
    redirectTo: 'cashin/gcash' 
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CashinPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CashinPage]
})
export class CashinPageModule {}