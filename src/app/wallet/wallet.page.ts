import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PostProvider } from 'src/providers/post-provider';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  history:any = [];
  message:any;
  response:any;
  constructor(public storages:Storage,public postPvdr:PostProvider) { }
  total_loss:any;
  total_balance:any;
  total_gained:any;
  ngOnInit() {
    }
    ionViewDidEnter() {
    this.viewhistory();
    }

    getTotal(){

    }
  viewhistory(){
    this.history = [];
    return new Promise(resolve => {
      //this.showLoader();
      let body = {
        aksi: 'details',
        msrno: 1
      };
      this.postPvdr.postData(body, 'process.php').subscribe(async data => {
        
        console.log(data);
    
            
            for(let receiver of data['result']){
                this.history.push(receiver);
                console.log(receiver['amount']);
            }
            
         
         
       
     
      });
    });
  }
}
