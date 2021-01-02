import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { PostProvider } from 'src/providers/post-provider';
import { Router,ActivatedRoute } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';
import { AlertController, IonInput, LoadingController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.page.html',
  styleUrls: ['./verify-code.page.scss'],
})


export class VerifyCodePage implements OnInit {
  @ViewChild('field1')  text1: IonInput;
  @ViewChild('field2')  text2: IonInput;
  @ViewChild('field3')  text3: IonInput;
  @ViewChild('field4')  text4: IonInput;
  request_id:any;
  phone:any;
  input1:any;
  input2:any;
  input3:any;
  input4:any;
  res:any;

  fullname:any;
  username:any;
  email:any;
  pass:any;
  cpass:any;
  Msrno:any;

  response:any;
  message:any;
  constructor(public storages:Storage,public loadCtrl:LoadingController,public alertCtrl:AlertController,private router: Router,private route: ActivatedRoute,private postprovider:PostProvider) {

   }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.Msrno = params['msrno']; 
     this.request_id = params['request_id'];
     this.phone = params['phone'];
     this.fullname = params['phone'];
     this.username = params['phone'];
     this.email = params['phone'];
     this.pass = params['phone'];
     this.cpass = params['phone'];
 });
  }
  onInputTime(data)
  {
    if(this.input1.length > 0){
   
      this.text2.setFocus();
      }
      if(this.input2.length > 0){
   
        this.text3.setFocus();
        }
        if(this.input3.length > 0){
   
          this.text4.setFocus();
          }
          if(this.input4.length > 0){
   
            //this.text2.setFocus();
            }

  }
  dismissLoading(msg){
    setTimeout(() => {
      this.loadCtrl.dismiss();
     
        this.presentAlert("Alert",msg);
     
    }, 2000);
  
  }
  dismissLoading2(){
    setTimeout(() => {
      this.loadCtrl.dismiss();
     
   
     
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
  async presentAlert(title,msg) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: title,
      message: msg,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  resend(){


   this.presentLoading();
    return new Promise(resolve => {
      //this.showLoader();
      let body = {
        phone: this.phone,
        aksi: 'send_code'
      };
      this.postprovider.postData(body, 'otp.php').subscribe(async data => {
        console.log(data);
   
        this.request_id = data['request_id'];
        if(data['error']){
            this.dismissLoading(data['error']['description']);
        }else{
          this.dismissLoading2();
        }
        //   if(data['request_id'] ==null || data['request_id'] ==""){  
        //     console.log(data);
            
        //  }else{

        //  this.dismissLoading(data["description"]);
        // }

      });
    });
  
  
  
  }

  getUser(){
    return new Promise(resolve => {
      //this.showLoader();
      let body = {
        aksi: 'getUser',
        msrno: this.Msrno,

      };
      this.postprovider.postData(body, 'process.php').subscribe(async data => {
        this.response =  data['success'];
        this.message = data['data'];

        if(this.response == true){
          console.log(this.message);
          this.storages.set('data', this.message);
          this.dismissLoading("Registered Successfully !");
        this.router.navigateByUrl('menu/home');
        }else{
       //   this.hideLoadererror(this.message);
     
     //  this.presentAlert2("Error",this.message);
       this.dismissLoading(this.message);
        }
        console.log(this.message);
      });
    });
  }


  verifyPhone(){
    this.presentLoading();
    this.res = this.input1 + this.input2 + this.input3 + this.input4;
    console.log(this.request_id);
    if(this.request_id ==null || this.request_id==""){
        this.dismissLoading("Unable to verify your phone number");
    }else{

  
    return new Promise(resolve => {
      //this.showLoader();
      let body = {
        res: this.res,
        aksi: 'verify_code',
        request_id: this.request_id,

      };
      this.postprovider.postData(body, 'otp.php').subscribe(async data => {
        console.log(data["error"]);
        console.log(data);
        if(data['error']){
          this.dismissLoading(data['error']['description']);
      }else{
     this.getUser();
      }


      });
    });
  }
  }

 
}