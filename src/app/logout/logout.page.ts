import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  loading;
  constructor(private loadCtrl:LoadingController,private alertCtrl:AlertController,private storages:Storage,private router:Router) { }

  ngOnInit() {
   

  }

  ionViewDidEnter() {
    this.presentLogout();
  }

  
  dismissLoading(){
    setTimeout(() => {
      this.loadCtrl.dismiss();
      this.storages.clear();
      this.storages.get('data').then((val) => {
        console.log(val);
      });
      this.router.navigateByUrl('login');
    }, 2000);

  }

  

  async presentLoading() {
    const loading = await this.loadCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

  }

async presentLogout() {
    const alert = await this.alertCtrl.create({
    
      message: 'Are you sure you want to logout ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.router.navigateByUrl('menu/home');
          }
        },
        {
          text: 'Yes',
          handler: () => {
          this.presentLoading();
            console.log('Yes clicked');
          this.dismissLoading();
           
          }
        }
      ],
      cssClass: "toastercenter",
    });
    await alert.present();
  }

}
