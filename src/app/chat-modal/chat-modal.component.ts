import { ElementRef, HostListener, Directive,Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatService } from '../shared/chat.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Chat } from '../shared/Chat';



@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss'],
})
@Directive({
  selector: 'ion-textarea[autosize]'
})

export class ChatModalComponent implements OnInit {
  @Input("msrno") msrno;
  @Input("username") username;
  chatForm: FormGroup;
  chat:Chat;
messages = [];

  
    newMsg = '';
  currentUser='';
  constructor(public modalCtrl:ModalController,private aptService: ChatService,
    private router: Router,
    public fb: FormBuilder) { }

  sendMessage(){
    console.log("asds");
      // this.messages.push({
      //   user: this.username,
      //   receiver: 'Admin',
      //   createdAt: new Date().getTime(),
      //   msg: this.newMsg
      // });

     this.chat = 
        {
          $key:'',
        sender: this.currentUser,
        receiver: 'Admin',
        message: this.newMsg,
        status: 'unread',
        created: new Date().getTime().toString()
      }

    
        this.aptService.createChat(this.chat).then(res => {
          console.log(res)
          
      this.newMsg='';
        
        })
          .catch(error => console.log(error));
  
  }




  dismissModal(){
    this.modalCtrl.dismiss();

  }

  fetchChats() {
    
    this.aptService.getChatList().valueChanges().subscribe(res => {
      
   
      console.log(res);
    })
  }

  ngOnInit() {

    console.log(this.msrno);
    console.log(this.username);
    this.currentUser  = this.username;
  
    // this.messages.push({
    //   user: this.username,
    //   createdAt: new Date().getTime(),
    //   msg: "Hi"
    // });
    // this.messages.push({
    //   user: 'Admin',
    //   createdAt: new Date().getTime(),
    //   msg: "Sample message"
    // });

 
   let chatRes = this.aptService.getChatList();
  chatRes.snapshotChanges().subscribe(res=>{
    
    this.messages = [];
    res.forEach(item =>{
     
      let a = item.payload.toJSON();
      a['$key'] = item.key;
      console.log();
      if(a['sender'] === this.currentUser || a['receiver'] === this.currentUser){
      this.messages.push(a as Chat);
    }
    })
  })
    
  }

}
