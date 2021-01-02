import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(public router:Router) { 
    
  }

  ngOnInit() {

  }
  goToPage(path, data = null) {
    this.router.navigateByUrl(path, { queryParams: data });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

}
