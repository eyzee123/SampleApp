import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { PostProvider } from 'src/providers/post-provider';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {

  constructor(private router: Router, private postprovider: PostProvider,
    private loadCtrl: LoadingController,private alertCtrl: AlertController) { }

  profileArr = [];

  phone:any;
  email:any;
  fullname:any;
  username:any;
  // pass:any;

  msrno:any;
  response:any;
  message:any;

  ngOnInit() {
    this.viewProfile();
    
  }

  viewProfile(){
    this.profileArr = [];
    return new Promise(resolve => {
      //this.showLoader();
      let body = {
        aksi: 'profile',
        msrno: 1,
      };
      this.postprovider.postData(body, 'process.php').subscribe(async data => {
        this.response =  data['success'];
        this.message = data['data'];
        
        if(this.response == true){

           this.fullname = data['data'][0]['name'];
           this.username = data['data'][0]['username'];
           this.phone = data['data'][0]['mobile'];
           this.email = data['data'][0]['email'];
            

        //  this.hideLoader(this.id);
         // this.navCtrl.push(VerificationPage)
         
        }else{
       //   this.hideLoadererror(this.message);
    
        }
        console.log(this.message);
      });
    });
  }
  updateProfile(){
    if(this.fullname == "" || this.fullname == null ||
      this.username == "" || this.username == null ||
      this.email == "" || this.email == null ||
      this.phone == "" || this. phone == null){
        this.dismissLoading("Fill in all required fields");
    }else{
      return new Promise(resolve => {
      //this.showLoader();
      let body = {
        aksi: 'updateProfile',
        msrno: 1,
        phone: this.phone,
        email: this.email,
        username: this.username,
        name:this.fullname
      };
      this.postprovider.postData(body, 'process.php').subscribe(async data => {
        this.response =  data['success'];
        this.message = data['data'];
        
        if(this.response == true){            

        //  this.hideLoader(this.id);
         // this.navCtrl.push(VerificationPage)
         
        }else{
       //   this.hideLoadererror(this.message);
    
        }
        console.log(this.message);
      });
    });
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
