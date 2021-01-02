import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';
import { MenuPageRoutingModule } from './menu-routing.module';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'home',
       // loadChildren: 'src/app/home/home.module#HomePageModule'
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)

      },
      {
        path: 'wallet',
        //loadChildren: '../wallet/wallet.module#WalletPageModule'
        loadChildren: () => import('../wallet/wallet.module').then( m => m.WalletPageModule)
      } ,
      {
        path: 'cashout',
      //  loadChildren: '../cashout/cashout.module#CashoutPageModule'
        loadChildren: () => import('../cashout/cashout.module').then( m => m.CashoutPageModule)
      },
      {
        path: 'account',
      //  loadChildren: '../cashout/cashout.module#CashoutPageModule'
        loadChildren: () => import('../account/account.module').then( m => m.AccountPageModule)
      }
      ,
      {
        path: 'cashin',
      //  loadChildren: '../cashout/cashout.module#CashoutPageModule'
        loadChildren: () => import('../cashin/cashin.module').then( m => m.CashinPageModule)
      }
      ,
      {
        path: 'help',
      //  loadChildren: '../cashout/cashout.module#CashoutPageModule'
        loadChildren: () => import('../help/help.module').then( m => m.HelpPageModule)
      }
      ,
      {
        path: 'logout',
       // loadChildren: '../logout/logout.module#PlayerJsPageModule'
        loadChildren: () => import('../logout/logout.module').then( m => m.LogoutPageModule)
      }
    ]
  },
  {
      path: '',
      redirectTo: '/menu/home'
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
   RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})

export class MenuPageModule { }