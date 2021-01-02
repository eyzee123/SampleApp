import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  activePath='/tabs/tab1';

  pages = [
    {
      name:'Tab1',
      path:'/tabs/tab1',

    },
    {
      name:'Tab2',
      path:'/tabs/tab2',

    },
  ]

}
