import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { PostProvider } from 'src/providers/post-provider';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.page.html',
  styleUrls: ['./change-pass.page.scss'],
})
export class ChangePassPage implements OnInit {

  constructor(private router: Router,private loadCtrl: LoadingController
    ,private alertCtrl: AlertController,private postprovider:PostProvider) { }

  curpass:any;
  pass:any;
  cpass:any;
  msrno:any;

  message:any;
  response:any;

  ngOnInit() {
  }
  changePass(){
    this.presentLoading();
    if(this.curpass == "" || this.curpass == null || 
       this.pass == "" || this.pass == null ||
       this.cpass == "" || this.cpass == null){
         this.dismissLoading("Please fill all required fields ");
       }else{
         if(this.curpass == this.pass){
           this.dismissLoading("Password must differ from old password.");
         }else{
           if(this.pass == this.cpass){
            return new Promise(resolve => {
              //this.showLoader();
              let body = {
                aksi: 'changePass',
                msrno: 1,
                curpass: this.curpass,
                pass: this.pass,
                cpass: this.cpass
              };
              this.postprovider.postData(body, 'process.php').subscribe(async data => {
                this.response =  data['success'];
                this.message = data['message'];
              
                if(this.response == true){
                //  this.hideLoader(this.id);
                 // this.navCtrl.push(VerificationPage)
                 
                }else{
               //   this.hideLoadererror(this.message);
            
                }
                
                this.dismissLoading(this.message);
              });
            });
           }else{
            this.dismissLoading("You must enter the same password twice in order to confirm it.");
           }
         }
       }
  }
  dismissLoading(msg){
    setTimeout(() => {
      this.loadCtrl.dismiss();
        this.presentAlert("Alert !",msg);
    }, 2000);
  
  }
  
  async presentAlert(title,msg) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: title,
      message: msg,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  async presentLoading() {
    const loading = await this.loadCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
  
  }

}
