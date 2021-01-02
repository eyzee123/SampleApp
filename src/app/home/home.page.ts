import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Platform, NavController, ModalController } from '@ionic/angular';
import { BetPLaced } from '../shared/BetPLaced';
import * as moment from 'moment';
import { BetplacedService } from './../shared/betplaced.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BetModalComponent } from '../bet-modal/bet-modal.component';
import { Storage } from '@ionic/storage';
import { PostProvider } from 'src/providers/post-provider';
import { ChatModalComponent } from '../chat-modal/chat-modal.component';

const APPLICATION_ID:string = 'qBOQ6fCsrvh76yaUtsDooA';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  Msrno:any;
  Username:any;
  wallet:any;
 message:any;
 response:any;
  player: any;
  @ViewChild('player') playerEl: ElementRef;
  playerLog = [];
  showCloseButton = false;
  betForm: FormGroup;
  betplaced : BetPLaced;
  live:boolean;

  constructor(private postPvdr:PostProvider,private storages:Storage,public modalCtrl:ModalController,public fb: FormBuilder,public betService:BetplacedService,public navCtrl: NavController,public platform: Platform,  private zone: NgZone) {

    console.log("sad");
  

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
  async openModal(){
    const modal = await this.modalCtrl.create({
      component:BetModalComponent,
      componentProps:{bet_id:'123',team:'Team 1'},
      cssClass: 'my-custom-class'
    });
    return await modal.present();

  }

  async openChatModal(){
    const modal = await this.modalCtrl.create({
      component:ChatModalComponent,
      componentProps:{msrno:this.Msrno,username:this.Username},
      cssClass: 'my-custom-class'
    });
    return await modal.present();

  }

  placeBet(){
    this.betplaced.bet_id = '';
    this.betplaced.team1 = '';
    this.betplaced.team2 = '';

    this.betService.createBet(this.betplaced).then(res => {
      console.log(res)
      this.betForm.reset();
     // this.router.navigate(['/home']);
    })
      .catch(error => console.log(error));
  }
  

  ngOnInit() {
  
   
  }
  ionViewDidEnter() {
    this.storages.get('data').then((val) => {
      console.log(val);
      this.Msrno = val[0]['msrno'];
      this.Username = val[0]['username'];
      console.log(this.Msrno);
      this.getWallet(this.Msrno);
     
    });

    this.playPlayer();

  
  }


  
  playPlayer(){
    

    console.log('starting javascript player');
   
    const BambuserPlayer:any = window['BambuserPlayer'];

     let resourceUri = 'https://cdn.bambuser.net/groups/96534/broadcasts?by_authors=&title_contains=&has_any_tags=&has_all_tags=&order=live&da_id=a3f8aa6d-b276-52ba-8cde-0daa1a2ba35c&da_timestamp=1599530144&da_signature_method=HMAC-SHA256&da_ttl=0&da_static=1&da_signature=03d4b70ec82c82b2f06fa529de1e3e37416690b14f8ef92d3206da6309ca1cfe';

     


    let player = BambuserPlayer.create(this.playerEl.nativeElement, resourceUri);
   


     
    player.controls = true;
   
   
    const log = str => {
    
      // Ensure template is re-rendered even though caller might be an
      // event listener on an emitter outside of Angular's zone.
      // https://angular.io/docs/ts/latest/api/core/index/NgZone-class.html
      this.zone.run(() => {
        this.playerLog.unshift(`${player.currentTime} ${player.duration} ${str}`);
          
            console.log(player.isLive);
         
       
        if(player.isLive){
          this.live = true;
        }else{
          this.live = false;
        }
      
      });
    }
  
    // Make player available in console, for debugging purposes
    console.log('The player object is now assigned to window.player to enable manual debugging of the player API. Try player.pause(), player.play(), reading from and assigning to player.currentTime etc...', player);
    window['player'] = player;

    // Log all player events as they occur, for debugging purposes
    [
      'canplay',
      'durationchange',
      'ended',
      'error',
      'loadedmetadata',
      'pause',
      'play',
      'playing',
      'progress',
      'seeked',
      'seeking',
      'timeupdate',
      'volumechange',
      'waiting'
    ].map(eventName => player.addEventListener(eventName, e => log(eventName)
    
    ));
   
    
      // Does not work in all circumstances - see notes at
      // https://bambuser.com/docs/playback/web-player/#javascript-api
   
     
      player.play();
  
    
  }


  closePlayer() {
    // Relevant only if player is opened as a modal
    this.navCtrl.pop();
  }

  ionViewWillLeave() {
    // Remove player from DOM.
    //
    // By design, Ionic tabs controller keeps the page alive in the background
    // when navigating away. Leaving a player in the background might be
    // resource-consuming and otherwise unexpected though...
    //
    // If retaining the player state is desired when navigating back and forth,
    // consider replacing the below assignment with player.pause() / player.play()

    console.log('closing javascript player');
    this.playerEl.nativeElement.innerHTML = '';
    this.playerLog = [];
  }
}


