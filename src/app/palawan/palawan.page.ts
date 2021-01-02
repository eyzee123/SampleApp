import { Component, OnInit } from '@angular/core';
import { PostProvider } from 'src/providers/post-provider';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import {File, IWriteOptions, FileEntry} from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-palawan',
  templateUrl: './palawan.page.html',
  styleUrls: ['./palawan.page.scss'],
})
export class PalawanPage implements OnInit {

  constructor(private router: Router,private loadCtrl: LoadingController
    ,private alertCtrl: AlertController,private postprovider:PostProvider, private camera: Camera,public transfer:FileTransfer) { }

  receiverArr:any=[];

  amount:any;
  sender:any;
  receiver:any;
  kptn:any;
  receipt:any;
  notes:any;
  Msrno:any=1;
  response:any;
  message:any;
  id:any;
  myphoto:any;
  myphoto2:any;
  // storage:any;

  img_name:any;
  ngOnInit() {
    this.viewReceiver();
  }



  uploadImage(){
    // const formData = new FormData();
    // formData.append('file',file, file.name);
    // formData.append('name',file.name);

    const filetransfer:FileTransferObject = this.transfer.create();

    var random = Math.floor(Math.random() * 100);
  
    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: "receipt_" + random + ".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {}
    }
    this.presentLoading();
    if (this.amount == "" || this.amount == null || this.sender == "" || this.sender == null ||
    this.receiver == "" || this.receiver == null ||  this.kptn == "" || this.kptn == null ||
     this.notes == "" || this.notes == null || this.myphoto == "" || this.myphoto == null ) {
      this.dismissLoading("Fill in all required fields");
      
    }
      else{
    
    filetransfer.upload(this.myphoto,'http://192.168.1.23/sabong_api/uploadimage.php',options)
    .then((data) => {
      console.log("success");
      console.log(data);
      console.log(data['response']);
      this.cashin(data['response']);
    }), (err) => {
      console.log(err);
      console.log("error");

    }
  }
  

  }

  openGallery(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType:this.camera.MediaType.PICTURE,
          sourceType:this.camera.PictureSourceType.PHOTOLIBRARY
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.myphoto = 'data:image/jpeg;base64,' + imageData;
     console.log(this.myphoto);

    }, (err) => {
     // Handle error
    });
  }




  cashin(imgs){
   
      return new Promise(resolve => {
        //this.showLoader();
        let body = {
          aksi: 'palawan',
          msrno: this.Msrno,
          amount: this.amount,
          sender: this.sender,
          receiver: this.receiver,
          kptn: this.kptn,
          receipt: imgs,
          notes: this.notes
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
      
  }
  viewReceiver(){
    this.receiverArr = [];
    return new Promise(resolve => {
      //this.showLoader();
      let body = {
        aksi: 'receiver',
      };
      this.postprovider.postData(body, 'process.php').subscribe(async data => {
        this.response =  data['success'];
        this.message = data['data'];
      
        if(this.response == true){

            for(let receiver of data['data']){
                this.receiverArr.push(receiver);
            }

        //  this.hideLoader(this.id);
         // this.navCtrl.push(VerificationPage)
         
        }else{
       //   this.hideLoadererror(this.message);
    
        }
        console.log(this.message);
      });
    });
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
