import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-provider';
import { AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  constructor(private loadCtrl:LoadingController,private storages:Storage,private alertCtrl:AlertController,private router: Router,private postprovider:PostProvider) {}
  password:any;
  username:any;
loading:any;
  response:any;
  message:any;
  id:any;


  ngOnInit() {
    this.storages.get('data').then((val) => {
      console.log(val);
      if (val == "" || val == null) {
      }else{

        this.router.navigateByUrl('menu/home');
      }
    });
    

  }
  goToPage(path, data = null) {
    this.router.navigateByUrl(path, { queryParams: data });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }



  async presentAlert2(title,msg) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: title,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }


  verification(){
    this.presentLoading();
    if (this.username == "" || this.username == null || this.password == "" || this.password == null ) {
      // this.presentAlert("Fill in all required fields")
      // if(this.cpass == this.pass){

      // }
      this.dismissLoading("All fields can't be empty");
    }else{
     
      return new Promise(resolve => {
        //this.showLoader();
        let body = {
          aksi: 'login',
          password: this.password,
          username: this.username
        };
        this.postprovider.postData(body, 'process.php').subscribe(async data => {
          this.response =  data['success'];
          this.message = data['data'];

         
        
          if(this.response == true){
            this.dismissLoading2();
            console.log(this.message);
            
          }else{
         //   this.hideLoadererror(this.message);
       
       //  this.presentAlert2("Error",this.message);
         this.dismissLoading(this.message);
          }
          console.log(this.message);
        });
      });
    
  }
}


async presentLoading() {
  const loading = await this.loadCtrl.create({
    cssClass: 'my-custom-class',
    message: 'Please wait...',
    duration: 2000
  });
  await loading.present();

}
dismissLoading2(){
  setTimeout(() => {
    this.loadCtrl.dismiss();
    this.storages.set('data', this.message);
    this.router.navigateByUrl('menu/home');
   
  }, 2000);

}


dismissLoading(msg){
  setTimeout(() => {
    this.loadCtrl.dismiss();
    if(msg == "" || msg== null){
    }else{
      this.presentAlert2("Alert",msg);
    }
  }, 2000);

}

presentLoadingDefault() {
  this.loading = this.loadCtrl.create({
    message: 'Please wait...'
  });

  this.loading.present();

 
}



}