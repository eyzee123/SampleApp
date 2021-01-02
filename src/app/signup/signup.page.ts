import { Component, OnInit, Injectable,ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { PostProvider } from 'src/providers/post-provider';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
@Injectable({ providedIn: 'root' }) 

export class SignupPage implements OnInit {
  constructor(public alertCtrl:AlertController,public loadCtrl:LoadingController,private cdRef:ChangeDetectorRef,private router: Router,private postprovider:PostProvider) {}
  fullname:any;
  username:any;
  phone:any = '639';
  email:any;
  pass:any;
  cpass:any;

  response:any;
  message:any;
  id:any;
  storage:any;

  ngOnInit() {}

  onInputTime(data)
  {
    this.cdRef.detectChanges();
    this.phone = this.phone.length > 8 ? this.phone.substring(0,8) : data;

  }

  goToPage(path, data = null) {
    this.router.navigateByUrl(path, { queryParams: data });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }


 
  verification(){
   
      return new Promise(resolve => {
        //this.showLoader();
        let body = {
          aksi: 'register',
          fullname: this.fullname,
          username: this.username,
          phone: this.phone,
          email: this.email,
          pass: this.pass,
          cpass: this.cpass
        };
        this.postprovider.postData(body, 'process.php').subscribe(async data => {
          this.response =  data['success'];
          this.message = data['message'];
        
          if(this.response == true){
           this.dismissLoading2();
            
            this.goToVerification(data['request_id'],data['msrno']);
          //  this.hideLoader(this.id);
           // this.navCtrl.push(VerificationPage)
           
          }else{
         //   this.hideLoadererror(this.message);
         this.dismissLoading(this.message);
      
          }
          console.log(this.message);
        });
      });
      
  
  
}
goToVerification(id,msr_no) {
  this.router.navigate(['verify-code'], { queryParams: {request_id:id,msrno:msr_no,phone:this.phone,fullname: this.fullname,
    username: this.username,
    email: this.email,
    pass: this.pass,
    cpass: this.cpass} });

}
clear(){
  this.fullname ="";
  this.username ="";
  this.phone ="639";
  this.email ="";
  this.pass ="";
  this.cpass ="";

}

otp(){
  this.presentLoading();

  if (this.fullname == "" || this.fullname == null || this.phone == "" || this.phone == null ||
  this.email == "" || this.pass == null ||  this.pass == "" || this.pass == null ||
   this.cpass == "" || this.cpass == null || this.username == "" || this.username == null ) {
    // this.presentAlert("Fill in all required fields")
    // if(this.cpass == this.pass){

    // }
    this.dismissLoading("Please fill in all the fields."); 
  }else{
    if (this.cpass != this.pass){
      console.log("Password did not match");
      this.dismissLoading("Password did not match"); 
    }
    else{
  return new Promise(resolve => {
    //this.showLoader();
    let body = {
      phone: this.phone,
      aksi: 'send_code'
    };
    this.postprovider.postData(body, 'otp.php').subscribe(async data => {
      console.log(data);
     
    if(data['error']){
      this.dismissLoading(data['error']['description']);
  }else{
    this.verification();
  }
    });
  });
    }
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

}