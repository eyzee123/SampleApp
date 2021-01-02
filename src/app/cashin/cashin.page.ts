import { Component, OnInit } from '@angular/core';
import { PostProvider } from 'src/providers/post-provider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cashin',
  templateUrl: './cashin.page.html',
  styleUrls: ['./cashin.page.scss'],
})
export class CashinPage implements OnInit {
  activePath = '';

  pages = [
    {
      name:'Gcash',
      path:'cashin/gcash',
      icon:'cash-outline',
    },
    {
      name:'Ml',
      path:'cashin/ml',
      icon:'cash-outline',
    },
    {
      name:'Palawan',
      path:'cashin/palawan',
      icon:'cash-outline',
    }
  ]

  receiverArr:any=[];


  constructor(private router: Router,private postprovider:PostProvider) { }
  amount:any;
  sender:any;
  receiver:any;
  ref:any;
  receipt:any;
  notes:any;

  response:any;
  message:any;
  id:any;
  storage:any;

  ngOnInit() {
    // this.viewReceiver();
  }
  cashin(){
    if(this.amount == "" || this.amount == null || this.sender == "" || this.sender == null ||
    this.receiver == "" || this.receiver == null || this.ref == "" || this.ref == null || this.receipt == "" ||
    this.receipt == null || this.notes == "" || this.notes == null){

    }else{
      return new Promise(resolve => {
        //this.showLoader();
        let body = {
          aksi: 'register',
          fullname: this.amount,
          username: this.sender,
          phone: this.receiver,
          email: this.ref,
          pass: this.receipt
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
          console.log(this.message);
        });
      });
    }
  }
  // viewReceiver(){
  //   this.receiverArr = [];
  //   return new Promise(resolve => {
  //     //this.showLoader();
  //     let body = {
  //       aksi: 'receiver',
  //     };
  //     this.postprovider.postData(body, 'cashin.php').subscribe(async data => {
  //       this.response =  data['success'];
  //       this.message = data['data'];
      
  //       if(this.response == true){

  //           for(let receiver of data['data']){
  //               this.receiverArr.push(receiver);
  //           }

  //       //  this.hideLoader(this.id);
  //        // this.navCtrl.push(VerificationPage)
        
  //       }else{
  //      //   this.hideLoadererror(this.message);
    
  //       }
  //       console.log(this.message);
  //     });
  //   });
  // }

}