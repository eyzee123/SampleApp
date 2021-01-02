import { Component, OnInit } from '@angular/core';
import { PostProvider } from 'src/providers/post-provider';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-cashout',
  templateUrl: './cashout.page.html',
  styleUrls: ['./cashout.page.scss'],
})
export class CashoutPage implements OnInit {
wallet:any;
response:any;
Msrno:any;
Username:any;
outlet:any = 'gcash'; 
contact:any;
bank_type:any= 'bdo';
message:any;
amount:any;
account_number:any;
account_name:any;
address_number:any;
gcash_number:any;
remitance_receiver:any;
remitance_address:any;
  constructor(private loadCtrl:LoadingController,private alertCtrl:AlertController,private postPvdr:PostProvider,private storages:Storage) { }

  ngOnInit() {
  }


  getWallet(msr){
   
    return new Promise(resolve => {
      //this.showLoader();
      let body = {
        aksi: 'getWallet',
        msrno: msr,
      
      };
      this.postPvdr.postData(body, 'process.php').subscribe(async data => {
        this.response =  data['success'];

        if(this.response == true){
          this.wallet = data['data'];
          console.log(this.wallet);
        }else{
     
        }
       
      });
    });
  

}
outletSelect(){
console.log(this.outlet);
}

withdraw(outlet){

if(this.wallet > this.amount){


if(outlet == 'gcash'){
  this.gcash();
}if(outlet == 'palawan' || outlet == 'mlhuillier'){
  this.remitance();
}if(outlet == 'bank'){
  this.bank();
}
}else{

this.presentAlert("Invalid Amount !","Please make sure that your wallet balance is greater than the amount you enter.");

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


gcash(){
  this.presentLoading();
if(this.gcash_number == '' || this.gcash_number == null){
   
  this.dismissLoading('Please fill in all the fields.');

}else{


  return new Promise(resolve => {
    //this.showLoader();
    let body = {
      aksi: 'withdraw',
      msrno: this.Msrno,
      amount: this.amount,
      contact: this.contact,
      outlet: this.outlet,
      bank: 'e-wallet',
      acc_number:this.gcash_number,
      acc_name:"",
      acc_address:"",
    
     
    };
    this.postPvdr.postData(body, 'process.php').subscribe(async data => {
      this.response =  data['success'];
      this.message = data['message'];
    
      if(this.response == true){
        this.getWallet(this.Msrno);
      }else{
    
  
      }
      this.gcash_number = "";
      this.amount = "";
      console.log(this.message);
      this.dismissLoading(this.message);
    });
  });
}

}
remitance(){
  this.presentLoading();
  if(this.remitance_receiver == '' || this.remitance_receiver == null || this.remitance_address == '' || this.remitance_address == null){
     
    this.dismissLoading('Please fill in all the fields.');
  
  }else{
  
  
    return new Promise(resolve => {
      //this.showLoader();
      let body = {
        aksi: 'withdraw',
        msrno: this.Msrno,
        amount: this.amount,
        contact: this.contact,
        outlet: this.outlet,
        bank: 'remittance',
        acc_number: "",
        acc_name:this.remitance_receiver,
        acc_address:this.remitance_address,
      
       
      };
      this.postPvdr.postData(body, 'process.php').subscribe(async data => {
        this.response =  data['success'];
        this.message = data['message'];
      
        if(this.response == true){
          this.getWallet(this.Msrno);
        }else{
      
    
        }
        
        this.remitance_receiver="";
        this.remitance_address="";
        this.amount = "";
        console.log(this.message);
        this.dismissLoading(this.message);
      });
    });
  }
  
}
bank(){
  this.presentLoading();
  if(this.account_name == '' || this.account_name == null || this.account_number == '' || this.account_number == null){
     
    this.dismissLoading('Please fill in all the fields.');
  
  }else{
  
  
    return new Promise(resolve => {
      //this.showLoader();
      let body = {
        aksi: 'withdraw',
        msrno: this.Msrno,
        amount: this.amount,
        contact: this.contact,
        outlet: this.outlet,
        bank: this.bank_type,
        acc_number: this.account_number,
        acc_name:this.account_name,
        acc_address:"",
      
       
      };
      this.postPvdr.postData(body, 'process.php').subscribe(async data => {
        this.response =  data['success'];
        this.message = data['message'];
      
        if(this.response == true){
          this.getWallet(this.Msrno);
        }else{
      
    
        }
        
        this.account_name="";
        this.account_number="";
        this.amount = "";
        console.log(this.message);
        this.dismissLoading(this.message);
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



  ionViewDidEnter() {
    this.storages.get('data').then((val) => {
      console.log(val);
      this.Msrno = val[0]['msrno'];
      this.Username = val[0]['username'];
      this.contact = val[0]['mobile'];
      console.log(this.Msrno);
      this.getWallet(this.Msrno);
     
    });
  }

}
