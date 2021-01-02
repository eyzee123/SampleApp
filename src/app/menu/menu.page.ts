import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  activePath = '';

  pages = [
    {
      name: 'Home',
      path: '/menu/home',
      icon: 'home'
    }
    // ,
    // {
    //   name: 'History',
    //   path: '/menu/history',
    //   icon: 'stats-chart'
    // }
  ]

  wallet = [
    {
      name: 'My Wallet',
      path: '/menu/wallet',
      icon: 'wallet'
    },
    {
      name: 'Cashin',
      path: '/menu/cashin/gcash',
      icon: 'cash'
    },
    {
      name: 'Cashout',
      path: '/menu/cashout',
      icon: 'card'
    }
  ]
  sub_pages = [
    {
      name: 'Account',
      path: '/menu/account',
      icon: 'person'
    },
    {
      name: 'Logout',
      path: '/menu/logout',
      icon: 'power'
    }
  ]
  username:any;
  email:any;

  constructor(private router: Router,public storages:Storage) {
   
    this.router.events.subscribe((event: RouterEvent) => {
      this.activePath = event.url
      console.log(this.activePath);
    })
  }

  ngOnInit() {
    this.storages.get('data').then((val) => {
      console.log(val);
  
      this.username = val[0]['username'];
      this.email = val[0]['email'];
    
     
    });


  }
}